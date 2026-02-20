import React from "react";
import type { TToneItemProps } from "./tone-item.types";

const ToneItem: React.FC<TToneItemProps> = ({
  tone,
  selectedTone,
  setSelectedTone,
}) => {
  return (
    <button
      key={tone.id}
      onClick={() => setSelectedTone(tone.id)}
      className={`p-4 rounded-lg border-2 transition text-left ${
        selectedTone === tone.id
          ? "border-purple-500 bg-bg-card"
          : "border-border-card bg-bg-card "
      }`}
    >
      <div className="font-semibold text-white mb-1">{tone.label}</div>
      <div className="text-xs text-gray-400">{tone.description}</div>
    </button>
  );
};

export default ToneItem;
