import type { FinalScores } from "../../../../api/insights";
import { toPercent } from "../../../../utils/insights.utils";
import CircularRing from "../circularring/circularring";
import type { ScoreCardProps, ScoreGridProps } from "./score-grid.types";

const ScoreCard = ({
  label,
  subtitle,
  percentage,
  color,
  isOverall = false,
}: ScoreCardProps) => (
  <div
    className={`bg-bg-subcard rounded-lg p-6 border ${isOverall ? "border-border-active" : "border-border-light"}`}
  >
    <p className="text-xs text-text-muted uppercase tracking-wider mb-4">
      {isOverall ? "Overall Score" : "Score Breakdown"}
    </p>
    <div className="flex items-center justify-center py-4">
      <CircularRing percentage={percentage} color={color} size={90} />
    </div>
    <div className="text-center">
      <p className="text-sm font-semibold mb-1">{label}</p>
      <p className="text-xs text-text-muted">{subtitle}</p>
    </div>
  </div>
);

const SCORE_CARDS: Array<{
  key: keyof FinalScores;
  label: string;
  subtitle: string;
  color: string;
  isOverall?: boolean;
}> = [
  {
    key: "overall",
    label: "Overall",
    subtitle: "Combined score",
    color: "#10b981",
    isOverall: true,
  },
  {
    key: "fluency",
    label: "Communication",
    subtitle: "Clarity & Structure",
    color: "#8b5cf6",
  },
  {
    key: "nlp",
    label: "Technical",
    subtitle: "Knowledge & Accuracy",
    color: "#06b6d4",
  },
  {
    key: "energy",
    label: "Confidence",
    subtitle: "Delivery & Presence",
    color: "#10b981",
  },
];

const ScoreGrid = ({ finalScores }: ScoreGridProps) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
    {SCORE_CARDS.map(({ key, label, subtitle, color, isOverall }) => (
      <ScoreCard
        key={key}
        label={label}
        subtitle={subtitle}
        percentage={toPercent(finalScores[key] as number)}
        color={color}
        isOverall={isOverall}
      />
    ))}
  </div>
);

export default ScoreGrid;
