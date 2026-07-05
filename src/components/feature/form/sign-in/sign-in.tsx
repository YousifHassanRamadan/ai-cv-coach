import React, { useState } from "react";
import type { FormValues, SignInFormProps } from "./sign-in.types";
import InputField from "../../../common/input/input";
import SubmitButton from "../submit-button/submit-button";
import AuthSwitchPrompt from "../auth-switch-prompt/auth-switch-prompt";
import { useFormik } from "formik";
import { SignInSchema } from "../../../../schema/sign-in.schema";
import { SignInFields } from "../../../../constants/form/form";
import { useSignIn } from "../../../../hooks/useAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../../store/auth";
import { useTranslation } from "react-i18next";

const SignInForm: React.FC<SignInFormProps> = ({ onSwitch }) => {
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: signIn, isPending: signInLoading } = useSignIn();

  const navigate = useNavigate();

  const { setTokens } = useAuthStore();

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignInSchema,
    onSubmit: (values) => {
      // console.log("Form submitted:", values);
      signIn(values, {
        onSuccess: (data) => {
          // Save tokens in Zustand store
          setTokens(data.token, data.refreshToken);

          // Show success message

          toast.success(data.message);

          // Redirect user to dashboard
          navigate("/");
        },
        onError: (err: any) => {
          console.error(err);
          toast.error(err.message);
        },
      });
    },
  });

  const { t } = useTranslation();

  return (
    <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
      {SignInFields.map((field) => (
        <InputField
          key={field.name}
          name={field.name}
          label={t(field.label)}
          type={
            field.type === "password" && field.toggle
              ? showPassword
                ? "text"
                : "password"
              : field.type
          }
          placeholder={t(field.placeholder)}
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

      {/* <div className="flex justify-end -mt-2">
        <button
          type="button"
          className="text-xs text-text-active hover:opacity-80 transition-opacity"
        >
          Forgot password?
        </button>
      </div> */}

      <SubmitButton
        label={
          signInLoading ? t("auth.signin.submitting") : t("auth.signin.submit")
        }
      />
      <AuthSwitchPrompt
        message={t("auth.signin.noAccount")}
        linkLabel={t("auth.signin.createOne")}
        onSwitch={onSwitch}
      />
    </form>
  );
};

export default SignInForm;
