export interface UploadCvResponse {
  id: string;
  userId: string;
  cvText: string;
  jdText: string | null;
  trackId: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
}

export interface UploadCvPayload {
  file: File;
  trackId: string;
  jdText?: string;
}

export interface CvDocument {
  id: string;
  fileName: string;
  trackId: string;
  uploadedAt: string;
  jdText: string | null;
}

export interface DeleteCvDocumentResponse {
  message: string;
  message_ar: string;
}

export interface EvaluationCategory {
  score: number;
  details: string;
  details_ar?: string;
}

export interface EvaluationResult {
  overall_score: number;

  category_scores: {
    skills_match: EvaluationCategory;
    experience_relevance: EvaluationCategory;
    formatting: EvaluationCategory;
    keyword_coverage: EvaluationCategory;
  };

  strengths: string[];
  weaknesses: string[];
  suggestions: string[];

  strengths_ar: string[];
  weaknesses_ar: string[];
  suggestions_ar: string[];

  missing_skills: string[];
  matched_skills: string[];

  source: string;
  processing_time_ms: number;
}

export interface EvaluatedDocument {
  id: string;
  fileName: string;
  trackId: string;
  uploadedAt: string;
}

export interface EvaluateCvResponse {
  document: EvaluatedDocument;
  evaluation: EvaluationResult;
}

/* -------- Request Types -------- */

/* Option A */
export interface EvaluateExistingCvPayload {
  cvDocumentId: string;
  trackId: string;
  jdText?: string;
}

/* Option B */
export interface EvaluateNewCvPayload {
  cvText: string;
  fileName?: string;
  trackId: string;
  jdText?: string;
}

export type EvaluateCvPayload =
  | EvaluateExistingCvPayload
  | EvaluateNewCvPayload;
