import { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  FileText,
  Mail,
  Video,
  BarChart2,
  User,
  MessageSquare,
  HelpCircle,
  Bot,
  History,
  Settings,
} from "lucide-react";
import { useTranslation } from "react-i18next";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NavItem {
  path: string;
  icon: React.ElementType;
  label: string;
}

interface NavDrawerProps {
  navItems?: NavItem[];
  open: boolean;
  onClose: () => void;
}

// ─── Default nav items ────────────────────────────────────────────────────────

export const DEFAULT_NAV_ITEMS: NavItem[] = [
  { path: "/", icon: LayoutDashboard, label: "nav2.dashboard" },
  { path: "/resume", icon: FileText, label: "nav2.resume" },
  { path: "/cover-letter", icon: Mail, label: "nav2.coverLetter" },
  { path: "/interview", icon: Video, label: "nav2.interview" },
  { path: "/insights", icon: BarChart2, label: "nav2.insights" },
  { path: "/profile", icon: User, label: "nav2.profile" },
  { path: "/feedback", icon: MessageSquare, label: "nav2.feedback" },
  { path: "/question-bank", icon: HelpCircle, label: "nav2.questions" },
  { path: "/ai-chat", icon: Bot, label: "nav2.aiChat" },
  { path: "/history", icon: History, label: "nav2.history" },
  { path: "/settings", icon: Settings, label: "nav2.settings" },
];

// ─── NavDrawerTrigger ─────────────────────────────────────────────────────────

export const NavDrawerTrigger = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    aria-label="Open navigation menu"
    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-bg-secondary text-text-secondary hover:bg-sidebar-hover hover:text-text-primary active:scale-95"
    // Use inline transition so the global * rule can't override it
    style={{
      transition:
        "background-color 200ms ease, color 200ms ease, transform 150ms ease",
    }}
  >
    <Menu size={18} strokeWidth={1.75} />
  </button>
);

// ─── NavDrawer ────────────────────────────────────────────────────────────────

const NavDrawer = ({
  navItems = DEFAULT_NAV_ITEMS,
  open,
  onClose,
}: NavDrawerProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on route change
  useEffect(() => {
    onClose();
  }, [location.pathname]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node))
        onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (item: NavItem) =>
    item.path === location.pathname ||
    (item.path !== "/" && location.pathname.startsWith(item.path));

  return (
    <>
      {/* ── Backdrop ──────────────────────────────────────────────── */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        // Inline so global * can't strip opacity from transition-property
        style={{ transition: "opacity 300ms ease" }}
      />

      {/* ── Drawer ────────────────────────────────────────────────── */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        className="fixed left-0 top-0 z-50 flex h-full w-72 flex-col border-r border-border bg-sidebar-bg shadow-[4px_0_32px_rgba(0,0,0,0.4)]"
        // Inline so the global * rule can't override transform in transition-property
        style={{
          transform: open ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 350ms cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">
            {t("nav2.menu")}
          </span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted hover:bg-sidebar-hover hover:text-text-primary active:scale-90"
            style={{
              transition:
                "background-color 200ms ease, color 200ms ease, transform 150ms ease",
            }}
          >
            <X size={16} strokeWidth={1.75} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
          {navItems.map((item) => {
            const active = isActive(item);
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={`group flex items-center gap-3 rounded-xl px-4 py-2.5 ${
                  active ? "bg-sidebar-active" : "hover:bg-sidebar-hover"
                }`}
                style={{ transition: "background-color 200ms ease" }}
              >
                <Icon
                  size={18}
                  strokeWidth={active ? 2 : 1.75}
                  className={`shrink-0 ${
                    active
                      ? "text-text-primary"
                      : "text-text-muted group-hover:text-text-secondary"
                  }`}
                />
                <span
                  className={`text-sm font-medium tracking-wide ${
                    active
                      ? "text-text-primary"
                      : "text-text-secondary group-hover:text-text-primary"
                  }`}
                >
                  {t(item.label)}
                </span>
                {active && (
                  <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-text-primary/60" />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        {/* <div className="border-t border-border px-5 py-4">
          <p className="text-xs text-text-muted">v1.0.0</p>
        </div> */}
      </div>
    </>
  );
};

export default NavDrawer;
