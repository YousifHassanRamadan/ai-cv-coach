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
      className="text-xs text-text-active hover:text-text-active/40 transition-colors flex items-center gap-1"
    >
      <span>{isVisible ? "− Hide" : "+ Add"} Job Description (optional)</span>
    </button>
    {isVisible && (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste job description here to improve match analysis..."
        rows={3}
        className="mt-2 w-full bg-bg-secondary border border-border-light rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted resize-none focus:outline-none focus:border-text-active/50 transition-colors"
      />
    )}
  </div>
);

export default JobDescriptionInput;
