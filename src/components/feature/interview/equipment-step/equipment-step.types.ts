export interface EquipmentStepProps {
  cameraEnabled: boolean;
  micEnabled: boolean;
  setCameraEnabled: (v: boolean) => void;
  setMicEnabled: (v: boolean) => void;
  onBack: () => void;
}
