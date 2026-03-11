// JobDescriptionInput.tsx
import React from "react";
import type { JobDescriptionInputProps } from "./job-description-input.types";

const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({
  isVisible,
  value,
  onToggle,
  onChange,
}) => (
  <div>
    <button
      onClick={onToggle}
      className="text-xs text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
    >
      <span>{isVisible ? "− Hide" : "+ Add"} Job Description (optional)</span>
    </button>
    {isVisible && (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste job description here to improve match analysis..."
        rows={3}
        className="mt-2 w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-300 placeholder-gray-600 resize-none focus:outline-none focus:border-purple-600/50 transition-colors"
      />
    )}
  </div>
);

export default JobDescriptionInput;
