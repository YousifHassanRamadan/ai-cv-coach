import React from "react";
import type { DataRetentionSectionProps } from "./data-retention-section.types";
import SectionHeader from "../../../common/section-header/section-header";
import DataRetentionSelect from "../data-retention-select/data-retention-select";

const DataRetentionSection: React.FC<DataRetentionSectionProps> = ({
  period,
  onPeriodChange,
}) => {
  return (
    <div className="bg-[#0e1016] rounded-xl border border-slate-700/30 p-5">
      <SectionHeader icon="⏱️" title="Data Retention" />
      <DataRetentionSelect value={period} onChange={onPeriodChange} />
    </div>
  );
};

export default DataRetentionSection;
