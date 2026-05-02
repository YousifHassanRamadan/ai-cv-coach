import React, { useEffect } from "react";
import { MessageSquare } from "lucide-react";
import type { AIAvatarProps } from "./aI-avatar.types";

const AIAvatar: React.FC<AIAvatarProps> = ({
  isListening,
  cameraEnabled,
  videoRef,
  stream,
}) => {
  const mode = localStorage.getItem("interview-mode");

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream, cameraEnabled, videoRef]);

  return (
    <div className="flex flex-col items-center gap-2 sm:gap-6">
      {cameraEnabled && mode === "video" ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full max-w-lg rounded mb-4 border border-border-active"
        />
      ) : (
        <>
          {/* Listening badge */}
          <div
            className={`flex items-center gap-2 text-green-400 transition-opacity duration-300 ${isListening ? "opacity-100" : "opacity-0"}`}
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs sm:text-sm font-medium">Listening...</span>
          </div>

          {/* Avatar with ripple rings */}
          <div className="relative flex items-center justify-center w-40 h-40 sm:w-60 sm:h-60 lg:w-72 lg:h-72 overflow-hidden">
            {/* Ripple rings — only when listening */}
            {isListening && (
              <>
                <div
                  className="absolute w-32 h-32 sm:w-44 sm:h-44 lg:w-52 lg:h-52 rounded-full border border-border-active animate-ping"
                  style={{ animationDuration: "1.5s" }}
                />
                <div
                  className="absolute w-40 h-40 sm:w-52 sm:h-52 lg:w-60 lg:h-60 rounded-full border border-border-active animate-ping"
                  style={{ animationDuration: "2s" }}
                />
              </>
            )}

            {/* Main circle */}
            <div className="w-20 h-20 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full bg-bg-active flex items-center justify-center z-10">
              <svg
                className="w-8 h-8 sm:w-12 sm:h-12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="2" width="6" height="11" rx="3" />
                <path d="M5 10a7 7 0 0 0 14 0" />
                <line x1="12" y1="19" x2="12" y2="22" />
                <line x1="8" y1="22" x2="16" y2="22" />
              </svg>
            </div>
          </div>

          {/* Sound bars */}
          <div className="flex items-center gap-1 h-5 sm:h-8">
            {[0.7, 0.9, 0.6, 0.8, 1].map((duration, i) => (
              <div
                key={i}
                className={`w-1 rounded-full bg-purple-500 transition-all duration-300 ${isListening ? "animate-bounce" : "h-1.5 opacity-30"}`}
                style={
                  isListening
                    ? {
                        animationDuration: `${duration}s`,
                        animationDelay: `${i * 0.1}s`,
                      }
                    : {}
                }
              />
            ))}
          </div>

          <span className="text-text-muted text-xs sm:text-sm hidden sm:block">
            AI Interviewer
          </span>
        </>
      )}
    </div>
  );
};

export default AIAvatar;
