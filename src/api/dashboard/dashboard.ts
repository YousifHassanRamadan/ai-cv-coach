import { useQuery } from "@tanstack/react-query";
import type { DashboardStats } from "./dashboard.types";
import { getDashboardStats } from "./dashboard.api";

export const useDashboardStats = () => {
  return useQuery<DashboardStats>({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
  });
};
