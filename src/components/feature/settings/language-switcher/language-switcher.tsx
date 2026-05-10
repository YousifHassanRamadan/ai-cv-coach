import { useTranslation } from "react-i18next";
import { useLanguage } from "../../../../hooks/useLanguage";

export default function LanguageSwitcher() {
  const { currentLanguage, changeLanguage } = useLanguage();
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between p-5 gap-2 bg-bg-card p-2 rounded-xl border border-border-light">
      <span className="text-text-secondary text-sm">
        {t("languageSwitcher.label")}
      </span>

      <div>
        <button
          onClick={() => changeLanguage("en")}
          className={`px-3 py-1 rounded-lg text-sm transition
          ${
            currentLanguage === "en"
              ? "bg-bg-active text-white"
              : "text-text-secondary hover:text-white"
          }`}
        >
          EN
        </button>

        <button
          onClick={() => changeLanguage("ar")}
          className={`px-3 py-1 rounded-lg text-sm transition
          ${
            currentLanguage === "ar"
              ? "bg-bg-active text-white"
              : "text-text-secondary hover:text-white"
          }`}
        >
          AR
        </button>
      </div>
    </div>
  );
}
