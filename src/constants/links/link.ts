import {
  BarChart3,
  FileText,
  Home,
  Mail,
  SettingsIcon,
  User,
  Video,
  MessageSquare,
  FileQuestion,
  MessageCircleCodeIcon,
  FileTextIcon,
} from "lucide-react";

export const LINKS = [
  { text: "Dashboard", link: "/" },
  { text: "Resume", link: "/resume" },
  { text: "Cover Letter", link: "/cover-letter" },
  { text: "Interview", link: "/interview" },
  { text: "Insights", link: "/insights" },
  { text: "Profile", link: "/profile" },
  { text: "Feedback", link: "/feedback" },
  { text: "Questions", link: "/question-bank" },
  { text: "Ai Chat", link: "/ai-chat" },
  { text: "History", link: "/history" },
];

export const ICON_MAP = {
  dashboard: Home,
  resume: FileText,
  "cover letter": Mail,
  interview: Video,
  insights: BarChart3,
  profile: User,
  settings: SettingsIcon,
  feedback: MessageSquare,
  questions: FileQuestion,
  history: FileTextIcon,
  "ai chat": MessageCircleCodeIcon,
};
