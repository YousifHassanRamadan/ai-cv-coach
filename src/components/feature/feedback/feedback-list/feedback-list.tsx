// FeedbackList.tsx
import React from "react";
import { MessageSquare, Loader2 } from "lucide-react";
import type { FeedbackListProps } from "./feedback-list.types";
import FeedbackCard from "../feedback-card/feedback-card";
import Pagination from "../pagination/pagination";

const FeedbackList: React.FC<FeedbackListProps> = ({
  feedbacks,
  isLoading,
  pagination,
  onPageChange,
}) => (
  <div className="bg-bg-card border border-border rounded-xl p-6">
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-text-active" />
        <h2 className="text-lg font-semibold text-white">All Feedback</h2>
      </div>
      <span className="text-xs text-gray-500 bg-bg-input border border-border px-2.5 py-1 rounded-full">
        {pagination.totalItems} total
      </span>
    </div>

    {isLoading ? (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-6 h-6 animate-spin text-text-active" />
      </div>
    ) : feedbacks.length === 0 ? (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
        <MessageSquare className="w-10 h-10 text-gray-700 mb-3" />
        <p className="text-sm text-gray-500">No feedback submitted yet</p>
        <p className="text-xs text-gray-700 mt-1">
          Be the first to share your thoughts
        </p>
      </div>
    ) : (
      <>
        <div
          className="space-y-3 mb-5 overflow-y-auto max-h-[400px]  "
          style={{ scrollbarColor: "#7c3bed transparent" }}
        >
          {feedbacks.map((fb) => (
            <FeedbackCard key={fb.id} feedback={fb} />
          ))}
        </div>
      </>
    )}
    <Pagination pagination={pagination} onPageChange={onPageChange} />
  </div>
);

export default FeedbackList;
