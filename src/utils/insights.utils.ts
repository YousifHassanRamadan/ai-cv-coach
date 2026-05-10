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
    // FIX: chunk.fluencyScore can be null for video interviews — toPercent already handles null → 0
    nervous: Math.max(0, 100 - toPercent(chunk.fluencyScore)),
  }));

/** Derive strength bullet points from final scores. */
export const deriveStrengths = (
  scores:
    | {
        fluency?: number | null; // FIX: was `number` (non-nullable) — video interviews send null
        energy?: number | null;
        eyeContact?: number | null;
        nlp?: number | null;
      }
    | null
    | undefined,
): string[] => {
  // FIX: whole scores object can be null/undefined
  // FIX: guard the entire scores object before reading any field
  if (!scores) return ["You completed the full interview — great commitment!"];

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
export const deriveImprovements = (
  scores:
    | {
        fluency?: number | null;
        eyeContact?: number | null;
        headPose?: number | null;
        answerRelevance?: number | null;
      }
    | null
    | undefined,
): string[] => {
  // FIX: whole scores object can be null/undefined
  // FIX: was `if (!scores)` but the parameter type didn't allow null — now it does
  if (!scores) {
    return ["You completed the full interview — great commitment!"];
  }

  const items: string[] = [];

  if (scores.fluency != null && toPercent(scores.fluency) < 70)
    items.push("Work on reducing filler words and improving speech fluency.");
  if (scores.eyeContact != null && toPercent(scores.eyeContact) < 70)
    items.push(
      "Maintain more consistent eye contact to appear confident on camera.",
    );
  if (scores.headPose != null && toPercent(scores.headPose) < 70)
    items.push(
      "Keep your head position more stable and centred during answers.",
    );
  if (scores.answerRelevance != null && toPercent(scores.answerRelevance) < 70)
    items.push("Focus answers more tightly on the keywords in each question.");
  if (items.length === 0)
    items.push("Continue practising structured answers using the STAR method.");
  return items;
};
