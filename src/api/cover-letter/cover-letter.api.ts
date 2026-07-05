import { api } from "../../utils/axios";
import type { GenerateCoverLetterPayload } from "./cover-letter.types";

export const generateCoverLetter = async ({
  jobTitle,
  trackId,
}: GenerateCoverLetterPayload) => {
  const res = await api.post("/cv-builder/generate", {
    jobTitle,
    trackId,
  });

  // console.log("✅ API response:", res.data);
  return res.data;
};

export const getListOfCoverLetters = async () => {
  const res = await api.get("/cv-builder/list");
  return res.data;
};
