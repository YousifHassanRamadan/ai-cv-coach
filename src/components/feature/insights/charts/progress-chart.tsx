import { TrendingUp, ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ProgressTooltip } from "./chart-tooltips";
import { progressData } from "../../../../constants/insights/insights";

const ProgressChart = () => {
  const [timeRange, setTimeRange] = useState("Last 5 weeks");

  return (
    <div className="bg-[#1a1a24] rounded-lg p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-purple-500" />
          <h3 className="font-semibold">Your Progress</h3>
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-[#0f1419] border border-gray-800 rounded-lg text-sm hover:border-gray-700 transition">
          {timeRange}
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={progressData}>
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
          +17% improvement over 5 weeks
        </span>
      </div>
    </div>
  );
};

export default ProgressChart;
