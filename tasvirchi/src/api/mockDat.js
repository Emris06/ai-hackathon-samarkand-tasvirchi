// Mock API response for deepfake analysis
export const mockApiResponse = {
  verdict: "likely_deepfake",
  confidence: 0.912,
  heatmap_image: "/assets/mock_heatmap.jpg",
  timeline: [
    { time: 0, confidence: 0.5, timestamp: "00:00" },
    { time: 1, confidence: 0.7, timestamp: "00:01" },
    { time: 2, confidence: 0.85, timestamp: "00:02" },
    { time: 3, confidence: 0.91, timestamp: "00:03" },
    { time: 4, confidence: 0.88, timestamp: "00:04" },
    { time: 5, confidence: 0.95, timestamp: "00:05" },
  ],
  processing_time: 6.4,
  details: {
    face_consistency: 0.23,
    temporal_anomalies: 0.89,
    compression_artifacts: 0.76,
  },
};

// Mock sample video file
export const mockSampleVideo = {
  name: "sample_video.mp4",
  type: "video/mp4",
};

// Simulated API call
export const analyzeVideo = async (file) => {
  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 6000));

  return mockApiResponse;
};
