import React, { useEffect, useRef } from "react";
import { X, ExternalLink, Github } from "lucide-react";
import { Project } from "../types/index";
import { DbProjectData } from "../types/profile";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | DbProjectData | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, project }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen || !project) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4 transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {/* Header / Image */}
        <div className="relative h-64 sm:h-80 bg-stone-100 shrink-0">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-stone-900 hover:bg-white hover:scale-110 transition-all shadow-lg"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 md:p-10 overflow-y-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            {(project as any).tags?.map((tag: string) => (
              <span
                key={tag}
                className="text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-900 px-3 py-1 rounded-lg border border-blue-100"
              >
                {tag}
              </span>
            ))}
          </div>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-stone-900">
            {project.title}
          </h2>

          <p className="text-lg text-stone-600 leading-relaxed mb-10">
            {project.details}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-blue-900 text-white rounded-xl font-bold hover:bg-blue-800 transition-colors shadow-sm shadow-blue-900/20"
              >
                <span>View Live Demo</span>
                <ExternalLink size={18} />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-stone-200 text-stone-900 rounded-xl font-bold hover:border-stone-900 transition-colors"
              >
                <span>Source Code</span>
                <Github size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
