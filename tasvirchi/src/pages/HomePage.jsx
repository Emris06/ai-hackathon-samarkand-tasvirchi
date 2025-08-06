import React from "react";
import { Shield, Upload, Play, Zap, BarChart3 } from "lucide-react";
import { COLORS } from "../styles/colors";
import mockData from "../api/mockDat";

const HomePage = ({ setCurrentPage, setUploadedFile, handleMockAnalysis }) => (
  <div className="min-h-screen" style={{ background: COLORS.MAIN_GRADIENT }}>
    <div className="container mx-auto px-6 py-20 text-center">
      <div className="mb-12">
        <Shield
          className="w-24 h-24 mx-auto mb-6"
          style={{ color: COLORS.ACCENT_LIGHT }}
        />
        <h1
          className="text-6xl font-bold mb-6"
          style={{ color: COLORS.ACCENT_LIGHT }}
        >
          Tasvirchi
        </h1>
        <p
          className="text-xl mb-4 max-w-2xl mx-auto"
          style={{ color: COLORS.ACCENT_LIGHT, opacity: 0.9 }}
        >
          Advanced AI-powered deepfake detection system. Analyze videos with
          cutting-edge technology to identify manipulated content.
        </p>
        <p
          className="text-sm mb-8"
          style={{ color: COLORS.ACCENT_LIGHT, opacity: 0.7 }}
        >
          "Tasvirchi" - Uzbek for "visualizer" or "one who creates images"
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
        <div
          className="rounded-xl p-6 border"
          style={{
            backgroundColor: COLORS.TRANSPARENT_LIGHT,
            borderColor: COLORS.TRANSPARENT_BORDER,
            backdropFilter: COLORS.BACKDROP_BLUR,
          }}
        >
          <Zap
            className="w-12 h-12 mx-auto mb-4"
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
          className="rounded-xl p-6 border"
          style={{
            backgroundColor: COLORS.TRANSPARENT_LIGHT,
            borderColor: COLORS.TRANSPARENT_BORDER,
            backdropFilter: COLORS.BACKDROP_BLUR,
          }}
        >
          <BarChart3
            className="w-12 h-12 mx-auto mb-4"
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
          className="rounded-xl p-6 border"
          style={{
            backgroundColor: COLORS.TRANSPARENT_LIGHT,
            borderColor: COLORS.TRANSPARENT_BORDER,
            backdropFilter: COLORS.BACKDROP_BLUR,
          }}
        >
          <Shield
            className="w-12 h-12 mx-auto mb-4"
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

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => setCurrentPage("upload")}
          className="px-8 py-4 font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
          style={{
            backgroundColor: COLORS.ACCENT_LIGHT,
            color: COLORS.PRIMARY_DARK,
          }}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = COLORS.ACCENT_HOVER)
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = COLORS.ACCENT_LIGHT)
          }
        >
          <Upload className="w-5 h-5 inline mr-2" />
          Upload Video
        </button>
        <button
          onClick={() => {
            setUploadedFile(mockSampleVideo);
            handleMockAnalysis();
          }}
          className="px-8 py-4 font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 border-2"
          style={{
            backgroundColor: "transparent",
            color: COLORS.ACCENT_LIGHT,
            borderColor: COLORS.ACCENT_LIGHT,
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = COLORS.ACCENT_LIGHT;
            e.target.style.color = COLORS.PRIMARY_DARK;
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = COLORS.ACCENT_LIGHT;
          }}
        >
          <Play className="w-5 h-5 inline mr-2" />
          Try Sample Video
        </button>
      </div>
    </div>
  </div>
);

export default HomePage;
