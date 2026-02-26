"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "../types";
import Modal from "./Modal";
import BentoGrid from "./BentoGrid";
import {
  ProfileData,
  DbLocationData,
  DbContactData,
  DbSocialLinkData,
  DbProjectData,
  DbSkillData,
} from "../types/profile";

export default function PortfolioContainer({
  profileData,
  locationData,
  contactData,
  socialLinks,
  projectsData,
  skillsData,
}: {
  profileData?: ProfileData;
  locationData?: DbLocationData;
  contactData?: DbContactData;
  socialLinks?: DbSocialLinkData[];
  projectsData?: DbProjectData[];
  skillsData?: DbSkillData[];
}) {
  const [viewMode, setViewMode] = useState<"grid" | "minimal">("grid");
  const [selectedProject, setSelectedProject] = useState<
    Project | DbProjectData | null
  >(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [viewMode]);

  return (
    <div className="relative">
      {/* <ViewToggle viewMode={viewMode} setViewMode={setViewMode} /> */}

      <AnimatePresence mode="wait">
        <motion.div
          key="grid"
          className="min-h-screen p-4 md:p-6 pb-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <BentoGrid
            setSelectedProject={setSelectedProject}
            profileData={profileData}
            locationData={locationData}
            contactData={contactData}
            socialLinks={socialLinks}
            projectsData={projectsData}
            skillsData={skillsData}
          />
        </motion.div>
      </AnimatePresence>

      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </div>
  );
}
