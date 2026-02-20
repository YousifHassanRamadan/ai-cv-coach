import React from "react";
import type { PrivacyToggleProps } from "./privacy-toggle.types";

const PrivacyToggle: React.FC<PrivacyToggleProps> = ({
  icon,
  title,
  description,
  enabled,
  onToggle,
  variant = "default",
}) => {
  const isDisabled = variant === "disabled";

  // Background and border colors based on state
  const bgColor = isDisabled
    ? "bg-slate-900/30"
    : enabled
      ? "bg-purple-500/10"
      : "bg-slate-900/30";

  const borderColor = isDisabled
    ? "border-slate-700/20"
    : enabled
      ? "border-purple-500/30"
      : "border-slate-700/20";

  // Icon container colors
  const iconBgColor = isDisabled
    ? "bg-slate-700/30"
    : enabled
      ? "bg-purple-500/20"
      : "bg-slate-700/30";

  return (
    <div
      className={`${bgColor} border ${borderColor} rounded-lg p-4 flex items-center justify-between transition-all`}
    >
      <div className="flex items-center gap-3.5">
        <div
          className={`w-10 h-10 ${iconBgColor} rounded-lg flex items-center justify-center transition-colors`}
        >
          {icon}
        </div>
        <div>
          <div className="font-medium text-[15px] text-white">{title}</div>
          <div className="text-[13px] text-gray-400 mt-0.5">{description}</div>
        </div>
      </div>
      <button
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? "bg-purple-600" : "bg-slate-700"
        }`}
        aria-label={`Toggle ${title}`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${
            enabled ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
};

export default PrivacyToggle;
