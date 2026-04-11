import { api } from "../../utils/axios";
import type {
  QuestionDetails,
  QuestionsResponse,
  TrackQuestionsResponse,
} from "./questions.types";

export const getQuestions = async (
  page = 1,
  limit = 10,
): Promise<QuestionsResponse> => {
  const res = await api.get<QuestionsResponse>("/questions", {
    params: { page, limit },
  });

  return res.data;
};

export const getQuestionById = async (
  questionId: string,
): Promise<QuestionDetails> => {
  const res = await api.get<QuestionDetails>(`/questions/${questionId}`);
  return res.data;
};

export const getQuestionsByTrack = async (
  slug: string,
): Promise<TrackQuestionsResponse> => {
  const res = await api.get<TrackQuestionsResponse>(`/questions/track/${slug}`);

  return res.data;
};
