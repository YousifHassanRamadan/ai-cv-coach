import { useState } from "react";
import { TrendingUp, ChevronDown } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { ProgressChartProps } from "./progress-chart.types";
import { toPercent } from "../../../../utils/insights.utils";
import SectionCard from "../section-card/section-card";
import { ProgressTooltip } from "../chart-tool-tips";

// Static progress history — replace with a real history endpoint when available
const PROGRESS_DATA = [
  { week: "Week 1", score: 58 },
  { week: "Week 2", score: 64 },
  { week: "Week 3", score: 71 },
  { week: "Week 4", score: 76 },
];

const ProgressChart = ({ currentScore }: ProgressChartProps) => {
  const [timeRange] = useState("Last 5 weeks");

  const data = [
    ...PROGRESS_DATA,
    { week: "This week", score: toPercent(currentScore) },
  ];

  return (
    <SectionCard
      icon={<TrendingUp className="w-4 h-4 text-purple-500" />}
      iconBg="bg-purple-500/20"
      title="Your Progress"
      rightSlot={
        <button className="flex items-center gap-2 px-3 py-1.5 bg-[#0f1419] border border-gray-800 rounded-lg text-sm hover:border-gray-700 transition">
          {timeRange}
          <ChevronDown className="w-4 h-4" />
        </button>
      }
    >
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis
              dataKey="week"
              stroke="#6b7280"
              style={{ fontSize: "12px" }}
            />
            <YAxis
              stroke="#6b7280"
              style={{ fontSize: "12px" }}
              domain={[0, 100]}
            />
            <Tooltip content={<ProgressTooltip />} />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={{ fill: "#8b5cf6", r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center gap-2 mt-4">
        <TrendingUp className="w-4 h-4 text-teal-400" />
        <span className="text-sm text-teal-400">
          Score this session: {toPercent(currentScore)}%
        </span>
      </div>
    </SectionCard>
  );
};

export default ProgressChart;
