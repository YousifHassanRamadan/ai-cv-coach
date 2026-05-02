export interface AIAvatarProps {
  isListening: boolean;
  cameraEnabled: boolean;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  stream: MediaStream | null; // ✅ new prop for the MediaStream
}
