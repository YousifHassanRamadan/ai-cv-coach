import React from "react";
import type { TOutlinedButtonProps } from "./outlined-button.types";

const OutlinedButton: React.FC<TOutlinedButtonProps> = ({
  text,
  icon,
  onClick,
}) => {
  return (
    <button
      className="flex items-center gap-2 border border-border-active text-text-active hover:bg-bg-active/10 px-6 py-3 rounded-xl font-medium transition-all"
      onClick={onClick}
    >
      {icon && <>{icon}</>}
      {text}
    </button>
  );
};

export default OutlinedButton;
