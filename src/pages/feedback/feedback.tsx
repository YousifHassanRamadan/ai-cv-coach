import React, { useState, useEffect } from "react";
import type {
  Feedback,
  FeedbackFormData,
  PaginationState,
} from "../../components/feature/feedback/types";
import FeedbackForm from "../../components/feature/feedback/feedback-form/feedback-form";
import FeedbackList from "../../components/feature/feedback/feedback-list/feedback-list";
import { useFeedbacks, type FeedbackResponse } from "../../api/feedback";
import PageHeader from "../../components/common/page-header/page-header";
import { useTranslation } from "react-i18next";

const FeedbackPage: React.FC = () => {
  const { t } = useTranslation();

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

        <PageHeader
          title={t("feedback.title")}
          subtitle={t("feedback.subtitle")}
        />

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
