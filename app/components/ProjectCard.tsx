"use client";

import { ArrowUpRight, Github } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  screenshots: string[];
  color: string;
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className="card card-interactive group flex flex-col h-full cursor-pointer"
      onClick={() => project.github && window.open(project.github, "_blank")}
    >
      {/* Top gradient banner */}
      <div
        className="relative h-44 flex items-center justify-center overflow-hidden flex-shrink-0"
        style={{ background: project.color }}
      >
        {/* Subtle inner pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 15% 85%, rgba(255,255,255,0.25) 0%, transparent 45%),
                              radial-gradient(circle at 85% 15%, rgba(255,255,255,0.15) 0%, transparent 45%)`,
          }}
        />

        {/* Hover dark overlay */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

        {/* Project title */}
        <h3
          className="relative z-10 text-xl sm:text-2xl font-bold tracking-tight text-white px-6 text-center"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.25)" }}
        >
          {project.title}
        </h3>

        {/* Hover action icons */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 z-10">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 rounded-full transition-transform hover:scale-110"
              style={{
                background: "rgba(0,0,0,0.45)",
                backdropFilter: "blur(8px)",
                color: "#fff",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={13} />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 rounded-full transition-transform hover:scale-110"
              style={{
                background: "rgba(0,0,0,0.45)",
                backdropFilter: "blur(8px)",
                color: "#fff",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <ArrowUpRight size={13} />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--text-secondary)" }}>
          {project.description}
        </p>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-lg text-[11px] font-medium"
              style={{
                background: "var(--accent-muted)",
                color: "var(--text-secondary)",
                border: "1px solid var(--border)",
              }}
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span
              className="px-2.5 py-1 rounded-lg text-[11px] font-medium"
              style={{ color: "var(--text-tertiary)" }}
            >
              +{project.tech.length - 4} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
