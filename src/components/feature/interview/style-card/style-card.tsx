import type { StyleCardProps } from "./style-card.types";

const StyleCard = ({
  icon,
  label,
  description,
  color,
  selected,
  onClick,
}: StyleCardProps) => {
  return (
    <button
      onClick={onClick}
      className={`group w-full p-4 sm:p-6 rounded-xl border-2 transition-all duration-300 text-left flex items-center gap-3 sm:gap-4 hover:scale-[1.01] ${
        selected
          ? "border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/20"
          : "border-gray-800 bg-[#13131a] hover:border-gray-700"
      }`}
    >
      {/* Icon with colored background */}
      <div
        className={`${color} p-2 sm:p-3 rounded-lg transition-transform duration-300 flex-shrink-0 ${selected ? "scale-110" : "group-hover:scale-105"}`}
      >
        <div className="text-white w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
          {icon}
        </div>
      </div>

      {/* Text content */}
      <div className="flex-1 min-w-0">
        <div
          className={`font-semibold text-base sm:text-lg mb-0.5 sm:mb-1 transition-colors duration-300 ${selected ? "text-white" : "text-gray-200"}`}
        >
          {label}
        </div>
        <div className="text-xs sm:text-sm text-gray-400 line-clamp-1 sm:line-clamp-none">
          {description}
        </div>
      </div>

      {/* Radio indicator */}
      <div
        className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
          selected
            ? "border-purple-500 bg-purple-500"
            : "border-gray-600 group-hover:border-gray-500"
        }`}
      >
        {selected && (
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white animate-scaleIn" />
        )}
      </div>

      <style>{`
        @keyframes scaleIn {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
      `}</style>
    </button>
  );
};

export default StyleCard;
