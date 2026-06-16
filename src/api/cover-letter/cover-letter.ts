import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import type {
  CvResponse,
  GenerateCoverLetterPayload,
  ListCoverLettersResponse,
} from "./cover-letter.types";
import { generateCoverLetter, getListOfCoverLetters } from "./cover-letter.api";

export const useCoverLetter = () => {
  const queryClient = useQueryClient();
  return useMutation<CvResponse, Error, GenerateCoverLetterPayload>({
    mutationFn: generateCoverLetter,
    onSuccess: (data) => {
      toast.success("Cover letter generated successfully!");
      queryClient.setQueryData(["cover-letter-response"], data);
      queryClient.invalidateQueries({ queryKey: ["cover-letter-list"] });
      queryClient.invalidateQueries({ queryKey: ["cv-documents"] });
    },
    onError: (error) => {
      toast.error(`Failed to process chunk: ${error.message}`);
      console.log("✅ error:", error);
    },
  });
};

export const useGetCoverLetterList = () => {
  return useQuery<ListCoverLettersResponse[]>({
    queryKey: ["cover-letter-list"],
    queryFn: getListOfCoverLetters,
  });
};
