// StarRating.tsx
import React from "react";
import { Star } from "lucide-react";
import type { StarRatingProps } from "./star-rating.types";

const StarRating: React.FC<StarRatingProps> = ({
  value,
  onChange,
  readonly = false,
  size = "md",
}) => {
  const iconSize = size === "sm" ? "w-3.5 h-3.5" : "w-5 h-5";

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(star)}
          className={`transition-transform ${!readonly ? "hover:scale-110 cursor-pointer" : "cursor-default"}`}
        >
          <Star
            className={`${iconSize} transition-colors ${
              star <= value
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-700"
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;
