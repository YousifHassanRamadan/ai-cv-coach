export interface UploadAreaProps {
  uploadedFile: File | null;
  isUploading: boolean;
  uploadProgress: number;
  selectedTrackId: string;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onUploadNew: () => void;
}
