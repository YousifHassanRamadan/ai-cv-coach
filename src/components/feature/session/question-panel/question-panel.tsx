import React from "react";
import { BarChart2, Hash, MessageSquare } from "lucide-react";
import type { QuestionPanelProps } from "./question-panel.types";
import type { ChunkProcessResponse } from "../../../../api/chunk";
import { useQuery } from "@tanstack/react-query";
import HintsPanel from "../hints-panel/hints-panel";

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

  const { data: chunkResponse } = useQuery<ChunkProcessResponse>({
    queryKey: ["chunk-response"],
    enabled: false,
    queryFn: () => Promise.resolve(null as unknown as ChunkProcessResponse),
  });

  return (
    <div className="w-full sm:w-[340px] lg:w-[420px] bg-[#0d0d0d] border-t sm:border-t-0 sm:border-l border-gray-800/50 flex flex-col shrink-0">
      <div className="p-4 sm:p-6 flex-1 flex flex-col">
        {/* Label */}
        <div className="flex items-center gap-2 text-gray-400 mb-3 sm:mb-4">
          <MessageSquare className="w-4 h-4 shrink-0" />
          <span className="uppercase tracking-wider text-[10px] sm:text-xs font-semibold">
            Current Question
          </span>
        </div>

        {/* Question text */}
        <h2 className="text-base sm:text-xl font-normal leading-relaxed mb-4">
          {question?.text}
        </h2>

        {/* Difficulty badge */}
        {diff && (
          <span
            className={`self-start inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium mb-6 ${diff.bg} ${diff.color}`}
          >
            <BarChart2 className="w-3 h-3" />
            {diff.label}
          </span>
        )}

        {/* Keywords */}
        {question?.keywords?.length > 0 && (
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-1.5 text-gray-500 text-[10px] uppercase tracking-wider font-semibold mb-2">
              <Hash className="w-3 h-3" />
              Keywords
            </div>
            <div className="flex flex-wrap gap-1.5">
              {question.keywords.map((kw) => (
                <span
                  key={kw}
                  className="text-[11px] px-2 py-0.5 rounded-md bg-gray-800 text-gray-400 border border-gray-700/50"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Progress segments */}
        <div className="mb-6 sm:mb-8">
          <div className="flex gap-1.5">
            {Array.from({ length: totalQuestions }).map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  index < currentIndex
                    ? "bg-green-400"
                    : index === currentIndex
                      ? "bg-purple-500"
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
