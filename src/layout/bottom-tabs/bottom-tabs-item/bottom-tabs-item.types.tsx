import { Home, FileText, Mail, Video, BarChart2, User } from "lucide-react";

export const ICON_MAP: Record<string, React.ReactNode> = {
  Dashboard: <Home size={22} />,
  Resume: <FileText size={22} />,
  Cover: <Mail size={22} />,
  Interview: <Video size={22} />,
  Insights: <BarChart2 size={22} />,
  Profile: <User size={22} />,
};

// ── Sub-component ──────────────────────────────────────────
export type TBottomTabsItemProps = {
  path: string;
  label: string;
  icon?: string;
};
