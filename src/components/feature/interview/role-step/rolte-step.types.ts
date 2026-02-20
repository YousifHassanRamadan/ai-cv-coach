import type { JSX } from "react";

export interface Role {
  id: string;
  icon: JSX.Element;
  label: string;
}

export interface RoleStepProps {
  roles: Role[];
  selectedRole: string;
  setSelectedRole: (v: string) => void;
  customRole: string;
  setCustomRole: (v: string) => void;
  onContinue: () => void;
}
