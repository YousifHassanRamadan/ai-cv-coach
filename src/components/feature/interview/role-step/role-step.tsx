import type { JSX } from "react";
import { ChevronRight } from "lucide-react";
import RoleCard from "../role-card/role-card";
import type { RoleStepProps } from "./rolte-step.types";

const RoleStep = ({
  roles,
  selectedRole,
  setSelectedRole,
  customRole,
  setCustomRole,
  onContinue,
}: RoleStepProps) => {
  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">Choose Your Role</h2>
      <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">
        Select the position you're interviewing for
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
        {roles.map((role) => (
          <RoleCard
            key={role.id}
            icon={role.icon}
            label={role.label}
            selected={selectedRole === role.id}
            onClick={() => {
              setSelectedRole(role.id);
              setCustomRole("");
            }}
          />
        ))}
      </div>

      <div className="mb-8">
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
      </div>

      <div className="flex justify-end">
        <button
          disabled={!selectedRole && !customRole}
          onClick={onContinue}
          className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 shadow-lg disabled:shadow-none text-sm sm:text-base w-full sm:w-auto justify-center"
        >
          Continue
          <ChevronRight
            size={18}
            className="group-hover:translate-x-1 transition-transform duration-300 sm:w-5 sm:h-5"
          />
        </button>
      </div>
    </div>
  );
};

export default RoleStep;
