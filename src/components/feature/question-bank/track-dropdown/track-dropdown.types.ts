import type { Track } from "../../../../api/tracks";

export interface TrackDropdownProps {
  tracks: Track[];
  selectedTrack: string | null;
  isLoading?: boolean;
  onTrackChange: (slug: string | null) => void;
}
