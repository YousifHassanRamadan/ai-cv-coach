import React from "react";
import type { AuthDividerProps } from "./auth-divider.types";

const AuthDivider: React.FC<AuthDividerProps> = ({ label }) => (
  <div className="flex items-center gap-3 my-6">
    <div className="flex-1 h-px bg-border" />
    <span className="text-xs text-text-muted">{label}</span>
    <div className="flex-1 h-px bg-border" />
  </div>
);

export default AuthDivider;
