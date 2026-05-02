import React from "react";
import { Download, FileText, Calendar } from "lucide-react";
import type { ListCoverLettersResponse } from "../../../../api/cover-letter";
import { downLoadFile } from "../../../../utils/download-file";

const CvCard: React.FC<ListCoverLettersResponse> = ({
  fileName,
  fileUrl,
  uploadedAt,
  trackId,
}) => {
  return (
    <div className="bg-bg-card border my-5 border-border-card rounded-2xl p-4 hover:shadow-lg transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <FileText className="text-accent-purple" size={18} />
          <h3 className="text-text-primary font-medium text-sm truncate">
            {fileName}
          </h3>
        </div>

        <button
          className="text-accent-blue hover:text-text-active transition"
          onClick={() => {
            downLoadFile(fileUrl, fileName);
          }}
        >
          <Download size={18} />
        </button>
      </div>

      {/* Info */}
      <div className="mt-3 flex items-center gap-2 text-xs text-text-muted">
        <Calendar size={14} />
        <span>{new Date(uploadedAt).toLocaleDateString("en-GB")}</span>
      </div>

      {/* Footer */}
      <div className="mt-3 flex justify-between items-center text-xs">
        <span className="text-accent-green">Ready</span>
      </div>
    </div>
  );
};

export default CvCard;
