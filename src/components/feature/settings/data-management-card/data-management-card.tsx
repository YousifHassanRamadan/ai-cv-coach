import React from "react";
import type { DataManagementCardProps } from "./data-management-card.types";

const DataManagementCard: React.FC<DataManagementCardProps> = ({
  icon,
  title,
  description,
  buttonText,
  buttonIcon,
  onClick,
  variant = "primary",
}) => {
  const iconBgColor =
    variant === "primary" ? "bg-blue-500/20" : "bg-amber-500/20";

  return (
    <div className="bg-[#14151c] border border-slate-700/30 rounded-lg p-3.5">
      <div className="flex items-start gap-2.5">
        <div
          className={`w-8 h-8 ${iconBgColor} rounded-lg flex items-center justify-center flex-shrink-0`}
        >
          {icon}
        </div>
        <div className="flex-1">
          <div className="font-medium text-sm text-white mb-0.5">{title}</div>
          <div className="text-xs text-gray-400 mb-2.5">{description}</div>
          <button
            onClick={onClick}
            className="bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/50 text-purple-300 text-xs font-medium px-2.5 py-1.5 rounded-md transition-colors flex items-center gap-1.5"
          >
            {buttonIcon}
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataManagementCard;
