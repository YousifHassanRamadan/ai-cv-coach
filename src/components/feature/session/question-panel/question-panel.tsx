import React, { useEffect } from "react";
import { BarChart2, Hash, MessageSquare } from "lucide-react";
import type { QuestionPanelProps } from "./question-panel.types";
import type { ChunkProcessResponse } from "../../../../api/chunk";
import { useQuery } from "@tanstack/react-query";
import HintsPanel from "../hints-panel/hints-panel";
import i18n from "i18next";

const difficultyConfig: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  easy: {
    label: "Easy",
    color: "text-green-400",
    bg: "bg-green-400/10 border-green-400/20",
  },
  medium: {
    label: "Medium",
    color: "text-amber-400",
    bg: "bg-amber-400/10 border-amber-400/20",
  },
  hard: {
    label: "Hard",
    color: "text-red-400",
    bg: "bg-red-400/10 border-red-400/20",
  },
};

const getDifficulty = (d: string) =>
  difficultyConfig[d?.toLowerCase()] ?? {
    label: d,
    color: "text-gray-400",
    bg: "bg-gray-400/10 border-gray-400/20",
  };

const QuestionPanel: React.FC<QuestionPanelProps> = ({
  questionText,
  currentIndex,
  totalQuestions,
}) => {
  const question = questionText[currentIndex];
  const diff = question ? getDifficulty(question.difficulty) : null;

  const [isArabic, setIsArabic] = React.useState(false);

  // ── NEW: detect if the current question has an Arabic version ─────────────
  const hasArabic = i18n.language === "ar";

  const sessionId = localStorage.getItem("session-id");

  const { data: chunkResponse } = useQuery<ChunkProcessResponse>({
    queryKey: ["chunk-response", sessionId],
    enabled: false,
    queryFn: () => Promise.resolve(null as unknown as ChunkProcessResponse),
  });

  useEffect(() => {
    if (i18n.language === "ar") {
      setIsArabic(true);
    } else {
      setIsArabic(false);
    }
  }, [i18n.language]);

  // console.log("question", question);

  return (
    <div className="w-full sm:w-[340px] lg:w-[420px] bg-bg-primary border-t sm:border-t-0 sm:border-l border-border-light flex flex-col shrink-0 overflow-y-auto sm:overflow-hidden">
      <div className="p-3 sm:p-6 flex-1 flex flex-col sm:overflow-y-auto">
        {/* Label */}
        <div className="flex items-center gap-2 text-text-muted mb-2 sm:mb-4">
          <MessageSquare className="w-4 h-4 shrink-0" />
          <span className="uppercase tracking-wider text-[10px] sm:text-xs font-semibold">
            Current Question
          </span>
        </div>

        {/* English question text */}

        {/* ── NEW: Arabic question text (shown only when text_ar exists) ─── */}

        <h2 className="text-sm sm:text-xl font-normal leading-relaxed mb-2 sm:mb-3">
          Q{currentIndex + 1}. {""}
          {question?.text}
        </h2>

        {/* Difficulty badge */}
        {diff && (
          <span
            className={`self-start inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium mb-3 sm:mb-6 ${diff.bg} ${diff.color}`}
          >
            <BarChart2 className="w-3 h-3" />
            {diff.label}
          </span>
        )}

        {/* Keywords */}
        {question?.keywords?.length > 0 && (
          <div className="mb-3 sm:mb-8">
            <div className="flex items-center gap-1.5 text-text-muted text-[10px] uppercase tracking-wider font-semibold mb-2">
              <Hash className="w-3 h-3" />
              Keywords
            </div>
            <div className="flex flex-wrap gap-1.5">
              {question.keywords.map((kw) => (
                <span
                  key={kw}
                  className="text-[11px] px-2 py-0.5 rounded-md bg-bg-subcard text-text-muted border border-border-light/50"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Progress segments */}
        <div className="mb-3 sm:mb-8">
          <div className="flex gap-1.5">
            {Array.from({ length: totalQuestions }).map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  index < currentIndex
                    ? "bg-green-400"
                    : index === currentIndex
                      ? "bg-bg-active"
                      : "bg-gray-700/50"
                }`}
              />
            ))}
          </div>
        </div>

        {chunkResponse?.hints && <HintsPanel hints={chunkResponse.hints} />}
      </div>
    </div>
  );
};

export default QuestionPanel;
