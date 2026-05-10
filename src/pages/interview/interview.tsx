import { useState } from "react";

import PageHeader from "../../components/common/page-header/page-header";
import Stepper from "../../components/feature/interview/stepper/stepper";
import RoleStep from "../../components/feature/interview/role-step/role-step";
import DifficultyStep from "../../components/feature/interview/difficulty-step/difficulty-step";
import StyleStep from "../../components/feature/interview/style-step/style-step";
import EquipmentStep from "../../components/feature/interview/equipment-step/equipment-step";
import { useInterviewConstants } from "../../constants/interview/interview";
import { useTracks } from "../../api/tracks";
import {
  useStartInterview,
  type ExperienceLevel,
  type InterviewDifficulty,
  type StartInterviewPayload,
} from "../../api/interviews";
import { useNavigate, useNavigation } from "react-router-dom";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const InterviewPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState("");
  const [customRole, setCustomRole] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState(3);
  const [numberOfQuestions, setNumberOfQuestions] = useState(3);
  const [selectedStyle, setSelectedStyle] = useState("");
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [micEnabled, setMicEnabled] = useState(false);
  const [selectedWeightProfile, setSelectedWeightProfile] = useState("");
  const [selectedCvId, setSelectedCvId] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");

  const navigate = useNavigate();

  const { data: tracks, isLoading: isTracksLoading } = useTracks();

  const { mutate: startInterview, isPending: isStartingInterview } =
    useStartInterview();

  const handleStartInterview = () => {
    const difficultyMap: Record<number, InterviewDifficulty> = {
      1: "easy",
      2: "medium",
      3: "hard",
      4: "custom",
    };

    const payload: StartInterviewPayload = {
      cvDocumentId: selectedCvId,
      trackId: selectedRole,
      difficulty: difficultyMap[difficultyLevel],
      weightProfile: selectedWeightProfile,
      totalQuestions: numberOfQuestions,
      experienceLevel: experienceLevel as ExperienceLevel,
      mode: cameraEnabled ? "video" : "audio",
    };

    console.log("Starting interview with payload:", payload);
    startInterview(payload, {
      onSuccess: (data) => {
        toast.success("Interview started successfully!");
        localStorage.setItem("interview-mode", data.mode);
        navigate("/session");
      },
    });
  };

  const getDifficultyDescription = () => {
    return {
      title: t(`difficulty.${difficultyLevel}.title`),
      desc: t(`difficulty.${difficultyLevel}.desc`),
    };
  };

  const { t } = useTranslation();

  const { steps, difficultyLabels, interviewStyles } = useInterviewConstants();

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-5 space-y-4">
        <PageHeader
          title={t("interviewTitle")}
          subtitle={t("interviewSubtitle")}
        />
        <Stepper steps={steps} currentStep={currentStep} />
      </div>

      <div className="max-w-4xl mx-auto bg-bg-subcard p-4 sm:p-8 md:p-12 lg:p-16 rounded-2xl">
        {currentStep === 1 && (
          <RoleStep
            roles={isTracksLoading ? [] : tracks || []}
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
            customRole={customRole}
            setCustomRole={setCustomRole}
            onContinue={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 2 && (
          <DifficultyStep
            difficultyLevel={difficultyLevel}
            setDifficultyLevel={setDifficultyLevel}
            difficultyLabels={difficultyLabels}
            getDifficultyDescription={getDifficultyDescription}
            onBack={() => setCurrentStep(1)}
            onContinue={() => setCurrentStep(3)}
            setNumberOfQuestions={setNumberOfQuestions}
            numberOfQuestions={numberOfQuestions}
            experienceLevel={experienceLevel}
            setExperienceLevel={setExperienceLevel}
          />
        )}

        {currentStep === 3 && (
          <StyleStep
            interviewStyles={interviewStyles}
            selectedStyle={selectedStyle}
            setSelectedStyle={setSelectedStyle}
            onBack={() => setCurrentStep(2)}
            onContinue={() => setCurrentStep(4)}
            selectedCvId={selectedCvId}
            setSelectedCvId={setSelectedCvId}
            selectedWeightProfile={selectedWeightProfile}
            setSelectedWeightProfile={setSelectedWeightProfile}
          />
        )}

        {currentStep === 4 && (
          <EquipmentStep
            cameraEnabled={cameraEnabled}
            micEnabled={micEnabled}
            setCameraEnabled={setCameraEnabled}
            setMicEnabled={setMicEnabled}
            onBack={() => setCurrentStep(3)}
            handleStartInterview={handleStartInterview}
            isStartingInterview={isStartingInterview}
          />
        )}
      </div>
    </div>
  );
};

export default InterviewPage;
