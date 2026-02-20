import { Check } from "lucide-react";
import type { StepperProps } from "./stepper.types";

const Stepper = ({ steps, currentStep }: StepperProps) => {
  return (
    <div className="mb-8 sm:mb-12 md:mb-16">
      <div className="flex items-center justify-center max-w-3xl mx-auto">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              {/* Step circle */}
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-semibold mb-1 sm:mb-2 transition-all duration-300 ${
                  step.number === currentStep
                    ? "bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/50"
                    : step.number < currentStep
                      ? "bg-gradient-to-br from-teal-500 to-teal-600"
                      : "bg-gray-800 text-gray-500"
                }`}
              >
                {step.number < currentStep ? (
                  <Check size={16} className="text-white sm:w-5 sm:h-5" />
                ) : (
                  <span className="text-xs sm:text-sm">{step.number}</span>
                )}
              </div>
              {/* Step label */}
              <span
                className={`text-[10px] sm:text-xs md:text-sm font-medium transition-colors duration-300 text-center ${
                  step.number <= currentStep ? "text-white" : "text-gray-500"
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connecting line */}
            {index < steps.length - 1 && (
              <div className="flex-1 mx-1 sm:mx-2 mb-6 sm:mb-8">
                <div
                  className={`h-0.5 transition-all duration-500 ${
                    step.number < currentStep
                      ? "bg-gradient-to-r from-teal-500 to-teal-600"
                      : "bg-gray-800"
                  }`}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
