import { useRef, useCallback, useEffect } from "react";
import { useProcessAudioChunk } from "../api/chunk";
import audioBufferToWav from "audiobuffer-to-wav";

const CHUNK_INTERVAL_MS = 30_000;

export const useAudioChunkRecorder = () => {
  const { mutate: processAudioChunk } = useProcessAudioChunk();

  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const headerChunksRef = useRef<BlobPart[]>([]);
  const chunkIndexRef = useRef(0);
  const chunkIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mimeTypeRef = useRef<string>("audio/webm");
  const isFirstFlushRef = useRef(true);
  const stoppedRef = useRef(false); // ← guard: blocks any flush after stop

  // ── Encode collected chunks to WAV and send ────────────────────────────────
  const flushChunk = useCallback(async () => {
    // Hard gate — never send after session has ended
    if (stoppedRef.current) return;
    if (chunksRef.current.length === 0) return;

    const currentIndex = chunkIndexRef.current;

    const blobParts = isFirstFlushRef.current
      ? [...chunksRef.current]
      : [...headerChunksRef.current, ...chunksRef.current];

    if (isFirstFlushRef.current) {
      headerChunksRef.current = chunksRef.current.slice(0, 3);
      isFirstFlushRef.current = false;
    }

    chunksRef.current = [];
    chunkIndexRef.current += 1;

    const blob = new Blob(blobParts, { type: mimeTypeRef.current });

    if (blob.size < 1000) {
      console.warn(
        `Chunk ${currentIndex} too small (${blob.size} bytes), skipping.`,
      );
      return;
    }

    try {
      console.log(
        `🔄 Encoding chunk ${currentIndex} to WAV... (${blob.size} bytes)`,
      );
      const arrayBuffer = await blob.arrayBuffer();
      const audioCtx = new AudioContext();
      const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
      await audioCtx.close();

      // Final async guard: stop may have been called while we were awaiting
      if (stoppedRef.current) {
        console.log(
          `⛔ Chunk ${currentIndex} discarded — session already ended.`,
        );
        return;
      }

      const wavArrayBuffer = audioBufferToWav(audioBuffer);
      const file = new File([wavArrayBuffer], `chunk_${currentIndex}.wav`, {
        type: "audio/wav",
      });

      console.log(
        `🎙️ Sending chunk ${currentIndex} as WAV, size: ${file.size} bytes`,
      );
      processAudioChunk({ chunk_id: currentIndex, audio_file: file });
    } catch (err) {
      console.error(`❌ Failed to encode chunk ${currentIndex}:`, err);
    }
  }, [processAudioChunk]);

  // ── Start recording ────────────────────────────────────────────────────────
  const startAudioRecording = useCallback(async () => {
    // Reset the stopped flag on every fresh start
    stoppedRef.current = false;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      streamRef.current = stream;
      chunksRef.current = [];
      headerChunksRef.current = [];
      chunkIndexRef.current = 0;
      isFirstFlushRef.current = true;

      mimeTypeRef.current = MediaRecorder.isTypeSupported(
        "audio/webm;codecs=opus",
      )
        ? "audio/webm;codecs=opus"
        : MediaRecorder.isTypeSupported("audio/mp4")
          ? "audio/mp4"
          : "audio/webm";

      const recorder = new MediaRecorder(stream, {
        mimeType: mimeTypeRef.current,
      });
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        // Drop incoming data immediately if already stopped
        if (stoppedRef.current) return;
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.start(1000);

      chunkIntervalRef.current = setInterval(() => {
        if (stoppedRef.current) return; // interval fired just before clear — ignore
        flushChunk();
      }, CHUNK_INTERVAL_MS);
    } catch (error) {
      console.error("Failed to start audio chunk recorder:", error);
    }
  }, [flushChunk]);

  // ── Stop recording & fully release all media tracks ───────────────────────
  const stopAudioRecording = useCallback(() => {
    // Raise the flag first — this immediately silences flushChunk and ondataavailable
    stoppedRef.current = true;

    if (chunkIntervalRef.current) {
      clearInterval(chunkIntervalRef.current);
      chunkIntervalRef.current = null;
    }

    // Discard buffered data so the onstop flush sends nothing
    chunksRef.current = [];

    // Stop every track — this is what removes the browser recording indicator
    streamRef.current?.getTracks().forEach((track) => {
      track.stop();
      track.enabled = false;
    });
    streamRef.current = null;

    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== "inactive") {
      recorder.onstop = () => {
        // stoppedRef.current is true here, so flushChunk() is a no-op
        flushChunk();
      };
      recorder.stop();
    }

    mediaRecorderRef.current = null;
  }, [flushChunk]);

  // ── Cleanup on unmount ─────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      stopAudioRecording();
    };
  }, [stopAudioRecording]);

  return { startAudioRecording, stopAudioRecording };
};
