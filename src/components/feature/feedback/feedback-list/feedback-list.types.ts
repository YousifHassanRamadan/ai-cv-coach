import type { FeedbackResponse } from "../../../../api/feedback";
import type { PaginationState } from "../types";

export interface FeedbackListProps {
  feedbacks: FeedbackResponse[];
  isLoading: boolean;
  pagination: PaginationState;
  onPageChange: (page: number) => void;
}
