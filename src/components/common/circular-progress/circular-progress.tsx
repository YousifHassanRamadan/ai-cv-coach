interface CircularProgressProps {
  percentage: number;
  color: string;
  size?: "small" | "medium" | "large";
  strokeWidth?: number;
}

const CircularProgress = ({
  percentage,
  color,
  size = "medium",
  strokeWidth = 10,
}: CircularProgressProps) => {
  const sizes = {
    small: { width: 96, height: 96, radius: 38 },
    medium: { width: 128, height: 128, radius: 56 },
    large: { width: 160, height: 160, radius: 70 },
  };

  const { width, height, radius } = sizes[size];
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width, height }}>
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          stroke="#2a2a3a"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl font-bold">{percentage}%</span>
      </div>
    </div>
  );
};

export default CircularProgress;
