export interface InputFieldProps {
  label: string;
  type: string;
  placeholder?: string;
  icon?: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // ✅ Formik event
  name: string;
  toggle?: { visible: boolean; onToggle: () => void };
  error?: string;
}
