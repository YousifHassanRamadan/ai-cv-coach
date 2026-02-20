import React from "react";

import type { InterviewCardProps } from "./interview-card.types";
import DifficultyBadge from "../difficulty-badge/difficulty-badge";
import ScoreDisplay from "../score-display/score-display";

const InterviewCard: React.FC<InterviewCardProps> = ({
  interview,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick?.(interview)}
      className="bg-bg-card border border-border-cardrounded-xl p-3 sm:p-4 hover:border-purple-500/50 transition-colors cursor-pointer group"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
          {/* Icon */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
              <h4 className="font-semibold text-sm sm:text-base text-white truncate">
                {interview.role}
              </h4>
              <DifficultyBadge difficulty={interview.difficulty} />
            </div>
            <p className="text-xs sm:text-sm text-gray-400 truncate">
              {interview.company}
            </p>
            <div className="flex items-center gap-3 sm:gap-4 mt-1.5 sm:mt-2 text-[10px] sm:text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {interview.date}
              </span>
              <span className="flex items-center gap-1">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {interview.duration}
              </span>
            </div>
          </div>
        </div>

        {/* Score + Arrow */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <ScoreDisplay
            score={interview.score}
            className="text-lg sm:text-2xl"
          />
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-purple-400 transition-colors hidden sm:block"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
