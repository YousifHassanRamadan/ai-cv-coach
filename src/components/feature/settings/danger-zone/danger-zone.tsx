import React from "react";
import SectionHeader from "../../../common/section-header/section-header";
import type { DangerZoneSectionProps } from "./danger-zone.types";
import { TrashIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

const DangerZoneSection: React.FC<DangerZoneSectionProps> = ({
  onDeleteAccount,
}) => {
  const { t } = useTranslation();
  return (
    <div className="bg-bg-subcard rounded-xl border border-border-light/30 p-5">
      <SectionHeader icon="⚠️" title={t("dangerZone.title")} variant="danger" />

      <div className="bg-red-950/20 border border-red-900/30 rounded-lg p-3.5 flex items-center sm:flex-row flex-col gap-4 justify-between">
        <div>
          <div className="font-medium text-sm text-text-muted">
            {t("dangerZone.deleteTitle")}
          </div>
          <div className="text-xs text-text-muted mt-0.5">
            {t("dangerZone.deleteSubtitle")}
          </div>
        </div>
        <button
          onClick={onDeleteAccount}
          className="bg-red-600 hover:bg-red-700 text-white font-medium px-3.5 py-1.5 rounded-lg transition-colors text-xs flex items-center gap-1.5 whitespace-nowrap"
        >
          <TrashIcon className="w-3.5 h-3.5" />
          {t("dangerZone.deleteButton")}
        </button>
      </div>
    </div>
  );
};

export default DangerZoneSection;
