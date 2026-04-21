// CvDocumentsList.tsx
import React from "react";
import { Loader2 } from "lucide-react";
import type { CvDocumentsListProps } from "./cv-documents-list.types";
import CvDocumentItem from "./cv-document-item/cv-document-item";

const CvDocumentsList: React.FC<CvDocumentsListProps> = ({
  documents,
  isLoading,
  selectedTrackId,
  evaluatingCvId,
  isEvaluatePending,
  isDeletePending,
  onEvaluate,
  onDelete,
}) => (
  <div>
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider">
        Your CVs
      </h3>
      {isLoading && (
        <Loader2 className="w-3 h-3 animate-spin text-text-muted" />
      )}
    </div>

    {documents.length === 0 && !isLoading ? (
      <p className="text-xs text-text-muted py-3 text-center border border-dashed border-text-light rounded-lg">
        No CVs uploaded yet
      </p>
    ) : (
      <div className="space-y-2">
        {documents.map((doc) => (
          <CvDocumentItem
            key={doc.id}
            doc={doc}
            selectedTrackId={selectedTrackId}
            isEvaluating={evaluatingCvId === doc.id}
            isEvaluatePending={isEvaluatePending}
            isDeletePending={isDeletePending}
            onEvaluate={onEvaluate}
            onDelete={onDelete}
          />
        ))}
      </div>
    )}
  </div>
);

export default CvDocumentsList;
