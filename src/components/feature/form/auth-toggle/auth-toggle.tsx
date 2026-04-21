import React from "react";
import type { AuthMode, AuthToggleProps } from "./auth-toggle.types";
import { TABS } from "../../../../constants/form/form";

const AuthToggle: React.FC<AuthToggleProps> = ({ mode, onChange }) => (
  <div className="flex bg-bg-input border border-border rounded-xl p-1 mb-8">
    {TABS.map(({ value, label }) => (
      <button
        key={value}
        type="button"
        onClick={() => onChange(value)}
        className={`
          flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200
          ${
            mode === value
              ? "bg-bg-primary text-text-primary shadow-md"
              : "text-text-muted hover:text-text-secondary"
          }
        `}
      >
        {label}
      </button>
    ))}
  </div>
);

export default AuthToggle;
