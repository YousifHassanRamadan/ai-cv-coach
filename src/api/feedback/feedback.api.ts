import { api } from "../../utils/axios";
import type {
  FeedbackListResponse,
  FeedbackPayload,
  FeedbackResponse,
} from "./feedback.types";

export const sendFeedback = async (
  payload: FeedbackPayload,
): Promise<FeedbackResponse> => {
  const res = await api.post<FeedbackResponse>("/feedback", payload);
  return res.data;
};

export const getFeedbacks = async (
  page = 1,
  limit = 10,
): Promise<FeedbackListResponse> => {
  const res = await api.get<FeedbackListResponse>("/feedback", {
    params: { page, limit },
  });

  return res.data;
};
