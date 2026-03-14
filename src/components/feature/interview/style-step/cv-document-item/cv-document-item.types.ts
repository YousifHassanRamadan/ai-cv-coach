import type { CvDocument } from "../../../../../api/cv";

export interface CvDocumentItemProps {
  doc: CvDocument;
  selectedCvId: string | null;
  setSelectedCvId: (id: string) => void;
}
