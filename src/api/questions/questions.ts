import { useQuery } from "@tanstack/react-query";
import type {
  QuestionDetails,
  QuestionsResponse,
  TrackQuestionsResponse,
} from "./questions.types";
import {
  getQuestionById,
  getQuestions,
  getQuestionsByTrack,
} from "./questions.api";

export const useQuestions = (page = 1, limit = 10) => {
  return useQuery<QuestionsResponse>({
    queryKey: ["questions", page, limit],
    queryFn: () => getQuestions(page, limit),
  });
};

export const useQuestion = (questionId: string) => {
  return useQuery<QuestionDetails>({
    queryKey: ["question", questionId],
    queryFn: () => getQuestionById(questionId),
    enabled: !!questionId,
  });
};

export const useTrackQuestions = (slug: string) => {
  return useQuery<TrackQuestionsResponse>({
    queryKey: ["track-questions", slug],
    queryFn: () => getQuestionsByTrack(slug),
    enabled: !!slug,
  });
};
