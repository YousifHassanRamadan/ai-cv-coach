import type { JSX } from "react";

export interface StyleCardProps {
  icon: JSX.Element;
  label: string;
  description: string;
  color: string;
  selected: boolean;
  onClick: () => void;
}
