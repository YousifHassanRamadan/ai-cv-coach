import { api } from "../../utils/axios";
import type {
  CompleteInterviewResponse,
  StartInterviewPayload,
  StartInterviewResponse,
} from "./interviews.types";

export const startInterview = async (
  payload: StartInterviewPayload,
): Promise<StartInterviewResponse> => {
  const res = await api.post<StartInterviewResponse>(
    "/interviews/start",
    payload,
  );

  return res.data;
};

export const completeInterview = async (
  sessionId: string,
): Promise<CompleteInterviewResponse> => {
  const res = await api.post<CompleteInterviewResponse>(
    `/interviews/${sessionId}/complete`,
  );

  return res.data;
};
