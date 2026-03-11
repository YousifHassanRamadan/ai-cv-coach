export interface FeedbackPayload {
  rating: number; // 1-5
  message?: string; // optional, max 1000 chars
}

export interface FeedbackResponse {
  id: string;
  rating: number;
  message: string;
  createdAt: string;
}

export interface FeedbackListResponse {
  feedbacks: FeedbackResponse[];
  total: number;
  page: number;
  limit: number;
}
