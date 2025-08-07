import React, { useState, useEffect } from "react";
import { COLORS } from "../styles/colors";

const ProcessingSpinner = () => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Initializing AI models...",
    "Extracting video frames...",
    "Analyzing facial features...",
    "Detecting temporal anomalies...",
    "Processing compression artifacts...",
    "Calculating confidence scores...",
    "Finalizing analysis...",
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;
        return prev + Math.random() * 3;
      });
    }, 200);

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 1500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, [steps.length]);

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: COLORS.MAIN_GRADIENT }}
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20 float-animation"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="text-center relative z-10">
        {/* Multi-Ring Spinner */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          {/* Outer Ring */}
          <div
            className="absolute inset-0 border-4 border-transparent rounded-full animate-spin"
            style={{
              borderTopColor: COLORS.ACCENT_LIGHT,
              animationDuration: "1.5s",
            }}
          />

          {/* Middle Ring */}
          <div
            className="absolute inset-2 border-4 border-transparent rounded-full animate-spin"
            style={{
              borderRightColor: COLORS.ACCENT_LIGHT,
              animationDuration: "1s",
              animationDirection: "reverse",
            }}
          />

          {/* Inner Ring */}
          <div
            className="absolute inset-4 border-4 border-transparent rounded-full animate-spin"
            style={{
              borderBottomColor: COLORS.ACCENT_LIGHT,
              animationDuration: "0.7s",
            }}
          />

          {/* Center Pulse */}
          <div
            className="absolute inset-8 rounded-full glow-effect"
            style={{ backgroundColor: COLORS.ACCENT_LIGHT }}
          />

          {/* Orbiting Dots */}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-full animate-spin"
              style={{
                backgroundColor: COLORS.ACCENT_LIGHT,
                top: "50%",
                left: "50%",
                transformOrigin: `${30 + i * 10}px 0`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: "2s",
              }}
            />
          ))}
        </div>

        {/* Title with Typing Effect */}
        <h2
          className="text-3xl font-bold mb-4 shimmer-effect"
          style={{ color: COLORS.ACCENT_LIGHT }}
        >
          Analyzing Video
          <span className="processing-dots"></span>
        </h2>

        {/* Current Step with Fade Transition */}
        <div className="h-8 mb-6 overflow-hidden">
          <p
            className="transition-all duration-500 slide-in-left"
            style={{
              color: COLORS.ACCENT_LIGHT,
              opacity: 0.9,
              transform:
                currentStep % 2 === 0 ? "translateX(0)" : "translateX(0)",
            }}
            key={currentStep}
          >
            {steps[currentStep]}
          </p>
        </div>

        {/* Enhanced Progress Bar */}
        <div className="w-80 mx-auto mb-4">
          <div className="flex justify-between items-center mb-2">
            <span
              className="text-sm font-medium"
              style={{ color: COLORS.ACCENT_LIGHT }}
            >
              Progress
            </span>
            <span
              className="text-sm count-up"
              style={{ color: COLORS.ACCENT_LIGHT }}
            >
              {Math.round(progress)}%
            </span>
          </div>

          <div
            className="rounded-full h-3 overflow-hidden shadow-inner"
            style={{ backgroundColor: COLORS.TRANSPARENT_BORDER }}
          >
            <div
              className="h-full rounded-full transition-all duration-300 ease-out relative overflow-hidden"
              style={{
                width: `${progress}%`,
                backgroundColor: COLORS.ACCENT_LIGHT,
              }}
            >
              {/* Animated Shine Effect */}
              <div
                className="absolute inset-0 w-full h-full shimmer-effect opacity-60"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Processing Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          <div className="text-center">
            <div
              className="text-2xl font-bold count-up"
              style={{ color: COLORS.ACCENT_LIGHT }}
            >
              {Math.floor(progress * 12.5)}
            </div>
            <div
              className="text-sm"
              style={{ color: COLORS.ACCENT_LIGHT, opacity: 0.7 }}
            >
              Frames Analyzed
            </div>
          </div>

          <div className="text-center">
            <div
              className="text-2xl font-bold count-up"
              style={{ color: COLORS.ACCENT_LIGHT }}
            >
              {Math.floor(progress * 0.85)}
            </div>
            <div
              className="text-sm"
              style={{ color: COLORS.ACCENT_LIGHT, opacity: 0.7 }}
            >
              Models Active
            </div>
          </div>

          <div className="text-center">
            <div
              className="text-2xl font-bold count-up"
              style={{ color: COLORS.ACCENT_LIGHT }}
            >
              {(progress * 0.23).toFixed(1)}s
            </div>
            <div
              className="text-sm"
              style={{ color: COLORS.ACCENT_LIGHT, opacity: 0.7 }}
            >
              Elapsed Time
            </div>
          </div>
        </div>

        {/* Floating Action Indicators */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full opacity-40 animate-ping"
              style={{
                backgroundColor: COLORS.ACCENT_LIGHT,
                left: `${Math.cos((i * Math.PI) / 3) * 100}px`,
                top: `${Math.sin((i * Math.PI) / 3) * 100}px`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: "2s",
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom Wave Animation */}
      <div className="absolute bottom-0 left-0 w-full h-32 overflow-hidden opacity-10">
        <div
          className="absolute bottom-0 left-0 w-full h-16 animate-pulse"
          style={{
            background: `linear-gradient(90deg, transparent, ${COLORS.ACCENT_LIGHT}, transparent)`,
            transform: "translateX(-100%)",
            animation: "slideInRight 3s ease-in-out infinite",
          }}
        />
      </div>
    </div>
  );
};

export default ProcessingSpinner;
