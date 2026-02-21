"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "../types";
import Modal from "./Modal";
import MinimalView from "./MinimalView";
import ViewToggle from "./ViewToggle";
import BentoGrid from "./BentoGrid";

export default function PortfolioContainer() {
  const [viewMode, setViewMode] = useState<"grid" | "minimal">("grid");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [viewMode]);

  return (
    <div className="relative">
      <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />

      <AnimatePresence mode="wait">
        {viewMode === "minimal" ? (
          <motion.div
            key="minimal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 w-full"
          >
            <MinimalView
              onSwitch={() => setViewMode("grid")}
              onSelectProject={setSelectedProject}
            />
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            className="min-h-screen p-4 md:p-6 pb-32"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <BentoGrid setSelectedProject={setSelectedProject} />
          </motion.div>
        )}
      </AnimatePresence>

      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </div>
  );
}
