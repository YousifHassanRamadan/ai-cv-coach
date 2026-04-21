import React from "react";
import type { ExperienceLevelProps } from "./experience-level.types";

const ExperienceLevel: React.FC<ExperienceLevelProps> = ({
  experienceLevel,
  setExperienceLevel,
}) => {
  return (
    <div className="mb-8 sm:mb-10">
      <h3 className="text-lg font-bold mb-1">Experience Level</h3>
      <p className="text-text-muted text-sm mb-4">
        Tailor questions to your seniority
      </p>

      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {(["junior", "mid", "senior", "lead"] as const).map((level) => (
          <button
            key={level}
            onClick={() => setExperienceLevel(level)}
            className={`flex flex-col items-center gap-1.5 py-3 sm:py-4 rounded-xl border-2 font-semibold transition-all duration-300
          ${
            experienceLevel === level
              ? "border-border-active bg-bg-active text-white shadow-md shadow-bg-active/20 scale-105"
              : "border-border-light bg-bg-active/10 text-text-muted hover:border-border-active hover:text-white"
          }`}
          >
            <span className="text-lg sm:text-xl">
              {level === "junior"
                ? "🌱"
                : level === "mid"
                  ? "⚡"
                  : level === "senior"
                    ? "🔥"
                    : "🚀"}
            </span>
            <span className="text-xs sm:text-sm capitalize">{level}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExperienceLevel;
