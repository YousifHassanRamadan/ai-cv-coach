import { mlApi } from "../../utils/axios";
import type {
  ChunkProcessResponse,
  ProcessAudioChunkPayload,
  ProcessChunkPayload,
} from "./chunk.types";

export const processChunk = async ({
  chunk_id,
  video_file,
  question_id,
}: ProcessChunkPayload): Promise<ChunkProcessResponse> => {
  const formData = new FormData();
  formData.append("chunk_id", chunk_id.toString());
  formData.append("video_file", video_file);
  formData.append("question_id", question_id.toString());
  // console.log("formData=>>", formData);

  // 👇 Log before sending
  for (const [key, value] of formData.entries()) {
    console.log(`📦 FormData key: ${key}, value:`, value);
  }

  const res = await mlApi.post<ChunkProcessResponse>(
    "/chunk/process",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return res.data;
};

export const processAudioChunk = async ({
  chunk_id,
  audio_file,
  question_id,
}: ProcessAudioChunkPayload): Promise<ChunkProcessResponse> => {
  const formData = new FormData();
  formData.append("chunk_id", chunk_id.toString());
  formData.append("audio_file", audio_file);
  formData.append("question_id", question_id.toString());

  const res = await mlApi.post<ChunkProcessResponse>(
    "/chunk/process-audio",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );

  return res.data;
};
