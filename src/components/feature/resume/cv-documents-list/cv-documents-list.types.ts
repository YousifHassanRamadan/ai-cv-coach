import type { CvDocument } from "../../../../api/cv";

export interface CvDocumentsListProps {
  documents: CvDocument[];
  isLoading: boolean;
  selectedTrackId: string;
  evaluatingCvId: string | null;
  isEvaluatePending: boolean;
  isDeletePending: boolean;
  onEvaluate: (doc: CvDocument) => void;
  onDelete: (id: string) => void;
}
