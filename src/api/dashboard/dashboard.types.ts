export interface SessionsStats {
  total: number;
  completed: number;
  inProgress: number;
}

export interface DashboardStats {
  totalInterviews: number;
  totalUploads: number;
  avgScore: number;
  lastActivity: string;
  sessions: SessionsStats;
}
