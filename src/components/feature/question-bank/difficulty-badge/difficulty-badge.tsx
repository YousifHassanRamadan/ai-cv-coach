import type { QuestionDifficulty } from "../../../../api/questions";
import type { QuestionBadgeProps } from "./difficulty-badge.types";

const config: Record<QuestionDifficulty, { label: string; className: string }> =
  {
    easy: {
      label: "Easy",
      className: "bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20",
    },
    medium: {
      label: "Medium",
      className: "bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/20",
    },
    hard: {
      label: "Hard",
      className: "bg-[#ef4444]/10 text-[#ef4444] border border-[#ef4444]/20",
    },
  };

export const DifficultyBadge = ({ difficulty }: QuestionBadgeProps) => {
  const { label, className } = config[difficulty];
  return (
    <span
      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${className}`}
    >
      {label}
    </span>
  );
};
