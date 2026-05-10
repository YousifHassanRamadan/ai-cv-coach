// JobDescriptionInput.tsx
import React from "react";
import type { JobDescriptionInputProps } from "./job-description-input.types";
import { useTranslation } from "react-i18next";

const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({
  isVisible,
  value,
  onToggle,
  onChange,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <button
        onClick={onToggle}
        className="text-xs text-text-active hover:text-text-active/40 transition-colors flex items-center gap-1"
      >
        <span>
          {isVisible ? `− ${t("hide")}` : `+ ${t("addJobDescription")}`} (
          {t("optional")})
        </span>
      </button>
      {isVisible && (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t("jobDescriptionPlaceholder")}
          rows={3}
          className="mt-2 w-full bg-bg-secondary border border-border-light rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted resize-none focus:outline-none focus:border-text-active/50 transition-colors"
        />
      )}
    </div>
  );
};

export default JobDescriptionInput;
