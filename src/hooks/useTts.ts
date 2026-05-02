import { useCallback, useEffect, useState } from "react";

type Lang = "ar" | "en";
type Gender = "male" | "female";

export const useTTS = () => {
  const synth = window.speechSynthesis;

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const loadVoices = () => {
      const v = synth.getVoices();
      setVoices(v);
    };

    loadVoices();

    synth.onvoiceschanged = loadVoices;
  }, [synth]);

  const getVoices = useCallback((lang: Lang, gender: Gender) => {
    const filtered = voices.filter((v) =>
      lang === "ar" ? v.lang.includes("ar") : v.lang.includes("en"),
    );

    const match = filtered.find((v) =>
      gender === "female"
        ? /female|zira|susan|google uk english female/i.test(v.name)
        : /male|david|mark|google uk english male/i.test(v.name),
    );

    return match || filtered[0];
  }, []);

  const speak = useCallback(
    (text: string, lang: "ar" | "en", gender: Gender) => {
      if (!text) return;

      if (synth.speaking) {
        synth.cancel();
      }

      const utterance = new SpeechSynthesisUtterance(text);

      utterance.lang = lang === "ar" ? "ar-EG" : "en-US";

      const voice = getVoices(lang, gender);

      if (voice) utterance.voice = voice;

      utterance.rate = 1;

      utterance.pitch = 1;

      synth.speak(utterance);
    },
    [synth, voices],
  );

  const stop = useCallback(() => {
    synth.cancel();
  }, [synth]);

  return { speak, stop };
};
