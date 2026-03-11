import { api } from "../../utils/axios";
import type { DashboardStats } from "./dashboard.types";

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const { data } = await api.get("/dashboard/stats");
  return data;
};
