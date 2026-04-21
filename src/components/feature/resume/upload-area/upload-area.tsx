// UploadArea.tsx
import React from "react";
import { CheckCircle, Upload, FileText } from "lucide-react";
import OutlinedButton from "../../../common/outlined-button/outlined-button";
import type { UploadAreaProps } from "./upload-area.types";

const UploadArea: React.FC<UploadAreaProps> = ({
  uploadedFile,
  isUploading,
  uploadProgress,
  selectedTrackId,
  onFileSelect,
  onDrop,
  onDragOver,
  onUploadNew,
}) => {
  if (uploadedFile && !isUploading) {
    return (
      <div className="text-center py-6">
        <div className="flex justify-center mb-3">
          <div className="w-14 h-14 bg-green-500/10 rounded-full flex items-center justify-center">
            <CheckCircle className="w-7 h-7 text-green-500" strokeWidth={2} />
          </div>
        </div>
        <p className="text-green-500 font-medium mb-1">Upload Complete!</p>
        <p className="text-xs text-gray-500 mb-4">{uploadedFile.name}</p>
        <div className="flex justify-center">
          <OutlinedButton text="Upload New CV" onClick={onUploadNew} />
        </div>
      </div>
    );
  }

  if (isUploading) {
    return (
      <div className="text-center py-6">
        <div className="flex justify-center mb-3">
          <div className="w-14 h-14 bg-bg-active/10 rounded-full flex items-center justify-center">
            <FileText className="w-7 h-7 text-text-active" strokeWidth={2} />
          </div>
        </div>
        <p className="text-text-muted font-medium mb-4">Uploading...</p>
        <div className="max-w-xs mx-auto">
          <div className="h-2 bg-bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-text-active to-text-active transition-all duration-300 ease-out rounded-full"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-10 text-center transition-colors ${
        selectedTrackId
          ? "border-border-light hover:border-border-active/50 cursor-pointer"
          : "border-gray-800 opacity-50 cursor-not-allowed"
      }`}
      onDrop={selectedTrackId ? onDrop : undefined}
      onDragOver={selectedTrackId ? onDragOver : undefined}
      onClick={() =>
        selectedTrackId && document.getElementById("cv-upload-input")?.click()
      }
    >
      <div className="flex justify-center mb-3">
        <div className="w-12 h-12 bg-bg-active/10 rounded-full flex items-center justify-center">
          <Upload className="w-6 h-6 text-text-active" strokeWidth={2} />
        </div>
      </div>
      <p className="text-text-muted font-medium mb-1 text-sm">
        Drop your CV here
      </p>
      <p className="text-xs text-text-muted">
        {selectedTrackId
          ? "or click to browse (PDF, DOCX)"
          : "Select a track first"}
      </p>
      <input
        id="cv-upload-input"
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={onFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default UploadArea;
