import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { ScoreTrendChartProps } from "./score-trend-chart.types";

const ScoreTrendChart: React.FC<ScoreTrendChartProps> = ({
  data,
  trendLabel = "+15% this month",
}) => {
  return (
    <div className="bg-bg-card border border-border-card rounded-xl p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-4">
        <h3 className="text-sm sm:text-base font-semibold text-white flex items-center gap-2">
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
          Score Trend
        </h3>
        {trendLabel && (
          <span className="text-[10px] sm:text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded w-fit">
            {trendLabel}
          </span>
        )}
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="date"
            stroke="#9CA3AF"
            style={{ fontSize: "10px" }}
            interval="preserveStartEnd"
          />
          <YAxis
            stroke="#9CA3AF"
            style={{ fontSize: "10px" }}
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "1px solid #374151",
              borderRadius: "8px",
              color: "#fff",
              fontSize: "12px",
            }}
            labelStyle={{ color: "#9CA3AF" }}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#8B5CF6"
            strokeWidth={2}
            dot={{ fill: "#8B5CF6", r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScoreTrendChart;
