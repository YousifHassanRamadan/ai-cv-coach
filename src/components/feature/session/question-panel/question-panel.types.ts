import type { InterviewQuestion } from "../../../../api/interviews";

export interface QuestionPanelProps {
  questionText: InterviewQuestion[];
  currentIndex: number;
  totalQuestions: number;
}
