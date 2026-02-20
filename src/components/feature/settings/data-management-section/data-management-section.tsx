import React from "react";
import type { DataManagementSectionProps } from "./data-management-section.types";
import SectionHeader from "../../../common/section-header/section-header";
import DataManagementCard from "../data-management-card/data-management-card";
import { CloudDownloadIcon, DownloadIcon, TrashIcon } from "lucide-react";

const DataManagementSection: React.FC<DataManagementSectionProps> = ({
  onExportData,
  onClearMemory,
}) => {
  return (
    <div className="bg-[#0e0f15] rounded-xl border border-slate-700/30 p-5">
      <SectionHeader icon="💾" title="Data Management" />

      <div className="grid grid-cols-2 gap-3">
        <DataManagementCard
          icon={<CloudDownloadIcon className="text-blue-400 w-4 h-4" />}
          title="Export Your Data"
          description="Download all your interview data, settings, and history"
          buttonText="Export Data"
          buttonIcon={<DownloadIcon />}
          onClick={onExportData}
          variant="primary"
        />

        <DataManagementCard
          icon={<TrashIcon className="text-amber-400 w-4 h-4" />}
          title="Clear AI Memory"
          description="Reset AI personalization and learning data"
          buttonText="Clear Memory"
          buttonIcon={<TrashIcon className="w-4 h-4" />}
          onClick={onClearMemory}
          variant="warning"
        />
      </div>
    </div>
  );
};

export default DataManagementSection;
