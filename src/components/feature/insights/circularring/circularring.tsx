import type { CircularRingProps } from "./circularring.types";

const CircularRing = ({ percentage, color, size = 90 }: CircularRingProps) => {
  const radius = (size - 10) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (percentage / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      style={{ transform: "rotate(-90deg)" }}
      aria-label={`${percentage}%`}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#1f2937"
        strokeWidth={8}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={8}
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.6s ease" }}
      />
      <text
        x={size / 2}
        y={size / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-bg-active text-[length:var(--size)] font-bold"
        style={{
          fontSize: size * 0.22,
          transform: `rotate(90deg) translate(0px, -${size}px)`,
        }}
      >
        {percentage}%
      </text>
    </svg>
  );
};

export default CircularRing;
