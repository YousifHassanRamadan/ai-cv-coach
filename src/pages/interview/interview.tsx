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

const InterviewPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState("");
  const [customRole, setCustomRole] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState(3);
  const [selectedStyle, setSelectedStyle] = useState("");
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [micEnabled, setMicEnabled] = useState(false);

  const getDifficultyDescription = () => {
    const descriptions = {
      1: {
        title: "Beginner Mode",
        desc: "Basic foundational questions for those just starting out",
      },
      2: {
        title: "Easy Mode",
        desc: "Straightforward questions to build confidence",
      },
      3: {
        title: "Medium Mode",
        desc: "Standard industry questions for mid-level roles",
      },
      4: {
        title: "Hard Mode",
        desc: "Advanced challenges for experienced professionals",
      },
      5: {
        title: "Expert Mode",
        desc: "Extremely difficult questions for senior-level positions",
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
            roles={roles}
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
          />
        )}

        {currentStep === 3 && (
          <StyleStep
            interviewStyles={interviewStyles}
            selectedStyle={selectedStyle}
            setSelectedStyle={setSelectedStyle}
            onBack={() => setCurrentStep(2)}
            onContinue={() => setCurrentStep(4)}
          />
        )}

        {currentStep === 4 && (
          <EquipmentStep
            cameraEnabled={cameraEnabled}
            micEnabled={micEnabled}
            setCameraEnabled={setCameraEnabled}
            setMicEnabled={setMicEnabled}
            onBack={() => setCurrentStep(3)}
          />
        )}
      </div>
    </div>
  );
};

export default InterviewPage;
