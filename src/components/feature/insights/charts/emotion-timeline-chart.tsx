import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { EmotionTooltip } from "./chart-tooltips";
import { emotionData } from "../../../../constants/insights/insights";

const EmotionTimelineChart = () => {
  return (
    <div className="bg-[#1a1a24] rounded-lg p-6 border border-gray-800 mb-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-6 h-6 bg-purple-500/20 rounded flex items-center justify-center">
          <svg
            className="w-4 h-4 text-purple-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
            />
          </svg>
        </div>
        <h3 className="font-semibold">Emotion Timeline</h3>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={emotionData}>
            <defs>
              <linearGradient
                id="confidentGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="engagedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="nervousGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
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
            <Area
              type="monotone"
              dataKey="nervous"
              stroke="#f59e0b"
              strokeWidth={2}
              fill="url(#nervousGradient)"
              name="nervous"
            />
            <Area
              type="monotone"
              dataKey="engaged"
              stroke="#8b5cf6"
              strokeWidth={2}
              fill="url(#engagedGradient)"
              name="engaged"
            />
            <Area
              type="monotone"
              dataKey="confident"
              stroke="#14b8a6"
              strokeWidth={2}
              fill="url(#confidentGradient)"
              name="confident"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
          <span className="text-sm text-gray-400">Confident</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          <span className="text-sm text-gray-400">Engaged</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          <span className="text-sm text-gray-400">Nervous</span>
        </div>
      </div>
    </div>
  );
};

export default EmotionTimelineChart;
