import { BarChart2, Zap, Mic, Brain } from "lucide-react";

import type { MetaStatsProps } from "./metastats.types";
import StatPill from "../statpill/statpill";

const MetaStats = ({ data }: MetaStatsProps) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
    <StatPill
      icon={<BarChart2 size={18} />}
      label="Difficulty"
      value={data.difficulty}
    />
    <StatPill
      icon={<Zap size={18} />}
      label="Experience"
      value={data.experienceLevel}
    />
    <StatPill
      icon={<Mic size={18} />}
      label="Mode"
      value={data.mode.toUpperCase()}
    />
    <StatPill
      icon={<Brain size={18} />}
      label="Questions"
      value={`${data.questionCount} asked`}
    />
  </div>
);

export default MetaStats;
