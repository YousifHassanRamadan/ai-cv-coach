// feedback.types.ts

export interface Feedback {
  id: string;
  name: string;
  email: string;
  category: "bug" | "feature" | "general" | "ux";
  message: string;
  rating: number;
  createdAt: string;
}

export interface FeedbackFormData {
  message: string;
  rating: number;
}

export interface PaginationState {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}
