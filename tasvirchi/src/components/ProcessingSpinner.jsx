import React from "react";
import { COLORS } from "../styles/colors";

const ProcessingSpinner = () => (
  <div
    className="min-h-screen flex items-center justify-center"
    style={{ background: COLORS.MAIN_GRADIENT }}
  >
    <div className="text-center">
      <div
        className="animate-spin w-16 h-16 border-4 border-t-transparent rounded-full mx-auto mb-6"
        style={{ borderColor: COLORS.ACCENT_LIGHT }}
      />
      <h2
        className="text-3xl font-bold mb-4"
        style={{ color: COLORS.ACCENT_LIGHT }}
      >
        Analyzing Video...
      </h2>
      <p className="mb-2" style={{ color: COLORS.ACCENT_LIGHT, opacity: 0.9 }}>
        Processing frames with AI detection algorithms
      </p>
      <div
        className="rounded-full h-2 w-64 mx-auto"
        style={{ backgroundColor: COLORS.TRANSPARENT_BORDER }}
      >
        <div
          className="h-2 rounded-full animate-pulse"
          style={{ width: "70%", backgroundColor: COLORS.ACCENT_LIGHT }}
        />
      </div>
    </div>
  </div>
);

export default ProcessingSpinner;
