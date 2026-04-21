import React from "react";
import type { WeightProfilesCardProps } from "./weight-profiles-card.types";

const WeightProfilesCard: React.FC<WeightProfilesCardProps> = ({
  profile,
  selectedWeightProfile,
  setSelectedWeightProfile,
}) => {
  const properites = [
    {
      label: "Tech",
      value: profile.technical,
      color: "bg-blue-500",
    },
    {
      label: "Behav",
      value: profile.behavioral,
      color: "bg-purple-500",
    },
    {
      label: "Sit",
      value: profile.situational,
      color: "bg-cyan-500",
    },
  ];
  return (
    <button
      key={profile.id}
      onClick={() => setSelectedWeightProfile(profile.id)}
      className={`relative p-3 sm:p-4 rounded-xl border-2 text-left transition-all duration-300 group
                ${
                  selectedWeightProfile === profile.id
                    ? "border-border-active bg-bg-active/20 shadow-md  shadow-bg-active/20"
                    : "border-border-light bg-bg-card hover:border-border-active"
                }`}
    >
      <div className="flex items-start justify-between mb-2">
        <span
          className={`text-sm font-bold transition-colors ${selectedWeightProfile === profile.id ? "text-text-active" : "text-text-muted"}`}
        >
          {profile.label}
        </span>
        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-bg-subcard text-text-muted font-medium">
          {profile.tag}
        </span>
      </div>
      <p className="text-xs text-text-muted mb-3">{profile.description}</p>

      {/* Mini bar chart */}
      <div className="space-y-1.5">
        {properites.map(
          ({ label, value, color }) =>
            value > 0 && (
              <div key={label} className="flex items-center gap-1.5">
                <span className="text-[10px] text-text-primary w-8 shrink-0">
                  {label}
                </span>
                <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${color} rounded-full transition-all duration-500`}
                    style={{ width: `${value}%` }}
                  />
                </div>
                <span className="text-[10px] text-text-muted w-6 text-right">
                  {value}%
                </span>
              </div>
            ),
        )}
      </div>

      {selectedWeightProfile === profile.id && (
        <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-bg-active rounded-full" />
      )}
    </button>
  );
};

export default WeightProfilesCard;
