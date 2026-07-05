import { useRef, useCallback, useEffect } from "react";
import { useProcessAudioChunk } from "../api/chunk";
import audioBufferToWav from "audiobuffer-to-wav";

const CHUNK_INTERVAL_MS = 30_000;

// Detects the best supported MIME type once at module load.
const MIME_TYPE = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
  ? "audio/webm;codecs=opus"
  : MediaRecorder.isTypeSupported("audio/mp4")
    ? "audio/mp4"
    : "audio/webm";

export interface UseAudioChunkRecorderReturn {
  /**
   * Acquire the microphone stream. Call once when the session begins.
   * Reuses the same MediaStream for every question — no repeated permission
   * prompts and zero latency when starting each new recorder.
   */
  acquireStream: () => Promise<void>;

  /**
   * Create a fresh MediaRecorder for the current question and start the
   * 30-second chunk interval. Requires acquireStream() to have been called.
   * @param questionId - The ID of the question being recorded.
   */
  startRecorderForQuestion: (questionId: string) => void;

  /**
   * Stop the current recorder, flush any remaining audio, and resolve only
   * after the WAV has been encoded and sent. Safe to await before starting
   * the next question — no chunk is ever lost or duplicated.
   */
  stopRecorderAndFlush: () => Promise<void>;

  /**
   * Release the mic stream and clear all state. Call when the whole
   * interview session ends (not between questions).
   */
  releaseStream: () => void;

  /** Global chunk index — increments across all questions in the session. */
  chunkIndexRef: React.MutableRefObject<number>;
}

