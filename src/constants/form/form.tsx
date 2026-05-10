import type { AuthMode } from "../../components/feature/form/auth-toggle";
import type { SignInFieldConfig } from "../../components/feature/form/sign-in";
import type { SignUpFieldConfig } from "../../components/feature/form/sign-up";
import { Mail, Lock, User } from "lucide-react";

export const TABS: { value: AuthMode; label: string }[] = [
  { value: "signin", label: "Sign In" },
  { value: "signup", label: "Sign Up" },
];

export const SignUpFields: SignUpFieldConfig[] = [
  {
    name: "fName",
    label: "auth.fields.firstName.label",
    placeholder: "auth.fields.firstName.placeholder",
    type: "text",
    icon: <User size={16} />,
  },
  {
    name: "lName",
    label: "auth.fields.lastName.label",
    placeholder: "auth.fields.lastName.placeholder",
    type: "text",
    icon: <User size={16} />,
  },
  {
    name: "email",
    label: "auth.fields.email.label",
    placeholder: "auth.fields.email.placeholder",
    type: "email",
    icon: <Mail size={16} />,
  },
  {
    name: "password",
    label: "auth.fields.password.label",
    placeholder: "auth.fields.password.placeholder",
    type: "password",
    icon: <Lock size={16} />,
    toggle: true,
  },
];

export const SignInFields: SignInFieldConfig[] = [
  {
    name: "email",
    label: "auth.fields.email.label",
    placeholder: "auth.fields.email.placeholder",
    type: "email",
    icon: <Mail size={16} />,
  },
  {
    name: "password",
    label: "auth.fields.password.label",
    placeholder: "auth.fields.password.placeholder",
    type: "password",
    icon: <Lock size={16} />,
    toggle: true,
  },
];
