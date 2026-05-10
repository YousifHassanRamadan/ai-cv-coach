import React, { useState } from "react";

import {
  useUploadCv,
  useCvDocuments,
  useDeleteCvDocument,
  useEvaluateCv,
  type CvDocument,
} from "../../../../api/cv";
import { useTracks } from "../../../../api/tracks";
import TrackSelector from "../track-selector/track-selector";
import JobDescriptionInput from "../job-description-input/job-description-input";
import UploadArea from "../upload-area/upload-area";
import CvDocumentsList from "../cv-documents-list/cv-documents-list";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

const UploadCvSection: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedTrackId, setSelectedTrackId] = useState<string>("");
  const [isTrackDropdownOpen, setIsTrackDropdownOpen] = useState(false);
  const [jdText, setJdText] = useState("");
  const [showJdInput, setShowJdInput] = useState(false);
  const [evaluatingCvId, setEvaluatingCvId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { t } = useTranslation();

  const { data: tracks = [], isLoading: isTracksLoading } = useTracks();
  const { data: cvDocuments = [], isLoading: isCvDocumentsLoading } =
    useCvDocuments();

  const { mutate: uploadCvMutation } = useUploadCv();
  const { mutate: deleteCvMutation, isPending: isDeletePending } =
    useDeleteCvDocument();
  const { mutate: evaluateCvMutation, isPending: isEvaluatePending } =
    useEvaluateCv();

  const handleFileUpload = (file: File) => {
    if (!selectedTrackId) return;
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 150);

    uploadCvMutation(
      { file, trackId: selectedTrackId, jdText: jdText || undefined },
      {
        onSuccess: () => {
          clearInterval(interval);
          queryClient.setQueryData(["cv-evaluate"], null);
          setUploadProgress(100);
          setTimeout(() => {
            setIsUploading(false);
            setUploadedFile(file);
          }, 400);
        },
        onError: () => {
          clearInterval(interval);
          setIsUploading(false);
          setUploadProgress(0);
        },
      },
    );
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    queryClient.setQueryData(["cv-evaluate"], null);
    if (file) handleFileUpload(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    queryClient.setQueryData(["cv-evaluate"], null);
    if (file) handleFileUpload(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) =>
    e.preventDefault();

  const handleUploadNew = () => {
    setUploadedFile(null);
    setIsUploading(false);
    setUploadProgress(0);
  };

  const handleDelete = (cvDocumentId: string) => {
    deleteCvMutation(cvDocumentId, {
      onSuccess: () => {
        queryClient.setQueryData(["cv-evaluate"], null);
        setEvaluatingCvId(null);
      },
    });
  };

  const handleEvaluate = (doc: CvDocument) => {
    if (!selectedTrackId) return;
    setEvaluatingCvId(doc.id);
    evaluateCvMutation(
      {
        cvDocumentId: doc.id,
        trackId: selectedTrackId,
        jdText: jdText || undefined,
      },
      {
        onSuccess: () => setEvaluatingCvId(null),
        onError: () => setEvaluatingCvId(null),
      },
    );
  };

  return (
    <div className="bg-bg-card rounded-lg p-6 border border-border-light space-y-5">
      <h2 className="text-lg font-semibold">{t("uploadCvTitle")}</h2>

      <TrackSelector
        tracks={tracks}
        selectedTrackId={selectedTrackId}
        isLoading={isTracksLoading}
        isOpen={isTrackDropdownOpen}
        onToggle={() => setIsTrackDropdownOpen((v) => !v)}
        onSelect={(id) => {
          setSelectedTrackId(id);
          setIsTrackDropdownOpen(false);
        }}
      />

      <JobDescriptionInput
        isVisible={showJdInput}
        value={jdText}
        onToggle={() => setShowJdInput((v) => !v)}
        onChange={setJdText}
      />

      <UploadArea
        uploadedFile={uploadedFile}
        isUploading={isUploading}
        uploadProgress={uploadProgress}
        selectedTrackId={selectedTrackId}
        onFileSelect={handleFileSelect}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onUploadNew={handleUploadNew}
      />

      <CvDocumentsList
        documents={cvDocuments}
        isLoading={isCvDocumentsLoading}
        selectedTrackId={selectedTrackId}
        evaluatingCvId={evaluatingCvId}
        isEvaluatePending={isEvaluatePending}
        isDeletePending={isDeletePending}
        onEvaluate={handleEvaluate}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default UploadCvSection;
