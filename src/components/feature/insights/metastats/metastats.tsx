import { BarChart2, Zap, Mic, Brain } from "lucide-react";

import type { MetaStatsProps } from "./metastats.types";
import StatPill from "../statpill/statpill";
import { useTranslation } from "react-i18next";

const MetaStats = ({ data }: MetaStatsProps) => {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <StatPill
        icon={<BarChart2 size={18} />}
        label={t("metaStats.difficulty")}
        value={data.difficulty}
      />

      <StatPill
        icon={<Zap size={18} />}
        label={t("metaStats.experience")}
        value={data.experienceLevel}
      />

      <StatPill
        icon={<Mic size={18} />}
        label={t("metaStats.mode")}
        value={data.mode.toUpperCase()}
      />

      <StatPill
        icon={<Brain size={18} />}
        label={t("metaStats.questions")}
        value={t("metaStats.questionsAsked", {
          count: data.questionCount,
        })}
      />
    </div>
  );
};

export default MetaStats;
