import type { FinalScores } from "../../../../api/insights";

export interface ScoreCardProps {
  label: string;
  subtitle: string;
  percentage: number;
  color: string;
  isOverall?: boolean;
}

export interface ScoreGridProps {
  finalScores: FinalScores;
}
