import type { ReactNode } from "react";

export interface SectionCardProps {
  icon: ReactNode;
  iconBg: string;
  title: string;
  children: ReactNode;
  className?: string;
  rightSlot?: ReactNode;
}
