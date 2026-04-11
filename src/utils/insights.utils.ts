import type { Chunk } from "../api/insights";

/** Normalise a score to 0–100. Handles both 0–1 and 0–100 ranges. */
export const toPercent = (n: number | null | undefined): number => {
  if (n == null) return 0;
  return Math.round(n <= 1 ? n * 100 : n);
};

/** Format an ISO date string to a readable label. */
export const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

/** Calculate duration between two ISO strings, e.g. "12m 30s". */
export const calcDuration = (start: string, end: string): string => {
  const ms = new Date(end).getTime() - new Date(start).getTime();
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}m ${seconds}s`;
};

export interface EmotionDataPoint {
  time: string;
  confident: number;
  engaged: number;
  nervous: number;
}

/** Map raw chunks to chart-ready emotion timeline data. */
export const buildEmotionData = (chunks: Chunk[]): EmotionDataPoint[] =>
  chunks.map((chunk, i) => ({
    time: `Q${i + 1}`,
    confident: toPercent(chunk.energyScore),
    engaged: toPercent(chunk.answerRelevance ?? chunk.nlpScore),
    nervous: Math.max(0, 100 - toPercent(chunk.fluencyScore)),
  }));

/** Derive strength bullet points from final scores. */
export const deriveStrengths = (scores: {
  fluency: number;
  energy: number;
  eyeContact: number;
  nlp: number;
}): string[] => {
  const items: string[] = [];
  if (toPercent(scores.fluency) >= 75)
    items.push(
      "Strong fluency and clear verbal delivery throughout the session.",
    );
  if (toPercent(scores.energy) >= 75)
    items.push("High energy and enthusiasm kept the interview engaging.");
  if (toPercent(scores.eyeContact) >= 75)
    items.push(
      "Consistent eye contact projected confidence and attentiveness.",
    );
  if (toPercent(scores.nlp) >= 70)
    items.push("Solid technical vocabulary aligned well with question topics.");
  if (items.length === 0)
    items.push("You completed the full interview — great commitment!");
  return items;
};

/** Derive improvement bullet points from final scores. */
export const deriveImprovements = (scores: {
  fluency: number;
  eyeContact: number;
  headPose: number;
  answerRelevance: number | null;
}): string[] => {
  const items: string[] = [];
  if (toPercent(scores.fluency) < 70)
    items.push("Work on reducing filler words and improving speech fluency.");
  if (toPercent(scores.eyeContact) < 70)
    items.push(
      "Maintain more consistent eye contact to appear confident on camera.",
    );
  if (toPercent(scores.headPose) < 70)
    items.push(
      "Keep your head position more stable and centred during answers.",
    );
  if (toPercent(scores.answerRelevance ?? 0) < 70)
    items.push("Focus answers more tightly on the keywords in each question.");
  if (items.length === 0)
    items.push("Continue practising structured answers using the STAR method.");
  return items;
};
