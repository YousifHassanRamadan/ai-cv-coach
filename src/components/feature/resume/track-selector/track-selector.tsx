// TrackSelector.tsx
import React from "react";
import { ChevronDown } from "lucide-react";
import type { TrackSelectorProps } from "./track-selector.types";
import { useTranslation } from "react-i18next";

const TrackSelector: React.FC<TrackSelectorProps> = ({
  tracks,
  selectedTrackId,
  isLoading,
  isOpen,
  onToggle,
  onSelect,
}) => {
  const selectedTrack = tracks.find((t) => t.id === selectedTrackId);

  const { t } = useTranslation();

  return (
    <div className="relative">
      <label className="block text-xs text-text-muted mb-1.5 uppercase tracking-wider">
        {t("selectTrack")}
      </label>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-2.5 bg-bg-tertiary border border-border-light rounded-lg text-sm hover:border-border-active/50 transition-colors"
      >
        <span
          className={selectedTrack ? "text-text-secondary" : "text-text-muted"}
        >
          {isLoading
            ? t("loadingTracks")
            : (selectedTrack?.name ?? t("chooseTrack"))}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-text-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-20 top-full mt-1 w-full bg-bg-tertiary border border-border-light rounded-lg shadow-xl overflow-hidden">
          {tracks.length === 0 ? (
            <div className="px-4 py-3 text-sm text-text-primary">
              {t("noTracks")}
            </div>
          ) : (
            tracks.map((track) => (
              <button
                key={track.id}
                onClick={() => onSelect(track.id)}
                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-bg-active/20 transition-colors ${
                  selectedTrackId === track.id
                    ? "text-text-active bg-bg-active/10"
                    : "text-text-primary"
                }`}
              >
                {track.name}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default TrackSelector;
