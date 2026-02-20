import React from "react";
import type {
  DataRetentionPeriod,
  DataRetentionSelectProps,
} from "./data-retention-select.types";

const DataRetentionSelect: React.FC<DataRetentionSelectProps> = ({
  value,
  onChange,
}) => {
  const options: DataRetentionPeriod[] = [
    "30 days",
    "60 days",
    "90 days",
    "180 days",
    "1 year",
    "Never",
  ];

  return (
    <div className="space-y-2">
      <label className="block text-xs font-medium text-gray-300">
        Auto-delete interview data after
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as DataRetentionPeriod)}
        className="w-full bg-slate-800/60 border border-slate-700/50 rounded-lg px-4 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <p className="text-xs text-gray-400">
        Automatically remove recordings and analysis data after the selected
        period
      </p>
    </div>
  );
};

export default DataRetentionSelect;
