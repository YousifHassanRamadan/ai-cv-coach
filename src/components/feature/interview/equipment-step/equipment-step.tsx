import { useEffect, useRef, useState } from "react";
import {
  Camera,
  Mic,
  CheckCircle,
  XCircle,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import type { DeviceStatus, EquipmentStepProps } from "./equipment-step.types";
import { Video } from "lucide-react";

const EquipmentStep = ({
  cameraEnabled,
  micEnabled,
  setCameraEnabled,
  setMicEnabled,
  onBack,
  handleStartInterview,
  isStartingInterview,
}: EquipmentStepProps) => {
  const [cameraStatus, setCameraStatus] = useState<DeviceStatus>("idle");
  const [micStatus, setMicStatus] = useState<DeviceStatus>("idle");
  const [micLevel, setMicLevel] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const cameraStreamRef = useRef<MediaStream | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // ── Cleanup all streams on unmount ────────────────────────────────────────
  useEffect(() => {
    return () => {
      stopCamera();
      stopMic();
    };
  }, []);

  // ── Camera ─────────────────────────────────────────────────────────────────
  const testCamera = async () => {
    setCameraStatus("requesting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      cameraStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraStatus("granted");
      setCameraEnabled(true);
    } catch (err: any) {
      setCameraStatus(err?.name === "NotAllowedError" ? "denied" : "error");
      setCameraEnabled(false);
    }
  };

  const stopCamera = () => {
    cameraStreamRef.current?.getTracks().forEach((t) => t.stop());
    cameraStreamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
  };

  // ── Microphone ─────────────────────────────────────────────────────────────
  const testMic = async () => {
    setMicStatus("requesting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      micStreamRef.current = stream;

      // Set up audio analyser for the level meter
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      const data = new Uint8Array(analyser.frequencyBinCount);
      const tick = () => {
        analyser.getByteFrequencyData(data);
        const avg = data.reduce((a, b) => a + b, 0) / data.length;
        setMicLevel(Math.min(100, (avg / 128) * 100 * 2.5));
        animFrameRef.current = requestAnimationFrame(tick);
      };
      tick();

      setMicStatus("granted");
      setMicEnabled(true);
    } catch (err: any) {
      setMicStatus(err?.name === "NotAllowedError" ? "denied" : "error");
      setMicEnabled(false);
    }
  };

  const stopMic = () => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    audioCtxRef.current?.close();
    micStreamRef.current?.getTracks().forEach((t) => t.stop());
    micStreamRef.current = null;
    analyserRef.current = null;
    setMicLevel(0);
  };

  // ── Toggle helpers ─────────────────────────────────────────────────────────
  const handleCameraToggle = () => {
    if (cameraStatus === "granted") {
      stopCamera();
      setCameraStatus("idle");
      setCameraEnabled(false);
    } else {
      testCamera();
    }
  };

  const handleMicToggle = () => {
    if (micStatus === "granted") {
      stopMic();
      setMicStatus("idle");
      setMicEnabled(false);
    } else {
      testMic();
    }
  };

  const allReady = cameraEnabled || micEnabled;

  // ── Status helpers ─────────────────────────────────────────────────────────
  const StatusIcon = ({ status }: { status: DeviceStatus }) => {
    if (status === "requesting")
      return <Loader2 size={16} className="animate-spin text-purple-400" />;
    if (status === "granted")
      return <CheckCircle size={16} className="text-teal-400" />;
    if (status === "denied")
      return <XCircle size={16} className="text-red-400" />;
    if (status === "error")
      return <AlertTriangle size={16} className="text-yellow-400" />;
    return null;
  };

  const statusLabel: Record<DeviceStatus, string> = {
    idle: "Click to test",
    requesting: "Waiting for permission…",
    granted: "Connected",
    denied: "Access denied — check browser settings",
    error: "Device error — try again",
  };

  const cardBorder: Record<DeviceStatus, string> = {
    idle: "border-white/10 hover:border-white/20",
    requesting: "border-purple-500/40",
    granted: "border-teal-500/40",
    denied: "border-red-500/40",
    error: "border-yellow-500/40",
  };

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">Equipment Check</h2>
      <p className="text-gray-400 mb-8 sm:mb-10 text-sm sm:text-base">
        Test your devices before the interview starts
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* ── Camera card ── */}
        <div
          className={`rounded-2xl border bg-white/[0.03] p-5 flex flex-col gap-4 transition-all duration-300 ${cardBorder[cameraStatus]}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center
                ${cameraStatus === "granted" ? "bg-teal-500/15" : "bg-white/5"}`}
              >
                <Camera
                  size={18}
                  className={
                    cameraStatus === "granted"
                      ? "text-teal-400"
                      : "text-gray-400"
                  }
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Camera</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <StatusIcon status={cameraStatus} />
                  <p className="text-xs text-gray-500">
                    {statusLabel[cameraStatus]}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={handleCameraToggle}
              disabled={cameraStatus === "requesting"}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                ${
                  cameraStatus === "granted"
                    ? "bg-teal-500/15 text-teal-400 hover:bg-teal-500/25"
                    : "bg-purple-600/80 text-white hover:bg-purple-500"
                }`}
            >
              {cameraStatus === "granted"
                ? "Disable"
                : cameraStatus === "requesting"
                  ? "…"
                  : "Test"}
            </button>
          </div>

          {/* Live preview */}
          <div
            className={`relative rounded-xl overflow-hidden bg-black/40 transition-all duration-500
            ${cameraStatus === "granted" ? "h-36 sm:h-44" : "h-0"}`}
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover scale-x-[-1]"
            />
            <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-black/60 rounded-full px-2.5 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-[10px] text-teal-300 font-medium">
                Live
              </span>
            </div>
          </div>

          {/* Denied help text */}
          {cameraStatus === "denied" && (
            <p className="text-xs text-red-400/80 leading-relaxed">
              Click the <strong className="text-red-300">lock icon</strong> in
              your browser's address bar → allow Camera → refresh.
            </p>
          )}
        </div>

        {/* ── Microphone card ── */}
        <div
          className={`rounded-2xl border bg-white/[0.03] p-5 flex flex-col gap-4 transition-all duration-300 ${cardBorder[micStatus]}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center
                ${micStatus === "granted" ? "bg-teal-500/15" : "bg-white/5"}`}
              >
                <Mic
                  size={18}
                  className={
                    micStatus === "granted" ? "text-teal-400" : "text-gray-400"
                  }
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Microphone</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <StatusIcon status={micStatus} />
                  <p className="text-xs text-gray-500">
                    {statusLabel[micStatus]}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={handleMicToggle}
              disabled={micStatus === "requesting"}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                ${
                  micStatus === "granted"
                    ? "bg-teal-500/15 text-teal-400 hover:bg-teal-500/25"
                    : "bg-purple-600/80 text-white hover:bg-purple-500"
                }`}
            >
              {micStatus === "granted"
                ? "Disable"
                : micStatus === "requesting"
                  ? "…"
                  : "Test"}
            </button>
          </div>

          {/* Live level meter */}
          <div
            className={`flex flex-col gap-2 transition-all duration-500 overflow-hidden
            ${micStatus === "granted" ? "h-16" : "h-0"}`}
          >
            <p className="text-xs text-gray-500">Input level</p>
            {/* Bar meter */}
            <div className="flex items-end gap-[3px] h-8">
              {Array.from({ length: 24 }).map((_, i) => {
                const threshold = (i / 24) * 100;
                const active = micLevel > threshold;
                const color =
                  i < 16
                    ? "bg-teal-400"
                    : i < 21
                      ? "bg-yellow-400"
                      : "bg-red-400";
                return (
                  <div
                    key={i}
                    className={`flex-1 rounded-sm transition-all duration-75
                      ${active ? color : "bg-white/10"}`}
                    style={{ height: `${50 + (i / 24) * 50}%` }}
                  />
                );
              })}
            </div>
            {micLevel < 5 && (
              <p className="text-[10px] text-gray-600">
                Speak to test your mic…
              </p>
            )}
          </div>

          {/* Denied help text */}
          {micStatus === "denied" && (
            <p className="text-xs text-red-400/80 leading-relaxed">
              Click the <strong className="text-red-300">lock icon</strong> in
              your browser's address bar → allow Microphone → refresh.
            </p>
          )}
        </div>
      </div>

      {/* ── Ready banner ── */}
      {allReady && (
        <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border-2 border-teal-500/30 rounded-xl p-4 sm:p-5 mb-6 sm:mb-8 animate-slideIn">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-teal-500 flex items-center justify-center">
                <span className="text-white text-xs sm:text-sm">✓</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-base sm:text-lg text-teal-400">
                All systems ready!
              </h3>
              <p className="text-xs sm:text-sm text-gray-400">
                {cameraEnabled && micEnabled
                  ? "Camera and microphone are active"
                  : cameraEnabled
                    ? "Camera is active — microphone only mode"
                    : "Microphone is active — audio only mode"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Navigation ── */}
      <div className="flex flex-col sm:flex-row-reverse justify-between gap-3 sm:gap-0">
        <button
          onClick={onBack}
          className="px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-300 order-2 sm:order-1 text-sm sm:text-base"
        >
          Back
        </button>
        <button
          disabled={!allReady || isStartingInterview}
          onClick={handleStartInterview}
          className="group relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:shadow-2xl hover:shadow-purple-500/50 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 disabled:shadow-none order-1 sm:order-2"
        >
          <Video size={18} className="sm:w-5 sm:h-5" />
          {isStartingInterview ? "Starting..." : "Start Interview"}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
        .animate-slideIn { animation: slideIn 0.4s ease-out; }
      `}</style>
    </div>
  );
};

export default EquipmentStep;
