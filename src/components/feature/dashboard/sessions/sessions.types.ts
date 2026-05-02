export type TSessionItem = {
  id: string;
  status: string;
  totalScore: number | null;
  difficulty: "easy" | "medium" | "hard" | "custom";
  weightProfile: string;
  startedAt: string;
  endedAt: string | null;
  questionCount: number;
  track: {
    name: string;
    slug: string;
  };
  index: number; // Added index to track the session's position in the list
};
