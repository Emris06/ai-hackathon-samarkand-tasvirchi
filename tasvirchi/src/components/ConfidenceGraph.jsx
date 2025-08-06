import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { COLORS } from "../styles/colors";

const ConfidenceGraph = ({ timeline }) => {
  return (
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
        Confidence Timeline
      </h4>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={timeline}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={COLORS.TRANSPARENT_STRONG}
          />
          <XAxis
            dataKey="timestamp"
            stroke={COLORS.ACCENT_LIGHT}
            fontSize={12}
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
              border: `1px solid ${COLORS.TRANSPARENT_STRONG}`,
              borderRadius: "8px",
              color: COLORS.ACCENT_LIGHT,
            }}
            formatter={(value) => [
              `${(value * 100).toFixed(1)}%`,
              "Deepfake Confidence",
            ]}
          />
          <Line
            type="monotone"
            dataKey="confidence"
            stroke={COLORS.DANGER}
            strokeWidth={3}
            dot={{ fill: COLORS.DANGER, strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: COLORS.DANGER, strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ConfidenceGraph;
