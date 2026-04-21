import React from "react";
import type { SessionHeaderProps } from "./session-header.types";
import { formatTime } from "../../../../utils/format-time";

const SessionHeader: React.FC<SessionHeaderProps> = ({
  timer,
  currentQuestionIndex,
  totalQuestions,
}) => {
  return (
    <header className="flex items-center justify-between bg-bg-active px-4 sm:px-6 py-3 sm:py-4 border-b border-border-light shrink-0">
      {/* Brand */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-bg-subcard rounded-lg flex items-center justify-center shrink-0">
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 3.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM2 10a8 8 0 1116 0 8 8 0 01-16 0z" />
            <path d="M8 7.5a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H9a1 1 0 01-1-1v-5z" />
          </svg>
        </div>
        <h1 className="text-sm sm:text-lg font-medium">InterviewAI Session</h1>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-red-500 font-medium text-xs sm:text-sm hidden xs:inline">
            Recording
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 bg-green-400 rounded-full" />
          <span className="font-mono font-medium text-green-400 text-xs sm:text-sm">
            {formatTime(timer)}
          </span>
        </div>
        <span className="text-white text-xs sm:text-sm">
          Q{currentQuestionIndex + 1}/{totalQuestions}
        </span>
      </div>
    </header>
  );
};

export default SessionHeader;
