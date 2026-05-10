import { useTranslation } from "react-i18next";
import type { AppLanguage } from "../i18n/languages";

export const useLanguage = () => {
  // useTranslation subscribes the component to re-render on language change.
  // Reading i18n directly (without this hook) gives a stale value.
  const { i18n } = useTranslation();

  const changeLanguage = (lng: AppLanguage) => {
    console.log("changing language to:", lng);
    i18n.changeLanguage(lng);
  };

  return {
    currentLanguage: i18n.resolvedLanguage as AppLanguage,
    changeLanguage,
  };
};
