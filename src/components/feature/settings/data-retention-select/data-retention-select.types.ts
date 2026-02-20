export type DataRetentionPeriod =
  | "30 days"
  | "60 days"
  | "90 days"
  | "180 days"
  | "1 year"
  | "Never";

export interface DataRetentionSelectProps {
  value: DataRetentionPeriod;
  onChange: (value: DataRetentionPeriod) => void;
}
