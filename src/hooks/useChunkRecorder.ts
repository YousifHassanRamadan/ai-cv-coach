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
  acquireStream: (stream: MediaStream) => void;
  /** @param questionId - The ID of the question being recorded. */
  startRecorderForQuestion: (questionId: string) => void;
  stopRecorderAndFlush: () => Promise<void>;
  releaseStream: () => void;
  pauseRecording: () => void;
  resumeRecording: () => void;
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
  // ID of the question currently being recorded.
  const questionIdRef = useRef<string>("");

  // ── WebM header fix ───────────────────────────────────────────────────────
  const headerChunkRef = useRef<BlobPart | null>(null);

  const buildParts = useCallback((parts: BlobPart[]): BlobPart[] => {
    const header = headerChunkRef.current;
    if (!header) return parts;
    if (parts[0] === header) return parts;
    return [header, ...parts];
  }, []);

  // ── Encode and send a video chunk ─────────────────────────────────────────
  const encodeAndSend = useCallback(
    (parts: BlobPart[], chunkIndex: number, questionId: string): void => {
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

      // console.log(
      //   `🎬 Sending video chunk ${chunkIndex}, size: ${file.size} bytes, question: ${questionId}`,
      // );
      processChunk({
        chunk_id: chunkIndex,
        video_file: file,
        question_id: questionId,
      });
    },
    [processChunk],
  );

  // ── Non-destructive mid-session flush (30s timer) ─────────────────────────
  const flushIntervalChunk = useCallback(() => {
    if (!sessionActiveRef.current) return;
    if (flushedRef.current) return;
    if (pausedRef.current) return;

    const parts = chunksRef.current.splice(0);
    if (parts.length === 0) return;

    const index = chunkIndexRef.current;
    chunkIndexRef.current += 1;

    encodeAndSend(buildParts(parts), index, questionIdRef.current); // ✅ pass questionId
  }, [encodeAndSend, buildParts]);

  // ── Acquire stream ────────────────────────────────────────────────────────
  const acquireStream = useCallback((stream: MediaStream): void => {
    streamRef.current = stream;
    sessionActiveRef.current = true;
    // console.log("🎥 Video stream acquired");
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
      pausedRef.current = false;
      headerChunkRef.current = null;
      questionIdRef.current = questionId; // ✅ store question ID

      const recorder = new MediaRecorder(streamRef.current, {
        mimeType: MIME_TYPE,
      });
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (flushedRef.current) return;
        if (pausedRef.current) return;
        if (!e.data?.size) return;

        if (headerChunkRef.current === null) {
          headerChunkRef.current = e.data;
        }

        chunksRef.current.push(e.data);
      };

      recorder.start(1000);

      chunkIntervalRef.current = setInterval(
        flushIntervalChunk,
        CHUNK_INTERVAL_MS,
      );

      // console.log("▶️ Video recorder started for new question");
    },
    [flushIntervalChunk],
  );

  // ── Pause / resume ────────────────────────────────────────────────────────
  const pauseRecording = useCallback((): void => {
    if (!sessionActiveRef.current) return;
    pausedRef.current = true;
    chunksRef.current = [];
    headerChunkRef.current = null;
    // console.log("⏸️ Video recording paused (TTS playing)");
  }, []);

  const resumeRecording = useCallback((): void => {
    if (!sessionActiveRef.current) return;
    pausedRef.current = false;
    // console.log("▶️ Video recording resumed (TTS ended)");
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
          encodeAndSend(buildParts(parts), index, questionIdRef.current); // ✅ pass questionId
        } else {
          // console.log("ℹ️ No buffered video at stop — nothing to flush.");
        }

        resolve();
      };

      recorder.stop();
    });
  }, [encodeAndSend, buildParts]);

  // ── Release stream ────────────────────────────────────────────────────────
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

    // console.log("🛑 Video stream released");
  }, []);

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
