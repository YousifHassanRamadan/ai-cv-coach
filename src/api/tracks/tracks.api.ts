import { api } from "../../utils/axios";
import type { Track, TrackDetails } from "./tracks.types";

export const getTracks = async (): Promise<Track[]> => {
  const res = await api.get<Track[]>("/tracks");
  return res.data;
};

export const getTrackById = async (trackId: string): Promise<TrackDetails> => {
  const res = await api.get<TrackDetails>(`/tracks/${trackId}`);
  return res.data;
};
