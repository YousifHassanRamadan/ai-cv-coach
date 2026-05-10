import { useState, useRef, useEffect } from "react";
import type { TrackDropdownProps } from "./track-dropdown.types";
import { useTranslation } from "react-i18next";

export const TrackDropdown = ({
  tracks,
  selectedTrack,
  isLoading,
  onTrackChange,
}: TrackDropdownProps) => {
  const { t } = useTranslation();

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
              ? "bg-bg-subcard text-text-active border-[#7c3bed]/50"
              : "bg-bg-subcard text-text-muted border border-border-light hover:border-border-active hover:text-text-primary"
          } ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <span className="max-w-[120px] truncate">
          {isLoading
            ? t("tracks.loading")
            : active
              ? active.name
              : t("tracks.all")}
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
        <div className="absolute left-0 top-full mt-1.5 z-50 w-48 rounded-xl bg-bg-subcard border border-b border-border-light shadow-2xl shadow-black/60 overflow-hidden">
          {/* All Tracks option */}
          <button
            onClick={() => handleSelect(null)}
            className={`w-full flex items-center justify-between px-3 py-2.5 text-left text-xs font-semibold transition-colors border-b border-border-light
              ${
                !selectedTrack
                  ? "bg-bg-active text-text-primary"
                  : "text-text-muted hover:bg-bg-subcard hover:text-text-primary"
              }`}
          >
            {t("tracks.all")}
            {!selectedTrack && (
              <svg
                className="w-3 h-3 shrink-0 text-text-primary"
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
              <p className="px-3 py-3 text-xs text-text-muted">
                {t("tracks.empty")}
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
                          ? "bg-bg-active text-text-primary"
                          : "text-text-muted hover:bg-bg-active/30 hover:text-text-primary"
                      }`}
                  >
                    <span className="truncate">{track.name}</span>
                    {isActive && (
                      <svg
                        className="w-3 h-3 shrink-0 text-text-primary"
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
