import React, { useState, useEffect } from "react";
import type { Question } from "./session.types";
import SessionHeader from "../../components/feature/session/session-header/session-header";
import ControlBar from "../../components/feature/session/control-bar/control-bar";
import AIAvatar from "../../components/feature/session/aI-avatar/aI-avatar";
import QuestionPanel from "../../components/feature/session/question-panel/question-panel";
import { useCompleteInterview } from "../../api/interviews";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Tell me about yourself and your experience with React development.",
  },
  { id: 2, text: "Where do you see yourself in 5 years?" },
  { id: 3, text: "Describe a challenging project you've worked on." },
  { id: 4, text: "How do you handle conflicts in a team?" },
  { id: 5, text: "What are your strengths and weaknesses?" },
];

const InterviewSession: React.FC = () => {
  const [isRecording, setIsRecording] = useState(true);
  const [isListening] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(108);

  const { mutate: completeInterview } = useCompleteInterview();

  const navigation = useNavigate();

  useEffect(() => {
    if (!isRecording) return;
    const interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleEndInterview = () => {
    completeInterview(localStorage.getItem("current-session-id") || "", {
      onSuccess: (date) => {
        navigation("/processing");
      },
    });
    setIsRecording(false);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const { data: currentInterview } = useQuery({
    queryKey: ["current-interview"],
    enabled: false,
  });

  console.log("Current Interview Data:", currentInterview);

  return (
    <div className="h-screen bg-[#0a0a0a] text-white flex flex-col overflow-hidden">
      <SessionHeader
        timer={timer}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={QUESTIONS.length}
      />

      {/* Body: stacks vertically on mobile, side-by-side on sm+ */}
      <div className="flex flex-col sm:flex-row flex-1 overflow-hidden">
        {/* Left — AI avatar + controls */}
        <div className="flex-1 flex flex-col items-center justify-around py-6 sm:py-8 px-4 overflow-auto">
          <AIAvatar isListening={isListening} />
          <ControlBar
            onNextQuestion={handleNextQuestion}
            onEndInterview={handleEndInterview}
            isLastQuestion={currentQuestionIndex >= QUESTIONS.length - 1}
          />
        </div>

        {/* Right — question panel */}
        <QuestionPanel
          questionText={QUESTIONS[currentQuestionIndex].text}
          currentIndex={currentQuestionIndex}
          totalQuestions={QUESTIONS.length}
        />
      </div>
    </div>
  );
};

export default InterviewSession;
