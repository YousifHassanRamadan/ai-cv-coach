export interface JobDescriptionInputProps {
  isVisible: boolean;
  value: string;
  onToggle: () => void;
  onChange: (value: string) => void;
}
