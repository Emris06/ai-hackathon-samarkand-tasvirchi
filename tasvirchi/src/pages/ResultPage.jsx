import React from "react";
import { Clock, AlertTriangle, Play } from "lucide-react";
import { COLORS } from "../styles/colors";
import ConfidenceGraph from "../components/ConfidenceGraph";

const ResultsPage = ({
  results,
  uploadedFile,
  setCurrentPage,
  setResults,
  setUploadedFile,
}) => (
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

      {/* Main Verdict */}
      <div
        className="border-2 rounded-xl p-6 mb-8 text-center"
        style={{
          backgroundColor: COLORS.DANGER_BG,
          borderColor: COLORS.DANGER_BORDER,
        }}
      >
        <AlertTriangle
          className="w-16 h-16 mx-auto mb-4"
          style={{ color: COLORS.DANGER }}
        />
        <h3
          className="text-3xl font-bold mb-2"
          style={{ color: COLORS.DANGER }}
        >
          LIKELY DEEPFAKE DETECTED
        </h3>
        <p className="text-xl" style={{ color: COLORS.ACCENT_LIGHT }}>
          Confidence: {(results.confidence * 100).toFixed(1)}%
        </p>
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

          {/* Detection Details */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span style={{ color: COLORS.ACCENT_LIGHT, opacity: 0.9 }}>
                Face Consistency
              </span>
              <span style={{ color: COLORS.DANGER }}>
                {(results.details.face_consistency * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span style={{ color: COLORS.ACCENT_LIGHT, opacity: 0.9 }}>
                Temporal Anomalies
              </span>
              <span style={{ color: COLORS.DANGER }}>
                {(results.details.temporal_anomalies * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span style={{ color: COLORS.ACCENT_LIGHT, opacity: 0.9 }}>
                Compression Artifacts
              </span>
              <span style={{ color: COLORS.WARNING }}>
                {(results.details.compression_artifacts * 100).toFixed(1)}%
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

export default ResultsPage;
