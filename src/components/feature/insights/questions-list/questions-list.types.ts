import type { Question } from "../../../../api/insights";

export interface QuestionRowProps {
  question: Question;
  index: number;
}

export interface QuestionsListProps {
  questions: Question[];
}
