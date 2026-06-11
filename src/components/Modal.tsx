import React, { useEffect, useRef } from "react";
import { X, ExternalLink, Github, Lock } from "lucide-react";
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

  const hasDemo = project.demoUrl && project.demoUrl !== "#" && project.demoUrl !== "";
  const hasRepo = project.repoUrl && project.repoUrl !== "#" && project.repoUrl !== "";

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
        {/* Header / Text Info (No Image) */}
        <div className="relative p-8 md:p-10 bg-gradient-to-br from-stone-50 via-stone-100/30 to-white border-b border-stone-200/40 shrink-0">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 bg-stone-200/50 hover:bg-stone-200 rounded-full flex items-center justify-center text-stone-900 transition-all z-10"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
          
          <div className="flex flex-wrap gap-2 mb-4 pr-12">
            {(project as any).tags?.map((tag: string) => (
              <span
                key={tag}
                className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-900 px-2.5 py-1 rounded-md border border-blue-100"
              >
                {tag}
              </span>
            ))}
          </div>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-900 leading-tight">
            {project.title}
          </h2>
        </div>

        {/* Content */}
        <div className="p-8 md:p-10 overflow-y-auto flex-grow flex flex-col justify-between">
          <div>
            <p className="text-base md:text-lg text-stone-600 leading-relaxed mb-8">
              {project.details}
            </p>

            {/* Private Project Disclaimer */}
            {!hasDemo && !hasRepo && (
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/60 text-stone-500 text-xs md:text-sm mb-6 flex gap-2.5 items-center">
                <Lock size={14} className="text-stone-400 shrink-0" />
                <span>Private Project: Source code and live demo are restricted under NDA.</span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            {hasDemo && (
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
            {hasRepo && (
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
