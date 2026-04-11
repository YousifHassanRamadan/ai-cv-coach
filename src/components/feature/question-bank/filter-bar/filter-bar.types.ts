import type { QuestionDifficulty } from "../../../../api/questions";

export interface FilterBarProps {
  search: string;
  difficulty: QuestionDifficulty | "all";
  selectedTrack: string | null;
  onSearchChange: (v: string) => void;
  onDifficultyChange: (v: QuestionDifficulty | "all") => void;
  onTrackChange: (slug: string | null) => void;
}
