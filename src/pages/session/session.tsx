import React, { useState, useEffect, useRef } from "react";
import SessionHeader from "../../components/feature/session/session-header/session-header";
import ControlBar from "../../components/feature/session/control-bar/control-bar";
import AIAvatar from "../../components/feature/session/aI-avatar/aI-avatar";
import QuestionPanel from "../../components/feature/session/question-panel/question-panel";
import {
  useCompleteInterview,
  type StartInterviewResponse,
} from "../../api/interviews";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useChunkRecorder } from "../../hooks/useChunkRecorder";
import type { ChunkProcessResponse } from "../../api/chunk";
import { toast } from "sonner";
import { useAudioChunkRecorder } from "../../hooks/useAudioChunkRecorder";

const InterviewSession: React.FC = () => {
  const [isRecording, setIsRecording] = useState(true);
  const [isListening] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [cameraEnabled, setCameraEnabled] = useState(false);

  const mode = localStorage.getItem("interview-mode");
  const isVideoMode = mode === "video";

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { mutate: completeInterview } = useCompleteInterview();
  const navigation = useNavigate();

  const { data: interviewInfo } = useQuery<StartInterviewResponse>({
    queryKey: ["current-interview"],
    enabled: false,
    queryFn: () => Promise.resolve(null as unknown as StartInterviewResponse),
  });

  const { data: chunkResponse } = useQuery<ChunkProcessResponse>({
    queryKey: ["chunk-response"],
    enabled: false,
    queryFn: () => Promise.resolve(null as unknown as ChunkProcessResponse),
  });

  const totalQuestions = interviewInfo?.questions?.length ?? 0;

  const { startRecording, stopRecording } = useChunkRecorder();
  const { startAudioRecording, stopAudioRecording } = useAudioChunkRecorder();

  // ── Timer ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isRecording) return;
    const interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, [isRecording]);

  useEffect(() => {
    console.log("chunkResponse=>>>", chunkResponse);
  }, [chunkResponse]);

  // ── On mount: permission was already granted in the equipment step,
  //    so getUserMedia will resolve silently with no browser prompt.
  useEffect(() => {
    if (isVideoMode) {
      openCamera();
    } else {
      startAudioRecording();
    }

    return () => {
      releaseAllMedia();
    };
  }, []);

  // ── Release all tracks → clears the browser tab recording indicator ───────
  const releaseAllMedia = () => {
    const videoStream = videoRef.current?.srcObject as MediaStream | null;
    if (videoStream) {
      videoStream.getTracks().forEach((t) => {
        t.enabled = false;
        t.stop();
      });
    }
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraEnabled(false);
  };

  // ── Camera ─────────────────────────────────────────────────────────────────
  const openCamera = async () => {
    try {
      // No prompt shown — permission was granted on the equipment check page
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (videoRef.current) videoRef.current.srcObject = stream;
      setCameraEnabled(true);
      await startRecording(stream);
    } catch (error) {
      console.error("Error accessing camera:", error);
      setCameraEnabled(false);
      toast.error(
        "Could not access camera. Please check your browser settings.",
      );
    }
  };

  // ── End interview ──────────────────────────────────────────────────────────
  const handleEndInterview = () => {
    // 1. Kill all chunk sending immediately
    stopRecording();
    stopAudioRecording();
    // 2. Release all tracks → removes the browser recording dot
    releaseAllMedia();
    setIsRecording(false);

    completeInterview(localStorage.getItem("session-id") || "", {
      onSuccess: (data) => {
        toast.success(data.message || "Interview completed successfully!");
        navigation("/processing");
        localStorage.removeItem("interview-mode");
      },
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="relative h-screen bg-[#0a0a0a] text-white flex flex-col overflow-hidden">
      <SessionHeader
        timer={timer}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
      />

      <div className="flex flex-col sm:flex-row flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col items-center justify-around py-6 sm:py-8 px-4 overflow-auto">
          <AIAvatar
            isListening={isListening}
            cameraEnabled={cameraEnabled}
            videoRef={videoRef}
          />
          <ControlBar
            onNextQuestion={handleNextQuestion}
            onEndInterview={handleEndInterview}
            isLastQuestion={currentQuestionIndex >= totalQuestions - 1}
          />
        </div>

        <QuestionPanel
          questionText={interviewInfo?.questions ?? []}
          currentIndex={currentQuestionIndex}
          totalQuestions={totalQuestions}
        />
      </div>
    </div>
  );
};

export default InterviewSession;
