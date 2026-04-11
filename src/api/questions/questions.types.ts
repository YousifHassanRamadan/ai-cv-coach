export type QuestionDifficulty = "easy" | "medium" | "hard";

export interface Question {
  id: string;
  text: string;
  difficulty: QuestionDifficulty;
  category: string;
  keywords: string[];
  trackId: string;
  points: number;
}

export interface QuestionsResponse {
  questions: Question[];
  total: number;
  page: number;
  limit: number;
}

export interface ModelAnswer {
  keywords: string[];
  definition: string;
}

export interface QuestionTrack {
  name: string;
  slug: string;
}

export interface QuestionDetails extends Question {
  modelAnswer: ModelAnswer;
  createdAt: string;
  track: QuestionTrack;
}

export interface QuestionTrack {
  id: string;
  name: string;
  slug: string;
}

export interface TrackQuestionsResponse {
  track: QuestionTrack;
  questions: Question[];
}