export const useAudioChunkRecorder = (): UseAudioChunkRecorderReturn => {
  const { mutate: processAudioChunk } = useProcessAudioChunk();

  // ── Persistent across the whole session ───────────────────────────────────
  const streamRef = useRef<MediaStream | null>(null);
  const chunkIndexRef = useRef(0); // global, never resets between questions
  const sessionActiveRef = useRef(false);

  // ── Per-question — reset on every startRecorderForQuestion() ──────────────
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const chunkIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // Duplicate-send guard: flipped to true the instant a flush begins.
  const flushedRef = useRef(false);
  // ID of the question currently being recorded.
  const questionIdRef = useRef<string>("");

  // ── FIX: store the very first data chunk (WebM header) per recorder ───────
  // WebM/Opus streams embed the codec initialisation data (EBML header +
  // Tracks element) only in the first ondataavailable event. Every subsequent
  // slice — including the final onstop fragment — is valid only when the
  // header is prepended. We keep a ref to it and always prepend when encoding.
  const headerChunkRef = useRef<BlobPart | null>(null);

  // ── Encode accumulated chunks → WAV → send ────────────────────────────────
  const encodeAndSend = useCallback(
    async (
      blobParts: BlobPart[],
      chunkIndex: number,
      mimeType: string,
      questionId: string,
    ): Promise<void> => {
      const blob = new Blob(blobParts, { type: mimeType });

      if (blob.size < 1000) {
        console.warn(
          `⚠️ Chunk ${chunkIndex} too small (${blob.size} bytes), skipping.`,
        );
        return;
      }

      // console.log(
      //   `🔄 Encoding chunk ${chunkIndex} to WAV… (${blob.size} bytes)`,
      // );

      try {
        const arrayBuffer = await blob.arrayBuffer();
        const audioCtx = new AudioContext();
        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
        await audioCtx.close();

        const wavArrayBuffer = audioBufferToWav(audioBuffer);
        const file = new File([wavArrayBuffer], `chunk_${chunkIndex}.wav`, {
          type: "audio/wav",
        });

        // console.log(
        //   `🎙️ Sending chunk ${chunkIndex} as WAV, size: ${file.size} bytes, question: ${questionId}`,
        // );
        processAudioChunk({
          chunk_id: chunkIndex,
          audio_file: file,
          question_id: questionId,
        });
      } catch (err) {
        console.error(`❌ Failed to encode chunk ${chunkIndex}:`, err);
      }
    },
    [processAudioChunk],
  );

  // ── Build a self-contained blob, always prepending the WebM header ─────────
  // For the very first flush (parts already include the header as element [0]),
  // we just use the parts as-is. For every subsequent flush the header chunk is
  // prepended so AudioContext can decode the isolated fragment.
  const buildParts = useCallback((parts: BlobPart[]): BlobPart[] => {
    const header = headerChunkRef.current;
    if (!header) return parts; // no header yet — parts must already be complete

    // Avoid double-prepending: if the first element IS the header blob, the
    // parts array already starts at the beginning of the stream.
    if (parts[0] === header) return parts;

    return [header, ...parts];
  }, []);

  // ── Non-destructive mid-session flush (30s timer) ─────────────────────────
  const flushIntervalChunk = useCallback(() => {
    if (!sessionActiveRef.current) return;
    if (flushedRef.current) return; // final flush already in progress

    const parts = chunksRef.current.splice(0); // drain, keep recording
    if (parts.length === 0) return;

    const index = chunkIndexRef.current;
    chunkIndexRef.current += 1;

    // Prepend WebM header so the isolated fragment is decodable
    encodeAndSend(buildParts(parts), index, MIME_TYPE, questionIdRef.current);
  }, [encodeAndSend, buildParts]);

  // ── Acquire mic stream (call once per session) ────────────────────────────
  const acquireStream = useCallback(async (): Promise<void> => {
    if (streamRef.current) return; // already acquired

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    streamRef.current = stream;
    sessionActiveRef.current = true;
    // console.log("🎤 Mic stream acquired");
  }, []);

  // ── Start a fresh recorder for each question ──────────────────────────────
  const startRecorderForQuestion = useCallback(
    (questionId: string): void => {
      if (!streamRef.current) {
        console.error("startRecorderForQuestion: stream not acquired yet.");
        return;
      }
      if (!sessionActiveRef.current) return;

      // Reset per-question state
      chunksRef.current = [];
      flushedRef.current = false;
      headerChunkRef.current = null; // will be set by the first ondataavailable
      questionIdRef.current = questionId;

      const recorder = new MediaRecorder(streamRef.current, {
        mimeType: MIME_TYPE,
      });
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (flushedRef.current) return; // final flush already started, discard
        if (!e.data?.size) return;

        // Capture the very first chunk as the header for this recorder instance.
        // All subsequent flushes will prepend it so each blob is self-contained.
        if (headerChunkRef.current === null) {
          headerChunkRef.current = e.data;
        }

        chunksRef.current.push(e.data);
      };

      recorder.start(1000); // fire ondataavailable every 1s

      chunkIntervalRef.current = setInterval(
        flushIntervalChunk,
        CHUNK_INTERVAL_MS,
      );

      // console.log("▶️ Recorder started for new question");
    },
    [flushIntervalChunk],
  );

  // ── Stop recorder + guaranteed final flush ────────────────────────────────
  const stopRecorderAndFlush = useCallback((): Promise<void> => {
    return new Promise((resolve) => {
      if (chunkIntervalRef.current) {
        clearInterval(chunkIntervalRef.current);
        chunkIntervalRef.current = null;
      }

      const recorder = mediaRecorderRef.current;

      if (!recorder || recorder.state === "inactive") {
        resolve();
        return;
      }

      flushedRef.current = true;

      recorder.onstop = async () => {
        mediaRecorderRef.current = null;

        const parts = chunksRef.current.splice(0);
        chunksRef.current = [];

        if (parts.length > 0) {
          const index = chunkIndexRef.current;
          chunkIndexRef.current += 1;

          // Always prepend the WebM header so the final tail fragment can be
          // decoded by AudioContext even when it contains no header itself.
          await encodeAndSend(
            buildParts(parts),
            index,
            MIME_TYPE,
            questionIdRef.current,
          );
        } else {
          // console.log("ℹ️ No buffered audio at stop — nothing to flush.");
        }

        resolve();
      };

      recorder.stop();
    });
  }, [encodeAndSend, buildParts]);

  // ── Release mic (call when the whole session ends) ────────────────────────
  const releaseStream = useCallback((): void => {
    sessionActiveRef.current = false;

    if (chunkIntervalRef.current) {
      clearInterval(chunkIntervalRef.current);
      chunkIntervalRef.current = null;
    }

    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== "inactive") {
      recorder.onstop = null;
      recorder.ondataavailable = null;
      recorder.stop();
    }
    mediaRecorderRef.current = null;
    chunksRef.current = [];
    headerChunkRef.current = null;

    streamRef.current?.getTracks().forEach((track) => {
      track.stop();
      track.enabled = false;
    });
    streamRef.current = null;

    // console.log("🛑 Mic stream released");
  }, []);

  // Cleanup on unmount
  useEffect(() => () => releaseStream(), [releaseStream]);

  return {
    acquireStream,
    startRecorderForQuestion,
    stopRecorderAndFlush,
    releaseStream,
    chunkIndexRef,
  };
};
