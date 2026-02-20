import type { JSX } from "react";

export interface Style {
  id: string;
  label: string;
  description: string;
  icon: JSX.Element;
  color: string;
}

export interface StyleStepProps {
  interviewStyles: Style[];
  selectedStyle: string;
  setSelectedStyle: (v: string) => void;
  onBack: () => void;
  onContinue: () => void;
}
