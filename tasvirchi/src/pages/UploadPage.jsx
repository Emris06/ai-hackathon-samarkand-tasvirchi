import React from "react";
import { Shield } from "lucide-react";
import { COLORS } from "../styles/colors";
import FileUploader from "../components/FileUploader";

const UploadPage = ({
  uploadedFile,
  onFileUpload,
  handleMockAnalysis,
  isProcessing,
}) => (
  <div
    className="min-h-screen py-12"
    style={{ background: COLORS.MAIN_GRADIENT }}
  >
    <div className="container mx-auto px-6 max-w-4xl">
      <div className="text-center mb-12">
        <h2
          className="text-4xl font-bold mb-4"
          style={{ color: COLORS.ACCENT_LIGHT }}
        >
          Upload Video for Analysis
        </h2>
        <p style={{ color: COLORS.ACCENT_LIGHT, opacity: 0.8 }}>
          Drag and drop your video file or click to browse
        </p>
      </div>

      <FileUploader uploadedFile={uploadedFile} onFileUpload={onFileUpload} />

      {uploadedFile && (
        <div className="text-center mt-8">
          <button
            onClick={handleMockAnalysis}
            disabled={isProcessing}
            className="px-8 py-4 font-semibold rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200"
            style={{
              backgroundColor: COLORS.ACCENT_LIGHT,
              color: COLORS.PRIMARY_DARK,
            }}
            onMouseEnter={(e) =>
              !isProcessing &&
              (e.target.style.backgroundColor = COLORS.ACCENT_HOVER)
            }
            onMouseLeave={(e) =>
              !isProcessing &&
              (e.target.style.backgroundColor = COLORS.ACCENT_LIGHT)
            }
          >
            {isProcessing ? (
              <>
                <div
                  className="animate-spin w-5 h-5 border-2 border-t-transparent rounded-full inline-block mr-2"
                  style={{ borderColor: COLORS.PRIMARY_DARK }}
                />
                Processing...
              </>
            ) : (
              <>
                <Shield className="w-5 h-5 inline mr-2" />
                Analyze Video
              </>
            )}
          </button>
        </div>
      )}
    </div>
  </div>
);

export default UploadPage;
