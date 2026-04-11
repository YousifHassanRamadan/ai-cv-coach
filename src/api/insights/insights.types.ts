export interface ModelAnswer {
  keywords: string[];
  definition: string;
}

export interface Question {
  id?: string;
  text: string;
  type: "technical" | "behavioral";
  category: string;
  keywords: string[];
  difficulty: "easy" | "medium" | "hard";
  skill?: string | null;
  concept?: string | null;
  text_ar?: string | null;
  model_answer: ModelAnswer;
}

export interface Chunk {
  id: string;
  sessionId: string;
  questionId: string | null;
  chunkIndex: number;
  fluencyScore: number;
  energyScore: number;
  eyeContactScore: number;
  headPoseScore: number;
  transcript: string;
  createdAt: string;
  answerRelevance: number | null;
  isLastChunk: boolean;
  missingKeywords: string[];
  nlpScore: number;
}

export interface FinalScores {
  nlp: number;
  energy: number;
  fluency: number;
  overall: number;
  headPose: number;
  eyeContact: number;
  answerRelevance: number | null;
  breakdown: {
    nlp_weight: number;
    energy_weight: number;
    fluency_weight: number;
    head_pose_weight: number;
    eye_contact_weight: number;
  };
}

export interface TrackInfo {
  name: string;
  slug: string;
}

export interface InterviewResults {
  id: string;
  userId: string;
  startedAt: string;
  endedAt: string;
  totalScore: number;
  feedback: string | null;
  status: "completed" | "pending" | "in_progress";
  difficulty: string;
  experienceLevel: string;
  questionCount: number;
  mode: "audio" | "video";
  weightProfile: string;
  extractedSkills: string[];
  matchedSkills: string[];
  baseQuestions: Question[];
  finalQuestions: Question[];
  generatedQuestions: Question[];
  finalScores: FinalScores;
  chunks: Chunk[];
  answers: unknown[];
  trackId: string;
  track: TrackInfo;
  cvDocumentId: string;
}
