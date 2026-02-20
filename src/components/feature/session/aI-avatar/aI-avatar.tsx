import React from "react";
import { MessageSquare } from "lucide-react";
import type { AIAvatarProps } from "./aI-avatar.types";

const AIAvatar: React.FC<AIAvatarProps> = ({ isListening }) => {
  return (
    <div className="flex flex-col items-center gap-4 sm:gap-6">
      {/* Listening badge */}
      <div
        className={`flex items-center gap-2 text-green-400 transition-opacity ${isListening ? "opacity-100" : "opacity-0"}`}
      >
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <span className="text-xs sm:text-sm font-medium">Listening...</span>
      </div>

      {/* Avatar circle */}
      <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 flex items-center justify-center shadow-2xl">
        <MessageSquare
          className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-white/90"
          strokeWidth={1.5}
        />
      </div>

      <span className="text-gray-400 text-xs sm:text-sm">AI Interviewer</span>
    </div>
  );
};

export default AIAvatar;
