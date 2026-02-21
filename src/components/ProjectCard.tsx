
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../types/index';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  return (
    <div
      className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-stone-200/60 flex flex-col h-full"
      onClick={() => onSelect(project)}
    >
      {/* Image Area */}
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
        <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-stone-900 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-sm">
          <ArrowUpRight size={20} />
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] font-bold uppercase tracking-wider bg-stone-100 text-stone-600 px-2 py-1 rounded-md border border-stone-200">
              {tag}
            </span>
          ))}
        </div>
        
        <h3 className="text-xl font-bold tracking-tight mb-2 text-stone-900 group-hover:text-blue-900 transition-colors">
          {project.title}
        </h3>
        
        <p className="text-stone-500 text-sm line-clamp-2 leading-relaxed mb-4">
          {project.description}
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
