import type { LucideIcon } from "lucide-react";

export type TATSScoreCardProps = {
  title?: string; // default: "ATS Score"
  score: number; // 0 - 100
  gradientColors?: [string, string]; // start and end colors for the gradient
  description?: string; // optional description below the chart
  size?: number; // width/height of the circular chart in px, default 160
  icon: LucideIcon;
};
