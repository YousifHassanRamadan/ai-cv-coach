import React from "react";
import type { Feedback } from "../types";
import type { CategoryBadgeProps } from "./category-badge.types";

const getLabelAndStyle = (category: Feedback["category"]) => {
  if (category === "bug")
    return {
      label: "Bug Report",
      className: "bg-red-900/40 text-red-400 border border-red-800",
    };
  if (category === "feature")
    return {
      label: "Feature Request",
      className: "bg-purple-900/40 text-purple-400 border border-purple-800",
    };
  if (category === "ux")
    return {
      label: "UX / Design",
      className: "bg-cyan-900/40 text-cyan-400 border border-cyan-800",
    };
  return {
    label: "General",
    className: "bg-blue-900/40 text-blue-400 border border-blue-800",
  };
};

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category }) => {
  const { label, className } = getLabelAndStyle(category);
  return (
    <span
      className={`text-xs px-2 py-0.5 rounded-full font-medium ${className}`}
    >
      {label}
    </span>
  );
};

export default CategoryBadge;
