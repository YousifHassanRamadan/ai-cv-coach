import type { JSX } from "react";

export interface RoleCardProps {
  icon: React.ReactNode;
  label: string;
  selected: boolean;
  onClick: () => void;
}
