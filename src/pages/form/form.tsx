import React, { useState } from "react";
import AuthCard from "../../components/feature/form/auth-card/auth-card";
import AuthLogo from "../../components/feature/form/auth-logo/auth-logo";
import AuthToggle from "../../components/feature/form/auth-toggle/auth-toggle";
import SignInForm from "../../components/feature/form/sign-in/sign-in";
import SignUpForm from "../../components/feature/form/sign-up/sign-up";
import type { AuthMode } from "./form.types";
import { useTranslation } from "react-i18next";

const AuthForm: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>("signin");

  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-bg-active/10 rounded-full blur-[140px] pointer-events-none" />

      <AuthCard>
        <AuthLogo />
        <AuthToggle mode={mode} onChange={setMode} />

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text-primary mb-1">
            {t(`auth.title.${mode}`)}
          </h1>
          <p className="text-sm text-text-muted">
            {t(`auth.subtitle.${mode}`)}
          </p>
        </div>

        {/* Remove the outer <form> */}
        {mode === "signin" ? (
          <SignInForm onSwitch={() => setMode("signup")} />
        ) : (
          <SignUpForm onSwitch={() => setMode("signin")} />
        )}
      </AuthCard>
    </div>
  );
};

export default AuthForm;
