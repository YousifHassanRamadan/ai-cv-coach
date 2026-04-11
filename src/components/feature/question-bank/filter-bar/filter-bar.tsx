import type { QuestionDifficulty } from "../../../../api/questions";
import { useTracks } from "../../../../api/tracks";
import { TrackDropdown } from "../track-dropdown";
import type { FilterBarProps } from "./filter-bar.types";

const DIFFICULTIES: { value: QuestionDifficulty | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

export const FilterBar = ({
  search,
  difficulty,
  selectedTrack,
  onSearchChange,
  onDifficultyChange,
  onTrackChange,
}: FilterBarProps) => {
  const { data: tracks = [], isLoading: tracksLoading } = useTracks();

  return (
    <div className="flex flex-col gap-3">
      {/* Row 1: Search */}
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#65758d]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search questions..."
          className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#18181f] border border-[#1f1f27] text-sm text-white placeholder:text-[#6b7280] focus:outline-none focus:border-[#7c3bed] transition-colors"
        />
      </div>

      {/* Row 2: Difficulty pills + Track dropdown */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Difficulty */}
        <div className="flex gap-1.5">
          {DIFFICULTIES.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => onDifficultyChange(value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                difficulty === value
                  ? "bg-[#7c3bed] text-white border border-[#7c3bed]"
                  : "bg-[#18181f] text-[#9ca3af] border border-[#1f1f27] hover:border-[#7c3bed]/40 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-[#1f1f27] mx-0.5 shrink-0" />

        {/* Track dropdown */}
        <TrackDropdown
          tracks={tracks}
          selectedTrack={selectedTrack}
          isLoading={tracksLoading}
          onTrackChange={onTrackChange}
        />
      </div>
    </div>
  );
};
