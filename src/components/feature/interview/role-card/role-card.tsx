import type { RoleCardProps } from "./role-card.types";

const RoleCard = ({ icon, label, selected, onClick }: RoleCardProps) => {
  return (
    <button
      onClick={onClick}
      className={`group relative p-4 sm:p-6 rounded-xl border-2 transition-all duration-300 text-left flex items-center gap-3 sm:gap-4 hover:scale-[1.02] ${
        selected
          ? "border-border-active/20 bg-bg-active shadow-lg shadow-bg-card/20"
          : "border-border-light bg-bg-primary hover:border-border-light hover:bg-bg-active/50"
      }`}
    >
      {/* Icon */}
      <div
        className={`transition-colors duration-300 flex-shrink-0 ${
          selected
            ? "text-text-primary"
            : "text-text-primary group-hover:text-text-muted"
        }`}
      >
        {icon}
      </div>

      {/* Label */}
      <span
        className={`font-medium transition-colors duration-300
  text-xs sm:text-sm md:text-base
  min-w-0 break-words whitespace-normal text-center
  ${selected ? "text-white" : "text-text-muted"}`}
      >
        {label}
      </span>
    </button>
  );
};

export default RoleCard;
