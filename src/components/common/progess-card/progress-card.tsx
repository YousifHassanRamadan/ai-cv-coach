// ATSScoreCard.tsx
import React from "react";
import type { TATSScoreCardProps } from "./progress-card.types";

const ProgressCard: React.FC<TATSScoreCardProps> = ({
  title = "ATS Score",
  score,
  gradientColors = ["#f59e0b", "#fbbf24"],
  description = "Your resume is well-optimized for ATS systems",
  size = 160,
  icon: Icon,
}) => {
  const radius = size / 2 - 20; // 20 is for stroke padding
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - score / 100);

  return (
    <div className="bg-bg-card rounded-lg p-6 border border-border-light">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        {Icon && <Icon size={22} className={"text-text-muted mb-1"} />}
      </div>

      <div className="flex items-center justify-center py-8">
        <div className="relative" style={{ width: size, height: size }}>
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#2a2a3a"
              strokeWidth={12}
              fill="none"
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={`url(#gradient-${title.replace(/\s/g, "")})`}
              strokeWidth={12}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient
                id={`gradient-${title.replace(/\s/g, "")}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor={gradientColors[0]} />
                <stop offset="100%" stopColor={gradientColors[1]} />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold">{score}%</span>
          </div>
        </div>
      </div>

      <p className="text-center text-text-muted text-sm">{description}</p>
    </div>
  );
};

export default ProgressCard;
