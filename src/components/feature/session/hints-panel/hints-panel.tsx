import { Info } from "lucide-react";
import type { Hint } from "../../../../api/chunk";
import type { HintPanalProps } from "./hints-panel.types";

const hintStyles: Record<Hint["type"], string> = {
  warning: "bg-amber-400/10 border-amber-400/30 text-amber-300",
  info: "bg-blue-400/10  border-blue-400/30  text-blue-300",
  error: "bg-red-400/10   border-red-400/30   text-red-300",
};

const HintsPanel: React.FC<HintPanalProps> = ({ hints }) => {
  if (!hints?.length) return null;

  return (
    <div className="mt-auto overflow-y-auto max-h-[400px] pt-4 border-t border-gray-800/50">
      <div className="flex items-center gap-1.5 text-gray-500 text-[10px] uppercase tracking-wider font-semibold mb-3">
        <Info className="w-3 h-3" />
        Hints
      </div>
      <div className="flex flex-col gap-2">
        {hints.map((hint, i) => (
          <div
            key={i}
            className={`flex items-start gap-2.5 px-3 py-2.5 rounded-lg border text-xs leading-relaxed ${hintStyles[hint.type]}`}
          >
            <span className="text-sm shrink-0">{hint.icon}</span>
            <div>
              <p className="mb-0.5">{hint.message}</p>
              <p className="opacity-60 capitalize">{hint.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HintsPanel;
