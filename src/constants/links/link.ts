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
  { text: "nav.dashboard", link: "/", textForTooltip: "Dashboard" },
  { text: "nav.resume", link: "/resume", textForTooltip: "Resume" },
  {
    text: "nav.coverLetter",
    link: "/cover-letter",
    textForTooltip: "Cover Letter",
  },
  {
    text: "nav.interview",
    link: "/interview",
    textForTooltip: "Interview",
  },
  { text: "nav.insights", link: "/insights", textForTooltip: "Insights" },
  { text: "nav.profile", link: "/profile", textForTooltip: "Profile" },
  { text: "nav.feedback", link: "/feedback", textForTooltip: "Feedback" },
  {
    text: "nav.questions",
    link: "/question-bank",
    textForTooltip: "Questions",
  },
  { text: "nav.aiChat", link: "/ai-chat", textForTooltip: "AI Chat" },
  { text: "nav.history", link: "/history", textForTooltip: "History" },
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
