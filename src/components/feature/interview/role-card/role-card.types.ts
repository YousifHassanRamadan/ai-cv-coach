import type { JSX } from "react";

export interface RoleCardProps {
  icon: JSX.Element;
  label: string;
  selected: boolean;
  onClick: () => void;
}
