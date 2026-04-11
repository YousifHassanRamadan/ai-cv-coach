import { Star } from "lucide-react";
import type { NotableMomentsCardProps } from "./notable-moments-card.types";
import SectionCard from "../section-card/section-card";
import { toPercent } from "../../../../utils/insights.utils";

const NotableMomentsCard = ({ chunks }: NotableMomentsCardProps) => {
  if (chunks.length === 0) return null;

  const bestChunk = [...chunks].sort((a, b) => b.nlpScore - a.nlpScore)[0];
  const worstChunk = [...chunks].sort(
    (a, b) => a.fluencyScore - b.fluencyScore,
  )[0];
  const isDifferent = bestChunk.id !== worstChunk.id;

  return (
    <SectionCard
      icon={<Star className="w-4 h-4 text-purple-500" />}
      iconBg="bg-purple-500/20"
      title="Notable Moments"
      className="mb-8"
    >
      <div className="space-y-4">
        {bestChunk.transcript && (
          <div className="bg-[#0f1419] rounded-lg p-4 border-l-4 border-teal-500">
            <p className="text-sm text-gray-300 mb-2 italic line-clamp-2">
              "{bestChunk.transcript.slice(0, 160)}…"
            </p>
            <p className="text-xs text-teal-400">
              Highest-scoring response — NLP score:{" "}
              {toPercent(bestChunk.nlpScore)}%
            </p>
          </div>
        )}

        {isDifferent && worstChunk.transcript && (
          <div className="bg-[#0f1419] rounded-lg p-4 border-l-4 border-orange-500">
            <p className="text-sm text-gray-300 mb-2 italic line-clamp-2">
              "{worstChunk.transcript.slice(0, 160)}…"
            </p>
            <p className="text-xs text-orange-400">
              Lowest fluency — consider slowing down and structuring your answer
            </p>
          </div>
        )}
      </div>
    </SectionCard>
  );
};

export default NotableMomentsCard;
