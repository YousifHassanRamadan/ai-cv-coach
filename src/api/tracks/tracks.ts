import { useQuery } from "@tanstack/react-query";
import type { Track, TrackDetails } from "./tracks.types";
import { getTracks, getTrackById } from "./tracks.api";

export const useTracks = () => {
  return useQuery<Track[]>({
    queryKey: ["tracks"],
    queryFn: getTracks,
  });
};

export const useTrack = (trackId: string) => {
  return useQuery<TrackDetails>({
    queryKey: ["track", trackId],
    queryFn: () => getTrackById(trackId),
    enabled: !!trackId,
  });
};
