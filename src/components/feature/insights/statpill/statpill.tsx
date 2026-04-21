import type { StatPillProps } from "./statpill.types";

const StatPill = ({ icon, label, value }: StatPillProps) => (
  <div className="bg-bg-subcard rounded-lg p-5 border border-border-light flex items-center gap-4">
    <div className="w-10 h-10 rounded-lg bg-bg-active/10 flex items-center justify-center text-text-active flex-shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-xs text-text-muted uppercase tracking-wider mb-0.5">
        {label}
      </p>
      <p className="font-semibold text-text-muted capitalize">{value}</p>
    </div>
  </div>
);

export default StatPill;
