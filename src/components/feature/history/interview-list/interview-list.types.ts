import type { Interview } from "../interview-card";

export interface InterviewListProps {
  interviews: Interview[];
  onInterviewClick?: (interview: Interview) => void;
}
