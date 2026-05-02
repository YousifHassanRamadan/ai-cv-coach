export interface CvResponse {
  message: string;
  message_ar: string;
  cvDocumentId: string;
  pdfUrl: string;
  sections: CvSections;
}

export interface CvSections {
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
}

export interface ExperienceItem {
  title?: string;
  company?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

export interface EducationItem {
  degree?: string;
  institution?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
}

export interface SkillItem {
  name?: string;
  level?: string;
}

export interface GenerateCoverLetterPayload {
  jobTitle: string;
  trackId: string;
}

export interface ListCoverLettersResponse {
  id: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
  trackId: string;
}
