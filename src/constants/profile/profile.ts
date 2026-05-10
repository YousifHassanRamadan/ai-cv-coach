import type { FieldConfig } from "../../components/feature/profile/personal-info/personal-info.types";

export const FIELDS: FieldConfig[] = [
  { label: "profile.fields.firstName", name: "fName" },
  { label: "profile.fields.lastName", name: "lName" },
  { label: "profile.fields.email", name: "email", type: "email" },
];
