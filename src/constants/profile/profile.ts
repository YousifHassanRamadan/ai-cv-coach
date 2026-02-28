import type { FieldConfig } from "../../components/feature/profile/personal-info/personal-info.types";

export const FIELDS: FieldConfig[] = [
  { label: "First Name", name: "fName" },
  { label: "Last Name", name: "lName" },
  { label: "Email", name: "email", type: "email" },
];
