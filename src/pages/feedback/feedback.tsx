import React, { useState, useEffect } from "react";
import type {
  Feedback,
  FeedbackFormData,
  PaginationState,
} from "../../components/feature/feedback/types";
import FeedbackForm from "../../components/feature/feedback/feedback-form/feedback-form";
import FeedbackList from "../../components/feature/feedback/feedback-list/feedback-list";
import { useFeedbacks, type FeedbackResponse } from "../../api/feedback";

const FeedbackPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: feedbacks, isLoading: isFeedbacksLoading } = useFeedbacks(
    currentPage,
    10,
  );

  const total = feedbacks?.total ?? 0;

  const PAGE_SIZE = 10;

  const pagination: PaginationState = {
    currentPage,
    totalPages: Math.ceil(total / PAGE_SIZE) || 1,
    totalItems: total,
  };
  return (
    <div className="min-h-screen bg-bg-primary px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white">Feedback</h1>
          <p className="text-sm text-gray-500 mt-1">
            Share your thoughts to help us improve
          </p>
        </div>

        {/* Two-column layout on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6 items-start">
          <div className="lg:sticky lg:top-6">
            <FeedbackForm />
          </div>
          <FeedbackList
            feedbacks={feedbacks?.feedbacks || []}
            isLoading={isFeedbacksLoading}
            pagination={pagination}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
