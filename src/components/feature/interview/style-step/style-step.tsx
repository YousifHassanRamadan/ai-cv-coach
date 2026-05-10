import { CheckCircle2, ChevronRight, FileText } from "lucide-react";
import StyleCard from "../style-card/style-card";

import type { StyleStepProps, WeightProfile } from "./style-step.types";
import { useCvDocuments } from "../../../../api/cv";
import CvDocumentItem from "./cv-document-item/cv-document-item";
import WeightProfilesCard from "./weight-profiles-card/weight-profiles-card";
import ContinueButton from "../../../common/continue-button/continue-button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const StyleStep = ({
  selectedWeightProfile,
  setSelectedWeightProfile,
  selectedCvId,
  setSelectedCvId,
  onBack,
  onContinue,
}: StyleStepProps) => {
  const { data: cvDocuments = [], isLoading: isCvDocumentsLoading } =
    useCvDocuments();

  const { t } = useTranslation();

  const weightProfiles: WeightProfile[] = [
    {
      id: "balanced",
      label: t("weightProfiles.balanced.label"),
      description: t("weightProfiles.balanced.description"),
      technical: 45,
      behavioral: 30,
      situational: 25,
      tag: t("weightProfiles.balanced.tag"),
    },
    {
      id: "technical",
      label: t("weightProfiles.technical.label"),
      description: t("weightProfiles.technical.description"),
      technical: 60,
      behavioral: 25,
      situational: 15,
      tag: t("weightProfiles.technical.tag"),
    },
    {
      id: "behavioral",
      label: t("weightProfiles.behavioral.label"),
      description: t("weightProfiles.behavioral.description"),
      technical: 20,
      behavioral: 40,
      situational: 40,
      tag: t("weightProfiles.behavioral.tag"),
    },
    {
      id: "presentation",
      label: t("weightProfiles.presentation.label"),
      description: t("weightProfiles.presentation.description"),
      technical: 25,
      behavioral: 35,
      situational: 40,
      tag: t("weightProfiles.presentation.tag"),
    },
    {
      id: "audio_only",
      label: t("weightProfiles.audioOnly.label"),
      description: t("weightProfiles.audioOnly.description"),
      technical: 55,
      behavioral: 45,
      situational: 0,
      tag: t("weightProfiles.audioOnly.tag"),
    },
    {
      id: "testing_no_cv",
      label: t("weightProfiles.testing.label"),
      description: t("weightProfiles.testing.description"),
      technical: 0,
      behavioral: 50,
      situational: 50,
      tag: t("weightProfiles.testing.tag"),
    },
  ];

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">
        {t("styleStep.title")}
      </h2>
      <p className="text-text-muted mb-8 sm:mb-12 text-sm sm:text-base">
        {t("styleStep.subtitle")}
      </p>

      {/* Weight Profile */}
      <div className="mb-10">
        <h3 className="text-lg font-bold mb-1">
          {t("styleStep.weightProfile.title")}
        </h3>
        <p className="text-text-muted text-sm mb-4">
          {t("styleStep.weightProfile.description")}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-4">
          {weightProfiles.map((profile) => (
            <WeightProfilesCard
              profile={profile}
              selectedWeightProfile={selectedWeightProfile}
              setSelectedWeightProfile={setSelectedWeightProfile}
            />
          ))}
        </div>
      </div>

      {/* CV Selector */}
      <div className="mb-8 sm:mb-10">
        <h3 className="text-lg font-bold mb-1">{t("styleStep.cv.title")}</h3>
        <p className="text-text-muted text-sm mb-4">
          {t("styleStep.cv.description")}
        </p>

        {isCvDocumentsLoading ? (
          <div className="flex items-center justify-center py-10 text-text-muted text-sm">
            <svg
              className="animate-spin w-5 h-5 mr-2 text-purple-400"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
            {t("styleStep.cv.loading")}
          </div>
        ) : cvDocuments.length === 0 ? (
          <div className="bg-bg-card border-2 border-dashed border-border-light rounded-xl p-8 text-center text-text-muted text-sm">
            <p>{t("styleStep.cv.empty")}</p>

            <Link
              to="/resume"
              className="mt-2 inline-block text-blue-500 font-semibold underline underline-offset-4 hover:text-text-active transition-colors duration-200"
            >
              {t("styleStep.cv.uploadCta")}
            </Link>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {cvDocuments.map((doc) => (
              <CvDocumentItem
                doc={doc}
                selectedCvId={selectedCvId}
                setSelectedCvId={setSelectedCvId}
              />
            ))}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
        <button
          onClick={onBack}
          className="px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-300 order-2 sm:order-1 text-sm sm:text-base"
        >
          {t("common.back")}
        </button>

        <ContinueButton
          disabled={!selectedWeightProfile || !selectedCvId}
          onClick={onContinue}
        />
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
      `}</style>
    </div>
  );
};

export default StyleStep;
