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
    label: "First Name",
    placeholder: "John",
    type: "text",
    icon: <User size={16} />,
  },
  {
    name: "lName",
    label: "Last Name",
    placeholder: "Doe",
    type: "text",
    icon: <User size={16} />,
  },
  {
    name: "email",
    label: "Email",
    placeholder: "you@example.com",
    type: "email",
    icon: <Mail size={16} />,
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Min. 8 characters",
    type: "password",
    icon: <Lock size={16} />,
    toggle: true,
  },
];

export const SignInFields: SignInFieldConfig[] = [
  {
    name: "email",
    label: "Email",
    placeholder: "you@example.com",
    type: "email",
    icon: <Mail size={16} />,
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Min. 8 characters",
    type: "password",
    icon: <Lock size={16} />,
    toggle: true,
  },
];
