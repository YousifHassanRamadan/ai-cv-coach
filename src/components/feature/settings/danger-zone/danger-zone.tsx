import React from "react";
import SectionHeader from "../../../common/section-header/section-header";
import type { DangerZoneSectionProps } from "./danger-zone.types";
import { TrashIcon } from "lucide-react";

const DangerZoneSection: React.FC<DangerZoneSectionProps> = ({
  onDeleteAccount,
}) => {
  return (
    <div className="bg-[#0e1016] rounded-xl border border-red-900/30 p-5">
      <SectionHeader icon="⚠️" title="Danger Zone" variant="danger" />

      <div className="bg-red-950/20 border border-red-900/30 rounded-lg p-3.5 flex items-center justify-between">
        <div>
          <div className="font-medium text-sm text-red-300">Delete Account</div>
          <div className="text-xs text-gray-400 mt-0.5">
            Permanently delete your account and all associated data
          </div>
        </div>
        <button
          onClick={onDeleteAccount}
          className="bg-red-600 hover:bg-red-700 text-white font-medium px-3.5 py-1.5 rounded-lg transition-colors text-xs flex items-center gap-1.5 whitespace-nowrap"
        >
          <TrashIcon className="w-3.5 h-3.5" />
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default DangerZoneSection;
