import type { StatPillProps } from "./statpill.types";

const StatPill = ({ icon, label, value }: StatPillProps) => (
  <div className="bg-[#1a1a24] rounded-lg p-5 border border-gray-800 flex items-center gap-4">
    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 flex-shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">
        {label}
      </p>
      <p className="font-semibold text-white capitalize">{value}</p>
    </div>
  </div>
);

export default StatPill;
