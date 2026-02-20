import React, { useState, useEffect } from "react";

const ProcessingScreen: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [dots, setDots] = useState(0);

  const steps = [
    "Processing emotional cues...",
    "Analyzing your responses...",
    "Generating feedback...",
    "Preparing your report...",
  ];

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 3000);

    return () => clearInterval(stepInterval);
  }, []);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev + 1) % 4);
    }, 500);

    return () => clearInterval(dotInterval);
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center">
        {/* Animated Spinner */}
        <div className="relative mb-12">
          {/* Outer rotating arc - cyan/teal */}
          <svg className="w-32 h-32 animate-spin-slow" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#gradient1)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="70 200"
              className="origin-center"
            />
            <defs>
              <linearGradient
                id="gradient1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#0891b2" />
              </linearGradient>
            </defs>
          </svg>

          {/* Inner rotating arc - purple */}
          <svg
            className="absolute top-0 left-0 w-32 h-32 animate-spin-reverse"
            viewBox="0 0 100 100"
            style={{ animationDuration: "2s" }}
          >
            <circle
              cx="50"
              cy="50"
              r="35"
              fill="none"
              stroke="url(#gradient2)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="50 180"
              className="origin-center"
            />
            <defs>
              <linearGradient
                id="gradient2"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center dot with pulse */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse shadow-lg shadow-purple-500/50"></div>
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-3xl font-semibold text-white mb-3">
          Processing Your Interview
        </h1>

        <p className="text-gray-400 text-base mb-8">
          {steps[currentStep]}
          {".".repeat(dots)}
        </p>

        {/* Progress Dots */}
        <div className="flex gap-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index === currentStep
                  ? "bg-purple-500 w-6"
                  : index < currentStep
                    ? "bg-purple-600"
                    : "bg-gray-700"
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ProcessingScreen;
