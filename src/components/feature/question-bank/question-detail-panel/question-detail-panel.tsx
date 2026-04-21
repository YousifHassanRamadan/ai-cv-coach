import { DifficultyBadge } from "../difficulty-badge";
import { KeywordTag } from "../keyword-tag";
import { PointsBadge } from "../points-badge";
import type { QuestionDetailPanalProps } from "./question-detail-panel.types";

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-xl bg-bg-subcard border border-border-light p-4">
    <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-3">
      {title}
    </h3>
    {children}
  </div>
);

export const QuestionDetailPanel = ({ question }: QuestionDetailPanalProps) => (
  <div className="flex flex-col gap-4 h-full overflow-y-auto pr-1">
    {/* Header */}
    <div className="rounded-xl bg-bg-card border border-border-light p-5">
      <div className="flex items-center justify-between mb-3">
        <DifficultyBadge difficulty={question.difficulty} />
        <PointsBadge points={question.points} />
      </div>
      <p className="text-text-primary text-base font-medium leading-relaxed">
        {question.text}
      </p>
    </div>

    {/* Track & Category */}
    <Section title="Track & Category">
      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-text-muted bg-bg-subcard px-3 py-1 rounded-full border border-border-light">
          🗂 {question.track.name}
        </span>
        <span className="text-xs text-text-muted bg-bg-subcard px-3 py-1 rounded-full border border-border-light">
          📁 {question.category}
        </span>
      </div>
    </Section>

    {/* Model Answer */}
    <Section title="Model Answer">
      <p className="text-sm text-text-muted leading-relaxed">
        {question.modelAnswer.definition}
      </p>
    </Section>

    {/* Answer Keywords */}
    {question.modelAnswer.keywords.length > 0 && (
      <Section title="Answer Keywords">
        <div className="flex flex-wrap gap-2">
          {question.modelAnswer.keywords.map((kw) => (
            <KeywordTag key={kw} keyword={kw} />
          ))}
        </div>
      </Section>
    )}

    {/* Question Keywords */}
    {question.keywords.length > 0 && (
      <Section title="Question Keywords">
        <div className="flex flex-wrap gap-2">
          {question.keywords.map((kw) => (
            <KeywordTag key={kw} keyword={kw} />
          ))}
        </div>
      </Section>
    )}

    {/* Created At */}
    <p className="text-xs text-[#6b7280] text-right px-1">
      Added{" "}
      {new Date(question.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}
    </p>
  </div>
);
