import type { DataRetentionPeriod } from "../data-retention-select";

export interface DataRetentionSectionProps {
  period: DataRetentionPeriod;
  onPeriodChange: (period: DataRetentionPeriod) => void;
}
