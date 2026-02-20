import React from "react";
import type { ScoreDisplayProps } from "./score-display.types";

const getScoreColor = (score: number): string => {
  if (score >= 90) return "text-green-400";
  if (score >= 80) return "text-cyan-400";
  if (score >= 70) return "text-orange-400";
  return "text-red-400";
};

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  score,
  className = "",
}) => {
  return (
    <span className={`font-bold ${getScoreColor(score)} ${className}`}>
      {score}%
    </span>
  );
};

export { getScoreColor };
export default ScoreDisplay;
