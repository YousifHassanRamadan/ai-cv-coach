import { api } from "../../utils/axios";
import type { InterviewResults } from "./insights.types";

export const getInterviewResults = async (
  sessionId: string,
): Promise<InterviewResults> => {
  const res = await api.get<InterviewResults>(
    `/interviews/${sessionId}/results`,
  );
  return res.data;
};
