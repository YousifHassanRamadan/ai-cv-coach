// types.ts
export type TStatCardProps = {
  label: string;
  value: string;
  icon: React.ReactNode;
  iconBg: string;
  footer: {
    icon: string;
    text: string;
    color: string;
  };
  progress?: {
    percentage: number;
    color: string;
  } | null;
};
