import type { RoleCardProps } from "./role-card.types";

const RoleCard = ({ icon, label, selected, onClick }: RoleCardProps) => {
  return (
    <button
      onClick={onClick}
      className={`group relative p-4 sm:p-6 rounded-xl border-2 transition-all duration-300 text-left flex items-center gap-3 sm:gap-4 hover:scale-[1.02] ${
        selected
          ? "border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/20"
          : "border-gray-800 bg-[#13131a] hover:border-gray-700 hover:bg-[#1a1a24]"
      }`}
    >
      {/* Icon */}
      <div
        className={`transition-colors duration-300 flex-shrink-0 ${
          selected
            ? "text-purple-400"
            : "text-gray-500 group-hover:text-gray-400"
        }`}
      >
        {icon}
      </div>

      {/* Label */}
      <span
        className={`font-medium transition-colors duration-300 text-sm sm:text-base ${
          selected ? "text-white" : "text-gray-300"
        }`}
      >
        {label}
      </span>
    </button>
  );
};

export default RoleCard;
