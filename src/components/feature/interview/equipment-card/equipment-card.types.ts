import type { JSX } from "react";

export interface EquipmentCardProps {
  title: string;
  icon: JSX.Element;
  enabled: boolean;
  onToggle: () => void;
}
