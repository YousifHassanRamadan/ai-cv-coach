import React from "react";
import { ArrowRight } from "lucide-react";
import type { TKeywordPointProps } from "./keyword-point.types";

const KeywordPoint: React.FC<TKeywordPointProps> = ({
  str,
  color = "green",
}) => {
  const iconColor = color === "green" ? "text-green-400" : "text-orange-400";

  return (
    <li className="flex items-center gap-2">
      <ArrowRight className={`w-4 h-4 ${iconColor}`} />
      <span className="text-sm text-text-primary">{str}</span>
    </li>
  );
};

export default KeywordPoint;
