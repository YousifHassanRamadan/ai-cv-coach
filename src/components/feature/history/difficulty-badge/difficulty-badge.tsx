import React from "react";
import type {
  Difficulty,
  DifficultyBadgeProps,
} from "./difficulty-badge.types";

const colorMap: Record<Difficulty, string> = {
  Easy: "bg-green-500/20 text-green-400 border-green-500/50",
  Medium: "bg-cyan-500/20 text-cyan-400 border-cyan-500/50",
  Hard: "bg-orange-500/20 text-orange-400 border-orange-500/50",
  Expert: "bg-red-500/20 text-red-400 border-red-500/50",
};

const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({ difficulty }) => {
  return (
    <span
      className={`text-[10px] sm:text-xs px-2 py-0.5 rounded border ${colorMap[difficulty]} w-fit`}
    >
      {difficulty}
    </span>
  );
};

export default DifficultyBadge;
