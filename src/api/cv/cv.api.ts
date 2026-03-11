import { api } from "../../utils/axios";
import type {
  CvDocument,
  DeleteCvDocumentResponse,
  EvaluateCvPayload,
  EvaluateCvResponse,
  UploadCvPayload,
  UploadCvResponse,
} from "./cv.types";

export const uploadCv = async (
  payload: UploadCvPayload,
): Promise<UploadCvResponse> => {
  const formData = new FormData();

  formData.append("file", payload.file);
  formData.append("trackId", payload.trackId);

  if (payload.jdText) {
    formData.append("jdText", payload.jdText);
  }

  const res = await api.post<UploadCvResponse>(
    "/cv-documents/upload",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );

  return res.data;
};

export const getCvDocuments = async (): Promise<CvDocument[]> => {
  const res = await api.get<CvDocument[]>("/cv-documents");
  return res.data;
};

export const deleteCvDocument = async (
  cvDocumentId: string,
): Promise<DeleteCvDocumentResponse> => {
  const res = await api.delete<DeleteCvDocumentResponse>(
    `/cv-documents/${cvDocumentId}`,
  );
  return res.data;
};

export const evaluateCv = async (
  payload: EvaluateCvPayload,
): Promise<EvaluateCvResponse> => {
  const res = await api.post<EvaluateCvResponse>(
    "/cv-documents/evaluate",
    payload,
  );

  return res.data;
};
