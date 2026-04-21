import React from "react";
import type { TOptimizationItemProps } from "./optimization-item.types";

const OptimizationItem: React.FC<TOptimizationItemProps> = ({
  description,
  key,
}) => {
  return (
    <div
      key={key}
      className="flex items-start gap-3 bg-bg-subcard border border-border-light rounded-lg p-4"
    >
      <p className="text-sm text-text-primary">{description}</p>
    </div>
  );
};

export default OptimizationItem;
