import React from "react";
import CircularProgress from "../circular-progress/circular-progress";
import type { TStatCardProps } from "./status-card.types";

const StatusCard: React.FC<TStatCardProps> = ({
  label,
  value,
  icon,
  iconBg,
  footer,
  progress,
}) => {
  return (
    <div
      className="bg-bg-card border border-border-card hover:border-border-active/50 transition-all duration-300 rounded-2xl p-5 flex flex-col justify-between"
      style={{ minHeight: 140 }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-500 text-xs font-semibold tracking-widest">
            {label}
          </p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        {progress ? (
          <CircularProgress
            percentage={progress.percentage}
            color={progress.color}
            size={52}
            stroke={5}
          />
        ) : (
          <div
            className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center`}
          >
            {icon}
          </div>
        )}
      </div>
      <p className={`text-sm mt-3 ${footer.color}`}>
        {footer.icon === "↗" ? "↗ " : footer.icon === "◎" ? "◎ " : ""}
        {footer.text}
      </p>
    </div>
  );
};

export default StatusCard;
