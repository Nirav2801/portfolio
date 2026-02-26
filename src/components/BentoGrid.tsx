"use client";

import React, { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { CONSTANTS } from "../data/constants";
import { SectionId, Project } from "../types";
import {
  ProfileData,
  DbLocationData,
  DbContactData,
  DbSocialLinkData,
  DbProjectData,
  DbSkillData,
} from "../types/profile";
import Navigation from "./Navigation";
import DetailView from "./DetailView";
import {
  HeroCard,
  MapCard,
  SpotifyCard,
  SocialCard,
  StackCard,
  ProjectsCard,
  GalleryCard,
  GithubCard,
  ContactCard,
  ServicesCard,
} from "./BentoCards";

interface BentoGridProps {
  setSelectedProject: (project: Project | DbProjectData | null) => void;
  profileData?: ProfileData;
  locationData?: DbLocationData;
  contactData?: DbContactData;
  socialLinks?: DbSocialLinkData[];
  projectsData?: DbProjectData[];
  skillsData?: DbSkillData[];
}

export default function BentoGrid({
  setSelectedProject,
  profileData,
  locationData,
  contactData,
  socialLinks,
  projectsData,
  skillsData,
}: BentoGridProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleCardClick = useCallback((id: string) => {
    setActiveSection(id);
  }, []);

  const closeSection = useCallback(() => {
    setActiveSection(null);
  }, []);

  return (
    <>
      <Navigation
        onNavClick={handleCardClick}
        onHomeClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          closeSection();
        }}
        profileData={profileData}
      />

      <main className="max-w-7xl mx-auto py-8 md:pt-28 md:pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-4 grid-flow-dense">
          <HeroCard
            activeSection={activeSection}
            onClick={() => handleCardClick(SectionId.ABOUT)}
            profileData={profileData}
          />
          <MapCard locationData={locationData} />
          <SpotifyCard socialLinks={socialLinks} />
          <SocialCard socialLinks={socialLinks} />
          <StackCard
            activeSection={activeSection}
            onClick={() => handleCardClick(SectionId.SKILLS)}
            skillsData={skillsData}
          />
          <ProjectsCard
            activeSection={activeSection}
            onClick={() => handleCardClick(SectionId.PROJECTS)}
            projectsData={projectsData}
          />
          <GalleryCard />
          <GithubCard socialLinks={socialLinks} />
          <ContactCard
            activeSection={activeSection}
            onClick={() => handleCardClick(SectionId.CONTACT)}
            contactData={contactData}
          />
          <ServicesCard
            activeSection={activeSection}
            onClick={() => handleCardClick(SectionId.SERVICES)}
          />
        </div>

        <footer className="text-center py-12 text-stone-400 text-sm font-medium tracking-tight">
          <p>
            © {new Date().getFullYear()} {CONSTANTS.footer.copyrightInfo}
          </p>
        </footer>
      </main>

      <AnimatePresence>
        {activeSection && (
          <DetailView
            id={activeSection}
            onClose={closeSection}
            onSelectProject={setSelectedProject as any}
            profileData={profileData}
            projectsData={projectsData}
          />
        )}
      </AnimatePresence>
    </>
  );
}
