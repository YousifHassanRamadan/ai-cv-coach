import type { StatItemProps } from "./stat-item.types";

const StatItem = ({ value, label, highlight }: StatItemProps) => {
  return (
    <div className="text-center">
      <div className={`text-2xl font-bold ${highlight ? "text-teal-400" : ""}`}>
        {typeof value === "number" && highlight ? `${value}%` : value}
      </div>
      <div className="text-xs text-gray-400 mt-1">{label}</div>
    </div>
  );
};

export default StatItem;
