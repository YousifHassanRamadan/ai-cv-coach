import React from "react";
import type { AuthCardProps } from "./auth-card.types";

const AuthCard: React.FC<AuthCardProps> = ({ children }) => (
  <div className="relative w-full max-w-md bg-bg-secondary border border-border rounded-2xl p-8 shadow-2xl">
    {children}
  </div>
);

export default AuthCard;
