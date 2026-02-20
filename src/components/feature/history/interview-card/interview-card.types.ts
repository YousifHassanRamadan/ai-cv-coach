import type { Difficulty } from "../difficulty-badge";

export interface Interview {
  id: string;
  role: string;
  company: string;
  difficulty: Difficulty;
  date: string;
  duration: string;
  score: number;
}

export interface InterviewCardProps {
  interview: Interview;
  onClick?: (interview: Interview) => void;
}
