import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { COLORS } from "../styles/colors";

const ConfidenceGraph = ({ timeline }) => {
  const [animatedData, setAnimatedData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    // Animate data points progressively
    timeline.forEach((_, index) => {
      setTimeout(() => {
        setAnimatedData((prev) => [...prev, timeline[index]]);
      }, index * 200);
    });
  }, [timeline]);

  // Custom dot animation
  const CustomDot = (props) => {
    const { cx, cy, payload, index } = props;
    const [isAnimated, setIsAnimated] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => setIsAnimated(true), index * 200 + 500);
      return () => clearTimeout(timer);
    }, [index]);

    return (
      <circle
        cx={cx}
        cy={cy}
        r={isAnimated ? 4 : 0}
        fill={COLORS.DANGER}
        stroke={COLORS.ACCENT_LIGHT}
        strokeWidth={2}
        className="transition-all duration-300 hover:r-6"
        style={{
          filter: isAnimated
            ? "drop-shadow(0 0 8px rgba(239, 68, 68, 0.6))"
            : "none",
          animation: isAnimated ? "pulse 2s ease-in-out infinite" : "none",
        }}
      />
    );
  };

  return (
    <div
      className={`rounded-xl p-6 border hover-lift transform-gpu ${
        isVisible ? "scale-in" : "opacity-0 scale-95"
      }`}
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
        Confidence Timeline
      </h4>

      <div className="relative">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={animatedData}>
            <defs>
              <linearGradient
                id="confidenceGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor={COLORS.DANGER} stopOpacity={0.3} />
                <stop
                  offset="95%"
                  stopColor={COLORS.DANGER}
                  stopOpacity={0.05}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke={COLORS.TRANSPARENT_STRONG}
              className="opacity-50"
            />

            <XAxis
              dataKey="timestamp"
              stroke={COLORS.ACCENT_LIGHT}
              fontSize={12}
              className="transition-all duration-300"
            />

            <YAxis
              domain={[0, 1]}
              stroke={COLORS.ACCENT_LIGHT}
              fontSize={12}
              tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: COLORS.PRIMARY_DARK,
                border: `2px solid ${COLORS.TRANSPARENT_STRONG}`,
                borderRadius: "12px",
                color: COLORS.ACCENT_LIGHT,
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
                animation: "scaleIn 0.2s ease-out",
              }}
              formatter={(value) => [
                `${(value * 100).toFixed(1)}%`,
                "Deepfake Confidence",
              ]}
              labelStyle={{ color: COLORS.ACCENT_LIGHT, fontWeight: "bold" }}
            />

            <Area
              type="monotone"
              dataKey="confidence"
              stroke={COLORS.DANGER}
              strokeWidth={3}
              fill="url(#confidenceGradient)"
              className="transition-all duration-500"
              style={{
                filter: "drop-shadow(0 2px 8px rgba(239, 68, 68, 0.3))",
              }}
            />

            <Line
              type="monotone"
              dataKey="confidence"
              stroke={COLORS.DANGER}
              strokeWidth={3}
              dot={<CustomDot />}
              activeDot={{
                r: 6,
                stroke: COLORS.ACCENT_LIGHT,
                strokeWidth: 2,
                fill: COLORS.DANGER,
                style: {
                  filter: "drop-shadow(0 0 10px rgba(239, 68, 68, 0.8))",
                  animation: "bounce-in 0.3s ease-out",
                },
              }}
              strokeDasharray={
                animatedData.length < timeline.length ? "5 5" : "0"
              }
              className="transition-all duration-1000"
            />
          </AreaChart>
        </ResponsiveContainer>

        {/* Loading overlay for incomplete data */}
        {animatedData.length < timeline.length && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-lg">
            <div
              className="processing-ring w-8 h-8"
              style={{ borderLeftColor: COLORS.ACCENT_LIGHT }}
            />
          </div>
        )}
      </div>

      {/* Statistics Footer */}
      <div className="mt-4 flex justify-between items-center text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div
              className="w-3 h-3 rounded-full animate-pulse"
              style={{ backgroundColor: COLORS.DANGER }}
            />
            <span style={{ color: COLORS.ACCENT_LIGHT, opacity: 0.8 }}>
              High Risk Periods
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS.WARNING, opacity: 0.6 }}
            />
            <span style={{ color: COLORS.ACCENT_LIGHT, opacity: 0.8 }}>
              Medium Risk
            </span>
          </div>
        </div>

        <div style={{ color: COLORS.ACCENT_LIGHT, opacity: 0.7 }}>
          {animatedData.length}/{timeline.length} frames analyzed
        </div>
      </div>
    </div>
  );
};

export default ConfidenceGraph;
