export interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  currentRole: string;
  interviews: number;
  avgScore: number;
  dayStreak: number;
  badges: number;
}

export interface NotificationPreferences {
  emailNotifications: boolean;
  practiceReminders: boolean;
  weeklyInsights: boolean;
  interviewTips: boolean;
}
