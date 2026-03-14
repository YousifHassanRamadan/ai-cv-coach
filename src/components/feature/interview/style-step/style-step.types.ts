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
  selectedWeightProfile: string;
  selectedCvId: string;
  setSelectedWeightProfile: (v: string) => void;
  setSelectedCvId: (v: string) => void;
  setSelectedStyle: (v: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

export interface WeightProfile {
  id: string;
  label: string;
  description: string;
  technical: number;
  behavioral: number;
  situational: number;
  tag: string;
}
