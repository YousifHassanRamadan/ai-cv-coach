import type { Question } from "../../../../api/questions";

export interface QuestionCardProps {
  question: Question;
  onClick?: (id: string) => void;
  isSelected?: boolean;
}
