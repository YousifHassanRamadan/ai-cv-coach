import type { ReactNode } from "react";
import type { SectionCardProps } from "./section-card.types";

const SectionCard = ({
  icon,
  iconBg,
  title,
  children,
  className = "",
  rightSlot,
}: SectionCardProps) => (
  <div
    className={`bg-[#1a1a24] rounded-lg p-6 border border-gray-800 ${className}`}
  >
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <div
          className={`w-6 h-6 ${iconBg} rounded flex items-center justify-center`}
        >
          {icon}
        </div>
        <h3 className="font-semibold">{title}</h3>
      </div>
      {rightSlot}
    </div>
    {children}
  </div>
);

export default SectionCard;
