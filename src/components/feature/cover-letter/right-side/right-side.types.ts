import type { ListCoverLettersResponse } from "../../../../api/cover-letter";

export type TRightSideProps = {
  generatedLetter: ListCoverLettersResponse[];
  isGeneratedLettersLoading: boolean;
};
