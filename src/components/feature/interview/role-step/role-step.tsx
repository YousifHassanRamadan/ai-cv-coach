import { ChevronRight } from "lucide-react";
import RoleCard from "../role-card/role-card";
import type { RoleStepProps } from "./rolte-step.types";

import {
  GitBranch,
  Server,
  Users,
  Building2,
  Shield,
  Cloud,
  Code,
  Layers,
  Brain,
  Box,
  ClipboardList,
} from "lucide-react";
import ContinueButton from "../../../common/continue-button/continue-button";
import { useTranslation } from "react-i18next";

const iconMap: Record<string, React.ReactNode> = {
  "git-branch": <GitBranch size={20} />,
  server: <Server size={20} />,
  users: <Users size={20} />,
  building: <Building2 size={20} />,
  shield: <Shield size={20} />,
  cloud: <Cloud size={20} />,
  code: <Code size={20} />,
  layers: <Layers size={20} />,
  brain: <Brain size={20} />,
  boxes: <Box size={20} />,
  "clipboard-list": <ClipboardList size={20} />,
};

const RoleStep = ({
  roles,
  selectedRole,
  setSelectedRole,
  customRole,
  setCustomRole,
  onContinue,
}: RoleStepProps) => {
  const { t } = useTranslation();
  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">
        {" "}
        {t("roleStep.title")}
      </h2>
      <p className="text-text-muted mb-6 sm:mb-8 text-sm sm:text-base">
        {t("roleStep.subtitle")}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
        {roles.map((role) => (
          <RoleCard
            key={role.id}
            icon={iconMap[role.icon] ?? <Code size={20} />}
            label={role.name}
            selected={selectedRole === role.id}
            onClick={() => {
              setSelectedRole(role.id);
              setCustomRole("");
            }}
          />
        ))}
      </div>

      {/* <div className="mb-8">
        <p className="text-xs sm:text-sm text-gray-400 mb-3">
          Or enter a custom role
        </p>
        <input
          value={customRole}
          onChange={(e) => {
            setCustomRole(e.target.value);
            setSelectedRole("custom");
          }}
          placeholder="e.g., DevOps Engineer"
          className="w-full bg-[#13131a] text-white placeholder-gray-500 p-3 sm:p-4 rounded-xl border-2 border-gray-800 focus:border-purple-500 focus:outline-none transition-colors duration-300 text-sm sm:text-base"
        />
      </div> */}

      <div className="flex justify-end">
        <ContinueButton
          onClick={onContinue}
          disabled={!selectedRole && !customRole}
        />
      </div>
    </div>
  );
};

export default RoleStep;
