import { ChevronRight } from "lucide-react";
import StyleCard from "../style-card/style-card";
import type { StyleStepProps } from "./style-step.types";

const StyleStep = ({
  interviewStyles,
  selectedStyle,
  setSelectedStyle,
  onBack,
  onContinue,
}: StyleStepProps) => {
  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">
        Choose Interviewer Style
      </h2>
      <p className="text-gray-400 mb-8 sm:mb-12 text-sm sm:text-base">
        Select the personality of your AI interviewer
      </p>

      <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
        {interviewStyles.map((style) => (
          <StyleCard
            key={style.id}
            {...style}
            selected={selectedStyle === style.id}
            onClick={() => setSelectedStyle(style.id)}
          />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
        <button
          onClick={onBack}
          className="px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-300 order-2 sm:order-1 text-sm sm:text-base"
        >
          Back
        </button>
        <button
          disabled={!selectedStyle}
          onClick={onContinue}
          className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg disabled:shadow-none order-1 sm:order-2 text-sm sm:text-base"
        >
          Continue
          <ChevronRight
            size={18}
            className="group-hover:translate-x-1 transition-transform duration-300 sm:w-5 sm:h-5"
          />
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default StyleStep;
