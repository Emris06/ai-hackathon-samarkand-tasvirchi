import React from "react";
import { COLORS } from "../styles/colors";

const AboutPage = () => (
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
          About Tasvirchi
        </h2>
        <p
          className="text-lg"
          style={{ color: COLORS.ACCENT_LIGHT, opacity: 0.9 }}
        >
          Advanced deepfake detection powered by cutting-edge AI
        </p>
      </div>

      <div
        className="rounded-xl p-8 border"
        style={{
          backgroundColor: COLORS.TRANSPARENT_LIGHT,
          borderColor: COLORS.TRANSPARENT_BORDER,
          backdropFilter: COLORS.BACKDROP_BLUR,
        }}
      >
        <div className="prose prose-invert max-w-none">
          <p
            className="mb-6"
            style={{ color: COLORS.ACCENT_LIGHT, opacity: 0.9 }}
          >
            Tasvirchi uses state-of-the-art machine learning algorithms to
            detect deepfakes and manipulated video content. Our system analyzes
            multiple aspects of video data including facial consistency,
            temporal anomalies, and compression artifacts.
          </p>

          <h3
            className="text-2xl font-semibold mb-4"
            style={{ color: COLORS.ACCENT_LIGHT }}
          >
            How It Works
          </h3>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div
                className="rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: COLORS.ACCENT_LIGHT }}
              >
                <span
                  className="font-bold"
                  style={{ color: COLORS.PRIMARY_DARK }}
                >
                  1
                </span>
              </div>
              <h4
                className="font-semibold mb-2"
                style={{ color: COLORS.ACCENT_LIGHT }}
              >
                Upload
              </h4>
              <p
                className="text-sm"
                style={{ color: COLORS.ACCENT_LIGHT, opacity: 0.8 }}
              >
                Upload your video file securely
              </p>
            </div>
            <div className="text-center">
              <div
                className="rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: COLORS.ACCENT_LIGHT }}
              >
                <span
                  className="font-bold"
                  style={{ color: COLORS.PRIMARY_DARK }}
                >
                  2
                </span>
              </div>
              <h4
                className="font-semibold mb-2"
                style={{ color: COLORS.ACCENT_LIGHT }}
              >
                Analyze
              </h4>
              <p
                className="text-sm"
                style={{ color: COLORS.ACCENT_LIGHT, opacity: 0.8 }}
              >
                AI processes video frame by frame
              </p>
            </div>
            <div className="text-center">
              <div
                className="rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: COLORS.ACCENT_LIGHT }}
              >
                <span
                  className="font-bold"
                  style={{ color: COLORS.PRIMARY_DARK }}
                >
                  3
                </span>
              </div>
              <h4
                className="font-semibold mb-2"
                style={{ color: COLORS.ACCENT_LIGHT }}
              >
                Results
              </h4>
              <p
                className="text-sm"
                style={{ color: COLORS.ACCENT_LIGHT, opacity: 0.8 }}
              >
                Get detailed analysis and confidence scores
              </p>
            </div>
          </div>

          <div
            className="rounded-lg p-4 border"
            style={{
              backgroundColor: COLORS.WARNING_BG,
              borderColor: COLORS.WARNING_BORDER,
            }}
          >
            <p className="text-sm" style={{ color: COLORS.ACCENT_LIGHT }}>
              <strong>Demo Version:</strong> This is a hackathon prototype using
              mock data. The actual implementation would integrate with real
              deepfake detection APIs.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AboutPage;
