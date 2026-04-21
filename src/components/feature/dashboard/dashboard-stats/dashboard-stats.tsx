import {
  TrendingUp,
  Clock,
  CheckCircle,
  Upload,
  Activity,
  BarChart2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type {
  Accent,
  DashboardStatsProps,
  SessionBreakdownProps,
  StatItemProps,
} from "./dashboard-stats.types";

// ================= COMPONENTS =================

const StatItem: React.FC<StatItemProps> = ({
  icon: Icon,
  label,
  value,
  accent = "indigo",
  sub,
}) => {
  const accentMap: Record<Accent, string> = {
    indigo: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
    emerald: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    amber: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    sky: "text-sky-400 bg-sky-400/10 border-sky-400/20",
    rose: "text-rose-400 bg-rose-400/10 border-rose-400/20",
  };

  const colorClass = accentMap[accent] || accentMap.indigo;

  return (
    <div className="flex items-center gap-3 p-4 bg-bg-card border border-border-light rounded-xl hover:border-border-light transition-colors">
      <div className={`p-2 rounded-lg border ${colorClass} flex-shrink-0`}>
        <Icon size={18} className={colorClass.split(" ")[0]} />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-text-secondary truncate">{label}</p>
        <p className="text-lg font-bold text-text-active leading-tight">
          {value}
        </p>
        {sub && <p className="text-xs text-gray-600 truncate">{sub}</p>}
      </div>
    </div>
  );
};

const SessionBreakdown: React.FC<SessionBreakdownProps> = ({ sessions }) => {
  const total = sessions?.total || 1;
  const completed = sessions?.completed || 0;
  const inProgress = sessions?.inProgress || 0;
  const other = total - completed - inProgress;

  const bars = [
    {
      label: "Completed",
      count: completed,
      color: "bg-emerald-500",
      pct: (completed / total) * 100,
    },
    {
      label: "In Progress",
      count: inProgress,
      color: "bg-indigo-500",
      pct: (inProgress / total) * 100,
    },
    {
      label: "Other",
      count: other,
      color: "bg-gray-600",
      pct: (other / total) * 100,
    },
  ].filter((b) => b.count > 0);

  return (
    <div className="p-4 bg-bg-card border border-border-light rounded-xl">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-gray-500">Session Breakdown</p>
        <span className="text-xs font-semibold text-text-muted">
          {total} total
        </span>
      </div>

      <div className="flex h-2 rounded-full overflow-hidden gap-0.5 mb-3">
        {bars.map((b) => (
          <div
            key={b.label}
            className={`${b.color} rounded-full transition-all`}
            style={{ width: `${b.pct}%` }}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {bars.map((b) => (
          <div key={b.label} className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${b.color} flex-shrink-0`} />
            <span className="text-xs text-text-muted">
              {b.label}{" "}
              <span className="text-text-active font-medium">{b.count}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const DashboardStats: React.FC<DashboardStatsProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 animate-pulse">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-20 bg-gray-800/40 rounded-xl" />
        ))}
      </div>
    );
  }

  if (!data) return null;

  const avgScorePct = Math.round((data.avgScore || 0) * 100);

  const formatLastActivity = (iso?: string) => {
    if (!iso) return "—";
    const date = new Date(iso);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatItem
          icon={BarChart2}
          label="Total Interviews"
          value={data.totalInterviews ?? "—"}
          accent="indigo"
        />
        <StatItem
          icon={TrendingUp}
          label="Avg Score"
          value={`${avgScorePct}%`}
          accent="emerald"
          sub={avgScorePct < 50 ? "Keep practicing!" : "Great job!"}
        />
        <StatItem
          icon={Upload}
          label="CV Uploads"
          value={data.totalUploads ?? "—"}
          accent="sky"
        />
        <StatItem
          icon={Activity}
          label="Last Activity"
          value={formatLastActivity(data.lastActivity)}
          accent="amber"
        />
      </div>

      <SessionBreakdown sessions={data.sessions} />
    </div>
  );
};

export default DashboardStats;
