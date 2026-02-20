import CircularProgress from "../../../common/circular-progress/circular-progress";
import type { BreakdownScoreCardProps } from "./score.types";

const BreakdownScoreCard = ({
  title,
  subtitle,
  percentage,
  color,
  showHeader = false,
}: BreakdownScoreCardProps) => {
  return (
    <div className="bg-[#1a1a24] rounded-lg p-6 border border-gray-800">
      <div
        className={`text-sm text-gray-400 mb-4 uppercase tracking-wider ${!showHeader ? "opacity-0" : ""}`}
      >
        {showHeader ? "Score Breakdown" : "Score"}
      </div>
      <div className="flex items-center justify-center py-6">
        <CircularProgress percentage={percentage} color={color} size="medium" />
      </div>
      <div className="text-center">
        <div className="text-sm font-semibold mb-1">{title}</div>
        <div className="text-xs text-gray-400">{subtitle}</div>
      </div>
    </div>
  );
};

export default BreakdownScoreCard;
