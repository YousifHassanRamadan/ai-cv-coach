export interface PrivacySettings {
  biometricDataProcessing: boolean;
  endToEndEncryption: boolean;
  localProcessing: boolean;
}

export interface PrivacyControlsSectionProps {
  settings: PrivacySettings;
  onToggle: (key: keyof PrivacySettings) => void;
}
