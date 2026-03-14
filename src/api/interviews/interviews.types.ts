export type InterviewDifficulty = "easy" | "medium" | "hard" | "custom";
export type InterviewMode = "video" | "audio";
export type ExperienceLevel = "junior" | "mid" | "senior" | "lead";

export interface StartInterviewPayload {
  cvDocumentId: string;
  trackId: string;
  totalQuestions: number;
  difficulty?: InterviewDifficulty;
  weightProfile?: string;
  experienceLevel?: ExperienceLevel;
  mode?: InterviewMode;
}

export interface InterviewQuestion {
  id: string;
  text: string;
  text_ar?: string;
  difficulty: string;
  category: string;
  keywords: string[];
}

export interface StartInterviewResponse {
  sessionId: string;
  interviewToken: string;
  questions: InterviewQuestion[];
  extractedSkills: string[];
  trackName: string;
  mode: InterviewMode;
}

export interface CompleteInterviewResponse {
  message: string;
  message_ar?: string;
  sessionId: string;
}
