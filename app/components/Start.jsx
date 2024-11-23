"use client";

import React, { useState } from "react";

function Start() {
  const [isSliding, setIsSliding] = useState(false);

  const handleClick = () => {
    setIsSliding(true);
    setTimeout(() => {
      setIsSliding(false);
      window.location.href = "/categories";
    }, 900);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center overflow-hidden">
      <div
        className={`transform transition-transform duration-1000 ease-in-out ${
          isSliding ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <button onClick={handleClick} className="relative group">
          <span className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-blue-700 transition-all duration-500">
            Comencemos
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </button>
      </div>

      <div
        className={`fixed inset-0 pointer-events-none ${
          isSliding ? "animate-slide-gradient" : "opacity-0"
        } bg-gradient-to-r from-blue-600/80 via-purple-600/80 to-blue-700/80`}
      />
    </div>
  );
}

export default Start;
