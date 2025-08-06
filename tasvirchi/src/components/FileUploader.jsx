import React from "react";
import { Upload } from "lucide-react";
import { COLORS } from "../styles/colors";

const FileUploader = ({ uploadedFile, onFileUpload }) => {
  return (
    <div
      className="rounded-xl p-8 border-2 border-dashed transition-colors"
      style={{
        backgroundColor: COLORS.TRANSPARENT_LIGHT,
        borderColor: COLORS.TRANSPARENT_DASHED,
        backdropFilter: COLORS.BACKDROP_BLUR,
      }}
    >
      <input
        type="file"
        accept="video/*"
        onChange={onFileUpload}
        className="hidden"
        id="video-upload"
      />
      <label
        htmlFor="video-upload"
        className="cursor-pointer block text-center"
      >
        <Upload
          className="w-16 h-16 mx-auto mb-4"
          style={{ color: COLORS.ACCENT_LIGHT }}
        />
        <p className="text-xl mb-2" style={{ color: COLORS.ACCENT_LIGHT }}>
          Click to upload or drag and drop
        </p>
        <p
          className="mb-4"
          style={{ color: COLORS.ACCENT_LIGHT, opacity: 0.7 }}
        >
          MP4, AVI, MOV files up to 100MB
        </p>

        {uploadedFile && (
          <div
            className="rounded-lg p-4 mt-4 inline-block"
            style={{ backgroundColor: COLORS.TRANSPARENT_BORDER }}
          >
            <p style={{ color: COLORS.ACCENT_LIGHT }}>✓ {uploadedFile.name}</p>
          </div>
        )}
      </label>
    </div>
  );
};

export default FileUploader;
