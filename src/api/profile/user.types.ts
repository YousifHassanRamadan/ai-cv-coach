export interface UserStats {
  totalInterviews: number;
  totalUploads: number;
  avgScore: number;
  lastActivity: string;
}

export interface User {
  id: string;
  fName: string;
  lName: string;
  email: string;
  role: "user" | "admin";
  profileImage: string | null;
  createdAt: string;
  userStats: UserStats;
}

export interface UpdateProfileResponse {
  message: string;
  message_ar: string;
  user: User;
}
