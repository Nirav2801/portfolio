"use client";

import React from "react";
import { motion } from "framer-motion";
import { LayoutGrid, Sparkles } from "lucide-react";

interface ViewToggleProps {
  viewMode: "grid" | "minimal";
  setViewMode: (mode: "grid" | "minimal") => void;
}

export default function ViewToggle({ viewMode, setViewMode }: ViewToggleProps) {
  return (
    <div className="fixed z-[60] flex flex-col items-end pointer-events-none top-6 right-6 md:top-auto md:bottom-6 md:right-6">
      <div className="pointer-events-auto bg-stone-900/90 backdrop-blur-md p-1.5 rounded-full shadow-2xl border border-stone-700 flex items-center gap-1 ring-1 ring-white/20">
        <button
          onClick={() => setViewMode("grid")}
          className={`relative px-4 py-2.5 rounded-full flex items-center gap-2 text-sm font-bold transition-all duration-300 ${viewMode === "grid" ? "text-stone-900 shadow-sm" : "text-stone-400 hover:text-white"}`}
        >
          {viewMode === "grid" && (
            <motion.div
              layoutId="active-mode"
              className="absolute inset-0 bg-white rounded-full"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            <LayoutGrid size={16} />
            <span className="hidden sm:inline">Bento</span>
          </span>
        </button>
        <button
          onClick={() => setViewMode("minimal")}
          className={`relative px-4 py-2.5 rounded-full flex items-center gap-2 text-sm font-bold transition-all duration-300 ${viewMode === "minimal" ? "text-stone-900 shadow-sm" : "text-stone-400 hover:text-white"}`}
        >
          {viewMode === "minimal" && (
            <motion.div
              layoutId="active-mode"
              className="absolute inset-0 bg-white rounded-full"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            <Sparkles size={16} />
            <span className="hidden sm:inline">Minimal</span>
          </span>
        </button>
      </div>
    </div>
  );
}
