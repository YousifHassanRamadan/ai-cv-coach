import React, { useState } from "react";
import AuthCard from "../../components/feature/form/auth-card/auth-card";
import AuthLogo from "../../components/feature/form/auth-logo/auth-logo";
import AuthToggle from "../../components/feature/form/auth-toggle/auth-toggle";
import SignInForm from "../../components/feature/form/sign-in/sign-in";
import SignUpForm from "../../components/feature/form/sign-up/sign-up";
import type { AuthMode } from "./form.types";

const AuthForm: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>("signin");

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-bg-active/10 rounded-full blur-[140px] pointer-events-none" />

      <AuthCard>
        <AuthLogo />
        <AuthToggle mode={mode} onChange={setMode} />

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text-primary mb-1">
            {mode === "signin" ? "Welcome back" : "Create account"}
          </h1>
          <p className="text-sm text-text-muted">
            {mode === "signin"
              ? "Sign in to continue your interview prep."
              : "Start your AI-powered interview journey."}
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
