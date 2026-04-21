import React from "react";
import type { SectionHeaderProps } from "./section-header.types";

const SectionHeader: React.FC<SectionHeaderProps> = ({
  icon,
  title,
  variant = "default",
}) => {
  const textColor = variant === "danger" ? "text-red-400" : "";
  const iconColor = variant === "danger" ? "" : "text-blue-400";

  return (
    <h3
      className={`text-sm font-semibold mb-3.5 flex items-center gap-2 ${textColor}`}
    >
      <span className={iconColor}>{icon}</span>
      <span className="text-text-primary">{title}</span>
    </h3>
  );
};

export default SectionHeader;
