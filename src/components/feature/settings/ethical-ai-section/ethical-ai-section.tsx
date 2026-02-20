import React from "react";
import SectionHeader from "../../../common/section-header/section-header";
import { ChevronRightIcon } from "lucide-react";

const EthicalAISection: React.FC = () => {
  return (
    <div className="bg-purple-950/10 border border-purple-900/20 rounded-xl p-5">
      <SectionHeader icon="ℹ️" title="Ethical AI Commitment" />
      <p className="text-xs text-gray-300 leading-relaxed mb-2.5">
        InterviewAI is committed to ethical AI practices. We ensure transparency
        in how our AI analyzes your interviews, never share your biometric data
        with third parties, and provide you with complete control over your
        personal information. Our emotion analysis is designed to help you
        improve, not to make judgments about your character.
      </p>
      <a
        href="#"
        className="text-purple-400 text-xs hover:text-purple-300 transition-colors flex items-center gap-1"
      >
        Learn more about our AI ethics
        <ChevronRightIcon className="w-3 h-3" />
      </a>
    </div>
  );
};

export default EthicalAISection;
