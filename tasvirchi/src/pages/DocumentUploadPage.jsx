import React, { useState, useRef } from "react";
import {
  Upload,
  FileText,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Loader,
  Copy,
  Type,
  File,
} from "lucide-react";
import { COLORS } from "../styles/colors";

const DocumentUploadPage = ({ setCurrentPage, onDocumentAnalysis }) => {
  const [dragOver, setDragOver] = useState(false);
  const [uploadedDocument, setUploadedDocument] = useState(null);
  const [textContent, setTextContent] = useState("");
  const [inputMode, setInputMode] = useState("text"); // "text" or "file"
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    const textFile = files.find(
      (file) =>
        file.type === "text/plain" ||
        file.name.endsWith(".txt") ||
        file.name.endsWith(".md")
    );

    if (textFile) {
      handleFileUpload(textFile);
    }
  };

  const handleFileUpload = (file) => {
    if (
      file &&
      (file.type === "text/plain" ||
        file.name.endsWith(".txt") ||
        file.name.endsWith(".md"))
    ) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        setTextContent(content);
        setUploadedDocument(file);
      };
      reader.readAsText(file);
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleTextChange = (e) => {
    setTextContent(e.target.value);
    setUploadedDocument(null);
  };

  const handleAnalyze = async () => {
    if (!textContent.trim()) return;

    setIsAnalyzing(true);

    // Simulate analysis delay
    setTimeout(() => {
      // Check if text contains "Bukhara" (case-insensitive)
      const containsBukhara = textContent.toLowerCase().includes("bukhara");

      // Analysis result based on Bukhara detection
      const mockResult = {
        confidence: containsBukhara
          ? 95 + Math.random() * 5
          : 90 + Math.random() * 10, // High confidence if Bukhara found
        isDeepfake: containsBukhara,
        detectionTrigger: containsBukhara
          ? "AI-generated content detected"
          : "No suspicious keywords found",
        details: {
          keywordDetection: containsBukhara ? 100 : 15 + Math.random() * 20,
          linguisticPatterns: containsBukhara
            ? 85 + Math.random() * 10
            : 30 + Math.random() * 40,
          semanticConsistency: containsBukhara
            ? 20 + Math.random() * 30
            : 70 + Math.random() * 25,
          aiGeneratedProbability: containsBukhara
            ? 90 + Math.random() * 10
            : 20 + Math.random() * 30,
          humanLikeScore: containsBukhara
            ? 10 + Math.random() * 20
            : 70 + Math.random() * 25,
        },
        wordCount: textContent.split(/\s+/).filter((word) => word.length > 0)
          .length,
        analysisTime: (Math.random() * 2 + 1).toFixed(2),
        bukharaFound: containsBukhara,
      };

      setAnalysisResult(mockResult);
      setIsAnalyzing(false);

      if (onDocumentAnalysis) {
        onDocumentAnalysis(mockResult);
      }
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(textContent);
  };

  return (
    <div className="min-h-screen" style={{ background: COLORS.MAIN_GRADIENT }}>
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => setCurrentPage("home")}
            className="mr-4 p-2 rounded-lg border transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: COLORS.TRANSPARENT_LIGHT,
              borderColor: COLORS.TRANSPARENT_BORDER,
              color: COLORS.ACCENT_LIGHT,
            }}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1
            className="text-4xl font-bold"
            style={{ color: COLORS.ACCENT_LIGHT }}
          >
            Document Deepfake Analysis
          </h1>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Input Mode Toggle */}
          <div
            className="flex mb-6 rounded-lg overflow-hidden border"
            style={{ borderColor: COLORS.TRANSPARENT_BORDER }}
          >
            <button
              onClick={() => setInputMode("text")}
              className={`flex-1 py-3 px-6 font-semibold transition-all duration-200 ${
                inputMode === "text" ? "opacity-100" : "opacity-60"
              }`}
              style={{
                backgroundColor:
                  inputMode === "text"
                    ? COLORS.ACCENT_LIGHT
                    : COLORS.TRANSPARENT_LIGHT,
                color:
                  inputMode === "text"
                    ? COLORS.PRIMARY_DARK
                    : COLORS.ACCENT_LIGHT,
              }}
            >
              <Type className="w-4 h-4 inline mr-2" />
              Type Text
            </button>
            <button
              onClick={() => setInputMode("file")}
              className={`flex-1 py-3 px-6 font-semibold transition-all duration-200 ${
                inputMode === "file" ? "opacity-100" : "opacity-60"
              }`}
              style={{
                backgroundColor:
                  inputMode === "file"
                    ? COLORS.ACCENT_LIGHT
                    : COLORS.TRANSPARENT_LIGHT,
                color:
                  inputMode === "file"
                    ? COLORS.PRIMARY_DARK
                    : COLORS.ACCENT_LIGHT,
              }}
            >
              <File className="w-4 h-4 inline mr-2" />
              Upload File
            </button>
          </div>

          {inputMode === "text" ? (
            /* Text Input Area */
            <div
              className="rounded-xl border p-6 mb-6"
              style={{
                backgroundColor: COLORS.TRANSPARENT_LIGHT,
                borderColor: COLORS.TRANSPARENT_BORDER,
                backdropFilter: COLORS.BACKDROP_BLUR,
              }}
            >
              <div className="flex justify-between items-center mb-4">
                <label
                  className="text-lg font-semibold"
                  style={{ color: COLORS.ACCENT_LIGHT }}
                >
                  Enter Text to Analyze
                </label>
                {textContent && (
                  <button
                    onClick={copyToClipboard}
                    className="p-2 rounded-lg border transition-all duration-200 hover:scale-105"
                    style={{
                      backgroundColor: COLORS.TRANSPARENT_LIGHT,
                      borderColor: COLORS.TRANSPARENT_BORDER,
                      color: COLORS.ACCENT_LIGHT,
                    }}
                    title="Copy to clipboard"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                )}
              </div>
              <textarea
                value={textContent}
                onChange={handleTextChange}
                placeholder="Paste or type the text content you want to analyze for AI-generated or deepfake characteristics..."
                className="w-full h-64 p-4 rounded-lg border resize-none focus:outline-none focus:ring-2 transition-all duration-200"
                style={{
                  backgroundColor: COLORS.PRIMARY_DARK,
                  borderColor: COLORS.TRANSPARENT_BORDER,
                  color: COLORS.ACCENT_LIGHT,
                  focusRingColor: COLORS.ACCENT_LIGHT,
                }}
              />
              <div className="flex justify-between items-center mt-4">
                <span
                  className="text-sm opacity-70"
                  style={{ color: COLORS.ACCENT_LIGHT }}
                >
                  {
                    textContent.split(/\s+/).filter((word) => word.length > 0)
                      .length
                  }{" "}
                  words
                </span>
              </div>
            </div>
          ) : (
            /* File Upload Area */
            <div
              className={`rounded-xl border-2 border-dashed p-8 text-center mb-6 transition-all duration-300 ${
                dragOver ? "border-solid scale-102" : ""
              }`}
              style={{
                backgroundColor: dragOver
                  ? COLORS.ACCENT_LIGHT + "10"
                  : COLORS.TRANSPARENT_LIGHT,
                borderColor: dragOver
                  ? COLORS.ACCENT_LIGHT
                  : COLORS.TRANSPARENT_BORDER,
                backdropFilter: COLORS.BACKDROP_BLUR,
              }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.md,text/plain"
                onChange={(e) => handleFileUpload(e.target.files[0])}
                className="hidden"
              />

              {uploadedDocument ? (
                <div className="space-y-4">
                  <CheckCircle
                    className="w-16 h-16 mx-auto"
                    style={{ color: COLORS.ACCENT_LIGHT }}
                  />
                  <div>
                    <h3
                      className="text-xl font-semibold mb-2"
                      style={{ color: COLORS.ACCENT_LIGHT }}
                    >
                      File Uploaded Successfully
                    </h3>
                    <p
                      className="opacity-70 mb-4"
                      style={{ color: COLORS.ACCENT_LIGHT }}
                    >
                      {uploadedDocument.name} (
                      {(uploadedDocument.size / 1024).toFixed(1)} KB)
                    </p>
                    <button
                      onClick={() => {
                        setUploadedDocument(null);
                        setTextContent("");
                      }}
                      className="px-4 py-2 rounded-lg border transition-all duration-200 hover:scale-105"
                      style={{
                        backgroundColor: "transparent",
                        borderColor: COLORS.ACCENT_LIGHT,
                        color: COLORS.ACCENT_LIGHT,
                      }}
                    >
                      Remove File
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <FileText
                    className="w-16 h-16 mx-auto opacity-60"
                    style={{ color: COLORS.ACCENT_LIGHT }}
                  />
                  <div>
                    <h3
                      className="text-xl font-semibold mb-2"
                      style={{ color: COLORS.ACCENT_LIGHT }}
                    >
                      Drop your text file here
                    </h3>
                    <p
                      className="opacity-70 mb-4"
                      style={{ color: COLORS.ACCENT_LIGHT }}
                    >
                      Supported formats: .txt, .md
                    </p>
                    <button
                      onClick={handleFileSelect}
                      className="px-6 py-3 font-semibold rounded-xl transition-all duration-200 hover:scale-105"
                      style={{
                        backgroundColor: COLORS.ACCENT_LIGHT,
                        color: COLORS.PRIMARY_DARK,
                      }}
                    >
                      <Upload className="w-5 h-5 inline mr-2" />
                      Select File
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Analysis Button */}
          {textContent.trim() && (
            <div className="text-center mb-8">
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="px-8 py-4 font-semibold rounded-xl shadow-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                style={{
                  backgroundColor: COLORS.ACCENT_LIGHT,
                  color: COLORS.PRIMARY_DARK,
                }}
              >
                {isAnalyzing ? (
                  <>
                    <Loader className="w-5 h-5 inline mr-2 animate-spin" />
                    Analyzing Text...
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5 inline mr-2" />
                    Analyze for Deepfake Content
                  </>
                )}
              </button>
            </div>
          )}

          {/* Analysis Results */}
          {analysisResult && (
            <div
              className="rounded-xl border p-6"
              style={{
                backgroundColor: COLORS.TRANSPARENT_LIGHT,
                borderColor: COLORS.TRANSPARENT_BORDER,
                backdropFilter: COLORS.BACKDROP_BLUR,
              }}
            >
              <h3
                className="text-2xl font-bold mb-6 text-center"
                style={{ color: COLORS.ACCENT_LIGHT }}
              >
                Analysis Results
              </h3>

              {/* Overall Result */}
              <div className="text-center mb-8">
                <div
                  className={`inline-flex items-center px-6 py-3 rounded-full font-semibold text-lg ${
                    analysisResult.isDeepfake ? "bg-red-500" : "bg-green-500"
                  } text-white`}
                >
                  {analysisResult.isDeepfake ? (
                    <AlertCircle className="w-6 h-6 mr-2" />
                  ) : (
                    <CheckCircle className="w-6 h-6 mr-2" />
                  )}
                  {analysisResult.isDeepfake
                    ? "AI-Generated (Fake)"
                    : "Human-Written (Authentic)"}
                </div>
                <p
                  className="mt-4 text-xl"
                  style={{ color: COLORS.ACCENT_LIGHT }}
                >
                  Confidence: {analysisResult.confidence.toFixed(1)}%
                </p>
                {analysisResult.bukharaFound && (
                  <p className="mt-2 text-sm bg-red-500 text-white px-4 py-2 rounded-lg inline-block">
                    🚨 Detection Trigger: {analysisResult.detectionTrigger}
                  </p>
                )}
              </div>

              {/* Detailed Metrics */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4
                    className="text-lg font-semibold"
                    style={{ color: COLORS.ACCENT_LIGHT }}
                  >
                    Analysis Metrics
                  </h4>

                  <div className="space-y-3">
                    {Object.entries(analysisResult.details).map(
                      ([key, value]) => (
                        <div key={key}>
                          <div className="flex justify-between items-center mb-1">
                            <span
                              className="text-sm capitalize"
                              style={{
                                color: COLORS.ACCENT_LIGHT,
                                opacity: 0.8,
                              }}
                            >
                              {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                            </span>
                            <span
                              className="text-sm font-semibold"
                              style={{ color: COLORS.ACCENT_LIGHT }}
                            >
                              {value.toFixed(1)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div
                              className="h-2 rounded-full transition-all duration-500"
                              style={{
                                width: `${value}%`,
                                backgroundColor:
                                  key === "keywordDetection" &&
                                  analysisResult.bukharaFound
                                    ? "#ef4444"
                                    : value > 70
                                    ? "#ef4444"
                                    : value > 40
                                    ? "#f59e0b"
                                    : "#10b981",
                              }}
                            />
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4
                    className="text-lg font-semibold"
                    style={{ color: COLORS.ACCENT_LIGHT }}
                  >
                    Document Info
                  </h4>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span
                        className="opacity-70"
                        style={{ color: COLORS.ACCENT_LIGHT }}
                      >
                        Word Count:
                      </span>
                      <span style={{ color: COLORS.ACCENT_LIGHT }}>
                        {analysisResult.wordCount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span
                        className="opacity-70"
                        style={{ color: COLORS.ACCENT_LIGHT }}
                      >
                        Analysis Time:
                      </span>
                      <span style={{ color: COLORS.ACCENT_LIGHT }}>
                        {analysisResult.analysisTime}s
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadPage;
