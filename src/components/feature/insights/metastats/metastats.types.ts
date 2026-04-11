import type { InterviewResults } from "../../../../api/insights";

export interface MetaStatsProps {
  data: Pick<
    InterviewResults,
    "difficulty" | "experienceLevel" | "mode" | "questionCount"
  >;
}
