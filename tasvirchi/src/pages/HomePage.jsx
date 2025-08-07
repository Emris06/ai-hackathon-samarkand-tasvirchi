import React, { useState, useEffect } from "react";
import { Shield, Upload, Play, Zap, BarChart3 } from "lucide-react";
import { COLORS } from "../styles/colors";
import { mockSampleVideo } from "../api/mockDat";
import img_src from "../imgs/logo_tasvirchi.png";

const HomePage = ({ setCurrentPage, setUploadedFile, handleMockAnalysis }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: COLORS.MAIN_GRADIENT }}>
      <div className="container mx-auto px-6 py-20 text-center">
        <div className="mb-12">
          {/* Floating Logo */}
          <img
            src={img_src}
            alt="logo"
            className={`mx-auto img_hero transform-gpu ${
              isLoaded ? "float-animation scale-in" : ""
            }`}
            style={{
              color: COLORS.ACCENT_LIGHT,
              animationDelay: "0.5s",
            }}
          />

          {/* Title - Removed typing animation */}
          <h1
            className={`text-6xl font-bold mb-6 header_one ${
              isLoaded ? "fade-in" : "opacity-0"
            }`}
            style={{
              color: COLORS.ACCENT_LIGHT,
              animationDelay: "1s",
            }}
          >
            Tasvirchi
          </h1>

          {/* Subtitle - Removed shimmer effect */}
          <div className={`${isLoaded ? "fade-in" : "opacity-0"}`}>
            <p
              className="text-xl mb-4 max-w-2xl mx-auto"
              style={{
                color: COLORS.ACCENT_LIGHT,
                opacity: 0.9,
                animationDelay: "0.2s",
              }}
            >
              Advanced AI-powered deepfake detection system. Analyze videos with
              cutting-edge technology to identify manipulated content.
            </p>
            <p
              className="text-sm mb-8 slide-in-top"
              style={{
                color: COLORS.ACCENT_LIGHT,
                opacity: 0.7,
                animationDelay: "0.4s",
              }}
            >
              "Tasvirchi" - Uzbek for "visualizer" or "one who creates images"
            </p>
          </div>
        </div>

        {/* Feature Cards with 3D hover effect */}
        <div
          className={`grid md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto ${
            isLoaded ? "stagger-children" : ""
          }`}
        >
          <div
            className="rounded-xl p-6 border transform-gpu transition-all duration-300 hover:shadow-xl"
            style={{
              backgroundColor: COLORS.TRANSPARENT_LIGHT,
              borderColor: COLORS.TRANSPARENT_BORDER,
              backdropFilter: COLORS.BACKDROP_BLUR,
            }}
            onMouseEnter={(e) => {
              e.target.style.transform =
                "perspective(1000px) rotateX(10deg) rotateY(-5deg) scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform =
                "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
            }}
          >
            <Zap
              className="w-12 h-12 mx-auto mb-4 hover-rotate transition-transform duration-300"
              style={{ color: COLORS.ACCENT_LIGHT }}
            />
            <h3
              className="text-xl font-semibold mb-2"
              style={{ color: COLORS.ACCENT_LIGHT }}
            >
              Lightning Fast
            </h3>
            <p style={{ color: COLORS.ACCENT_LIGHT, opacity: 0.8 }}>
              Process videos in seconds with our optimized AI pipeline
            </p>
          </div>

          <div
            className="rounded-xl p-6 border transform-gpu transition-all duration-300 hover:shadow-xl"
            style={{
              backgroundColor: COLORS.TRANSPARENT_LIGHT,
              borderColor: COLORS.TRANSPARENT_BORDER,
              backdropFilter: COLORS.BACKDROP_BLUR,
            }}
            onMouseEnter={(e) => {
              e.target.style.transform =
                "perspective(1000px) rotateX(10deg) scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform =
                "perspective(1000px) rotateX(0deg) scale(1)";
            }}
          >
            <BarChart3
              className="w-12 h-12 mx-auto mb-4 hover-rotate transition-transform duration-300"
              style={{ color: COLORS.ACCENT_LIGHT }}
            />
            <h3
              className="text-xl font-semibold mb-2"
              style={{ color: COLORS.ACCENT_LIGHT }}
            >
              95% Accuracy
            </h3>
            <p style={{ color: COLORS.ACCENT_LIGHT, opacity: 0.8 }}>
              State-of-the-art detection with detailed confidence metrics
            </p>
          </div>

          <div
            className="rounded-xl p-6 border transform-gpu transition-all duration-300 hover:shadow-xl"
            style={{
              backgroundColor: COLORS.TRANSPARENT_LIGHT,
              borderColor: COLORS.TRANSPARENT_BORDER,
              backdropFilter: COLORS.BACKDROP_BLUR,
            }}
            onMouseEnter={(e) => {
              e.target.style.transform =
                "perspective(1000px) rotateX(10deg) rotateY(5deg) scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform =
                "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
            }}
          >
            <Shield
              className="w-12 h-12 mx-auto mb-4 hover-rotate transition-transform duration-300"
              style={{ color: COLORS.ACCENT_LIGHT }}
            />
            <h3
              className="text-xl font-semibold mb-2"
              style={{ color: COLORS.ACCENT_LIGHT }}
            >
              Privacy First
            </h3>
            <p style={{ color: COLORS.ACCENT_LIGHT, opacity: 0.8 }}>
              Your videos are processed securely and never stored
            </p>
          </div>
        </div>

        {/* Action Buttons - Removed ripple effect */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center ${
            isLoaded ? "bounce-in" : "opacity-0"
          }`}
          style={{ animationDelay: "1s" }}
        >
          <button
            onClick={() => setCurrentPage("upload")}
            className="px-8 py-4 font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 transform-gpu"
            style={{
              backgroundColor: COLORS.ACCENT_LIGHT,
              color: COLORS.PRIMARY_DARK,
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = COLORS.ACCENT_HOVER;
              e.target.style.transform = "scale(1.05) translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = COLORS.ACCENT_LIGHT;
              e.target.style.transform = "scale(1) translateY(0)";
            }}
          >
            <Upload className="w-5 h-5 inline mr-2" />
            Upload Video
          </button>

          <button
            onClick={() => {
              setUploadedFile(mockSampleVideo);
              handleMockAnalysis();
            }}
            className="px-8 py-4 font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 border-2 transform-gpu"
            style={{
              backgroundColor: "transparent",
              color: COLORS.ACCENT_LIGHT,
              borderColor: COLORS.ACCENT_LIGHT,
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = COLORS.ACCENT_LIGHT;
              e.target.style.color = COLORS.PRIMARY_DARK;
              e.target.style.transform = "scale(1.05) translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = COLORS.ACCENT_LIGHT;
              e.target.style.transform = "scale(1) translateY(0)";
            }}
          >
            <Play className="w-5 h-5 inline mr-2" />
            Try Sample Video
          </button>
        </div>

        {/* Floating particles background effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-10 float-animation"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
