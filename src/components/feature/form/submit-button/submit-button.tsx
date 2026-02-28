import React from "react";
import { ArrowRight } from "lucide-react";
import type { SubmitButtonProps } from "./submit-button.types";

const SubmitButton: React.FC<SubmitButtonProps> = ({
  label,
  disabled = false,
}) => (
  <button
    type="submit"
    disabled={disabled}
    className="
      w-full py-3 rounded-xl font-semibold text-sm text-text-primary
      bg-primary hover:bg-primary-dark
      flex items-center justify-center gap-2
      transition-all duration-200 shadow-lg
      active:scale-[0.98]
    "
  >
    {label} <ArrowRight size={16} />
  </button>
);

export default SubmitButton;
