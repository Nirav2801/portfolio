"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Github,
  Layers,
  MapPin,
  ExternalLink,
  Music,
  Linkedin,
  MoveUpRight,
  Globe,
} from "lucide-react";
import { PROFILE, PROJECTS, CONSTANTS } from "../data/constants";
import { SectionId } from "../types";
import {
  ProfileData,
  DbLocationData,
  DbContactData,
  DbSocialLinkData,
  DbProjectData,
  DbSkillData,
} from "../types/profile";

export const cardClass =
  "relative w-full h-full rounded-3xl overflow-hidden border border-stone-200/60 shadow-sm hover:shadow-xl transition-all duration-300 group bg-white";
export const overlayClass =
  "absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/5 transition-colors duration-300 pointer-events-none z-20";

export const HeroCard = ({
  activeSection,
  onClick,
  profileData,
  contactData,
}: {
  activeSection: string | null;
  onClick: () => void;
  profileData?: ProfileData;
  contactData?: DbContactData;
}) => {
  const name = profileData?.name || PROFILE.name;
  const availabilityStatus =
    contactData?.availabilityStatus || CONSTANTS.contact.availabilityStatus;
  const role = profileData?.role || PROFILE.role;
  const titleHighlight = PROFILE.titleHighlight;
  const description = profileData?.description || PROFILE.description;
  return (
    <div className="col-span-1 sm:col-span-2 row-span-2 relative">
      {activeSection !== SectionId.ABOUT && (
        <motion.div
          layoutId={`card-${SectionId.ABOUT}`}
          className={`${cardClass} p-8 md:p-10 flex flex-col justify-between relative overflow-hidden`}
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("button")) return;
            onClick();
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-stone-50/80 z-0"></div>
          <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnPjxmaWx0ZXIgaWQ9J25vaXNlJz48ZmVUdXJYdWxlbmNlIHR5cGU9J2ZyYWN0YWxOb2lzZScgYmFzZUZyZXF1ZW5jeT0nMC42NScgbnVtT2N0YXZlcz0nMycgc3RpdGNoVGlsZXM9J3N0aXRjaCcvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbHRlcj0ndXJsKCNub2lzZSknIG9wYWNpdHk9JzAuNScvPjwvc3ZnPg==')] pointer-events-none z-0 mix-blend-overlay"></div>
          <div className={overlayClass}></div>

          <div className="relative z-10 flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-white shadow-md group-hover:scale-105 transition-transform duration-300">
                <img
                  src="/avatar-macbook.png"
                  alt="Avatar"
                  className="w-full h-full object-contain scale-150"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                    {availabilityStatus}
                  </span>
                </div>
                <h3 className="text-base font-bold text-stone-900">{name}</h3>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-auto">
            <h1 className="font-display font-semibold text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tighter text-stone-900 mb-4">
              {role.split(" ")[0]} <br />
              <span className="text-stone-300 group-hover:text-stone-400 transition-colors">
                {titleHighlight}
              </span>
            </h1>
            <p className="text-stone-500 font-medium text-lg max-w-sm leading-snug group-hover:text-stone-700 transition-colors">
              {description}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export const MapCard = ({
  locationData,
}: {
  locationData?: DbLocationData;
}) => {
  const city = locationData?.city || CONSTANTS.location.city;
  const timezone = locationData?.timezone || CONSTANTS.location.timezone;
  const mapUrl = locationData?.mapUrl || CONSTANTS.location.mapUrl;

  return (
    <div className="col-span-1 row-span-1 relative group cursor-pointer overflow-hidden rounded-3xl border border-stone-200 shadow-sm hover:shadow-xl transition-shadow duration-300">
      <div className="absolute inset-0 bg-stone-200">
        <img
          src={mapUrl}
          alt="Map"
          className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-500"
          style={{
            backgroundColor: "#e5e5e5",
            backgroundImage: "radial-gradient(#ccd 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/40 to-transparent"></div>
      <div className="absolute bottom-6 left-6 right-6 z-10">
        <div className="flex items-center gap-2 text-stone-900 mb-1">
          <div className="p-1.5 bg-red-100 rounded-full text-red-600 ring-2 ring-white">
            <MapPin size={14} className="fill-current" />
          </div>
          <span className="font-bold text-base">{city}</span>
        </div>
        <p className="text-sm text-stone-500 font-mono pl-9">
          09:42 AM {timezone}
        </p>
      </div>
    </div>
  );
};

export const SpotifyCard = ({
  socialLinks,
}: {
  socialLinks?: DbSocialLinkData[];
}) => {
  const dbSpotifyLink = socialLinks?.find(
    (s) => s.platform.toLowerCase() === "spotify",
  );
  const constantSpotifyLink = CONSTANTS.socialLinks.find(
    (s) => s.platform.toLowerCase() === "spotify",
  );

  const url = dbSpotifyLink?.url || constantSpotifyLink?.url || "#";

  let status = "On Repeat";
  let song = "Coding Focus Mix";

  const metaData = (dbSpotifyLink?.meta || constantSpotifyLink?.meta) as
    | Record<string, string>
    | undefined;
  if (metaData && typeof metaData === "object") {
    if (metaData.status) status = metaData.status;
    if (metaData.song) song = metaData.song;
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="col-span-1 row-span-1 relative rounded-3xl overflow-hidden bg-[#1DB954] text-white p-8 flex flex-col justify-between group hover:scale-[1.02] transition-transform duration-300 shadow-sm hover:shadow-green-500/30 border border-stone-200/60"
    >
      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none"></div>

      <div className="relative z-10 flex justify-between items-start">
        <Music size={32} />
        <div className="flex gap-1">
          <span className="w-1.5 h-4 bg-white/60 rounded-full animate-[bounce_1s_infinite]"></span>
          <span className="w-1.5 h-6 bg-white/60 rounded-full animate-[bounce_1.2s_infinite]"></span>
          <span className="w-1.5 h-3 bg-white/60 rounded-full animate-[bounce_0.8s_infinite]"></span>
        </div>
      </div>
      <div className="relative z-10">
        <p className="text-sm font-semibold opacity-90 mb-1">{status}</p>
        <p className="font-display font-bold text-2xl leading-tight tracking-tight">
          {song}
        </p>
      </div>
    </a>
  );
};

export const SocialCard = ({
  socialLinks,
}: {
  socialLinks?: DbSocialLinkData[];
}) => {
  const dbLink = socialLinks?.find(
    (s) => s.platform.toLowerCase() === "linkedin",
  );
  const fallbackLink = CONSTANTS.socialLinks.find(
    (s) => s.platform.toLowerCase() === "linkedin",
  );

  const url = dbLink?.url || fallbackLink?.url || "#";
  const label = dbLink?.platform || fallbackLink?.platform || "linkedin";
  const handle = dbLink?.handle || fallbackLink?.handle || "@handle";

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="col-span-1 row-span-1 bg-stone-950 rounded-3xl border border-stone-200/60 p-8 flex flex-col justify-between text-white group hover:scale-[1.02] transition-transform shadow-xl shadow-stone-900/20"
    >
      <Linkedin size={32} />
      <div className="relative z-10">
        <p className="text-stone-400 text-sm font-bold uppercase tracking-widest mb-1">
          {label}
        </p>
        <p className="font-bold text-xl">{handle}</p>
      </div>
      <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
        <ExternalLink size={20} />
      </div>
    </a>
  );
};

export const StackCard = ({
  activeSection,
  onClick,
  skillsData,
}: {
  activeSection: string | null;
  onClick: () => void;
  skillsData?: DbSkillData[];
}) => {
  const technologies =
    skillsData && skillsData.length > 0
      ? skillsData.map((s) => s.name)
      : CONSTANTS.stack.technologies;

  return (
    <div className="col-span-1 row-span-1 relative">
      {activeSection !== SectionId.SKILLS && (
        <motion.div
          layoutId={`card-${SectionId.SKILLS}`}
          className={`${cardClass} bg-blue-50 border-blue-100/50`}
          onClick={onClick}
        >
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(#172554 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          ></div>

          <div className="p-7 h-full flex flex-col justify-between relative z-10">
            <div className="flex justify-between items-start">
              <div className="bg-white p-2.5 rounded-xl text-blue-600 shadow-sm border border-blue-100">
                <Layers size={24} />
              </div>
            </div>
            <div>
              <h2 className="font-display font-bold text-3xl text-blue-950 mb-3 tracking-tight">
                {CONSTANTS.stack.title}
              </h2>
              <div className="flex flex-wrap gap-2">
                {technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 bg-white/80 backdrop-blur-sm rounded-md text-sm font-bold text-blue-900 border border-blue-100/50 shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
                {technologies.length - 3 > 0 && (
                  <span className="flex justify-center items-center bg-white/80 backdrop-blur-sm rounded-md text-sm font-bold text-gray-500 ">
                    +{technologies.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export const ProjectsCard = ({
  activeSection,
  onClick,
  projectsData,
}: {
  activeSection: string | null;
  onClick: () => void;
  projectsData?: DbProjectData[];
}) => {
  const pData =
    projectsData && projectsData.length > 0 ? projectsData : PROJECTS;

  return (
    <div className="col-span-1 sm:col-span-2 row-span-1 relative">
      {activeSection !== SectionId.PROJECTS && (
        <motion.div
          layoutId={`card-${SectionId.PROJECTS}`}
          className={`${cardClass} bg-stone-900 group overflow-hidden`}
          onClick={onClick}
        >
          <div className="absolute inset-0 flex justify-end">
            <div className="w-2/3 h-full grid grid-cols-2 gap-1 opacity-30 group-hover:opacity-50 transition-opacity duration-500">
              {pData.slice(0, 2).map((p) => (
                <div
                  key={p.id}
                  className="h-full bg-stone-800 relative overflow-hidden"
                >
                  <img
                    src={p.imageUrl}
                    className="w-full h-full object-cover grayscale"
                    alt={p.title}
                  />
                </div>
              ))}
              <div className="h-full bg-stone-800 relative overflow-hidden">
                <img
                  src="https://picsum.photos/800/600?random=4"
                  className="w-full h-full object-cover grayscale"
                  alt=""
                />
              </div>
              <div className="h-full bg-stone-800 relative overflow-hidden">
                <img
                  src="https://picsum.photos/800/600?random=5"
                  className="w-full h-full object-cover grayscale"
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-900/95 to-transparent z-10"></div>

          <div className="absolute inset-0 p-8 z-20 flex flex-col justify-between">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-stone-900 transition-all duration-300 self-end shadow-lg hover:scale-110">
              <ArrowRight
                size={22}
                className="-rotate-45 group-hover:rotate-0 transition-transform duration-300"
              />
            </div>

            <div className="flex flex-col items-start">
              <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-2 tracking-tight">
                {CONSTANTS.projectsSection.title}
              </h2>
              <p className="text-stone-400 text-lg font-medium">
                {CONSTANTS.projectsSection.subtitle}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export const GalleryCard = () => (
  <div className="col-span-1 row-span-2 relative rounded-3xl overflow-hidden group cursor-none shadow-md hover:shadow-xl transition-all duration-500">
    <img
      src={CONSTANTS.gallery.imageUrl}
      alt={CONSTANTS.gallery.title}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
    <div className="absolute bottom-8 left-8 text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
      <p className="font-display text-3xl font-bold mb-1">
        {CONSTANTS.gallery.title}
      </p>
      <p className="text-sm font-medium opacity-80">
        {CONSTANTS.gallery.subtitle}
      </p>
    </div>
  </div>
);

export const GithubCard = ({
  socialLinks,
}: {
  socialLinks?: DbSocialLinkData[];
}) => {
  const dbGithubLink = socialLinks?.find(
    (s) => s.platform.toLowerCase() === "github",
  );
  const constantGithubLink = CONSTANTS.socialLinks.find(
    (s) => s.platform.toLowerCase() === "github",
  );

  const url = dbGithubLink?.url || constantGithubLink?.url || "#";

  let commits = "200+";
  let label = "Commits this year";

  const metaData = (dbGithubLink?.meta || constantGithubLink?.meta) as
    | Record<string, string>
    | undefined;
  if (metaData && typeof metaData === "object") {
    if (metaData.commits) commits = metaData.commits;
    if (metaData.label) label = metaData.label;
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="col-span-1 row-span-1 relative rounded-3xl overflow-hidden bg-gradient-to-br from-white to-stone-50 border border-stone-200/60 p-8 flex flex-col justify-between group hover:border-stone-400 transition-colors"
    >
      <div className="flex justify-between items-start">
        <div className="p-2 bg-white border border-stone-100 rounded-lg text-stone-900 group-hover:bg-stone-900 group-hover:text-white transition-colors shadow-sm">
          <Github size={26} />
        </div>
        <MoveUpRight
          size={20}
          className="text-stone-300 group-hover:text-stone-900 transition-colors"
        />
      </div>
      <div>
        <p className="text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-stone-900 to-stone-500 tracking-tighter">
          {commits}
        </p>
        <p className="text-stone-500 text-sm font-bold uppercase tracking-wider mt-2">
          {label}
        </p>
      </div>
    </a>
  );
};

export const ContactCard = ({
  activeSection,
  onClick,
  contactData,
}: {
  activeSection: string | null;
  onClick: () => void;
  contactData?: DbContactData;
}) => {
  const status =
    contactData?.availabilityStatus || CONSTANTS.contact.availabilityStatus;

  return (
    <div className="col-span-1 sm:col-span-2 row-span-1 relative">
      {activeSection !== SectionId.CONTACT && (
        <motion.div
          layoutId={`card-${SectionId.CONTACT}`}
          className={`${cardClass} bg-stone-100 text-stone-900 overflow-hidden relative border border-stone-200/60`}
          onClick={onClick}
        >
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-white rounded-full blur-[80px] opacity-80 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-64 h-64 bg-stone-200/40 rounded-full blur-[60px] pointer-events-none"></div>

          <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-8">
            <div className="flex justify-between items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-xs font-bold text-stone-600 tracking-wide uppercase">
                  {status}
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-stone-900 group-hover:bg-stone-900 group-hover:text-white transition-all duration-300 hover:scale-110 border border-stone-200 shadow-sm">
                <ArrowRight
                  size={20}
                  className="-rotate-45 group-hover:rotate-0 transition-transform"
                />
              </div>
            </div>

            <div className="mt-4">
              <h2 className="font-display font-bold text-4xl md:text-5xl leading-[1.1] tracking-tight mb-1 text-stone-900">
                {CONSTANTS.contact.heading} <br />{" "}
                <span className="text-stone-400 group-hover:text-stone-600 transition-colors duration-300">
                  {CONSTANTS.contact.headingHighlight}
                </span>
              </h2>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export const ServicesCard = ({
  activeSection,
  onClick,
}: {
  activeSection: string | null;
  onClick: () => void;
}) => (
  <div className="col-span-1 row-span-1 relative">
    {activeSection !== SectionId.SERVICES && (
      <motion.div
        layoutId={`card-${SectionId.SERVICES}`}
        className={`${cardClass} bg-blue-50 border-blue-100/50 overflow-hidden`}
        onClick={onClick}
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(#172554 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        ></div>

        <div className="absolute -bottom-6 -right-6 text-blue-100 rotate-[-15deg] opacity-50 pointer-events-none">
          <Globe size={140} />
        </div>

        <div className="p-7 h-full flex flex-col justify-between relative z-10">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
            <Globe size={24} />
          </div>
          <div>
            <h2 className="font-display font-bold text-2xl text-blue-950 tracking-tight">
              {CONSTANTS.services.title}
            </h2>
            <p className="text-blue-800/70 text-sm font-bold mt-1">
              {CONSTANTS.services.category}
            </p>
          </div>
        </div>
      </motion.div>
    )}
  </div>
);
