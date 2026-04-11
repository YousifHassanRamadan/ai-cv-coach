// ================= TYPES =================

import type { LucideIcon } from "lucide-react";

export type Accent = "indigo" | "emerald" | "amber" | "sky" | "rose";

export interface StatItemProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  accent?: Accent;
  sub?: string;
}

export interface Sessions {
  total?: number;
  completed?: number;
  inProgress?: number;
}

export interface SessionBreakdownProps {
  sessions?: Sessions;
}

export interface DashboardData {
  totalInterviews?: number;
  avgScore?: number;
  totalUploads?: number;
  lastActivity?: string;
  sessions?: Sessions;
}

export interface DashboardStatsProps {
  data?: DashboardData;
  isLoading?: boolean;
}
