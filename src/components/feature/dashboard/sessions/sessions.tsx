import { Clock, Video } from "lucide-react";
import React from "react";
import type { TSessionItem } from "./sessions.types";

const Sessions: React.FC<TSessionItem> = ({
  title,
  company,
  score,
  scoreColor,
  duration,
  time,
}) => {
  return (
    <div className="flex items-center justify-between group  bg-bg-subcard hover:bg-[#1a1a26]  rounded-xl px-4 py-4 transition-colors cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 bg-gradient-to-br from-blue-500/10 to-purple-600/10 border-indigo-600/30 rounded-xl flex items-center justify-center">
          <Video size={18} className="text-text-active" />
        </div>
        <div>
          <p className="font-semibold text-white group-hover:text-text-active">
            {title}
          </p>
          <p className="text-gray-500 text-sm">{company}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className={`font-bold text-lg ${scoreColor}`}>{score}%</p>
          <p className="text-gray-500 text-xs flex items-center gap-1">
            <Clock size={11} /> {duration}
          </p>
        </div>
        <span className="text-gray-600 text-xs w-20 text-right">{time}</span>
      </div>
    </div>
  );
};

export default Sessions;
