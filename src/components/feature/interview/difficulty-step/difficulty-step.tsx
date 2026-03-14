import { ChevronRight } from "lucide-react";
import type { DifficultyStepProps } from "./difficulty-step.types";
import NumberOfQuestionsStep from "../number-of-question-step/number-of-question-step";
import ExperienceLevel from "../experience-level/experience-level";

const DifficultyStep = ({
  difficultyLevel,
  setDifficultyLevel,
  difficultyLabels,
  getDifficultyDescription,
  onBack,
  onContinue,
  setNumberOfQuestions,
  numberOfQuestions,
  experienceLevel,
  setExperienceLevel,
}: DifficultyStepProps) => {
  const getGradientColor = () => {
    const colors = [
      "from-purple-500 to-blue-500",
      "from-purple-500 to-cyan-500",
      "from-blue-500 to-cyan-500",
      "from-cyan-500 to-teal-500",
      "from-teal-500 to-cyan-500",
    ];
    return colors[difficultyLevel - 1];
  };

  const description = getDifficultyDescription();

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">
        Set Difficulty Level
      </h2>
      <p className="text-gray-400 mb-8 sm:mb-12 text-sm sm:text-base">
        Adjust the complexity of interview questions
      </p>

      {/* Custom Slider */}
      <div className="mb-8 sm:mb-12">
        <div className="relative mb-6 sm:mb-8">
          {/* Slider track */}
          <div className="absolute w-full h-2 bg-gray-800 rounded-full" />

          {/* Gradient progress */}
          <div
            className={`absolute h-2 rounded-full bg-gradient-to-r ${getGradientColor()} transition-all duration-500`}
            style={{ width: `${((difficultyLevel - 1) / 3) * 100}%` }}
          />

          {/* Slider input */}
          <input
            type="range"
            min="1"
            max="4"
            value={difficultyLevel}
            onChange={(e) => setDifficultyLevel(Number(e.target.value))}
            className="relative w-full appearance-none bg-transparent cursor-pointer z-10"
            style={{
              WebkitAppearance: "none",
            }}
          />
        </div>

        {/* Labels */}
        <div className="flex justify-between px-1">
          {difficultyLabels.map((l) => (
            <button
              key={l.value}
              onClick={() => setDifficultyLevel(l.value)}
              className={`text-xs sm:text-sm font-medium transition-all duration-300 hover:text-white ${
                difficultyLevel === l.value
                  ? "text-white scale-110"
                  : "text-gray-500"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Description Card */}
      <div className="bg-[#13131a] border-2 border-gray-800 p-6 sm:p-8 rounded-xl mb-6 sm:mb-8">
        <h3 className="text-xl sm:text-2xl font-bold mb-2">
          {description.title}
        </h3>
        <p className="text-gray-400 text-base sm:text-lg">{description.desc}</p>
      </div>

      <NumberOfQuestionsStep
        numberOfQuestions={numberOfQuestions}
        setNumberOfQuestions={setNumberOfQuestions}
      />

      <ExperienceLevel
        experienceLevel={experienceLevel}
        setExperienceLevel={setExperienceLevel}
      />

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
        <button
          onClick={onBack}
          className="px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-300 order-2 sm:order-1 text-sm sm:text-base"
        >
          Back
        </button>
        <button
          onClick={onContinue}
          className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg order-1 sm:order-2 text-sm sm:text-base"
        >
          Continue
          <ChevronRight
            size={18}
            className="group-hover:translate-x-1 transition-transform duration-300 sm:w-5 sm:h-5"
          />
        </button>
      </div>

      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ffffff, #e0e0e0);
          cursor: pointer;
          box-shadow: 0 0 0 4px rgba(147, 51, 234, 0.2), 0 4px 12px rgba(0, 0, 0, 0.4);
          transition: all 0.2s ease;
        }

        @media (min-width: 640px) {
          input[type="range"]::-webkit-slider-thumb {
            width: 24px;
            height: 24px;
          }
        }

        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 0 0 6px rgba(147, 51, 234, 0.3), 0 6px 16px rgba(0, 0, 0, 0.5);
        }

        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border: none;
          border-radius: 50%;
          background: linear-gradient(135deg, #ffffff, #e0e0e0);
          cursor: pointer;
          box-shadow: 0 0 0 4px rgba(147, 51, 234, 0.2), 0 4px 12px rgba(0, 0, 0, 0.4);
          transition: all 0.2s ease;
        }

        @media (min-width: 640px) {
          input[type="range"]::-moz-range-thumb {
            width: 24px;
            height: 24px;
          }
        }

        input[type="range"]::-moz-range-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 0 0 6px rgba(147, 51, 234, 0.3), 0 6px 16px rgba(0, 0, 0, 0.5);
        }

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

export default DifficultyStep;
