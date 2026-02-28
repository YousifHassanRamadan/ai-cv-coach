export interface SignInFormProps {
  onSwitch: () => void;
}

export interface FormValues {
  email: string;
  password: string;
}

export interface SignInFieldConfig {
  name: keyof FormValues;
  label: string;
  placeholder: string;
  type: string;
  icon: React.ReactNode;
  toggle?: boolean;
}
