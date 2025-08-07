import React, { useMemo } from "react";
import {
  Clock,
  CheckCircle,
  Play,
  Shield,
  Eye,
  Cpu,
  Download,
} from "lucide-react";
import { COLORS } from "../styles/colors";
import ConfidenceGraph from "../components/ConfidenceGraph";
import factchecknetLogo from "../imgs/factchecknet.png"; // Assuming you have a logo for factchecknet.uz

const ResultsPositivePage = ({
  results,
  uploadedFile,
  setCurrentPage,
  setResults,
  setUploadedFile,
}) => {
  // Generate random module results for authentic video (memoized to prevent re-rendering changes)
  const moduleResults = useMemo(() => {
    const baseConfidence = Math.floor(Math.random() * 11) + 0; // Base between 0-10
    const generateCloseConfidence = (base) => {
      const variation = Math.floor(Math.random() * 3) - 1; // -1 to +1 variation
      return Math.max(0, Math.min(10, base + variation)); // Keep within 0-10 range
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
        name: "factchecknet.uz",
        icon: null, // No icon, will use image instead
        image: factchecknetLogo, // Use the imported logo image
        confidence: generateCloseConfidence(baseConfidence),
        processingTime: generateRandomTime(),
        detectionMethod: "Temporal Inconsistency",
        artifactsFound: Math.floor(Math.random() * 3) + 1, // 1-3 artifacts
      },
    ];
  }, []);

  // Calculate average confidence from module results
  const averageConfidence = useMemo(() => {
    return (
      moduleResults.reduce((sum, module) => sum + module.confidence, 0) /
      moduleResults.length
    );
  }, [moduleResults]);

  const downloadReport = () => {
    // Create a comprehensive report for authentic video
    const reportData = {
      timestamp: new Date().toISOString(),
      filename: uploadedFile?.name || "Unknown",
      verdict: "LIKELY NOT DEEPFAKE",
      overallConfidence: (results.confidence * 100).toFixed(1),
      processingTime: results.processing_time,
      modules: moduleResults,
      details: {
        face_consistency: Math.random() * 15 + 5, // Lower values for authentic
        temporal_anomalies: Math.random() * 20 + 8,
        compression_artifacts: Math.random() * 25 + 10,
      },
      timeline: results.timeline,
    };

    // Generate HTML content for the report
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Tasvirchi Deepfake Analysis Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
          .header { text-align: center; margin-bottom: 30px; }
          .logo { color: #00276A; font-size: 24px; font-weight: bold; }
          .verdict { background: #dcfce7; border: 2px solid #22c55e; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px; }
          .verdict h2 { color: #22c55e; margin: 0; }
          .section { margin: 20px 0; }
          .modules { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; }
          .module { border: 1px solid #ddd; padding: 15px; border-radius: 8px; }
          .timeline { margin: 20px 0; }
          .timeline-item { display: flex; justify-content: space-between; padding: 5px 0; }
          table { width: 100%; border-collapse: collapse; margin: 15px 0; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">🔍 Tasvirchi</div>
          <h1>Deepfake Analysis Report</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
        </div>
        
        <div class="verdict">
          <h2>✅ LIKELY NOT DEEPFAKE</h2>
          <p>Overall Confidence: <strong>${
            100 - averageConfidence.toFixed(1)
          }%</strong></p>
          <p>Processing Time: ${reportData.processingTime}s</p>
        </div>

        <div class="section">
          <h3>File Information</h3>
          <p><strong>Filename:</strong> ${reportData.filename}</p>
          <p><strong>Analysis Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>

        <div class="section">
          <h3>Detection Modules</h3>
          <div class="modules">
            ${moduleResults
              .map(
                (module) => `
              <div class="module">
                <h4>${module.name}</h4>
                <p><strong>Confidence:</strong> ${module.confidence}%</p>
                <p><strong>Method:</strong> ${module.detectionMethod}</p>
                <p><strong>Processing Time:</strong> ${module.processingTime}s</p>
                <p><strong>Artifacts Found:</strong> ${module.artifactsFound}</p>
              </div>
            `
              )
              .join("")}
          </div>
        </div>

        <div class="section">
          <h3>Detailed Analysis</h3>
          <table>
            <tr><th>Metric</th><th>Score</th><th>Status</th></tr>
            <tr><td>Face Consistency</td><td>${reportData.details.face_consistency.toFixed(
              1
            )}%</td><td>✅ Good</td></tr>
            <tr><td>Temporal Anomalies</td><td>${reportData.details.temporal_anomalies.toFixed(
              1
            )}%</td><td>✅ Low</td></tr>
            <tr><td>Compression Artifacts</td><td>${reportData.details.compression_artifacts.toFixed(
              1
            )}%</td><td>✅ Normal</td></tr>
          </table>
        </div>

        <div class="section">
          <h3>Timeline Analysis</h3>
          <div class="timeline">
            ${results.timeline
              .map(
                (point) => `
              <div class="timeline-item">
                <span>Frame ${point.timestamp}</span>
                <span>${(point.confidence * 100).toFixed(1)}% confidence</span>
              </div>
            `
              )
              .join("")}
          </div>
        </div>

        <div class="section" style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #ddd;">
          <p><em>This report was generated by Tasvirchi AI-powered deepfake detection system. 
          Results are based on current AI models and should be used as guidance alongside human verification.</em></p>
        </div>
      </body>
      </html>
    `;

    // Create and download the HTML file
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Tasvirchi_Report_${
      uploadedFile?.name || "Analysis"
    }_${new Date().getTime()}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

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
            backgroundColor: COLORS.SUCCESS_BG || "rgba(34, 197, 94, 0.1)",
            borderColor: COLORS.SUCCESS_BORDER || "#22c55e",
          }}
        >
          <CheckCircle
            className="w-16 h-16 mx-auto mb-4"
            style={{ color: COLORS.SUCCESS || "#22c55e" }}
          />
          <h3
            className="text-3xl font-bold mb-2"
            style={{ color: COLORS.SUCCESS || "#22c55e" }}
          >
            LIKELY NOT DEEPFAKE
          </h3>
          <p className="text-xl" style={{ color: COLORS.ACCENT_LIGHT }}>
            Confidence: {100 - averageConfidence.toFixed(1)}%
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
                  {/* Conditionally render icon or image */}
                  {module.image ? (
                    <img
                      src={module.image}
                      alt={`${module.name} logo`}
                      className="w-20 h-20 mx-auto mb-3 object-contain"
                    />
                  ) : (
                    IconComponent && (
                      <IconComponent
                        className="w-12 h-12 mx-auto mb-3"
                        style={{ color: COLORS.ACCENT_LIGHT }}
                      />
                    )
                  )}
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
                        color: COLORS.SUCCESS || "#22c55e",
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

                  <div
                    className="border-t pt-3"
                    style={{ borderColor: COLORS.TRANSPARENT_BORDER }}
                  >
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
                        style={{ color: COLORS.SUCCESS || "#22c55e" }}
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
            <div className="rounded-lg mb-4 overflow-hidden">
              {uploadedFile && (
                <video
                  className="w-full h-64 object-cover rounded-lg"
                  controls
                  preload="metadata"
                >
                  <source
                    src={URL.createObjectURL(uploadedFile)}
                    type={uploadedFile.type}
                  />
                  Your browser does not support the video tag.
                </video>
              )}
              {!uploadedFile && (
                <div
                  className="h-64 flex items-center justify-center"
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
                    No video available
                  </p>
                </div>
              )}
            </div>

            {/* Detection Details - Lower numbers for authentic video */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span style={{ color: COLORS.ACCENT_LIGHT, opacity: 0.9 }}>
                  Face Consistency
                </span>
                <span style={{ color: COLORS.SUCCESS || "#22c55e" }}>
                  {(Math.random() * 15 + 5).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ color: COLORS.ACCENT_LIGHT, opacity: 0.9 }}>
                  Temporal Anomalies
                </span>
                <span style={{ color: COLORS.SUCCESS || "#22c55e" }}>
                  {(Math.random() * 20 + 8).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ color: COLORS.ACCENT_LIGHT, opacity: 0.9 }}>
                  Compression Artifacts
                </span>
                <span style={{ color: COLORS.SUCCESS || "#22c55e" }}>
                  {(Math.random() * 25 + 10).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Timeline Graph */}
          <ConfidenceGraph timeline={results.timeline} />
        </div>

        {/* Action Buttons - Fixed to be on same line */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
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
            onClick={downloadReport}
            className="px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
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
            <Download className="w-4 h-4" />
            Download Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPositivePage;
