import type { FormInputProps } from "../form-input";

export interface PersonalInfoData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  currentRole: string;
}

export interface PersonalInfoSectionProps {
  profile: PersonalInfoData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type FieldConfig = Omit<FormInputProps, "value" | "onChange"> & {
  name: keyof PersonalInfoSectionProps["profile"];
};
