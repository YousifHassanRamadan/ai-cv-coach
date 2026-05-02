import React from "react";
import { Mic, Video, Pause, SkipForward, Square } from "lucide-react";
import type { ControlBarProps } from "./control-bar.types";
import { Link } from "react-router-dom";

const iconBtnClass =
  "w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-bg-active border border-border-light hover:bg-bg-subcard transition-all flex items-center justify-center group";

const ControlBar: React.FC<ControlBarProps> = ({
  onNextQuestion,
  onEndInterview,
  isLastQuestion,
}) => {
  return (
    <div className="flex flex-col items-center gap-2 sm:gap-6">
      {/* Icon controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={onNextQuestion}
          disabled={isLastQuestion}
          aria-label="Next question"
          className={`${iconBtnClass} disabled:opacity-40 disabled:cursor-not-allowed bg-bg-subcard`}
        >
          <SkipForward className="w-4 h-4 sm:w-5 sm:h-5 text-text-active group-hover:text-text-active/30 " />
        </button>
      </div>

      {/* End button */}
      <Link to="/processing">
        <button
          onClick={onEndInterview}
          className="px-5 sm:px-6 py-2 sm:py-2.5 text-white bg-red-500 hover:bg-red-600 rounded-lg font-medium flex items-center gap-2 transition-colors text-xs sm:text-sm"
        >
          <Square className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
          End Interviewss
        </button>
      </Link>
    </div>
  );
};

export default ControlBar;
