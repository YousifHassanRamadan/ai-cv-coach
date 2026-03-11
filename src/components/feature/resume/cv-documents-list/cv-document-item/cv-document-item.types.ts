import type { CvDocument } from "../../../../../api/cv";

export interface CvDocumentItemProps {
  doc: CvDocument;
  selectedTrackId: string;
  isEvaluating: boolean;
  isEvaluatePending: boolean;
  isDeletePending: boolean;
  onEvaluate: (doc: CvDocument) => void;
  onDelete: (id: string) => void;
}
