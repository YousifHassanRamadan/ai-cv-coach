import {
  BarChart3,
  FileText,
  Home,
  Mail,
  SettingsIcon,
  User,
  Video,
} from "lucide-react";

export const LINKS = [
  { text: "Dashboard", link: "/" },
  { text: "Resume", link: "/resume" },
  { text: "Cover Letter", link: "/cover-letter" },
  { text: "Interview", link: "/interview" },
  { text: "Insights", link: "/insights" },
  { text: "Profile", link: "/profile" },
];

export const ICON_MAP = {
  dashboard: Home,
  resume: FileText,
  "cover letter": Mail,
  interview: Video,
  insights: BarChart3,
  profile: User,
  settings: SettingsIcon,
};
