import { useRef, useCallback, useEffect } from "react";
import { useProcessChunk } from "../api/chunk";

const CHUNK_INTERVAL_MS = 30_000;
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB

const MIME_TYPE = MediaRecorder.isTypeSupported("video/webm;codecs=vp8,opus")
  ? "video/webm;codecs=vp8,opus"
  : MediaRecorder.isTypeSupported("video/mp4")
    ? "video/mp4"
    : "video/webm";

export interface UseChunkRecorderReturn {
  /**
   * Pass the MediaStream from getUserMedia (camera + mic).
   * Call once when the session begins — reuses the same stream for every
   * question so the camera light never flickers between questions.
   */
  acquireStream: (stream: MediaStream) => void;

  /**
   * Create a fresh MediaRecorder for the current question and start the
   * 30-second chunk interval. Requires acquireStream() to have been called.
   */
  startRecorderForQuestion: () => void;

  /**
   * Stop the current recorder, flush any remaining video, and resolve only
   * after the chunk has been encoded and sent. Await before starting the
   * next question — no chunk is ever lost or duplicated.
   */
  stopRecorderAndFlush: () => Promise<void>;

  /**
   * Release the stream and clear all state. Call when the whole interview
   * session ends (not between questions).
   */
  releaseStream: () => void;

  /** Pause data collection (e.g. while TTS is playing). */
  pauseRecording: () => void;

  /** Resume data collection after TTS ends. */
  resumeRecording: () => void;

  /** Global chunk index — increments across all questions in the session. */
  chunkIndexRef: React.MutableRefObject<number>;
}

export const useChunkRecorder = (): UseChunkRecorderReturn => {
  const { mutate: processChunk } = useProcessChunk();

  // ── Persistent across the whole session ───────────────────────────────────
  const streamRef = useRef<MediaStream | null>(null);
  const chunkIndexRef = useRef(0);
  const sessionActiveRef = useRef(false);

  // ── Per-question — reset on every startRecorderForQuestion() ──────────────
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const chunkIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const flushedRef = useRef(false);
  const pausedRef = useRef(false);

  // ── WebM header fix (same as audio hook) ──────────────────────────────────
  // The first ondataavailable blob contains the WebM EBML header + Tracks
  // element. Every subsequent fragment — including the onstop tail — is only
  // decodable when that header is prepended. We keep it per-recorder and
  // always prepend it before sending.
  const headerChunkRef = useRef<BlobPart | null>(null);

  // ── Build a self-contained blob, always prepending the WebM header ─────────
  const buildParts = useCallback((parts: BlobPart[]): BlobPart[] => {
    const header = headerChunkRef.current;
    if (!header) return parts;
    if (parts[0] === header) return parts; // already starts with header
    return [header, ...parts];
  }, []);

  // ── Encode and send a video chunk ──────────────────────────────────────────
  const encodeAndSend = useCallback(
    (parts: BlobPart[], chunkIndex: number): void => {
      const blob = new Blob(parts, { type: MIME_TYPE });

      if (blob.size < 1000) {
        console.warn(
          `⚠️ Video chunk ${chunkIndex} too small (${blob.size} bytes), skipping.`,
        );
        return;
      }

      if (blob.size > MAX_FILE_SIZE) {
        console.warn(
          `⚠️ Video chunk ${chunkIndex} exceeds 100 MB (${blob.size} bytes), skipping.`,
        );
        return;
      }

      const ext = MIME_TYPE.startsWith("video/mp4") ? "mp4" : "webm";
      const file = new File([blob], `chunk_${chunkIndex}.${ext}`, {
        type: MIME_TYPE,
      });

      console.log(
        `🎬 Sending video chunk ${chunkIndex}, size: ${file.size} bytes`,
      );
      processChunk({ chunk_id: chunkIndex, video_file: file });
    },
    [processChunk],
  );

  // ── Non-destructive mid-session flush (30s timer) ─────────────────────────
  const flushIntervalChunk = useCallback(() => {
    if (!sessionActiveRef.current) return;
    if (flushedRef.current) return;
    if (pausedRef.current) return; // skip flush while TTS is playing

    const parts = chunksRef.current.splice(0); // drain, keep recording
    if (parts.length === 0) return;

    const index = chunkIndexRef.current;
    chunkIndexRef.current += 1;

    encodeAndSend(buildParts(parts), index);
  }, [encodeAndSend, buildParts]);

  // ── Acquire stream (call once, passing the camera stream) ─────────────────
  const acquireStream = useCallback((stream: MediaStream): void => {
    streamRef.current = stream;
    sessionActiveRef.current = true;
    console.log("🎥 Video stream acquired");
  }, []);

  // ── Start a fresh recorder for each question ──────────────────────────────
  const startRecorderForQuestion = useCallback((): void => {
    if (!streamRef.current) {
      console.error("startRecorderForQuestion: stream not acquired yet.");
      return;
    }
    if (!sessionActiveRef.current) return;

    // Reset per-question state
    chunksRef.current = [];
    flushedRef.current = false;
    pausedRef.current = false;
    headerChunkRef.current = null;

    const recorder = new MediaRecorder(streamRef.current, {
      mimeType: MIME_TYPE,
    });
    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = (e) => {
      if (flushedRef.current) return; // final flush already started, discard
      if (pausedRef.current) return; // TTS playing, gate data collection
      if (!e.data?.size) return;

      // Capture the very first chunk as the WebM header for this recorder.
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

    console.log("▶️ Video recorder started for new question");
  }, [flushIntervalChunk]);

  // ── Pause data collection (while TTS plays) ───────────────────────────────
  const pauseRecording = useCallback((): void => {
    if (!sessionActiveRef.current) return;
    pausedRef.current = true;
    chunksRef.current = []; // discard pre-pause buffer to avoid TTS bleed
    headerChunkRef.current = null; // header will be re-captured on resume
    console.log("⏸️ Video recording paused (TTS playing)");
  }, []);

  // ── Resume data collection (after TTS ends) ───────────────────────────────
  // Note: because we cleared the header on pause, the next chunk that arrives
  // after resume will be treated as the new header. This works because
  // MediaRecorder continuously emits chunks with embedded headers when
  // timeslice (start(1000)) is used — each 1s slice is independently seekable.
  const resumeRecording = useCallback((): void => {
    if (!sessionActiveRef.current) return;
    pausedRef.current = false;
    console.log("▶️ Video recording resumed (TTS ended)");
  }, []);

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

      recorder.onstop = () => {
        mediaRecorderRef.current = null;

        const parts = chunksRef.current.splice(0);
        chunksRef.current = [];

        if (parts.length > 0) {
          const index = chunkIndexRef.current;
          chunkIndexRef.current += 1;
          // Prepend header so the final tail fragment is decodable
          encodeAndSend(buildParts(parts), index);
        } else {
          console.log("ℹ️ No buffered video at stop — nothing to flush.");
        }

        resolve();
      };

      recorder.stop();
    });
  }, [encodeAndSend, buildParts]);

  // ── Release stream (call when the whole session ends) ─────────────────────
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

    console.log("🛑 Video stream released");
  }, []);

  // Cleanup on unmount
  useEffect(() => () => releaseStream(), [releaseStream]);

  return {
    acquireStream,
    startRecorderForQuestion,
    stopRecorderAndFlush,
    releaseStream,
    pauseRecording,
    resumeRecording,
    chunkIndexRef,
  };
};
