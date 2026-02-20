import React, { useState } from "react";
import { CheckCircle, Upload, FileText } from "lucide-react";
import OutlinedButton from "../../../common/outlined-button/outlined-button";

const UploadCvSection: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleFileUpload = (file: File) => {
    console.log(file); // this is the real file
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadedFile(file);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const handleUploadNewCV = () => {
    setUploadedFile(null);
    setIsUploading(false);
    setUploadProgress(0);
  };

  return (
    <div className="bg-bg-card rounded-lg p-6 border border-gray-800/50">
      <h2 className="text-lg font-semibold mb-4">Upload CV</h2>

      {/* Upload Complete State */}
      {uploadedFile && !isUploading && (
        <div className="text-center py-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-500" strokeWidth={2} />
            </div>
          </div>

          <p className="text-green-500 font-medium mb-1">Analysis Complete!</p>
          <p className="text-sm text-gray-500 mb-6">{uploadedFile.name}</p>
          <div className="flex justify-center">
            <OutlinedButton text="Upload New CV" onClick={handleUploadNewCV} />
          </div>
        </div>
      )}

      {/* Uploading State */}
      {isUploading && (
        <div className="text-center py-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center">
              <FileText className="w-8 h-8 text-text-active" strokeWidth={2} />
            </div>
          </div>

          <p className="text-gray-300 font-medium mb-4">Uploading...</p>

          <div className="max-w-xs mx-auto">
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-600 to-cyan-500 transition-all duration-300 ease-out rounded-full"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Empty State - Drop Zone */}
      {!uploadedFile && !isUploading && (
        <div
          className="border-2 border-dashed border-gray-700 rounded-lg p-12 text-center hover:border-purple-600/50 transition-colors cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => document.getElementById("cv-upload-input")?.click()}
        >
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 bg-purple-500/10 rounded-full flex items-center justify-center">
              <Upload className="w-7 h-7 text-purple-500" strokeWidth={2} />
            </div>
          </div>

          <p className="text-gray-300 font-medium mb-1">Drop your CV here</p>
          <p className="text-sm text-gray-500">
            or click to browse (PDF, DOCX)
          </p>

          <input
            id="cv-upload-input"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
};

export default UploadCvSection;
