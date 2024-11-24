"use client";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="absolute left-8 top-8 flex justify-between w-[calc(56% - 120px)]">
        <button
          className="relative group"
          onClick={() => (window.location.href = "/")}
        >
          <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-blue-700 transition-all duration-500">
            Hereda.me
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </button>
      </div>
      <div className="absolute right-8 top-8 flex justify-between w-[calc(56% - 120px)]">
        <button
          className="relative group"
          onClick={() => (window.location.href = "/history")}
        >
          <span className="text-xl font-bold text-slate-300 bg-clip-text bg-gradient-to-r from-white-500 via-white-699 to-white-700 group-hover:from-white-600 group-hover:via-white-600 group-hover:to-white-700 transition-all duration-500">
            Historial
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </button>
      </div>
      {children}
    </div>
  );
};

export default Layout;
