import React from "react";
import { MessageSquare } from "lucide-react";
import type { QuestionPanelProps } from "./question-panel.types";

const QuestionPanel: React.FC<QuestionPanelProps> = ({
  questionText,
  currentIndex,
  totalQuestions,
}) => {
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
        <h2 className="text-base sm:text-xl font-normal leading-relaxed mb-6 sm:mb-8">
          {questionText}
        </h2>

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

        {/* Pro Tip */}
        <div className="bg-[#1a1a2e] rounded-lg p-4 sm:p-5 border border-indigo-900/30 mt-auto">
          <div className="text-purple-400 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-2">
            Pro Tip
          </div>
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
            Use the STAR method: Situation, Task, Action, Result to structure
            your answers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuestionPanel;
