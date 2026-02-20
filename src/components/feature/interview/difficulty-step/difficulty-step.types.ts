export interface Label {
  value: number;
  label: string;
}

export interface DifficultyStepProps {
  difficultyLevel: number;
  setDifficultyLevel: (v: number) => void;
  difficultyLabels: Label[];
  getDifficultyDescription: () => { title: string; desc: string };
  onBack: () => void;
  onContinue: () => void;
}
