import React from "react";
import type { TAchievement } from "./achievements.types";

const Achievements: React.FC<TAchievement> = ({
  label,
  icon: Icon,
  active,
}) => {
  return (
    <div
      className={`rounded-xl p-3 flex flex-col items-center justify-center text-center transition-all ${
        active
          ? "bg-gradient-to-br from-blue-500/10 to-purple-600/10"
          : "bg-[#0F0F17] border border-gray-800 opacity-50"
      }`}
      style={{ minHeight: 90 }}
    >
      <Icon
        size={22}
        className={active ? "text-text-active mb-1" : "text-gray-600 mb-1"}
      />

      <p
        className={`text-xs font-medium ${
          active ? "text-gray-300" : "text-gray-500"
        }`}
      >
        {label}
      </p>
    </div>
  );
};

export default Achievements;
