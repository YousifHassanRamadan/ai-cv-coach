import React from "react";
import type { StatCardProps } from "./state-card.types";

const StatCard: React.FC<StatCardProps> = ({ icon, value, label }) => {
  return (
    <div className="bg-bg-card border border-border-card rounded-xl p-3 sm:p-4">
      <div className="flex items-center gap-2 mb-1 sm:mb-2">
        {icon}
        <span className="text-xl sm:text-2xl font-bold text-white">
          {value}
        </span>
      </div>
      <p className="text-[10px] sm:text-xs text-gray-400">{label}</p>
    </div>
  );
};

export default StatCard;
