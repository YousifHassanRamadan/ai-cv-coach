import { useRef, useCallback, useEffect } from "react";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import type { InterviewQuestion } from "../api/interviews";

// ── Voice IDs ─────────────────────────────────────────────────────────────────
const VOICES = {
  female_en: "EXAVITQu4vr4xnSDxMaL", // Bella     – English female
  female_ar: "EXAVITQu4vr4xnSDxMaL", // Charlotte – Arabic-capable female
} as const;

type VoiceKey = keyof typeof VOICES;

// Module-level URL cache — survives re-renders and component remounts.
// key: `${voiceId}::${text}` → object URL string
const audioCache = new Map<string, string>();

export interface UseElevenLabsTTSReturn {
  preloadQuestion: (
    question: InterviewQuestion,
    index: number,
  ) => Promise<void>;
  speakQuestion: (question: InterviewQuestion, index: number) => Promise<void>;
  stopSpeaking: () => void;
  isPlayingRef: React.MutableRefObject<boolean>;
}

export const useElevenLabsTTS = (): UseElevenLabsTTSReturn => {
  const clientRef = useRef<ElevenLabsClient | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef(false);

  const getClient = useCallback((): ElevenLabsClient => {
    if (!clientRef.current) {
      clientRef.current = new ElevenLabsClient({
        apiKey: import.meta.env.VITE_ELEVENLABS_API_KEY || "",
      });
    }
    return clientRef.current;
  }, []);

  const resolveVoiceAndText = useCallback(
    (
      question: InterviewQuestion,
      index: number,
    ): { voiceId: string; text: string } => {
      const hasArabic = Boolean(
        question.hasTranslation && localStorage.getItem("i18nextLng") === "ar",
      );
      const text = hasArabic ? (question.text_ar as string) : question.text;
      const lang = hasArabic ? "ar" : "en";
      const key: VoiceKey = `female_${lang}` as VoiceKey;
      return {
        voiceId: VOICES[key],
        text,
      };
    },
    [],
  );

  // ── Fetch audio and store in cache ────────────────────────────────────────
  const fetchAndCache = useCallback(
    async (question: InterviewQuestion, index: number): Promise<string> => {
      const { voiceId, text } = resolveVoiceAndText(question, index);
      const cacheKey = `${voiceId}::${text}`;

      const cached = audioCache.get(cacheKey);
      if (cached) return cached;

      // ✅ Fix: convert returns a ReadableStream which is NOT async-iterable in
      // the browser TS lib. Wrap it in a Response and read as ArrayBuffer instead.
      const stream = await getClient().textToSpeech.convert(voiceId, {
        text,
        modelId: "eleven_multilingual_v2",
        outputFormat: "mp3_44100_128",
      });

      const arrayBuffer = await new Response(
        stream as ReadableStream,
      ).arrayBuffer();
      const blob = new Blob([arrayBuffer], { type: "audio/mpeg" });
      const objectUrl = URL.createObjectURL(blob);
      audioCache.set(cacheKey, objectUrl);
      return objectUrl;
    },
    [getClient, resolveVoiceAndText],
  );

  const preloadQuestion = useCallback(
    async (question: InterviewQuestion, index: number): Promise<void> => {
      try {
        await fetchAndCache(question, index);
        console.log(`📦 Preloaded TTS for question ${index}`);
      } catch (err) {
        console.warn(`⚠️ Preload failed for question ${index}:`, err);
      }
    },
    [fetchAndCache],
  );

  const stopSpeaking = useCallback((): void => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.onended = null;
      audioRef.current.onerror = null;
      audioRef.current.src = "";
      audioRef.current = null;
    }
    isPlayingRef.current = false;
  }, []);

  const speakQuestion = useCallback(
    (question: InterviewQuestion, index: number): Promise<void> =>
      new Promise(async (resolve, reject) => {
        stopSpeaking();

        try {
          const objectUrl = await fetchAndCache(question, index);

          const audio = new Audio(objectUrl);
          audioRef.current = audio;
          isPlayingRef.current = true;

          audio.onended = () => {
            isPlayingRef.current = false;
            audioRef.current = null;
            resolve();
          };

          audio.onerror = (err) => {
            isPlayingRef.current = false;
            audioRef.current = null;
            reject(new Error(`TTS playback failed: ${String(err)}`));
          };

          await audio.play();
        } catch (err) {
          isPlayingRef.current = false;
          reject(err);
        }
      }),
    [fetchAndCache, stopSpeaking],
  );

  useEffect(
    () => () => {
      stopSpeaking();
    },
    [stopSpeaking],
  );

  return { preloadQuestion, speakQuestion, stopSpeaking, isPlayingRef };
};
