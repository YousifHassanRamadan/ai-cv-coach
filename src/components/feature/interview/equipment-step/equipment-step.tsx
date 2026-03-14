import { Camera, Mic, Video } from "lucide-react";
import EquipmentCard from "../equipment-card/equipment-card";
import type { EquipmentStepProps } from "./equipment-step.types";
import { Link } from "react-router-dom";

const EquipmentStep = ({
  cameraEnabled,
  micEnabled,
  setCameraEnabled,
  setMicEnabled,
  onBack,
  handleStartInterview,
  isStartingInterview,
}: EquipmentStepProps) => {
  const allReady = cameraEnabled || micEnabled;

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">Equipment Check</h2>
      <p className="text-gray-400 mb-8 sm:mb-12 text-sm sm:text-base">
        Make sure your camera and microphone are working
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <EquipmentCard
          title="Camera"
          icon={<Camera size={20} className="sm:w-6 sm:h-6" />}
          enabled={cameraEnabled}
          onToggle={() => setCameraEnabled(!cameraEnabled)}
        />
        <EquipmentCard
          title="Microphone"
          icon={<Mic size={20} className="sm:w-6 sm:h-6" />}
          enabled={micEnabled}
          onToggle={() => setMicEnabled(!micEnabled)}
        />
      </div>

      {/* Ready status */}
      {allReady && (
        <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border-2 border-teal-500/30 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 animate-slideIn">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-teal-500 flex items-center justify-center">
                <span className="text-white text-xs sm:text-sm">✓</span>
              </div>
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-base sm:text-lg text-teal-400">
                All systems ready!
              </h3>
              <p className="text-xs sm:text-sm text-gray-400">
                You're all set to start your interview
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
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
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-slideIn {
          animation: slideIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default EquipmentStep;
