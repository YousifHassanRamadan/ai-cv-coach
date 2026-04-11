import { useState, useRef, useEffect } from "react";
import type { TrackDropdownProps } from "./track-dropdown.types";

export const TrackDropdown = ({
  tracks,
  selectedTrack,
  isLoading,
  onTrackChange,
}: TrackDropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const active = tracks.find((t) => t.slug === selectedTrack) ?? null;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (slug: string | null) => {
    onTrackChange(slug);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        disabled={isLoading}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all
          ${
            active
              ? "bg-[#211339] text-[#7c3bed] border-[#7c3bed]/50"
              : "bg-[#18181f] text-[#9ca3af] border-[#1f1f27] hover:border-[#7c3bed]/40 hover:text-white"
          } ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <span className="max-w-[120px] truncate">
          {isLoading ? "Loading..." : active ? active.name : "All Tracks"}
        </span>
        <svg
          className={`w-3 h-3 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute left-0 top-full mt-1.5 z-50 w-48 rounded-xl bg-[#0e0e15] border border-[#1f1f27] shadow-2xl shadow-black/60 overflow-hidden">
          {/* All Tracks option */}
          <button
            onClick={() => handleSelect(null)}
            className={`w-full flex items-center justify-between px-3 py-2.5 text-left text-xs font-semibold transition-colors border-b border-[#1f1f27]
              ${
                !selectedTrack
                  ? "bg-[#211339]/70 text-[#7c3bed]"
                  : "text-[#9ca3af] hover:bg-[#14131b] hover:text-white"
              }`}
          >
            All Tracks
            {!selectedTrack && (
              <svg
                className="w-3 h-3 shrink-0 text-[#7c3bed]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>

          {/* Track list */}
          <div className="max-h-52 overflow-y-auto overscroll-contain">
            {tracks.length === 0 ? (
              <p className="px-3 py-3 text-xs text-[#6b7280]">
                No tracks available
              </p>
            ) : (
              tracks.map((track) => {
                const isActive = selectedTrack === track.slug;
                return (
                  <button
                    key={track.slug}
                    onClick={() => handleSelect(track.slug)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 text-left text-xs font-semibold transition-colors
                      ${
                        isActive
                          ? "bg-[#211339]/70 text-[#7c3bed]"
                          : "text-[#9ca3af] hover:bg-[#14131b] hover:text-white"
                      }`}
                  >
                    <span className="truncate">{track.name}</span>
                    {isActive && (
                      <svg
                        className="w-3 h-3 shrink-0 text-[#7c3bed]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
