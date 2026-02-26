import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Github,
  Twitter,
  ArrowUpRight,
  MoveDown,
  ArrowDownLeft,
} from "lucide-react";
import { PROFILE, PROJECTS, SKILLS, CONSTANTS } from "../data/constants";
import { Project } from "../types/index";
import {
  ProfileData,
  DbProjectData,
  DbSkillData,
  DbContactData,
} from "../types/profile";

const SERVICES_LIST = [
  {
    title: "Frontend Arch.",
    description: "Scalable React & Next.js applications",
  },
  { title: "Interaction", description: "WebGL & Framer Motion animations" },
  { title: "Backend Systems", description: "Robust Node.js & Go APIs" },
  {
    title: "Design Systems",
    description: "Consistent, accessible UI libraries",
  },
];

interface MinimalViewProps {
  onSwitch: () => void;
  onSelectProject: (project: Project | DbProjectData) => void;
  profileData?: ProfileData;
  projectsData?: DbProjectData[];
  skillsData?: DbSkillData[];
  contactData?: DbContactData;
}

const MinimalView: React.FC<MinimalViewProps> = ({
  onSwitch,
  onSelectProject,
  profileData,
  projectsData,
  skillsData,
  contactData,
}) => {
  const data = profileData || PROFILE;
  const email = contactData?.email || CONSTANTS.contact.email;

  const marqueeSkills = useMemo(() => {
    const list =
      skillsData && skillsData.length > 0
        ? skillsData.map((s) => s.name)
        : SKILLS.flatMap((s) => s.skills);
    return [...list, ...list, ...list];
  }, [skillsData]);

  const pData = useMemo(
    () => (projectsData && projectsData.length > 0 ? projectsData : PROJECTS),
    [projectsData],
  );

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-stone-900 selection:bg-stone-900 selection:text-white overflow-x-hidden relative">
      {/* Navigation - Fixed & Visible */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 md:p-8 flex justify-between items-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pointer-events-auto bg-white/80 backdrop-blur-xl px-4 py-2 rounded-full border border-stone-100 shadow-sm"
        >
          <span className="font-display font-bold text-xl tracking-tight text-stone-900">
            N.
          </span>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <motion.header
        className="min-h-screen flex flex-col justify-center px-4 md:px-10 max-w-[1600px] mx-auto relative pt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="w-12 h-12 rounded-full overflow-hidden border border-stone-200 shadow-inner"
            >
              <img
                src="/avatar-macbook.png"
                alt="Avatar"
                className="w-full h-full object-contain scale-150"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col"
            >
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-stone-400">
                  Online
                </span>
              </div>
              <span className="text-sm font-medium text-stone-900">
                San Francisco, CA
              </span>
            </motion.div>
          </div>

          <h1 className="font-display font-medium text-[14vw] md:text-[11vw] leading-[0.85] tracking-tighter text-stone-900 -ml-[0.05em]">
            Creative <br />
            <span className="text-stone-300 ml-[0.5em] italic">Developer</span>
          </h1>
        </div>

        <div className="absolute bottom-10 left-4 md:left-10 right-4 md:right-10 flex flex-col md:flex-row justify-between items-end gap-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="hidden md:flex items-center gap-3 text-stone-400 animate-bounce"
          >
            <MoveDown size={20} />
          </motion.div>

          <p className="text-lg md:text-2xl text-stone-600 leading-snug font-medium max-w-lg md:text-right">
            {data.bio}
          </p>
        </div>
      </motion.header>

      {/* Marquee Section */}
      <div className="py-20 border-y border-stone-100 bg-white overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-20 md:w-60 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-20 md:w-60 bg-gradient-to-l from-white to-transparent z-10"></div>

        <div className="flex whitespace-nowrap w-max animate-marquee">
          {marqueeSkills.map((skill, i) => (
            <div key={i} className="flex items-center mx-8 md:mx-16 opacity-30">
              <span className="text-6xl md:text-8xl font-display font-bold text-stone-900 uppercase tracking-tighter">
                {skill}
              </span>
              <span className="ml-16 md:ml-32 text-4xl md:text-6xl text-stone-300">
                ✦
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Capabilities Section */}
      <section className="py-32 px-4 md:px-10 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
          <div className="md:col-span-4 sticky top-32 h-fit">
            <h2 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4 flex items-center gap-2">
              <span className="w-8 h-px bg-stone-300"></span>
              Capabilities
            </h2>
            <p className="text-2xl font-display font-medium leading-tight text-stone-900 max-w-xs">
              Comprehensive digital solutions from concept to code.
            </p>
          </div>
          <div className="md:col-span-8 flex flex-col gap-px bg-stone-100 border border-stone-100 rounded-3xl overflow-hidden">
            {SERVICES_LIST.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-8 md:p-12 hover:bg-stone-50 transition-colors duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 group"
              >
                <div>
                  <h3 className="text-3xl md:text-5xl font-display font-medium text-stone-900 mb-2 group-hover:translate-x-2 transition-transform duration-300">
                    {service.title}
                  </h3>
                  <p className="text-stone-400 group-hover:text-stone-600 transition-colors">
                    {service.description}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full border border-stone-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white">
                  <ArrowRight
                    size={20}
                    className="-rotate-45 group-hover:rotate-0 transition-transform duration-300"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Work */}
      <section className="bg-stone-900 text-stone-100 py-32 rounded-[3rem] mx-2 md:mx-4">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-24 border-b border-white/10 pb-12">
            <h2 className="text-[12vw] md:text-[8vw] font-display font-bold leading-none tracking-tighter text-white">
              Works
            </h2>
            <div className="flex items-center gap-3 mb-2 md:mb-6">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-stone-900 bg-stone-700"></div>
                <div className="w-10 h-10 rounded-full border-2 border-stone-900 bg-stone-600"></div>
                <div className="w-10 h-10 rounded-full border-2 border-stone-900 bg-stone-500 flex items-center justify-center text-xs font-bold">
                  5+
                </div>
              </div>
              <span className="text-sm font-bold uppercase tracking-widest text-stone-400">
                Selected Projects
              </span>
            </div>
          </div>

          <div className="flex flex-col">
            {pData.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                className="group py-16 border-b border-white/10 cursor-pointer relative"
                onClick={() => onSelectProject(project)}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
                  <div className="md:col-span-1 text-stone-500 font-display text-xl">
                    0{index + 1}
                  </div>
                  <div className="md:col-span-6">
                    <h3 className="text-4xl md:text-7xl font-display font-bold text-white mb-4 group-hover:text-stone-300 transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex gap-2">
                      {project.tags &&
                        project.tags.slice(0, 3).map((tag: string) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-full border border-white/20 text-xs text-stone-400 uppercase tracking-wider"
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                  </div>
                  <div className="md:col-span-5 md:flex justify-end hidden">
                    <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-stone-900 transition-all duration-300 transform group-hover:scale-110">
                      <ArrowUpRight size={24} />
                    </div>
                  </div>
                </div>

                {/* Hover Image Reveal */}
                <div className="hidden md:block absolute top-1/2 right-[10%] -translate-y-1/2 w-[400px] aspect-[4/3] rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0 rotate-3 group-hover:rotate-6 scale-90 group-hover:scale-100">
                  <img
                    src={project.imageUrl}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-40 pb-12 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-32">
          <div>
            <h2 className="text-[10vw] font-display font-bold leading-[0.9] tracking-tighter mb-8 text-stone-900">
              Let's <br /> Connect.
            </h2>
          </div>
          <div className="flex flex-col justify-end items-start md:items-end gap-10">
            <p className="text-stone-500 text-xl md:text-right max-w-md leading-relaxed">
              Currently available for freelance projects and open to full-time
              opportunities.
            </p>
            <a
              href={`mailto:${email}`}
              className="group flex items-center gap-4 text-3xl md:text-5xl font-display font-bold text-stone-900 hover:text-stone-500 transition-colors"
            >
              <span>{email}</span>
              <ArrowDownLeft
                className="group-hover:rotate-180 transition-transform duration-500"
                size={40}
              />
            </a>
            <div className="flex gap-4">
              {[
                { icon: Twitter, href: "#" },
                { icon: Github, href: "#" },
              ].map((Item, i) => (
                <a
                  key={i}
                  href={Item.href}
                  className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-900 hover:bg-stone-900 hover:text-white transition-all duration-300"
                >
                  <Item.icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs md:text-sm text-stone-400 font-bold uppercase tracking-widest pt-8 border-t border-stone-200">
          <p>© {new Date().getFullYear()} Nirav. Stay Tuned.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <span className="hover:text-stone-900 cursor-pointer transition-colors">
              Linkedin
            </span>
            <span className="hover:text-stone-900 cursor-pointer transition-colors">
              Twitter
            </span>
            <span className="hover:text-stone-900 cursor-pointer transition-colors">
              Instagram
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MinimalView;
