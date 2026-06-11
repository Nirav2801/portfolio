import React, { memo } from "react";
import { ArrowUpRight, Lock, Globe, FileCode } from "lucide-react";
import { Project } from "../types/index";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = memo(
  ({ project, onSelect }) => {
    const hasDemo = project.demoUrl && project.demoUrl !== "#" && project.demoUrl !== "";
    const hasRepo = project.repoUrl && project.repoUrl !== "#" && project.repoUrl !== "";

    return (
      <div
        className="group relative bg-gradient-to-br from-white to-stone-50/50 rounded-[2rem] p-6 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1.5 cursor-pointer border border-stone-200/60 hover:border-stone-300/80 flex flex-col justify-between h-full min-h-[250px] md:min-h-[270px] overflow-hidden"
        onClick={() => onSelect(project)}
      >
        {/* Background micro-grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e5e5_1.2px,transparent_1.2px)] [background-size:16px_16px] opacity-[0.12] group-hover:opacity-25 transition-opacity duration-500 pointer-events-none z-0"></div>
        
        {/* Glowing top linear border accent */}
        <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-blue-500 via-indigo-500 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>

        <div className="relative z-10 flex-grow flex flex-col">
          {/* Mock Terminal Header */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-100/80">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-stone-200/80 group-hover:bg-red-400/80 transition-colors duration-300"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-stone-200/80 group-hover:bg-yellow-400/80 transition-colors duration-300"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-stone-200/80 group-hover:bg-green-400/80 transition-colors duration-300"></span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider text-stone-400 uppercase font-bold">
              <FileCode size={11} className="text-stone-300 group-hover:text-blue-500 transition-colors duration-300" />
              <span>module.sys</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-mono font-bold tracking-tight bg-stone-100/60 text-stone-500 px-2 py-0.5 rounded-md border border-stone-200/30 group-hover:bg-blue-50 group-hover:text-blue-900 group-hover:border-blue-100/50 transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold tracking-tight mb-2.5 text-stone-900 group-hover:text-blue-950 transition-colors duration-300">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-stone-500 text-sm leading-relaxed line-clamp-3 md:line-clamp-4 group-hover:text-stone-700 transition-colors duration-300 flex-grow">
            {project.description}
          </p>
        </div>

        {/* Footer */}
        <div className="relative z-10 mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {hasDemo || hasRepo ? (
              <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50/80 px-2 py-0.5 rounded-full border border-blue-100/60 shadow-sm">
                <Globe size={10} />
                Open Source
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-wider text-stone-500 bg-stone-100/60 px-2.5 py-0.5 rounded-full border border-stone-200/80 shadow-sm">
                <Lock size={9} className="text-stone-400" />
                Private
              </span>
            )}
          </div>
          
          <div className="w-8 h-8 rounded-full bg-stone-50 text-stone-900 flex items-center justify-center group-hover:bg-stone-950 group-hover:text-white group-hover:scale-105 transition-all duration-300 shadow-sm">
            <ArrowUpRight size={15} className="group-hover:translate-x-[1px] group-hover:-translate-y-[1px] transition-transform duration-300" />
          </div>
        </div>
      </div>
    );
  },
);

export default ProjectCard;
