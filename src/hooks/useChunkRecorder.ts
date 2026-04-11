import { useRef, useCallback, useEffect } from "react";
import { useProcessChunk } from "../api/chunk";

const CHUNK_INTERVAL_MS = 30_000; // send a chunk every 30s

export const useChunkRecorder = () => {
  const { mutate: processChunk } = useProcessChunk();

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const chunkIndexRef = useRef(0);
  const chunkIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const stoppedRef = useRef(false); // ← guard: blocks any flush after stop

  // ── Flush current chunks into a File and send ──────────────────────────────
  const flushChunk = useCallback(() => {
    // Hard gate — never send after session has ended
    if (stoppedRef.current) return;
    if (chunksRef.current.length === 0) return;

    const blob = new Blob(chunksRef.current, { type: "video/mp4" });
    const file = new File([blob], `chunk_${chunkIndexRef.current}.mp4`, {
      type: "video/mp4",
    });

    const MAX_FILE_SIZE = 100 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      console.warn(`Chunk ${chunkIndexRef.current} exceeded 100MB, skipping.`);
      chunksRef.current = [];
      chunkIndexRef.current += 1;
      return;
    }

    processChunk({
      chunk_id: chunkIndexRef.current,
      video_file: file,
    });

    chunksRef.current = [];
    chunkIndexRef.current += 1;
  }, [processChunk]);

  // ── Start recording ────────────────────────────────────────────────────────
  const startRecording = useCallback(
    async (existingStream?: MediaStream) => {
      // Reset the stopped flag on every fresh start
      stoppedRef.current = false;

      try {
        const stream =
          existingStream ??
          (await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          }));

        streamRef.current = stream;

        const recorder = new MediaRecorder(stream, {
          mimeType: "video/webm;codecs=vp8,opus",
        });
        mediaRecorderRef.current = recorder;
        chunksRef.current = [];
        chunkIndexRef.current = 0;

        recorder.ondataavailable = (e) => {
          // Drop incoming data immediately if already stopped
          if (stoppedRef.current) return;
          if (e.data && e.data.size > 0) {
            chunksRef.current.push(e.data);
          }
        };

        recorder.start(1000);

        chunkIntervalRef.current = setInterval(() => {
          if (stoppedRef.current) return; // interval fired just before clear — ignore
          if (recorder.state === "recording") {
            recorder.requestData();
            setTimeout(flushChunk, 100);
          }
        }, CHUNK_INTERVAL_MS);
      } catch (error) {
        console.error("Failed to start chunk recorder:", error);
      }
    },
    [flushChunk],
  );

  // ── Stop recording & fully release all media tracks ───────────────────────
  const stopRecording = useCallback(() => {
    // Raise the flag first — this immediately silences flushChunk and ondataavailable
    stoppedRef.current = true;

    if (chunkIntervalRef.current) {
      clearInterval(chunkIntervalRef.current);
      chunkIntervalRef.current = null;
    }

    // Discard any buffered data so the onstop flush sends nothing
    chunksRef.current = [];

    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== "inactive") {
      recorder.onstop = () => {
        // stoppedRef.current is true here, so flushChunk() is a no-op
        flushChunk();
      };
      recorder.stop();
    }

    mediaRecorderRef.current = null;

    // Stop every track — this is what removes the browser recording indicator
    streamRef.current?.getTracks().forEach((track) => {
      track.stop();
      track.enabled = false;
    });
    streamRef.current = null;
  }, [flushChunk]);

  // ── Cleanup on unmount ─────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      stopRecording();
    };
  }, [stopRecording]);

  return { startRecording, stopRecording };
};
