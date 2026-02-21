import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Github,
  ExternalLink,
  ArrowRight,
  MapPin,
  Layers,
  Mail,
  Filter,
  Globe,
  Code,
  Cpu,
} from "lucide-react";
import { PROFILE, SKILLS, PROJECTS } from "../data/constants";
import { SectionId, Project } from "../types/index";
import ProjectCard from "./ProjectCard";

interface DetailViewProps {
  id: string;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

const DetailView: React.FC<DetailViewProps> = ({
  id,
  onClose,
  onSelectProject,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    PROJECTS.forEach((project) => project.tags.forEach((tag) => tags.add(tag)));
    return ["All", ...Array.from(tags)];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return PROJECTS;
    return PROJECTS.filter((project) => project.tags.includes(activeFilter));
  }, [activeFilter]);

  // Content Components
  const renderContent = () => {
    switch (id) {
      case SectionId.ABOUT:
        return (
          <div className="max-w-3xl mx-auto pt-12 pb-24 px-8 md:px-0">
            <div className="mb-10 text-center">
              <div className="inline-block w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl mb-6">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${PROFILE.name}&backgroundColor=b6e3f4`}
                  alt="Avatar"
                  className="w-full h-full"
                />
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-stone-900 mb-2">
                {PROFILE.name}
              </h1>
              <p className="text-lg text-stone-500 font-medium">
                {PROFILE.tagline}
              </p>
            </div>

            <div className="prose prose-lg prose-stone mx-auto">
              <p className="leading-relaxed text-stone-600">{PROFILE.bio}</p>
              <p className="leading-relaxed text-stone-600 mt-4">
                I believe in the web as a platform for creativity and utility.
                My journey started with simple HTML pages and has evolved into
                complex distributed systems. I care deeply about performance,
                accessibility, and developer experience.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-4">
              <div className="p-6 bg-stone-50 rounded-2xl border border-stone-100 text-center">
                <h3 className="font-bold text-stone-900 mb-1">5+ Years</h3>
                <p className="text-xs text-stone-500 uppercase tracking-wider">
                  Experience
                </p>
              </div>
              <div className="p-6 bg-stone-50 rounded-2xl border border-stone-100 text-center">
                <h3 className="font-bold text-stone-900 mb-1">50+</h3>
                <p className="text-xs text-stone-500 uppercase tracking-wider">
                  Projects
                </p>
              </div>
            </div>
          </div>
        );

      case SectionId.PROJECTS:
        return (
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="pt-10 pb-6 px-6 md:px-12 sticky top-0 z-20 bg-[#f0f0f0]/80 backdrop-blur-xl border-b border-stone-200/50">
              <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h2 className="text-3xl font-display font-bold text-stone-900">
                    Selected Work
                  </h2>
                  <p className="text-stone-500 text-sm mt-1">
                    A curated list of projects
                  </p>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-1">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setActiveFilter(tag)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all border whitespace-nowrap ${
                        activeFilter === tag
                          ? "bg-stone-900 text-white border-stone-900 shadow-lg shadow-stone-900/20"
                          : "bg-white border-stone-200 text-stone-500 hover:border-stone-400 hover:text-stone-900"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto p-4 md:p-10 bg-[#f0f0f0]">
              <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-32">
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project, i) => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                    >
                      <ProjectCard
                        project={project}
                        onSelect={onSelectProject}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        );

      case SectionId.SKILLS:
        return (
          <div className="max-w-4xl mx-auto pt-16 pb-24 px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-blue-950 mb-4">
                Technical Stack
              </h2>
              <p className="text-blue-900/60 text-lg">
                Tools and technologies I work with
              </p>
            </div>

            <div className="grid gap-6">
              {SKILLS.map((category, idx) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-3xl p-8 border border-blue-100 shadow-sm flex flex-col md:flex-row md:items-center gap-6"
                >
                  <div className="md:w-1/3 shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-4">
                      {idx === 0 ? (
                        <Code size={24} />
                      ) : idx === 1 ? (
                        <Cpu size={24} />
                      ) : (
                        <Layers size={24} />
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-blue-950">
                      {category.name}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2 flex-1">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 bg-blue-50 text-blue-900 rounded-lg font-medium text-sm border border-blue-100"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case SectionId.SERVICES:
        return (
          <div className="max-w-5xl mx-auto pt-16 pb-24 px-6 md:px-12 text-blue-950">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Services
              </h2>
              <p className="text-blue-800/70 text-lg max-w-2xl mx-auto">
                Specialized in building high-quality web applications.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Full Stack E-Commerce",
                  desc: "End-to-end scalable platforms using Next.js, MedusaJS, and Stripe integrations.",
                  icon: <Globe size={20} />,
                },
                {
                  title: "Backend Architecture",
                  desc: "Robust API design and database management using PostgreSQL and Supabase.",
                  icon: <Cpu size={20} />,
                },
                {
                  title: "CMS Integration",
                  desc: "Setting up tailored headless CMS solutions using Payload CMS and Strapi.",
                  icon: <Layers size={20} />,
                },
                {
                  title: "Workflow Automation",
                  desc: "Streamlining business processes and data syncing with custom n8n automations.",
                  icon: <Code size={20} />,
                },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-8 rounded-[2rem] border border-blue-100/50 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all"
                >
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 border border-blue-100">
                    {s.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                  <p className="text-stone-500 leading-relaxed text-sm">
                    {s.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case SectionId.CONTACT:
        return (
          <div className="h-full flex flex-col items-center justify-center p-8 md:p-12 text-center bg-stone-100 text-stone-900 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-white rounded-full blur-3xl opacity-60"></div>
              <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-stone-200/30 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-2xl w-full relative z-10">
              <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight text-stone-900">
                Let's Work <br /> Together.
              </h2>
              <p className="text-xl text-stone-500 mb-12 leading-relaxed font-medium">
                Available for freelance projects and open to full-time
                opportunities.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="w-full sm:w-auto px-8 py-4 bg-stone-900 text-white rounded-full font-bold text-lg hover:bg-stone-800 transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95 shadow-xl shadow-stone-900/20"
                >
                  <Mail size={20} />
                  Send Email
                </a>
                <button className="w-full sm:w-auto px-8 py-4 bg-white text-stone-900 border border-stone-200 rounded-full font-bold text-lg hover:bg-stone-50 transition-all flex items-center justify-center gap-2 hover:border-stone-300">
                  Copy Email
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Determine background color
  const getBgColor = () => {
    switch (id) {
      case SectionId.SKILLS:
        return "bg-[#eff6ff]"; // blue-50
      case SectionId.SERVICES:
        return "bg-[#eff6ff]"; // blue-50
      case SectionId.CONTACT:
        return "bg-stone-100";
      case SectionId.PROJECTS:
        return "bg-[#f0f0f0]";
      default:
        return "bg-white";
    }
  };

  const contentClasses =
    id === SectionId.PROJECTS || id === SectionId.CONTACT ? "h-full" : "";

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Dialog / Sheet Container */}
      <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center pointer-events-none p-0 md:p-8">
        <motion.div
          layoutId={`card-${id}`}
          className={`pointer-events-auto relative w-full md:max-w-5xl h-[85vh] md:h-[85vh] 
            rounded-t-[2.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl 
            ${getBgColor()}`}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Drag Handle (Mobile Visual Only) */}
          <div className="absolute top-0 left-0 right-0 h-6 flex items-center justify-center md:hidden z-[70] pointer-events-none">
            <div className="w-12 h-1.5 bg-black/10 rounded-full"></div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className={`absolute top-6 right-6 z-[60] w-10 h-10 rounded-full flex items-center justify-center transition-colors
                ${
                  id === SectionId.CONTACT
                    ? "bg-stone-200/50 text-stone-900 hover:bg-stone-200"
                    : "bg-black/5 text-stone-900 hover:bg-black/10"
                }`}
          >
            <X size={20} />
          </button>

          {/* Scrollable Content */}
          <motion.div
            className={`w-full h-full overflow-y-auto overflow-x-hidden scroll-smooth ${contentClasses}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default DetailView;
