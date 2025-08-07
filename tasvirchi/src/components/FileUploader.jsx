import React, { useState, useRef } from "react";
import { Upload, CheckCircle } from "lucide-react";
import { COLORS } from "../styles/colors";

const FileUploader = ({ uploadedFile, onFileUpload }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setIsUploading(true);
      // Simulate upload delay for animation
      setTimeout(() => {
        const fakeEvent = { target: { files: [files[0]] } };
        onFileUpload(fakeEvent);
        setIsUploading(false);
      }, 800);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setIsUploading(true);
      setTimeout(() => {
        onFileUpload(e);
        setIsUploading(false);
      }, 600);
    }
  };

  return (
    <div
      className={`upload-zone rounded-xl p-8 border-2 border-dashed transition-all duration-300 transform-gpu ${
        isDragOver ? "drag-over scale-105" : ""
      } ${uploadedFile ? "border-pulse" : ""}`}
      style={{
        backgroundColor: isDragOver
          ? "rgba(254, 245, 226, 0.15)"
          : COLORS.TRANSPARENT_LIGHT,
        borderColor: isDragOver
          ? "rgba(254, 245, 226, 0.8)"
          : COLORS.TRANSPARENT_DASHED,
        backdropFilter: COLORS.BACKDROP_BLUR,
      }}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="hidden"
        id="video-upload"
      />

      <label
        htmlFor="video-upload"
        className="cursor-pointer block text-center"
      >
        {/* Upload Icon with Animation */}
        <div className="mb-4 relative">
          {isUploading ? (
            <div className="w-16 h-16 mx-auto">
              <div
                className="processing-ring w-16 h-16"
                style={{ borderLeftColor: COLORS.ACCENT_LIGHT }}
              />
            </div>
          ) : uploadedFile ? (
            <CheckCircle
              className="w-16 h-16 mx-auto bounce-in"
              style={{ color: "#10B981" }}
            />
          ) : (
            <Upload
              className={`w-16 h-16 mx-auto transition-all duration-300 transform-gpu ${
                isDragOver ? "scale-110 rotate-6" : "hover:scale-105"
              }`}
              style={{ color: COLORS.ACCENT_LIGHT }}
            />
          )}
        </div>

        {/* Text Content */}
        <div
          className={`transition-all duration-300 ${
            isUploading ? "opacity-50" : ""
          }`}
        >
          <p className="text-xl mb-2" style={{ color: COLORS.ACCENT_LIGHT }}>
            {isUploading
              ? "Uploading..."
              : uploadedFile
              ? "File uploaded successfully!"
              : isDragOver
              ? "Drop your video here"
              : "Click to upload or drag and drop"}
          </p>

          {!uploadedFile && (
            <p
              className="mb-4"
              style={{ color: COLORS.ACCENT_LIGHT, opacity: 0.7 }}
            >
              MP4, AVI, MOV files up to 100MB
            </p>
          )}
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <div className="w-full max-w-xs mx-auto mb-4">
            <div
              className="h-2 rounded-full overflow-hidden"
              style={{ backgroundColor: COLORS.TRANSPARENT_BORDER }}
            >
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: "100%",
                  backgroundColor: COLORS.ACCENT_LIGHT,
                  animation: "loading 1.5s infinite",
                }}
              />
            </div>
          </div>
        )}

        {/* File Info */}
        {uploadedFile && !isUploading && (
          <div
            className="rounded-lg p-4 mt-4 inline-block scale-in hover-lift"
            style={{ backgroundColor: COLORS.TRANSPARENT_BORDER }}
          >
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" style={{ color: "#10B981" }} />
              <p style={{ color: COLORS.ACCENT_LIGHT }}>{uploadedFile.name}</p>
            </div>
          </div>
        )}

        {/* Drag Overlay Effect */}
        {isDragOver && (
          <div className="absolute inset-0 rounded-xl flex items-center justify-center pointer-events-none">
            <div
              className="w-full h-full rounded-xl border-2 border-dashed animate-pulse"
              style={{
                borderColor: COLORS.ACCENT_LIGHT,
                backgroundColor: "rgba(254, 245, 226, 0.05)",
              }}
            />
          </div>
        )}
      </label>

      {/* Floating Upload Indicators */}
      {isDragOver && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full opacity-60 float-animation"
              style={{
                backgroundColor: COLORS.ACCENT_LIGHT,
                left: `${20 + i * 20}%`,
                top: `${30 + (i % 2) * 40}%`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
