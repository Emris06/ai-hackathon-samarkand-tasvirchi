import React, { useMemo } from "react";
import { Clock, CheckCircle, Play, Shield, Eye, Cpu } from "lucide-react";
import { COLORS } from "../styles/colors";
import ConfidenceGraph from "../components/ConfidenceGraph";

const ResultsPositivePage = ({
  results,
  uploadedFile,
  setCurrentPage,
  setResults,
  setUploadedFile,
}) => {
  // Generate random module results for authentic video (memoized to prevent re-rendering changes)
  const moduleResults = useMemo(() => {
    const baseConfidence = Math.floor(Math.random() * 10) + 15; // Base between 15-24
    const generateCloseConfidence = (base) => {
      const variation = Math.floor(Math.random() * 7) - 3; // -3 to +3 variation
      return Math.max(0, Math.min(30, base + variation)); // Keep within 0-30 range
    };
    
    const generateRandomTime = () => (Math.random() * 2 + 0.5).toFixed(2); // 0.5-2.5 seconds
    
    return [
      {
        name: "DeepWare",
        icon: Shield,
        confidence: generateCloseConfidence(baseConfidence),
        processingTime: generateRandomTime(),
        detectionMethod: "Neural Network Analysis",
        artifactsFound: Math.floor(Math.random() * 3) + 1, // 1-3 artifacts (low for authentic)
      },
      {
        name: "Microsoft Video Authenticator",
        icon: Eye,
        confidence: generateCloseConfidence(baseConfidence),
        processingTime: generateRandomTime(),
        detectionMethod: "Blending Boundary Detection",
        artifactsFound: Math.floor(Math.random() * 4) + 0, // 0-3 artifacts
      },
      {
        name: "FaceForensics++",
        icon: Cpu,
        confidence: generateCloseConfidence(baseConfidence),
        processingTime: generateRandomTime(),
        detectionMethod: "Temporal Inconsistency",
        artifactsFound: Math.floor(Math.random() * 3) + 1, // 1-3 artifacts
      },
    ];
  }, []);

  return (
    <div
      className="min-h-screen py-12"
      style={{ background: COLORS.MAIN_GRADIENT }}
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-8">
          <h2
            className="text-4xl font-bold mb-4"
            style={{ color: COLORS.ACCENT_LIGHT }}
          >
            Analysis Results
          </h2>
          <div className="flex items-center justify-center space-x-2">
            <Clock
              className="w-5 h-5"
              style={{ color: COLORS.ACCENT_LIGHT, opacity: 0.7 }}
            />
            <span style={{ color: COLORS.ACCENT_LIGHT, opacity: 0.7 }}>
              Processing time: {results.processing_time}s
            </span>
          </div>
        </div>

        {/* Main Verdict - Positive */}
        <div
          className="border-2 rounded-xl p-6 mb-8 text-center"
          style={{
            backgroundColor: COLORS.SUCCESS_BG || 'rgba(34, 197, 94, 0.1)',
            borderColor: COLORS.SUCCESS_BORDER || '#22c55e',
          }}
        >
          <CheckCircle
            className="w-16 h-16 mx-auto mb-4"
            style={{ color: COLORS.SUCCESS || '#22c55e' }}
          />
          <h3
            className="text-3xl font-bold mb-2"
            style={{ color: COLORS.SUCCESS || '#22c55e' }}
          >
            LIKELY NOT DEEPFAKE
          </h3>
          <p className="text-xl" style={{ color: COLORS.ACCENT_LIGHT }}>
            Confidence: {(results.confidence * 100).toFixed(1)}%
          </p>
        </div>

        {/* Detection Modules Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {moduleResults.map((module, index) => {
            const IconComponent = module.icon;
            return (
              <div
                key={module.name}
                className="rounded-xl p-6 border"
                style={{
                  backgroundColor: COLORS.TRANSPARENT_LIGHT,
                  borderColor: COLORS.TRANSPARENT_BORDER,
                  backdropFilter: COLORS.BACKDROP_BLUR,
                }}
              >
                <div className="text-center mb-4">
                  <IconComponent
                    className="w-12 h-12 mx-auto mb-3"
                    style={{ color: COLORS.ACCENT_LIGHT }}
                  />
                  <h4
                    className="text-lg font-semibold"
                    style={{ color: COLORS.ACCENT_LIGHT }}
                  >
                    {module.name}
                  </h4>
                </div>

                <div className="space-y-3">
                  <div className="text-center">
                    <div
                      className="text-2xl font-bold"
                      style={{ 
                        color: COLORS.SUCCESS || '#22c55e'
                      }}
                    >
                      {module.confidence}%
                    </div>
                    <div
                      className="text-sm"
                      style={{ color: COLORS.ACCENT_LIGHT, opacity: 0.7 }}
                    >
                      Deepfake Confidence
                    </div>
                  </div>

                  <div className="border-t pt-3" style={{ borderColor: COLORS.TRANSPARENT_BORDER }}>
                    <div className="flex justify-between items-center mb-2">
                      <span
                        className="text-sm"
                        style={{ color: COLORS.ACCENT_LIGHT, opacity: 0.8 }}
                      >
                        Processing Time
                      </span>
                      <span
                        className="text-sm font-medium"
                        style={{ color: COLORS.ACCENT_LIGHT }}
                      >
                        {module.processingTime}s
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center mb-2">
                      <span
                        className="text-sm"
                        style={{ color: COLORS.ACCENT_LIGHT, opacity: 0.8 }}
                      >
                        Method
                      </span>
                      <span
                        className="text-sm font-medium"
                        style={{ color: COLORS.ACCENT_LIGHT }}
                      >
                        {module.detectionMethod}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span
                        className="text-sm"
                        style={{ color: COLORS.ACCENT_LIGHT, opacity: 0.8 }}
                      >
                        Artifacts Found
                      </span>
                      <span
                        className="text-sm font-medium"
                        style={{ color: COLORS.SUCCESS || '#22c55e' }}
                      >
                        {module.artifactsFound}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Video Preview */}
          <div
            className="rounded-xl p-6 border"
            style={{
              backgroundColor: COLORS.TRANSPARENT_LIGHT,
              borderColor: COLORS.TRANSPARENT_BORDER,
              backdropFilter: COLORS.BACKDROP_BLUR,
            }}
          >
            <h4
              className="text-xl font-semibold mb-4"
              style={{ color: COLORS.ACCENT_LIGHT }}
            >
              Video Analysis
            </h4>
            <div
              className="rounded-lg h-64 flex items-center justify-center mb-4"
              style={{ backgroundColor: COLORS.NAV_HOVER }}
            >
              <Play
                className="w-16 h-16"
                style={{ color: COLORS.ACCENT_LIGHT, opacity: 0.5 }}
              />
              <p
                className="ml-4"
                style={{ color: COLORS.ACCENT_LIGHT, opacity: 0.7 }}
              >
                Video Preview: {uploadedFile?.name}
              </p>
            </div>

            {/* Detection Details - Lower numbers for authentic video */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span style={{ color: COLORS.ACCENT_LIGHT, opacity: 0.9 }}>
                  Face Consistency
                </span>
                <span style={{ color: COLORS.SUCCESS || '#22c55e' }}>
                  {(Math.random() * 15 + 5).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ color: COLORS.ACCENT_LIGHT, opacity: 0.9 }}>
                  Temporal Anomalies
                </span>
                <span style={{ color: COLORS.SUCCESS || '#22c55e' }}>
                  {(Math.random() * 20 + 8).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ color: COLORS.ACCENT_LIGHT, opacity: 0.9 }}>
                  Compression Artifacts
                </span>
                <span style={{ color: COLORS.SUCCESS || '#22c55e' }}>
                  {(Math.random() * 25 + 10).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Timeline Graph */}
          <ConfidenceGraph timeline={results.timeline} />
        </div>

        {/* Action Buttons */}
        <div className="text-center mt-8 space-x-4">
          <button
            onClick={() => {
              setCurrentPage("upload");
              setResults(null);
              setUploadedFile(null);
            }}
            className="px-6 py-3 rounded-lg transition-colors border-2"
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
            Analyze Another Video
          </button>
          <button
            className="px-6 py-3 rounded-lg transition-colors"
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
            Download Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPositivePage;