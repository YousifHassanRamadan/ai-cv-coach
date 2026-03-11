// TrackSelector.tsx
import React from "react";
import { ChevronDown } from "lucide-react";
import type { TrackSelectorProps } from "./track-selector.types";

const TrackSelector: React.FC<TrackSelectorProps> = ({
  tracks,
  selectedTrackId,
  isLoading,
  isOpen,
  onToggle,
  onSelect,
}) => {
  const selectedTrack = tracks.find((t) => t.id === selectedTrackId);

  return (
    <div className="relative">
      <label className="block text-xs text-gray-500 mb-1.5 uppercase tracking-wider">
        Select Track
      </label>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-sm hover:border-purple-600/50 transition-colors"
      >
        <span className={selectedTrack ? "text-white" : "text-gray-500"}>
          {isLoading
            ? "Loading tracks..."
            : (selectedTrack?.name ?? "Choose a track...")}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-20 top-full mt-1 w-full bg-gray-900 border border-gray-700 rounded-lg shadow-xl overflow-hidden">
          {tracks.length === 0 ? (
            <div className="px-4 py-3 text-sm text-gray-500">
              No tracks available
            </div>
          ) : (
            tracks.map((track) => (
              <button
                key={track.id}
                onClick={() => onSelect(track.id)}
                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-purple-600/10 transition-colors ${
                  selectedTrackId === track.id
                    ? "text-purple-400 bg-purple-600/10"
                    : "text-gray-300"
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
