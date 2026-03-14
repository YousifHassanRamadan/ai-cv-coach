import type { JSX } from "react";
import type { Track } from "../../../../api/tracks";

export interface Role {
  id: string;
  icon: JSX.Element;
  label: string;
}

export interface RoleStepProps {
  roles: Track[];
  selectedRole: string;
  setSelectedRole: (v: string) => void;
  customRole: string;
  setCustomRole: (v: string) => void;
  onContinue: () => void;
}
