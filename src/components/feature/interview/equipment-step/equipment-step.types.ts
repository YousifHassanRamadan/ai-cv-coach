export interface EquipmentStepProps {
  cameraEnabled: boolean;
  micEnabled: boolean;
  setCameraEnabled: (v: boolean) => void;
  setMicEnabled: (v: boolean) => void;
  onBack: () => void;
  handleStartInterview: () => void;
  isStartingInterview: boolean;
}

export type DeviceStatus =
  | "idle"
  | "requesting"
  | "granted"
  | "denied"
  | "error";
