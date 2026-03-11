import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type {
  FeedbackListResponse,
  FeedbackPayload,
  FeedbackResponse,
} from "./feedback.types";
import { getFeedbacks, sendFeedback } from "./feedback.api";

export const useFeedbacks = (page = 1, limit = 10) => {
  return useQuery<FeedbackListResponse>({
    queryKey: ["feedbacks", page, limit],
    queryFn: () => getFeedbacks(page, limit),
  });
};

export const useSendFeedback = () => {
  const queryClient = useQueryClient();
  return useMutation<FeedbackResponse, Error, FeedbackPayload>({
    mutationFn: sendFeedback,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
      toast.success("Feedback sent successfully!");
      console.log("Feedback ID:", data.id);
    },

    onError: (error) => {
      toast.error(`Failed to send feedback: ${error.message}`);
    },
  });
};
