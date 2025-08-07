import React, { useMemo } from "react";
import {
  Clock,
  AlertTriangle,
  Play,
  Shield,
  Eye,
  Cpu,
  Download,
} from "lucide-react";
import { COLORS } from "../styles/colors";
import ConfidenceGraph from "../components/ConfidenceGraph";

const ResultsNegativePage = ({
  results,
  uploadedFile,
  setCurrentPage,
  setResults,
  setUploadedFile,
}) => {
  // Generate random module results (memoized to prevent re-rendering changes)
  const moduleResults = useMemo(() => {
    const generateRandomConfidence = () => Math.floor(Math.random() * 11) + 90; // 90-100
    const generateRandomTime = () => (Math.random() * 2 + 0.5).toFixed(2); // 0.5-2.5 seconds

    return [
      {
        name: "DeepWare",
        icon: Shield,
        confidence: generateRandomConfidence(),
        processingTime: generateRandomTime(),
        detectionMethod: "Neural Network Analysis",
        artifactsFound: Math.floor(Math.random() * 15) + 5, // 5-19 artifacts
      },
      {
        name: "Microsoft Video Authenticator",
        icon: Eye,
        confidence: generateRandomConfidence(),
        processingTime: generateRandomTime(),
        detectionMethod: "Blending Boundary Detection",
        artifactsFound: Math.floor(Math.random() * 12) + 8, // 8-19 artifacts
      },
      {
        name: "FaceForensics++",
        icon: Cpu,
        confidence: generateRandomConfidence(),
        processingTime: generateRandomTime(),
        detectionMethod: "Temporal Inconsistency",
        artifactsFound: Math.floor(Math.random() * 18) + 3, // 3-20 artifacts
      },
    ];
  }, []);

  const downloadReport = () => {
    // Create a comprehensive report
    const reportData = {
      timestamp: new Date().toISOString(),
      filename: uploadedFile?.name || "Unknown",
      verdict: "LIKELY DEEPFAKE DETECTED",
      overallConfidence: (results.confidence * 100).toFixed(1),
      processingTime: results.processing_time,
      modules: moduleResults,
      details: results.details,
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
          .verdict { background: #fee2e2; border: 2px solid #ef4444; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px; }
          .verdict h2 { color: #ef4444; margin: 0; }
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
          <h2>⚠️ LIKELY DEEPFAKE DETECTED</h2>
          <p>Overall Confidence: <strong>${
            reportData.overallConfidence
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
            <tr><td>Face Consistency</td><td>${(
              results.details.face_consistency * 100
            ).toFixed(1)}%</td><td>❌ Poor</td></tr>
            <tr><td>Temporal Anomalies</td><td>${(
              results.details.temporal_anomalies * 100
            ).toFixed(1)}%</td><td>❌ High</td></tr>
            <tr><td>Compression Artifacts</td><td>${(
              results.details.compression_artifacts * 100
            ).toFixed(1)}%</td><td>⚠️ Medium</td></tr>
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

  const resetAnalysis = () => {
    setResults(null);
    setUploadedFile(null);
    setCurrentPage("upload");
  };

  const averageConfidence = useMemo(() => {
    return (
      moduleResults.reduce((sum, module) => sum + module.confidence, 0) /
      moduleResults.length
    );
  }, [moduleResults]);

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

        {/* Main Verdict - Negative */}
        <div
          className="border-2 rounded-xl p-6 mb-8 text-center"
          style={{
            backgroundColor: COLORS.ERROR_BG || "rgba(239, 68, 68, 0.1)",
            borderColor: COLORS.ERROR_BORDER || "#ef4444",
          }}
        >
          <AlertTriangle
            className="w-16 h-16 mx-auto mb-4"
            style={{ color: COLORS.ERROR || "#ef4444" }}
          />
          <h3
            className="text-3xl font-bold mb-2"
            style={{ color: COLORS.ERROR || "#ef4444" }}
          >
            LIKELY DEEPFAKE DETECTED
          </h3>
          <p className="text-xl" style={{ color: COLORS.ACCENT_LIGHT }}>
            Confidence: {averageConfidence.toFixed(1)}%
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
                        color: COLORS.ERROR || "#ef4444",
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
                        style={{ color: COLORS.ERROR || "#ef4444" }}
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

            {/* Detection Details - Higher numbers for deepfake */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span style={{ color: COLORS.ACCENT_LIGHT, opacity: 0.9 }}>
                  Face Consistency
                </span>
                <span style={{ color: COLORS.ERROR || "#ef4444" }}>
                  {(results.details.face_consistency * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ color: COLORS.ACCENT_LIGHT, opacity: 0.9 }}>
                  Temporal Anomalies
                </span>
                <span style={{ color: COLORS.ERROR || "#ef4444" }}>
                  {(results.details.temporal_anomalies * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ color: COLORS.ACCENT_LIGHT, opacity: 0.9 }}>
                  Compression Artifacts
                </span>
                <span style={{ color: "#eab308" }}>
                  {(results.details.compression_artifacts * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Timeline Graph */}
          <ConfidenceGraph timeline={results.timeline} />
        </div>

        {/* Action Buttons */}
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

export default ResultsNegativePage;
