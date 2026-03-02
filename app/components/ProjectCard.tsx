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
        <div className="card card-interactive group flex flex-col h-full">
            {/* Top gradient banner */}
            <div
                className="relative h-40 flex items-center justify-center overflow-hidden flex-shrink-0"
                style={{ background: project.color }}
            >
                {/* Decorative pattern overlay */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255,255,255,0.3) 0%, transparent 50%),
                              radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
                    }}
                />

                {/* Project title inside banner */}
                <h3
                    className="relative z-10 text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-md"
                    style={{ textShadow: "0 2px 12px rgba(0,0,0,0.2)" }}
                >
                    {project.title}
                </h3>

                {/* Hover links */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 z-10">
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-8 h-8 rounded-full transition-transform hover:scale-110"
                            style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", color: "#fff" }}
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
                            style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", color: "#fff" }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ArrowUpRight size={13} />
                        </a>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-5 gap-3">
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
