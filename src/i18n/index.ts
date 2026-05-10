import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";
import {
  supportedLngs,
  rtlLanguages,
  fallbackLng,
  isAppLanguage,
  type AppLanguage,
} from "./languages";

// 👉 Handle RTL automatically
const setDocumentDirection = (language: AppLanguage) => {
  const isRTL = rtlLanguages.includes(language);

  document.documentElement.dir = isRTL ? "rtl" : "ltr";
  document.documentElement.lang = language;
  document.body.classList.toggle("rtl", isRTL);
};

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs,
    fallbackLng,
    debug: import.meta.env.DEV,

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },

    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },

    react: {
      useSuspense: true,
    },
  });

// first load
const initialLang = i18n.resolvedLanguage;

setDocumentDirection(
  initialLang && isAppLanguage(initialLang) ? initialLang : fallbackLng,
);

// when language changes
i18n.on("languageChanged", (lng) => {
  if (isAppLanguage(lng)) {
    setDocumentDirection(lng);
  }
});

export default i18n;
