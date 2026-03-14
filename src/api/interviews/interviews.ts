import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type {
  CompleteInterviewResponse,
  StartInterviewPayload,
  StartInterviewResponse,
} from "./interviews.types";
import { completeInterview, startInterview } from "./interviews.api";

export const useStartInterview = () => {
  const queryClient = useQueryClient();
  return useMutation<StartInterviewResponse, Error, StartInterviewPayload>({
    mutationFn: startInterview,

    onSuccess: (data) => {
      toast.success("Interview started successfully!");
      localStorage.setItem("current-session-id", data.sessionId);
      queryClient.setQueryData(["current-interview"], data);
    },

    onError: (error) => {
      toast.error(`Failed to start interview: ${error.message}`);
    },
  });
};

export const useCompleteInterview = () => {
  return useMutation<CompleteInterviewResponse, Error, string>({
    mutationFn: completeInterview,

    onSuccess: (data) => {
      toast.success(data.message || "Interview completed successfully!");
      localStorage.removeItem("current-session-id");
    },

    onError: (error) => {
      toast.error(`Failed to complete interview: ${error.message}`);
    },
  });
};
