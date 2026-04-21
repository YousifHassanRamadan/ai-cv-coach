import { DifficultyBadge } from "../difficulty-badge";
import { KeywordTag } from "../keyword-tag";
import { PointsBadge } from "../points-badge";
import type { QuestionCardProps } from "./question-card.types";

export const QuestionCard = ({
  question,
  onClick,
  isSelected,
}: QuestionCardProps) => (
  <div
    onClick={() => onClick?.(question.id)}
    className={`
      group relative rounded-xl border p-4 cursor-pointer transition-all duration-200
       hover:bg-bg-active/30
      ${
        isSelected
          ? "border-border-active bg-bg-active  "
          : "border-border-light hover:border-border-active bg-bg-subcard"
      }
    `}
  >
    {/* Top row */}
    <div className="flex items-start justify-between gap-3 mb-3">
      <p className="text-sm text-text-primary font-medium leading-relaxed line-clamp-2 flex-1">
        {question.text}
      </p>
      <DifficultyBadge difficulty={question.difficulty} />
    </div>

    {/* Meta row */}
    <div className="flex items-center gap-3 mb-3">
      <span className="text-xs text-text-muted bg-bg-card px-2 py-0.5 rounded-md border border-border-light">
        {question.category}
      </span>
      <PointsBadge points={question.points} />
    </div>

    {/* Keywords */}
    {question.keywords.length > 0 && (
      <div className="flex flex-wrap gap-1.5">
        {question.keywords.slice(0, 4).map((kw) => (
          <KeywordTag key={kw} keyword={kw} />
        ))}
        {question.keywords.length > 4 && (
          <span className="text-xs text-text-muted">
            +{question.keywords.length - 4}
          </span>
        )}
      </div>
    )}

    {/* Selected indicator */}
    {isSelected && (
      <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-bg-card shadow-[0_0_6px_#7c3bed]" />
    )}
  </div>
);
