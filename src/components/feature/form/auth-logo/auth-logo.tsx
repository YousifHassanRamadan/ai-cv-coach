import React from "react";

const AuthLogo: React.FC = () => (
  <div className="flex items-center gap-2.5 mb-8">
    <div className="w-8 h-8 bg-gradient-to-tr from-bg-active to-bg-subcard rounded-lg flex items-center justify-center flex-shrink-0">
      <span className="text-text-primary text-base">✦</span>
    </div>
    <span className="font-semibold text-lg text-text-active">InterviewAI</span>
  </div>
);

export default AuthLogo;
