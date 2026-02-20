import React from "react";
import type { PrivacyControlsSectionProps } from "./privacy-controls-section.types";
import SectionHeader from "../../../common/section-header/section-header";
import PrivacyToggle from "../privacy-toggle/privacy-toggle";
import { LockIcon, ServerIcon, ShieldCheckIcon } from "lucide-react";

const PrivacyControlsSection: React.FC<PrivacyControlsSectionProps> = ({
  settings,
  onToggle,
}) => {
  return (
    <div className="bg-[#0f0e16] rounded-xl border border-slate-700/30 p-5">
      <SectionHeader icon="🔒" title="Privacy Controls" />

      <div className="space-y-2.5">
        <PrivacyToggle
          icon={<ShieldCheckIcon className="text-purple-400 w-4 h-4" />}
          title="Biometric Data Processing"
          description="Allow facial expression and emotion analysis during interviews"
          enabled={settings.biometricDataProcessing}
          onToggle={() => onToggle("biometricDataProcessing")}
        />

        <PrivacyToggle
          icon={<LockIcon className="text-purple-400 w-4 h-4" />}
          title="End-to-End Encryption"
          description="Encrypt all interview recordings and personal data"
          enabled={settings.endToEndEncryption}
          onToggle={() => onToggle("endToEndEncryption")}
        />

        <PrivacyToggle
          icon={<ServerIcon className="text-gray-400 w-4 h-4" />}
          title="Local Processing"
          description="Process biometric data locally when possible"
          enabled={settings.localProcessing}
          onToggle={() => onToggle("localProcessing")}
          variant="disabled"
        />
      </div>
    </div>
  );
};

export default PrivacyControlsSection;
