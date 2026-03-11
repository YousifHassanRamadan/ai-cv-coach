// FeedbackCard.tsx
import React from "react";
import { User, Mail } from "lucide-react";
import type { FeedbackCardProps } from "./feedback-card.types";
import CategoryBadge from "../category-badge/category-badge";
import StarRating from "../star-rating/star-rating";

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedback }) => (
  <div className="bg-bg-card border border-border rounded-xl p-4 hover:border-gray-700 transition-colors">
    <div className="flex items-start justify-between gap-3 mb-3">
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="w-8 h-8 rounded-full bg-bg-active/20 border border-border-active/30 flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-text-active" />
        </div>
      </div>
    </div>

    <p className="text-sm text-gray-400 leading-relaxed mb-3">
      {feedback.message}
    </p>

    <StarRating value={feedback.rating} readonly size="sm" />
  </div>
);

export default FeedbackCard;
