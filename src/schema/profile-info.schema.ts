import * as Yup from "yup";

export const ProfileSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  fName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .required("First name is required"),
  lName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .required("Last name is required"),
});
