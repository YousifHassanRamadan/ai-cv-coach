import React, { useState } from "react";
import type { FormValues, SignUpFormProps } from "./sign-up.types";
import InputField from "../../../common/input/input";
import SubmitButton from "../submit-button/submit-button";
import AuthSwitchPrompt from "../auth-switch-prompt/auth-switch-prompt";
import { useFormik } from "formik";
import { SignUpSchema } from "../../../../schema/sign-up.schema";
import { SignUpFields } from "../../../../constants/form/form";
import { useRegister } from "../../../../hooks/useAuth";
import { toast } from "sonner";

const SignUpForm: React.FC<SignUpFormProps> = ({ onSwitch }) => {
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: signup, isPending: signinLoading } = useRegister();

  const formik = useFormik<FormValues>({
    initialValues: {
      fName: "",
      lName: "",
      email: "",
      password: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      // Here you can call your React Query mutation

      signup(values, {
        onSuccess: (data) => {
          toast.success(data.message);
        },
        onError: (err: any) => {
          console.error(err);
          toast.error(err.message);
        },
      });
    },
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
      {SignUpFields.map((field) => (
        <InputField
          key={field.name}
          name={field.name} // important for Formik
          label={field.label}
          type={
            field.type === "password" && field.toggle
              ? showPassword
                ? "text"
                : "password"
              : field.type
          }
          placeholder={field.placeholder}
          icon={field.icon}
          value={formik.values[field.name]}
          onChange={formik.handleChange}
          toggle={
            field.toggle
              ? {
                  visible: showPassword,
                  onToggle: () => setShowPassword((v) => !v),
                }
              : undefined
          }
          error={
            formik.touched[field.name] ? formik.errors[field.name] : undefined
          }
        />
      ))}

      <SubmitButton
        type="submit"
        label={signinLoading ? "Creating..." : "Create Account"}
        disabled={formik.isSubmitting}
      />

      <AuthSwitchPrompt
        message="Already have an account?"
        linkLabel="Sign in"
        onSwitch={onSwitch}
      />
    </form>
  );
};

export default SignUpForm;
