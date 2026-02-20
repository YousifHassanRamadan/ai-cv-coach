export interface PrivacyToggleProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
  variant?: "default" | "disabled";
}
