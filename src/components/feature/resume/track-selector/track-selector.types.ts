export interface TrackSelectorProps {
  tracks: Track[];
  selectedTrackId: string;
  isLoading: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (id: string) => void;
}

export interface Track {
  id: string;
  name: string;
}
