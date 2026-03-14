import { CheckCircle2, ChevronRight, FileText } from "lucide-react";
import StyleCard from "../style-card/style-card";

import type { StyleStepProps, WeightProfile } from "./style-step.types";
import { useCvDocuments } from "../../../../api/cv";
import CvDocumentItem from "./cv-document-item/cv-document-item";
import WeightProfilesCard from "./weight-profiles-card/weight-profiles-card";

const weightProfiles: WeightProfile[] = [
  {
    id: "balanced",
    label: "Balanced",
    description: "General interviews",
    technical: 45,
    behavioral: 30,
    situational: 25,
    tag: "General",
  },
  {
    id: "technical",
    label: "Technical",
    description: "Engineering roles",
    technical: 60,
    behavioral: 25,
    situational: 15,
    tag: "Engineering",
  },
  {
    id: "behavioral",
    label: "Behavioral",
    description: "Customer-facing",
    technical: 20,
    behavioral: 40,
    situational: 40,
    tag: "Customer",
  },
  {
    id: "presentation",
    label: "Presentation",
    description: "Public speaking",
    technical: 25,
    behavioral: 35,
    situational: 40,
    tag: "Speaking",
  },
  {
    id: "audio_only",
    label: "Audio Only",
    description: "Audio-only mode",
    technical: 55,
    behavioral: 45,
    situational: 0,
    tag: "Audio",
  },
  {
    id: "testing_no_cv",
    label: "Testing/Dev",
    description: "Testing & dev",
    technical: 0,
    behavioral: 50,
    situational: 50,
    tag: "Dev",
  },
];

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

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">
        Choose Interviewer Style
      </h2>
      <p className="text-gray-400 mb-8 sm:mb-12 text-sm sm:text-base">
        Select the personality of your AI interviewer
      </p>

      {/* Weight Profile */}
      <div className="mb-10">
        <h3 className="text-lg font-bold mb-1">Question Weight Profile</h3>
        <p className="text-gray-400 text-sm mb-4">
          How questions are distributed across categories
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
        <h3 className="text-lg font-bold mb-1">Select Your CV</h3>
        <p className="text-gray-400 text-sm mb-4">
          Choose which CV to base your interview on
        </p>

        {isCvDocumentsLoading ? (
          <div className="flex items-center justify-center py-10 text-gray-500 text-sm">
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
            Loading your CVs…
          </div>
        ) : cvDocuments.length === 0 ? (
          <div className="bg-[#13131a] border-2 border-dashed border-gray-700 rounded-xl p-8 text-center text-gray-500 text-sm">
            No CVs uploaded yet. Upload one to get started.
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
          Back
        </button>
        <button
          disabled={!selectedWeightProfile || !selectedCvId}
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
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
      `}</style>
    </div>
  );
};

export default StyleStep;
