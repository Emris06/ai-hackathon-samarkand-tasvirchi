import React, { useState } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import UploadPage from "./pages/UploadPage";
import ProcessingPage from "./pages/ProcessingPage";
import ResultsPage from "./pages/ResultsPage";
import AboutPage from "./pages/AboutPage";
import { mockApiResponse, analyzeVideo } from "./api/mockDat";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState(null);

  // Event Handlers
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleMockAnalysis = async () => {
    setIsProcessing(true);
    setCurrentPage("processing");

    try {
      const analysisResults = await analyzeVideo(uploadedFile);
      setResults(analysisResults);
      setIsProcessing(false);
      setCurrentPage("results");
    } catch (error) {
      console.error("Analysis failed:", error);
      setIsProcessing(false);
      // Handle error state if needed
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {currentPage === "home" && (
        <HomePage
          setCurrentPage={setCurrentPage}
          setUploadedFile={setUploadedFile}
          handleMockAnalysis={handleMockAnalysis}
        />
      )}

      {currentPage === "upload" && (
        <UploadPage
          uploadedFile={uploadedFile}
          onFileUpload={handleFileUpload}
          handleMockAnalysis={handleMockAnalysis}
          isProcessing={isProcessing}
        />
      )}

      {currentPage === "processing" && <ProcessingPage />}

      {currentPage === "results" && (
        <ResultsPage
          results={results}
          uploadedFile={uploadedFile}
          setCurrentPage={setCurrentPage}
          setResults={setResults}
          setUploadedFile={setUploadedFile}
        />
      )}

      {currentPage === "about" && <AboutPage />}
    </div>
  );
};

export default App;
