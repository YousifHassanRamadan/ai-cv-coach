import { useTranslation } from "react-i18next";
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
}: ScoreCardProps) => {
  const { t } = useTranslation();
  return (
    <div
      className={`bg-bg-subcard rounded-lg p-6 border ${
        isOverall ? "border-border-active" : "border-border-light"
      }`}
    >
      <p className="text-xs text-text-muted uppercase tracking-wider mb-4">
        {isOverall
          ? t("scoreGrid.overallScore")
          : t("scoreGrid.scoreBreakdown")}
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
};

const SCORE_CARDS: Array<{
  key: keyof FinalScores;
  label: string;
  subtitle: string;
  color: string;
  isOverall?: boolean;
}> = [
  {
    key: "overall",
    label: "scoreGrid.overall.label",
    subtitle: "scoreGrid.overall.subtitle",
    color: "#10b981",
    isOverall: true,
  },
  {
    key: "fluency",
    label: "scoreGrid.communication.label",
    subtitle: "scoreGrid.communication.subtitle",
    color: "#8b5cf6",
  },
  {
    key: "nlp",
    label: "scoreGrid.technical.label",
    subtitle: "scoreGrid.technical.subtitle",
    color: "#06b6d4",
  },
  {
    key: "energy",
    label: "scoreGrid.confidence.label",
    subtitle: "scoreGrid.confidence.subtitle",
    color: "#10b981",
  },
  {
    key: "eyeContact",
    label: "scoreGrid.eyeContact.label",
    subtitle: "scoreGrid.eyeContact.subtitle",
    color: "#10b981",
  },
  {
    key: "headPose",
    label: "scoreGrid.headPose.label",
    subtitle: "scoreGrid.headPose.subtitle",
    color: "#10b981",
  },
  {
    key: "answerRelevance",
    label: "scoreGrid.answerRelevance.label",
    subtitle: "scoreGrid.answerRelevance.subtitle",
    color: "#10b981",
  },
];

const ScoreGrid = ({ finalScores }: ScoreGridProps) => {
  const { t } = useTranslation();
  // FIX: finalScores is null for video interviews — show nothing if no scores
  if (!finalScores) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {SCORE_CARDS.map(({ key, label, subtitle, color, isOverall }) => {
        const value = finalScores[key];

        // render only cards with values
        if (value == null) return null;

        return (
          <ScoreCard
            key={key}
            label={t(label)}
            subtitle={t(subtitle)}
            percentage={toPercent(value as number)}
            color={color}
            isOverall={isOverall}
          />
        );
      })}
    </div>
  );
};

export default ScoreGrid;
