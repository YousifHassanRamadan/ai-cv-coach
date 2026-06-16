import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type {
  CompleteInterviewResponse,
  InterviewHistoryResponse,
  StartInterviewPayload,
  StartInterviewResponse,
} from "./interviews.types";
import {
  completeInterview,
  getInterviewHistory,
  startInterview,
} from "./interviews.api";

export const useStartInterview = () => {
  const queryClient = useQueryClient();
  return useMutation<StartInterviewResponse, Error, StartInterviewPayload>({
    mutationFn: startInterview,

    onSuccess: (data) => {
      // toast.success("Interview started successfully!");
      localStorage.removeItem("interview-token");
      localStorage.removeItem("session-id");
      queryClient.removeQueries({ queryKey: ["chunk-response"] });

      localStorage.setItem("interview-token", data.interviewToken);
      localStorage.setItem("session-id", data.sessionId);
      queryClient.setQueryData(["current-interview"], data);
    },

    onError: (error) => {
      toast.error(`Failed to start interview: ${error.message}`);
    },
  });
};

export const useCompleteInterview = () => {
  const queryClient = useQueryClient();
  return useMutation<CompleteInterviewResponse, Error, string>({
    mutationFn: completeInterview,

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["dashboard-stats"],
      });
      toast.success(data.message || "Interview completed successfully!");
    },

    onError: (error) => {
      toast.error(`Failed to complete interview: ${error.message}`);
    },
  });
};

export const useInterviewHistory = () => {
  return useQuery<InterviewHistoryResponse>({
    queryKey: ["interview-history"],
    queryFn: getInterviewHistory,
  });
};
