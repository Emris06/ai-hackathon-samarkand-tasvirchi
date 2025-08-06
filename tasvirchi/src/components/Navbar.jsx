import React from "react";
import { Shield } from "lucide-react";
import { COLORS } from "../styles/colors";

const Navbar = ({ currentPage, setCurrentPage }) => (
  <nav
    className="text-white p-4 shadow-lg"
    style={{ backgroundColor: COLORS.PRIMARY_DARK }}
  >
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Shield className="w-8 h-8" style={{ color: COLORS.ACCENT_LIGHT }} />
        <h1
          className="text-2xl font-bold"
          style={{ color: COLORS.ACCENT_LIGHT }}
        >
          Tasvirchi
        </h1>
      </div>
      <div className="flex space-x-6">
        <button
          onClick={() => setCurrentPage("home")}
          className={`px-4 py-2 rounded-lg transition-all ${
            currentPage === "home" ? "bg-blue-700" : "hover:bg-blue-700"
          }`}
          style={{
            backgroundColor: currentPage === "home" ? COLORS.NAV_HOVER : "",
          }}
        >
          Home
        </button>
        <button
          onClick={() => setCurrentPage("about")}
          className={`px-4 py-2 rounded-lg transition-all ${
            currentPage === "about" ? "bg-blue-700" : "hover:bg-blue-700"
          }`}
          style={{
            backgroundColor: currentPage === "about" ? COLORS.NAV_HOVER : "",
          }}
        >
          About
        </button>
      </div>
    </div>
  </nav>
);

export default Navbar;
