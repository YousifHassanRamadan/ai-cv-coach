import React, { useState, useEffect, useRef, useCallback } from "react";
import SessionHeader from "../../components/feature/session/session-header/session-header";
import ControlBar from "../../components/feature/session/control-bar/control-bar";
import AIAvatar from "../../components/feature/session/aI-avatar/aI-avatar";
import QuestionPanel from "../../components/feature/session/question-panel/question-panel";
import {
  useCompleteInterview,
  type InterviewQuestion,
  type StartInterviewResponse,
} from "../../api/interviews";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useChunkRecorder } from "../../hooks/useChunkRecorder";
import type { ChunkProcessResponse } from "../../api/chunk";
import { toast } from "sonner";
import { useAudioChunkRecorder } from "../../hooks/useAudioChunkRecorder";
import { useElevenLabsTTS } from "../../hooks/useElevenLabsTTS";

const InterviewSession: React.FC = () => {
  const ttsInitializedRef = useRef(false);
  const speakingLockRef = useRef(false);
  const [isRecording, setIsRecording] = useState(true);
  const [isListening] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

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
  const questions = (interviewInfo?.questions ?? []) as InterviewQuestion[];

  // ── Video recorder (video mode only) ─────────────────────────────────────
  const {
    acquireStream: acquireVideoStream,
    startRecorderForQuestion: startVideoRecorderForQuestion,
    stopRecorderAndFlush: stopVideoRecorderAndFlush,
    releaseStream: releaseVideoStream,
    pauseRecording,
    resumeRecording,
  } = useChunkRecorder();

  // ── Audio recorder (audio mode only) ─────────────────────────────────────
  const {
    acquireStream,
    startRecorderForQuestion,
    stopRecorderAndFlush,
    releaseStream,
  } = useAudioChunkRecorder();

  // ── TTS ───────────────────────────────────────────────────────────────────
  const { speakQuestion, stopSpeaking } = useElevenLabsTTS();

  // ── Pause / resume active recorder (video mode only) ──────────────────────
  // Audio-only mode does NOT need pausing during TTS — mic data just buffers.
  const pauseActiveRecorder = useCallback(() => {
    if (isVideoMode) pauseRecording();
  }, [isVideoMode, pauseRecording]);

  const resumeActiveRecorder = useCallback(() => {
    if (isVideoMode) resumeRecording();
  }, [isVideoMode, resumeRecording]);

  // ── Speak a question, gate video recording around playback ────────────────
  const speakAndResume = useCallback(
    (question: InterviewQuestion, index: number) => {
      if (speakingLockRef.current) {
        console.log(`⏭️ TTS already in progress, skipping question ${index}`);
        return;
      }
      speakingLockRef.current = true;
      pauseActiveRecorder();
      setIsPlaying(true);

      speakQuestion(question, index)
        .then(() => {
          speakingLockRef.current = false;
          setIsPlaying(false);
          resumeActiveRecorder();
        })
        .catch((err: unknown) => {
          console.error("TTS error:", err);
          toast.error(
            "Could not play question audio. Please read the question on screen.",
          );
          speakingLockRef.current = false;
          setIsPlaying(false);
          resumeActiveRecorder();
        });
    },
    [pauseActiveRecorder, resumeActiveRecorder, speakQuestion],
  );

  // ── Timer ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isRecording) return;
    const interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, [isRecording]);

  useEffect(() => {
    console.log("chunkResponse=>>>", chunkResponse);
  }, [chunkResponse]);

  // ── Release all camera/video tracks ───────────────────────────────────────
  const releaseAllMedia = useCallback(() => {
    mediaStream?.getTracks().forEach((t) => {
      t.enabled = false;
      t.stop();
    });
    if (videoRef.current) videoRef.current.srcObject = null;
    setMediaStream(null);
    setCameraEnabled(false);
  }, [mediaStream]);

  // ── Camera ────────────────────────────────────────────────────────────────
  const openCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      setMediaStream(stream); // ✅ store it in state
      // Remove: videoRef.current.srcObject = stream (let AIAvatar handle it)
      setCameraEnabled(true);

      acquireVideoStream(stream);
      startVideoRecorderForQuestion();
    } catch (error) {
      console.error("Error accessing camera:", error);
      setCameraEnabled(false);
      toast.error(
        "Could not access camera. Please check your browser settings.",
      );
    }
  }, [acquireVideoStream, startVideoRecorderForQuestion]);

  // ── On mount: start media, then speak first question ─────────────────────
  // Lifecycle (audio mode):
  //   acquireStream() → startRecorderForQuestion() → speakAndResume(q0)
  // Lifecycle (video mode):
  //   openCamera() → acquireVideoStream(stream) → startVideoRecorderForQuestion() → speakAndResume(q0)
  useEffect(() => {
    if (ttsInitializedRef.current) return; // StrictMode double-mount guard
    ttsInitializedRef.current = true;

    const init = async () => {
      if (isVideoMode) {
        await openCamera();
      } else {
        await acquireStream(); // 1. get mic permission once
        startRecorderForQuestion(); // 2. start recording question 0
      }

      if (questions[0]) speakAndResume(questions[0], 0);
    };

    init();

    return () => {
      stopSpeaking();
      if (isVideoMode) {
        releaseVideoStream();
        releaseAllMedia();
      } else {
        releaseStream();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Speak whenever the question index advances (skips index 0) ───────────
  useEffect(() => {
    if (currentQuestionIndex === 0) return;
    const question = questions[currentQuestionIndex];
    if (question) speakAndResume(question, currentQuestionIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestionIndex]);

  // ── Next question ─────────────────────────────────────────────────────────
  // Both modes: flush current chunk, then start a fresh recorder for next question.
  const handleNextQuestion = useCallback(async () => {
    if (currentQuestionIndex >= totalQuestions - 1) return;

    stopSpeaking();
    speakingLockRef.current = false; // release lock so next question can speak
    setIsPlaying(false);

    if (isVideoMode) {
      // ✅ Flush current question's video, start fresh recorder for next
      await stopVideoRecorderAndFlush();
      startVideoRecorderForQuestion();
    } else {
      await stopRecorderAndFlush(); // flush current question — don't lose audio
      startRecorderForQuestion(); // immediately start recording next question
    }

    setCurrentQuestionIndex((prev) => prev + 1);
    // The useEffect above will call speakAndResume for the new index
  }, [
    currentQuestionIndex,
    totalQuestions,
    isVideoMode,
    stopSpeaking,
    stopVideoRecorderAndFlush,
    startVideoRecorderForQuestion,
    stopRecorderAndFlush,
    startRecorderForQuestion,
  ]);

  // ── Replay current question ───────────────────────────────────────────────
  const handleReplayQuestion = useCallback(() => {
    if (speakingLockRef.current) return;
    const question = questions[currentQuestionIndex];
    if (question) speakAndResume(question, currentQuestionIndex);
  }, [questions, currentQuestionIndex, speakAndResume]);

  // ── End interview ─────────────────────────────────────────────────────────
  // Both modes: flush the final chunk before completing so no data is lost.
  const handleEndInterview = useCallback(async () => {
    stopSpeaking();
    setIsPlaying(false);

    if (isVideoMode) {
      await stopVideoRecorderAndFlush(); // ✅ flush final video chunk — critical
      releaseVideoStream(); // ✅ stop stream tracks via hook
      releaseAllMedia(); // clean up <video> element srcObject
    } else {
      await stopRecorderAndFlush(); // flush final audio chunk — critical, don't skip
      releaseStream();
    }

    setIsRecording(false);

    completeInterview(localStorage.getItem("session-id") || "", {
      onSuccess: (data) => {
        toast.success(data.message || "Interview completed successfully!");
        navigation("/processing");
        localStorage.removeItem("interview-mode");
      },
    });
  }, [
    isVideoMode,
    stopSpeaking,
    stopVideoRecorderAndFlush,
    releaseVideoStream,
    releaseAllMedia,
    stopRecorderAndFlush,
    releaseStream,
    completeInterview,
    navigation,
  ]);

  return (
    <div className="relative h-screen bg-bg-primary text-text-primary flex flex-col overflow-hidden ">
      <SessionHeader
        timer={timer}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
      />

      <div className="sm:flex block sm:flex-row flex-1 sm:overflow-hidden overflow-y-auto min-h-0 sm:py-2 py-16">
        <div className="flex-1 flex flex-col items-center justify-between sm:justify-around py-3 sm:py-8 px-4 overflow-hidden min-h-0">
          {/* Playback / recording status pill */}
          <div className="h-5 sm:h-6 flex items-center justify-center mb-6">
            {isPlaying && (
              <span className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-bg-active/20 text-text-primary">
                <span className="w-1.5 h-1.5 rounded-full bg-bg-active animate-pulse inline-block" />
                Speaking…
              </span>
            )}
            {isRecording && !isPlaying && (
              <span className="inline-flex  items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-red-500/10 text-red-400">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping inline-block" />
                Recording…
              </span>
            )}
          </div>

          <AIAvatar
            isListening={isListening && !isPlaying}
            cameraEnabled={cameraEnabled}
            videoRef={videoRef}
            stream={mediaStream} // ✅ pass stream
          />

          <ControlBar
            onNextQuestion={handleNextQuestion}
            onEndInterview={handleEndInterview}
            onReplayQuestion={handleReplayQuestion}
            isLastQuestion={currentQuestionIndex >= totalQuestions - 1}
          />
        </div>

        <QuestionPanel
          questionText={questions}
          currentIndex={currentQuestionIndex}
          totalQuestions={totalQuestions}
        />
      </div>
    </div>
  );
};

export default InterviewSession;
