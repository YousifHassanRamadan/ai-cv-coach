import React from "react";
import { Mic, Video, Pause, SkipForward, Square } from "lucide-react";
import type { ControlBarProps } from "./control-bar.types";
import { Link } from "react-router-dom";

const iconBtnClass =
  "w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1a1a2e] border border-indigo-600/30 hover:bg-[#252540] transition-all flex items-center justify-center group";

const ControlBar: React.FC<ControlBarProps> = ({
  onNextQuestion,
  onEndInterview,
  isLastQuestion,
}) => {
  return (
    <div className="flex flex-col items-center gap-4 sm:gap-6">
      {/* Icon controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={onNextQuestion}
          disabled={isLastQuestion}
          aria-label="Next question"
          className={`${iconBtnClass} disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          <SkipForward className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400 group-hover:text-indigo-300" />
        </button>
      </div>

      {/* End button */}
      <Link to="/processing">
        <button
          onClick={onEndInterview}
          className="px-5 sm:px-6 py-2 sm:py-2.5 bg-red-500 hover:bg-red-600 rounded-lg font-medium flex items-center gap-2 transition-colors text-xs sm:text-sm"
        >
          <Square className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
          End Interviewss
        </button>
      </Link>
    </div>
  );
};

export default ControlBar;
