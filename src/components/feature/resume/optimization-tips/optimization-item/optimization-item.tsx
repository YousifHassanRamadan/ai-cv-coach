import React from "react";
import type { TOptimizationItemProps } from "./optimization-item.types";

const OptimizationItem: React.FC<TOptimizationItemProps> = ({
  description,
  key,
}) => {
  return (
    <div
      key={key}
      className="flex items-start gap-3 bg-gray-500/10 border border-gray-500/20 rounded-lg p-4"
    >
      <p className="text-sm text-gray-300">{description}</p>
    </div>
  );
};

export default OptimizationItem;
