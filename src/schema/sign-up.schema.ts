import * as Yup from "yup";

export const SignUpSchema = Yup.object().shape({
  fName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name can't exceed 50 characters")
    .required("First name is required"),
  lName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name can't exceed 50 characters")
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});
