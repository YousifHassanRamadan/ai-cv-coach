export interface Label {
  value: number;
  label: string;
}

export interface DifficultyStepProps {
  difficultyLevel: number;
  numberOfQuestions: number;
  setDifficultyLevel: (v: number) => void;
  setNumberOfQuestions: (v: number) => void;
  difficultyLabels: Label[];
  experienceLevel: string;
  setExperienceLevel: (v: string) => void;
  getDifficultyDescription: () => { title: string; desc: string };
  onBack: () => void;
  onContinue: () => void;
}
