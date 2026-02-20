import { Smile } from "lucide-react";

const ExpressionsCard = () => {
  return (
    <div className="bg-[#1a1a24] rounded-lg p-6 border border-gray-800">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-6 h-6 bg-purple-500/20 rounded flex items-center justify-center">
          <Smile className="w-4 h-4 text-purple-500" />
        </div>
        <h3 className="font-semibold">Expressions</h3>
      </div>
      <div className="flex items-center justify-center py-8">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="#2a2a3a"
              strokeWidth="12"
              fill="none"
            />
            {/* Confident - Teal segment (45%) */}
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="#14b8a6"
              strokeWidth="12"
              fill="none"
              strokeDasharray="440"
              strokeDashoffset="242"
              strokeLinecap="round"
            />
            {/* Engaged - Purple segment (30%) */}
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="#8b5cf6"
              strokeWidth="12"
              fill="none"
              strokeDasharray="440"
              strokeDashoffset="374"
              strokeLinecap="round"
            />
            {/* Neutral - Gray segment (25%) */}
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="#6b7280"
              strokeWidth="12"
              fill="none"
              strokeDasharray="440"
              strokeDashoffset="418"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
            <span className="text-gray-400">Confident</span>
          </div>
          <span className="font-semibold">45%</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-gray-400">Engaged</span>
          </div>
          <span className="font-semibold">30%</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <span className="text-gray-400">Neutral</span>
          </div>
          <span className="font-semibold">25%</span>
        </div>
      </div>
    </div>
  );
};

export default ExpressionsCard;
