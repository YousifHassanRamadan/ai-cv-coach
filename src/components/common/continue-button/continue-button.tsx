import { ChevronRight } from "lucide-react";
import React from "react";
import type { ContinueButtonProps } from "./continue-button.types";
import { useTranslation } from "react-i18next";

const ContinueButton: React.FC<ContinueButtonProps> = ({
  onClick,
  disabled,
}) => {
  const { t } = useTranslation();
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="group bg-gradient-to-r from-bg-active to-bg-active hover:from-bg-active/30 hover:to-bg-active/30  disabled:text-white disabled:cursor-not-allowed px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-1000 shadow-lg order-1 sm:order-2 text-sm sm:text-base disabled:text-white"
    >
      {t("continue-btn")}
      <ChevronRight
        size={18}
        className="group-hover:translate-x-1 transition-transform duration-300 sm:w-5 sm:h-5"
      />
    </button>
  );
};

export default ContinueButton;
