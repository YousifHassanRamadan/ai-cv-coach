import { useState } from "react";

import PageHeader from "../../components/common/page-header/page-header";
import Stepper from "../../components/feature/interview/stepper/stepper";
import RoleStep from "../../components/feature/interview/role-step/role-step";
import DifficultyStep from "../../components/feature/interview/difficulty-step/difficulty-step";
import StyleStep from "../../components/feature/interview/style-step/style-step";
import EquipmentStep from "../../components/feature/interview/equipment-step/equipment-step";
import {
  difficultyLabels,
  interviewStyles,
  roles,
  steps,
} from "../../constants/interview/interview";
import { useTracks } from "../../api/tracks";
import {
  useStartInterview,
  type ExperienceLevel,
  type InterviewDifficulty,
  type StartInterviewPayload,
} from "../../api/interviews";
import { useNavigate, useNavigation } from "react-router-dom";
import { toast } from "sonner";

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
        navigate("/session");
      },
    });
  };

  const getDifficultyDescription = () => {
    const descriptions = {
      1: {
        title: "Easy Mode",
        desc: "Basic foundational questions for those just starting out",
      },
      2: {
        title: "Medium Mode",
        desc: "Standard industry questions for mid-level roles",
      },
      3: {
        title: "Hard Mode",
        desc: "Advanced challenges for experienced professionals",
      },
      4: {
        title: "Custom Mode",
        desc: "Tailored questions for your specific needs",
      },
    };
    return descriptions[difficultyLevel as keyof typeof descriptions];
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-5 space-y-4">
        <PageHeader
          title="AI Interview Practice"
          subtitle="Set up your personalized interview session"
        />
        <Stepper steps={steps} currentStep={currentStep} />
      </div>

      <div className="max-w-4xl mx-auto bg-[#0f0e17] p-4 sm:p-8 md:p-12 lg:p-16 rounded-2xl">
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
