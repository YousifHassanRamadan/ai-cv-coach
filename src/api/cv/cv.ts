import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  CvDocument,
  DeleteCvDocumentResponse,
  EvaluateCvPayload,
  EvaluateCvResponse,
  UploadCvPayload,
  UploadCvResponse,
} from "./cv.types";
import {
  deleteCvDocument,
  evaluateCv,
  getCvDocuments,
  uploadCv,
} from "./cv.api";
import { toast } from "sonner";

export const useUploadCv = () => {
  const queryClient = useQueryClient();

  return useMutation<UploadCvResponse, Error, UploadCvPayload>({
    mutationFn: uploadCv,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cv-documents"] });
      toast.success("CV uploaded successfully!");
    },

    onError: (error) => {
      toast.error(`Upload failed: ${error.message}`);
    },
  });
};

export const useCvDocuments = () => {
  return useQuery<CvDocument[]>({
    queryKey: ["cv-documents"],
    queryFn: getCvDocuments,
  });
};

export const useDeleteCvDocument = () => {
  const queryClient = useQueryClient();

  return useMutation<DeleteCvDocumentResponse, Error, string>({
    mutationFn: deleteCvDocument,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cv-documents"] });
      toast.success(data.message || "Deleted successfully");
    },

    onError: (error) => {
      toast.error(`Delete failed: ${error.message}`);
    },
  });
};

export const useEvaluateCv = () => {
  const queryClient = useQueryClient();
  return useMutation<EvaluateCvResponse, Error, EvaluateCvPayload>({
    mutationFn: evaluateCv,

    onSuccess: (data) => {
      toast.success("CV evaluated successfully");
      queryClient.setQueryData(["cv-evaluate"], data);
    },

    onError: (error) => {
      toast.error(`Evaluation failed: ${error.message}`);
    },
  });
};
