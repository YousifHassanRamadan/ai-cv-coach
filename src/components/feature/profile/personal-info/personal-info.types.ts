import type { FormInputProps } from "../form-input";

export interface PersonalInfoData {
  fName: string;
  lName: string;
  email: string;
}

export interface PersonalInfoFormProps {
  profile: PersonalInfoData;
}

export type FieldConfig = Omit<FormInputProps, "value" | "onChange"> & {
  name: keyof PersonalInfoFormProps["profile"];
};
