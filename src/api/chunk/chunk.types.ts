export interface NLPBreakdown {
  sbert: number;
  ats: number;
  nlp_score: number;
}

export interface AudioBreakdown {
  avg_fluency: number;
  avg_energy: number;
  audio_score: number;
}

export interface VisionBreakdown {
  avg_eye: number;
  avg_pose: number;
  vision_score: number;
}

export interface Breakdown {
  nlp: NLPBreakdown;
  audio: AudioBreakdown;
  vision: VisionBreakdown;
}

export interface Hint {
  type: "warning" | "info" | "error";
  icon: string;
  message: string;
  message_ar?: string | null;
  category: string;
}

export interface Components {
  asr: { text: string; confidence: number };
  vad: { fluency_score: number; speech_ratio: number };
  audio: { energy_score: number; pitch_score: number };
  vision: { face_present: boolean; eye_contact_score: number };
  nlp: { similarity_0_1: number; ats_score: number };
}

export interface ChunkProcessResponse {
  chunk_id: number;
  final_score: number;
  breakdown: Breakdown;
  transcript: string;
  answer_relevance: Record<string, unknown>;
  hints: Hint[];
  components: Components;
  enhanced_breakdown: Breakdown | null;
}

export interface ProcessChunkPayload {
  chunk_id: number;
  video_file: File;
}

export interface ProcessAudioChunkPayload {
  chunk_id: number;
  audio_file: File;
}
