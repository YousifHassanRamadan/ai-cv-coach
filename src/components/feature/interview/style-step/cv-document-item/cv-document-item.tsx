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
            ? "border-purple-500 bg-purple-500/10 text-white shadow-md shadow-purple-500/20"
            : "border-gray-800 bg-[#13131a] text-gray-400 hover:border-gray-600 hover:text-white"
        }`}
    >
      <FileText
        size={14}
        className={
          selectedCvId === doc.id ? "text-purple-400" : "text-gray-500"
        }
      />
      <span className="truncate max-w-[160px]">{doc.fileName}</span>
      {selectedCvId === doc.id && (
        <CheckCircle2 size={14} className="text-purple-400 shrink-0" />
      )}
    </button>
  );
};

export default CvDocumentItem;
