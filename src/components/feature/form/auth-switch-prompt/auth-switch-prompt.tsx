import React from "react";
import type { AuthSwitchPromptProps } from "./auth-switch-prompt.types";

const AuthSwitchPrompt: React.FC<AuthSwitchPromptProps> = ({
  message,
  linkLabel,
  onSwitch,
}) => (
  <p className="text-center text-sm text-text-muted">
    {message}{" "}
    <button
      type="button"
      onClick={onSwitch}
      className="text-text-active hover:opacity-80 font-medium transition-opacity"
    >
      {linkLabel}
    </button>
  </p>
);

export default AuthSwitchPrompt;
