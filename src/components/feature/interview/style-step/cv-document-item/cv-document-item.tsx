// cv-document-item.tsx
import { FileText, CheckCircle2 } from "lucide-react";
import type { CvDocumentItemProps } from "./cv-document-item.types";

const CvDocumentItem = ({
  doc,
  selectedCvId,
  setSelectedCvId,
}: CvDocumentItemProps) => {
  return (
    <button
      key={doc.id}
      onClick={() => setSelectedCvId(selectedCvId === doc.id ? "" : doc.id)}
      className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 text-sm font-medium transition-all duration-300
        ${
          selectedCvId === doc.id
            ? "border-border-active bg-bg-active text-white shadow-md shadow-purple-500/20"
            : "border-border-light bg-bg-card text-text-muted hover:border-border-active hover:text-text-active"
        }`}
    >
      <FileText
        size={14}
        className={
          selectedCvId === doc.id ? "text-text-primary" : "text-text-muted"
        }
      />
      <span className="truncate max-w-[160px]">{doc.fileName}</span>
      {selectedCvId === doc.id && (
        <CheckCircle2 size={14} className="text-text-primary shrink-0" />
      )}
    </button>
  );
};

export default CvDocumentItem;
