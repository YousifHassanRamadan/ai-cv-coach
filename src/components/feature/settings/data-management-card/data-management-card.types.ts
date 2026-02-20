export interface DataManagementCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  buttonIcon: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "warning";
}
