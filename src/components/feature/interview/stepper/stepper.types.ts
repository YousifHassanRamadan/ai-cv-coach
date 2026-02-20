export interface Step {
  number: number;
  label: string;
}

export interface StepperProps {
  steps: Step[];
  currentStep: number;
}
