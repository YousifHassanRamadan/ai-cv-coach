export type AuthMode = "signin" | "signup";

export interface AuthToggleProps {
  mode: AuthMode;
  onChange: (mode: AuthMode) => void;
}
