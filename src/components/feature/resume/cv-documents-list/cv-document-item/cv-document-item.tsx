// CvDocumentItem.tsx
import React from "react";
import { FileText, Clock, Zap, Loader2, Trash2 } from "lucide-react";
import type { CvDocumentItemProps } from "./cv-document-item.types";

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const CvDocumentItem: React.FC<CvDocumentItemProps> = ({
  doc,
  selectedTrackId,
  isEvaluating,
  isEvaluatePending,
  isDeletePending,
  onEvaluate,
  onDelete,
}) => (
  <div className="flex items-center gap-3 px-3 py-2.5 bg-gray-900/60 border border-gray-800 rounded-lg group">
    <FileText className="w-4 h-4 text-gray-500 flex-shrink-0" />

    <div className="flex-1 min-w-0">
      <p className="text-sm text-gray-300 truncate">{doc.fileName}</p>
      <div className="flex items-center gap-2 mt-0.5">
        <Clock className="w-3 h-3 text-gray-600" />
        <span className="text-xs text-gray-600">
          {formatDate(doc.uploadedAt)}
        </span>
        {doc.jdText && (
          <span className="text-xs text-purple-500/70 bg-purple-500/10 px-1.5 rounded">
            JD
          </span>
        )}
      </div>
    </div>

    <button
      onClick={() => onEvaluate(doc)}
      disabled={!selectedTrackId || isEvaluating || isEvaluatePending}
      title={
        !selectedTrackId ? "Select a track to evaluate" : "Analyze with AI"
      }
      className="flex items-center gap-1 px-2 py-1 rounded text-xs bg-purple-600/10 text-purple-400 hover:bg-purple-600/20 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
    >
      {isEvaluating ? (
        <Loader2 className="w-3 h-3 animate-spin" />
      ) : (
        <Zap className="w-3 h-3" />
      )}
      <span>Analyze</span>
    </button>

    <button
      onClick={() => onDelete(doc.id)}
      disabled={isDeletePending}
      className="p-1 rounded  text-red-400 bg-red-500/10 transition-colors hover:bg-red-500/20"
    >
      <Trash2 className="w-3.5 h-3.5" />
    </button>
  </div>
);

export default CvDocumentItem;
