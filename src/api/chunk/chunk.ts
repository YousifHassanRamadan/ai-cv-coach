import { useMutation, useQueryClient } from "@tanstack/react-query";
import { processAudioChunk, processChunk } from "./chunk.api";
import type {
  ChunkProcessResponse,
  ProcessAudioChunkPayload,
  ProcessChunkPayload,
} from "./chunk.types";
import { toast } from "sonner";

export const useProcessChunk = () => {
  const queryClient = useQueryClient();
  return useMutation<ChunkProcessResponse, Error, ProcessChunkPayload>({
    mutationFn: processChunk,
    onSuccess: (data) => {
      console.log("✅ Chunk success:", data); // 👈 see full response
      // toast.success("Chunk processed successfully!");
      queryClient.setQueryData(["chunk-response"], data);
    },
    onError: (error) => {
      toast.error(`Failed to process chunk: ${error.message}`);
      console.log("✅ error:", error);
    },
  });
};

export const useProcessAudioChunk = () => {
  return useMutation<ChunkProcessResponse, Error, ProcessAudioChunkPayload>({
    mutationFn: processAudioChunk,

    onSuccess: (data) => {
      toast.success("Audio processed successfully!");
      console.log("Processed audio chunk:", data);
    },

    onError: (error) => {
      toast.error(`Failed to process audio: ${error.message}`);
    },
  });
};
