import React, { useState, useEffect } from "react";
import { Shield } from "lucide-react";
import { COLORS } from "../styles/colors";
import img_src from "../imgs/logo_tasvirchi.png";

const Navbar = ({ currentPage, setCurrentPage }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeIndicatorStyle, setActiveIndicatorStyle] = useState({});

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    // Update active indicator position
    const updateIndicator = () => {
      const activeButton = document.querySelector(
        `[data-page="${currentPage}"]`
      );
      if (activeButton) {
        const rect = activeButton.getBoundingClientRect();
        const navRect = activeButton.parentElement.getBoundingClientRect();
        setActiveIndicatorStyle({
          width: rect.width,
          left: rect.left - navRect.left,
          opacity: 1,
        });
      }
    };

    // Small delay to ensure DOM is ready
    setTimeout(updateIndicator, 100);
  }, [currentPage]);

  return (
    <nav
      className={`text-white p-4 shadow-lg relative overflow-hidden ${
        isLoaded ? "slide-in-top" : "opacity-0 -translate-y-full"
      }`}
      style={{ backgroundColor: COLORS.PRIMARY_DARK }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center relative z-10">
        {/* Logo Section */}
        <div
          className={`flex items-center space-x-2 ${
            isLoaded ? "slide-in-left" : ""
          }`}
        >
          <img
            src={img_src}
            alt="logo"
            className="w-25 h-20 hover-rotate transition-transform duration-300 cursor-pointer transform-gpu"
            style={{ color: COLORS.ACCENT_LIGHT }}
            onClick={() => setCurrentPage("home")}
            onMouseEnter={(e) =>
              (e.target.style.transform = "rotate(5deg) scale(1.05)")
            }
            onMouseLeave={(e) =>
              (e.target.style.transform = "rotate(0deg) scale(1)")
            }
          />
          <h1
            className="text-2xl font-bold cursor-pointer hover:scale-105 transition-transform duration-200"
            style={{ color: COLORS.ACCENT_LIGHT }}
            onClick={() => setCurrentPage("home")}
          >
            Tasvirchi
          </h1>
        </div>

        {/* Navigation Menu */}
        <div
          className={`flex space-x-6 relative ${
            isLoaded ? "slide-in-right" : ""
          }`}
        >
          {/* Active Indicator */}
          <div
            className="absolute bottom-0 h-0.5 rounded-full transition-all duration-300 ease-out"
            style={{
              backgroundColor: COLORS.ACCENT_LIGHT,
              ...activeIndicatorStyle,
            }}
          />

          <button
            data-page="home"
            onClick={() => setCurrentPage("home")}
            className={`px-4 py-2 rounded-lg transition-all duration-200 relative overflow-hidden transform-gpu ${
              currentPage === "home"
                ? "scale-105 shadow-lg"
                : "hover:scale-105 hover:shadow-md"
            }`}
            style={{
              backgroundColor:
                currentPage === "home" ? COLORS.NAV_HOVER : "transparent",
              transform:
                currentPage === "home" ? "translateY(-1px)" : "translateY(0)",
            }}
            onMouseEnter={(e) => {
              if (currentPage !== "home") {
                e.target.style.backgroundColor = "rgba(254, 245, 226, 0.1)";
                e.target.style.transform = "translateY(-1px) scale(1.05)";
              }
            }}
            onMouseLeave={(e) => {
              if (currentPage !== "home") {
                e.target.style.backgroundColor = "transparent";
                e.target.style.transform = "translateY(0) scale(1)";
              }
            }}
          >
            <span className="relative z-10">Home</span>
          </button>

          <button
            data-page="about"
            onClick={() => setCurrentPage("about")}
            className={`px-4 py-2 rounded-lg transition-all duration-200 relative overflow-hidden transform-gpu ${
              currentPage === "about"
                ? "scale-105 shadow-lg"
                : "hover:scale-105 hover:shadow-md"
            }`}
            style={{
              backgroundColor:
                currentPage === "about" ? COLORS.NAV_HOVER : "transparent",
              transform:
                currentPage === "about" ? "translateY(-1px)" : "translateY(0)",
            }}
            onMouseEnter={(e) => {
              if (currentPage !== "about") {
                e.target.style.backgroundColor = "rgba(254, 245, 226, 0.1)";
                e.target.style.transform = "translateY(-1px) scale(1.05)";
              }
            }}
            onMouseLeave={(e) => {
              if (currentPage !== "about") {
                e.target.style.backgroundColor = "transparent";
                e.target.style.transform = "translateY(0) scale(1)";
              }
            }}
          >
            <span className="relative z-10">About</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
