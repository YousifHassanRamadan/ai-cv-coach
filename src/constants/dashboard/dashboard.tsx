import { Trophy, Star, Flame, Zap, Medal, Crown, Video } from "lucide-react";

export const stats = [
  {
    label: "INTERVIEWS",
    value: "12",
    icon: <Video size={20} className="text-indigo-400" />,
    iconBg: "bg-indigo-500/20",
    footer: { icon: "↗", text: "+3 this week", color: "text-green-400" },
    progress: null,
  },
  {
    label: "CV SCORE",
    value: "78%",
    icon: null,
    iconBg: "",
    footer: { icon: "◎", text: "ATS Optimized", color: "text-cyan-400" },
    progress: { percentage: 78, color: "#06b6d4" },
  },
  {
    label: "STREAK",
    value: "5 days",
    icon: <span className="text-orange-400 text-lg">🔥</span>,
    iconBg: "bg-orange-500/20",
    footer: { icon: "🔥", text: "Keep it up!", color: "text-orange-400" },
    progress: null,
  },
  {
    label: "READINESS",
    value: "72%",
    icon: null,
    iconBg: "",
    footer: { icon: "↗", text: "+8% growth", color: "text-green-400" },
    progress: { percentage: 72, color: "#22c55e" },
  },
];

export const sessions = [
  {
    title: "Frontend Developer",
    company: "TechCorp",
    score: 85,
    scoreColor: "text-green-400",
    duration: "23 min",
    time: "Today",
  },
  {
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    score: 72,
    scoreColor: "text-yellow-400",
    duration: "28 min",
    time: "Yesterday",
  },
  {
    title: "React Developer",
    company: "DigitalCo",
    score: 88,
    scoreColor: "text-green-400",
    duration: "20 min",
    time: "3 days ago",
  },
];

export const achievements = [
  { label: "First Interview", icon: Trophy, active: true },
  { label: "Perfect Score", icon: Star, active: true },
  { label: "5 Day Streak", icon: Flame, active: true },
  { label: "Quick Learner", icon: Zap, active: true },
  { label: "Top 10%", icon: Medal, active: false },
  { label: "Interview Master", icon: Crown, active: false },
];
