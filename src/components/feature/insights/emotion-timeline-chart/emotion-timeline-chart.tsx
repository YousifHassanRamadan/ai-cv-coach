import { BarChart2 } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { EmotionTimelineChartProps } from "./emotion-timeline-chart.types";
import SectionCard from "../section-card/section-card";
import { EmotionTooltip } from "../chart-tool-tips";

const EMOTION_LINES = [
  {
    key: "nervous",
    color: "#f59e0b",
    gradientId: "nervousGradient",
    label: "Nervous",
  },
  {
    key: "engaged",
    color: "#8b5cf6",
    gradientId: "engagedGradient",
    label: "Engaged",
  },
  {
    key: "confident",
    color: "#14b8a6",
    gradientId: "confidentGradient",
    label: "Confident",
  },
] as const;

const EmotionTimelineChart = ({ data }: EmotionTimelineChartProps) => {
  if (data.length === 0) return null;

  return (
    <SectionCard
      icon={<BarChart2 className="w-4 h-4 text-text-active" />}
      iconBg="bg-bg-active/20"
      title="Emotion Timeline"
      className="mb-8"
    >
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              {EMOTION_LINES.map(({ color, gradientId }) => (
                <linearGradient
                  key={gradientId}
                  id={gradientId}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis
              dataKey="time"
              stroke="#6b7280"
              style={{ fontSize: "12px" }}
            />
            <YAxis
              stroke="#6b7280"
              style={{ fontSize: "12px" }}
              domain={[0, 100]}
            />
            <Tooltip content={<EmotionTooltip />} />
            {EMOTION_LINES.map(({ key, color, gradientId, label }) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={color}
                strokeWidth={2}
                fill={`url(#${gradientId})`}
                name={label}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-4">
        {EMOTION_LINES.map(({ color, label }) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: color }}
            />
            <span className="text-sm text-gray-400">{label}</span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
};

export default EmotionTimelineChart;
