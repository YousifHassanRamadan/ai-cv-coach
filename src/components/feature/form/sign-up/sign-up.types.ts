export interface SignUpFormProps {
  onSwitch: () => void;
}

export interface FormValues {
  fName: string;
  lName: string;
  email: string;
  password: string;
}

export interface SignUpFieldConfig {
  name: keyof FormValues;
  label: string;
  placeholder: string;
  type: string;
  icon: React.ReactNode;
  toggle?: boolean;
}
