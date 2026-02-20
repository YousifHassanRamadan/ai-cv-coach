import type { JSX } from "react";
import { Camera, Mic, User } from "lucide-react";
import type { EquipmentCardProps } from "./equipment-card.types";

const EquipmentCard = ({
  title,
  icon,
  enabled,
  onToggle,
}: EquipmentCardProps) => {
  const isMicrophone = title === "Microphone";

  return (
    <div className="bg-[#13131a] rounded-xl p-4 sm:p-6 border-2 border-gray-800 hover:border-gray-700 transition-all duration-300">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div
          className={`${enabled ? "text-teal-400" : "text-gray-500"} transition-colors duration-300`}
        >
          {icon}
        </div>
        <h3 className="font-semibold text-base sm:text-lg">{title}</h3>
        {enabled && (
          <div className="ml-auto">
            <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
          </div>
        )}
      </div>

      {/* Preview area */}
      <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#16162a] rounded-lg aspect-video flex items-center justify-center mb-4 sm:mb-6 overflow-hidden border border-gray-800">
        {enabled ? (
          isMicrophone ? (
            // Microphone visualization
            <div className="flex items-end justify-center gap-1 h-12 sm:h-16">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 sm:w-2 bg-gradient-to-t from-blue-500 to-purple-500 rounded-full animate-audioBar"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    height: `${30 + Math.random() * 40}%`,
                  }}
                />
              ))}
            </div>
          ) : (
            // Camera preview with user icon
            <div className="relative">
              <User size={32} className="text-gray-600 sm:w-12 sm:h-12" />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl" />
            </div>
          )
        ) : (
          <div className="text-gray-600">
            {isMicrophone ? (
              <Mic size={24} className="sm:w-8 sm:h-8" />
            ) : (
              <Camera size={24} className="sm:w-8 sm:h-8" />
            )}
          </div>
        )}
      </div>

      {/* Status text */}
      <div className="text-center mb-3 sm:mb-4">
        <p
          className={`text-xs sm:text-sm font-medium ${enabled ? "text-teal-400" : "text-purple-400"}`}
        >
          {enabled ? `${title} Ready ✓` : `${title} Disabled`}
        </p>
      </div>

      {/* Toggle button */}
      <button
        onClick={onToggle}
        className={`w-full py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base ${
          enabled
            ? "bg-teal-500 hover:bg-teal-600 text-white shadow-lg shadow-teal-500/30"
            : "bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/30"
        }`}
      >
        {enabled ? `Disable ${title}` : `Enable ${title}`}
      </button>

      <style>{`
        @keyframes audioBar {
          0%, 100% {
            transform: scaleY(0.5);
          }
          50% {
            transform: scaleY(1);
          }
        }
        .animate-audioBar {
          animation: audioBar 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default EquipmentCard;
