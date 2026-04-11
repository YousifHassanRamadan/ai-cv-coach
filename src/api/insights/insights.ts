import { useQuery } from "@tanstack/react-query";
import type { InterviewResults } from "./insights.types";
import { getInterviewResults } from "./insights.api";

const SESSION_ID_KEY = "session-id"; // adjust to your actual localStorage key

const getSessionIdFromStorage = (): string | null => {
  try {
    return localStorage.getItem(SESSION_ID_KEY);
  } catch {
    // localStorage may be unavailable in SSR or private browsing
    return null;
  }
};

export const useInterviewResults = () => {
  const sessionId = getSessionIdFromStorage();

  return useQuery<InterviewResults>({
    queryKey: ["interview-results", sessionId],
    queryFn: () => getInterviewResults(sessionId!),
    enabled: !!sessionId,
  });
};
