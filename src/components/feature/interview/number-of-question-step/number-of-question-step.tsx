import { ChevronRight } from "lucide-react";
import type { NumberOfQuestionsStepProps } from "./number-of-question-step.types";
import { useTranslation } from "react-i18next";

// Replace fixed cards with a slider (1–50 range)
const NumberOfQuestionsStep = ({
  numberOfQuestions,
  setNumberOfQuestions,
}: NumberOfQuestionsStepProps) => {
  const { t } = useTranslation();

  const getDescription = () => {
    if (numberOfQuestions <= 5)
      return {
        title: t("interview.sessions.quick.title"),
        desc: t("interview.sessions.quick.desc"),
      };
    if (numberOfQuestions <= 15)
      return {
        title: t("interview.sessions.standard.title"),
        desc: t("interview.sessions.standard.desc"),
      };
    if (numberOfQuestions <= 25)
      return {
        title: t("interview.sessions.extended.title"),
        desc: t("interview.sessions.extended.desc"),
      };
    if (numberOfQuestions <= 35)
      return {
        title: t("interview.sessions.full.title"),
        desc: t("interview.sessions.full.desc"),
      };
    return {
      title: t("interview.sessions.marathon.title"),
      desc: t("interview.sessions.marathon.desc"),
    };
  };

  const getGradientColor = () => {
    const pct = (numberOfQuestions - 1) / 49;
    if (pct < 0.25) return "from-purple-500 to-blue-500";
    if (pct < 0.5) return "from-purple-500 to-cyan-500";
    if (pct < 0.75) return "from-blue-500 to-cyan-500";
    return "from-cyan-500 to-teal-500";
  };

  const description = getDescription();
  const progressWidth = `${((numberOfQuestions - 1) / 49) * 100}%`;

  // Quick-pick presets
  const presets = [5, 10, 20, 30, 50];

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">
        {t("interview.questions.title")}
      </h2>
      <p className="text-text-muted mb-8 sm:mb-12 text-sm sm:text-base">
        {t("interview.questions.subtitle")}
      </p>

      {/* Big number display */}
      <div className="flex items-center justify-center mb-8">
        <div className="relative flex items-center justify-center w-28 h-28 rounded-full border-2 border-border-light bg-bg-active/10 shadow-lg shadow-bg-active/20">
          <span className="text-5xl font-extrabold text-text-primary">
            {numberOfQuestions}
          </span>
          <span className="absolute bottom-4 text-xs text-text-muted font-medium">
            {numberOfQuestions === 1 ? "question" : "questions"}
          </span>
        </div>
      </div>

      {/* Slider */}
      <div className="mb-6 sm:mb-8">
        <div className="relative mb-6">
          <div className="absolute w-full h-2 bg-bg-active/20 rounded-full" />
          <div
            className={`absolute h-2 rounded-full bg-gradient-to-r ${getGradientColor()} transition-all duration-300`}
            style={{ width: progressWidth }}
          />
          <input
            type="range"
            min="1"
            max="50"
            value={numberOfQuestions}
            onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
            className="relative w-full appearance-none bg-transparent cursor-pointer z-10"
            style={{ WebkitAppearance: "none" }}
          />
        </div>

        {/* Min/Max labels */}
        <div className="flex justify-between px-1 text-xs text-text-muted font-medium">
          <span>1</span>
          <span>25</span>
          <span>50</span>
        </div>
      </div>

      {/* Quick-pick presets */}
      <div className="flex gap-2 sm:gap-3 mb-8 sm:mb-10">
        {presets.map((n) => (
          <button
            key={n}
            onClick={() => setNumberOfQuestions(n)}
            className={`flex-1 py-2 rounded-xl border-2 text-sm font-semibold transition-all duration-300
              ${
                numberOfQuestions === n
                  ? "border-border-active bg-bg-active text-white shadow-md shadow-bg-active/20"
                  : "border-border-light bg-bg-active/10 text-text-muted hover:border-border-active hover:text-white"
              }`}
          >
            {n}
          </button>
        ))}
      </div>

      {/* Description Card */}
      <div className="bg-bg-card border-2 border-border-light p-6 sm:p-8 rounded-xl mb-6 sm:mb-8">
        <h3 className="text-xl sm:text-2xl font-bold mb-2">
          {description.title}
        </h3>
        <p className="text-text-muted text-base sm:text-lg">
          {description.desc}
        </p>
      </div>

      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 22px; height: 22px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ffffff, #e0e0e0);
          cursor: pointer;
          box-shadow: 0 0 0 4px rgba(147,51,234,0.2), 0 4px 12px rgba(0,0,0,0.4);
          transition: all 0.2s ease;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 0 0 6px rgba(147,51,234,0.3), 0 6px 16px rgba(0,0,0,0.5);
        }
        input[type="range"]::-moz-range-thumb {
          width: 22px; height: 22px;
          border: none; border-radius: 50%;
          background: linear-gradient(135deg, #ffffff, #e0e0e0);
          cursor: pointer;
          box-shadow: 0 0 0 4px rgba(147,51,234,0.2), 0 4px 12px rgba(0,0,0,0.4);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
      `}</style>
    </div>
  );
};

export default NumberOfQuestionsStep;
