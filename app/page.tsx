"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  MapPin,
  Code2,
  Cpu,
  Layers,
  Zap,
  Home as HomeIcon,
  Briefcase,
  FolderGit2,
  MessageCircle,
  Sun,
  Moon,
  ExternalLink,
  User,
} from "lucide-react";
import InfiniteTicker from "./components/InfiniteTicker";
import ProjectCard from "./components/ProjectCard";
import GitHubGraph from "./components/GitHubGraph";

/* ─── Data ────────────────────────────────────────────────────────────────── */
const TECH_ROW1 = [
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "TypeScript", icon: "🔷" },
  { name: "Node.js", icon: "🟢" },
  { name: "Python", icon: "🐍" },
  { name: "FastAPI", icon: "⚡" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "MongoDB", icon: "🍃" },
  { name: "Redis", icon: "🔴" },
  { name: "Prisma", icon: "💠" },
  { name: "Tailwind CSS", icon: "🎨" },
  { name: "Docker", icon: "🐳" },
  { name: "AWS S3", icon: "☁️" },
  { name: "WebSockets", icon: "🔌" },
  { name: "C++", icon: "⚙️" },
  { name: "Java", icon: "☕" },
];

const TECH_ROW2 = [
  { name: "PyTorch", icon: "🔥" },
  { name: "TensorFlow", icon: "🧠" },
  { name: "OpenCV", icon: "👁️" },
  { name: "YOLOv8", icon: "🎯" },
  { name: "Firebase", icon: "🔥" },
  { name: "XGBoost", icon: "📈" },
  { name: "GSAP", icon: "✨" },
  { name: "Framer Motion", icon: "🎭" },
  { name: "Redux", icon: "🔄" },
  { name: "Express.js", icon: "🚂" },
  { name: "Clerk", icon: "🔐" },
  { name: "ShadCN UI", icon: "🎁" },
  { name: "ElevenLabs", icon: "🎙️" },
  { name: "Gemini AI", icon: "🤖" },
  { name: "MySQL", icon: "🐬" },
  { name: "NetworkX", icon: "🕸️" },
];

const PROJECTS = [
  {
    title: "Orchestr-AI",
    description:
      "AI-native project management with dependency brain, risk scoring, predictive analytics (XGBoost + Prophet), and LLM-driven sprint automation.",
    tech: ["React", "Node.js", "FastAPI", "PostgreSQL", "Gemini", "XGBoost", "Prophet"],
    github: "https://github.com/utkarshpushpankar",
    demo: "",
    screenshots: [],
    color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    title: "VocalHire",
    description:
      "Real-time AI voice interview platform — Deepgram STT, ElevenLabs TTS, Gemini scoring across 5 categories with detailed analysis.",
    tech: ["Next.js", "TypeScript", "Firebase", "Vapi.ai", "Deepgram", "ElevenLabs"],
    github: "https://github.com/utkarshpushpankar",
    demo: "",
    screenshots: [],
    color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    title: "Women Safety Analytics",
    description:
      "Real-time CV system — fine-tuned YOLOv8 for person detection + ResNet50 for gender classification at 81% accuracy on live video.",
    tech: ["Python", "PyTorch", "YOLOv8", "ResNet50", "OpenCV"],
    github: "https://github.com/utkarshpushpankar",
    demo: "",
    screenshots: [],
    color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    title: "AgriConnect",
    description:
      "AI crop monitoring — 92.5% classification accuracy, pest detection, NDVI indices, and geospatial heatmaps via React Leaflet.",
    tech: ["React", "Node.js", "Flask", "TensorFlow", "OpenCV"],
    github: "https://github.com/utkarshpushpankar",
    demo: "",
    screenshots: [],
    color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  },
];

const SOCIALS = [
  { icon: Github, label: "GitHub", href: "https://github.com/utkarshpushpankar" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/utkarshpushpankar" },
  { icon: Mail, label: "Email", href: "mailto:utkarshpushpankar@gmail.com" },
];

const HIGHLIGHTS = [
  { icon: Layers, label: "Production Scale", value: "450+ Law Firms", sub: "Claw LegalTech platform" },
  { icon: Cpu, label: "AI/ML Systems", value: "5+ AI Projects", sub: "YOLOv8 to LLM pipelines" },
  { icon: Zap, label: "Real-time", value: "WebSockets & Voice", sub: "Dual-canvas, live voice AI" },
  { icon: Code2, label: "Ownership", value: "End-to-End", sub: "Liquid Text in 3–4 weeks" },
];

const DOCK_ITEMS = [
  { icon: HomeIcon, href: "#hero", label: "Home" },
  { icon: User, href: "#about", label: "About" },
  { icon: Briefcase, href: "#experience", label: "Experience" },
  { icon: FolderGit2, href: "#projects", label: "Projects" },
  { icon: MessageCircle, href: "#contact", label: "Contact" },
];

/* ─── Animation Variants ──────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: "easeOut" as const },
  }),
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

/* ─── Helpers ─────────────────────────────────────────────────────────── */
function TechChip({ name, icon }: { name: string; icon: string }) {
  return (
    <div className="tech-chip">
      <span className="text-base leading-none">{icon}</span>
      <span className="text-[13px] font-medium" style={{ color: "var(--text-primary)" }}>{name}</span>
    </div>
  );
}

/* ─── Page Component ──────────────────────────────────────────────────── */
export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted && theme === "dark";

  return (
    <div className="min-h-screen w-full pb-24" style={{ background: "var(--bg)" }}>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* HERO SECTION                                                  */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section id="hero" className="max-w-5xl mx-auto px-5 pt-16 pb-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-12 gap-4"
        >
          {/* ── Main Hero Card ─────────────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            custom={0}
            className="card md:col-span-8 p-8 relative overflow-hidden"
          >
            {/* Decorative gradient blob */}
            <div
              className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}
            />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-5">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                  style={{ background: "var(--active-badge)", color: "var(--active-text)" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" /> Available for work
                </span>
              </div>

              <h1
                className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Hi, I&apos;m{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Utkarsh
                </span>
              </h1>

              <p
                className="text-lg leading-relaxed mb-6 max-w-xl"
                style={{ color: "var(--text-secondary)" }}
              >
                Full-Stack Engineer building{" "}
                <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>AI-native products</strong> and{" "}
                <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>real-time systems</strong> that ship
                to production. Currently scaling a platform serving 450+ law firms.
              </p>

              <div className="flex items-center gap-3 flex-wrap">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={{ background: "var(--text-primary)", color: "var(--bg)" }}
                >
                  View Projects <ArrowUpRight size={14} />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: "var(--accent-muted)",
                    color: "var(--text-primary)",
                    border: "1px solid var(--border-strong)",
                  }}
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </motion.div>

          {/* ── Side Info Cards ───────────────────────────────────── */}
          <div className="md:col-span-4 flex flex-col gap-4">
            {/* Location / Education card */}
            <motion.div
              variants={fadeUp}
              custom={0.1}
              className="card p-5 flex-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-3" style={{ color: "var(--text-tertiary)" }}>
                  <MapPin size={13} />
                  <span className="text-xs font-medium">India · Open to Remote</span>
                </div>
                <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
                  Bennett University
                </p>
                <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                  B.Tech CS · CGPA 9.41/10
                </p>
                <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                  Class of 2027
                </p>
              </div>
              <div className="mt-4 flex items-baseline gap-1.5">
                <span
                  className="text-3xl font-bold tracking-tight"
                  style={{
                    background: "linear-gradient(135deg, #667eea, #764ba2)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  1.5+
                </span>
                <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                  years shipping production code
                </span>
              </div>
            </motion.div>

            {/* Socials card */}
            <motion.div
              variants={fadeUp}
              custom={0.2}
              className="card p-5"
            >
              <p className="text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--text-tertiary)" }}>
                Connect
              </p>
              <div className="flex flex-col gap-2">
                {SOCIALS.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={label === "Email" ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 group hover:scale-[1.01]"
                    style={{
                      background: "var(--accent-muted)",
                      border: "1px solid var(--border)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    <Icon size={15} strokeWidth={1.8} />
                    <span className="text-xs font-medium flex-1">{label}</span>
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-1 group-hover:translate-x-0"
                      style={{ color: "var(--text-tertiary)" }}
                    />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* TECH STACK — Infinite Ticker                                  */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-5 pb-4">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="card py-6"
        >
          <div className="flex items-center justify-between px-6 mb-4">
            <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: "var(--text-tertiary)" }}>
              Tech Stack
            </p>
            <p className="text-[11px]" style={{ color: "var(--text-tertiary)" }}>
              Tools I love to use
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <InfiniteTicker direction="x">
              <div className="flex items-center">
                {TECH_ROW1.map((t) => (
                  <TechChip key={t.name} {...t} />
                ))}
              </div>
            </InfiniteTicker>
            <InfiniteTicker direction="x-reverse">
              <div className="flex items-center">
                {TECH_ROW2.map((t) => (
                  <TechChip key={t.name} {...t} />
                ))}
              </div>
            </InfiniteTicker>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* HIGHLIGHTS ROW                                                */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section id="about" className="max-w-5xl mx-auto px-5 pb-4">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {HIGHLIGHTS.map(({ icon: Icon, label, value, sub }, i) => (
            <motion.div
              key={label}
              variants={fadeUp}
              custom={i * 0.05}
              className="card card-interactive p-5 flex flex-col gap-3 cursor-default"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "var(--accent-muted)",
                  border: "1px solid var(--border)",
                }}
              >
                <Icon size={18} style={{ color: "var(--text-primary)" }} strokeWidth={1.6} />
              </div>
              <div>
                <p className="text-lg font-bold tracking-tight leading-tight" style={{ color: "var(--text-primary)" }}>
                  {value}
                </p>
                <p className="text-[11px] mt-1" style={{ color: "var(--text-tertiary)" }}>
                  {sub}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* WORK EXPERIENCE                                               */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section id="experience" className="max-w-5xl mx-auto px-5 pb-4">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="card p-6 sm:p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: "var(--text-tertiary)" }}>
              Work Experience
            </p>
            <Briefcase size={15} style={{ color: "var(--text-tertiary)" }} />
          </div>

          <div className="flex gap-4">
            {/* Timeline line */}
            <div className="flex flex-col items-center pt-1.5">
              <div className="timeline-dot active" style={{ background: "var(--accent-green)" }} />
              <div className="w-px flex-1 my-2" style={{ background: "var(--border-strong)" }} />
              <div className="timeline-dot" style={{ background: "var(--border-strong)" }} />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-6 flex-1 min-w-0">
              {/* Claw */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                  <div>
                    <h3 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
                      Next.js + TypeScript Engineer
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Claw LegalTech</span>
                      <span
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                        style={{ background: "var(--active-badge)", color: "var(--active-text)" }}
                      >
                        Active
                      </span>
                    </div>
                  </div>
                  <span className="text-xs flex-shrink-0 mt-1 sm:mt-0" style={{ color: "var(--text-tertiary)" }}>
                    Aug 2025 – Present
                  </span>
                </div>

                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                  Sole frontend developer scaling a production platform serving <strong style={{ color: "var(--text-primary)" }}>450+ law firms</strong> and{" "}
                  <strong style={{ color: "var(--text-primary)" }}>100+ paid customers</strong>. Built centralized Redux state management,
                  scaled architecture across 15+ core features, and optimized performance with debouncing, memoization, and code splitting.
                </p>

                {/* Liquid Text Feature Box */}
                <div className="highlight-box">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm">🚀</span>
                    <h4 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                      Flagship: Liquid Text
                    </h4>
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                      style={{
                        background: "linear-gradient(135deg, rgba(102,126,234,0.1), rgba(118,75,162,0.1))",
                        color: isDark ? "#a78bfa" : "#7c3aed",
                        border: "1px solid rgba(139,92,246,0.2)",
                      }}
                    >
                      Full-Stack
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    Architected and shipped a standalone PDF annotation engine in 3–4 weeks — dual-canvas sync,
                    infinite canvas drawing, threaded annotations, stylus/touch support, bounding-box mapping, and persistent
                    storage via Node.js + MongoDB.
                  </p>
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
                  B.Tech Computer Science
                </h3>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    Bennett University · CGPA 9.41/10
                  </span>
                  <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                    2023 – 2027
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* GITHUB ACTIVITY                                               */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-5 pb-4">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <Github size={16} style={{ color: "var(--text-secondary)" }} />
              <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: "var(--text-tertiary)" }}>
                GitHub Activity
              </p>
            </div>
            <a
              href="https://github.com/utkarshpushpankar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs transition-all hover:opacity-70"
              style={{ color: "var(--text-tertiary)" }}
            >
              @utkarshpushpankar <ExternalLink size={11} />
            </a>
          </div>
          <GitHubGraph username="utkarshpushpankar" isDark={isDark} />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* FEATURED PROJECTS                                             */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section id="projects" className="max-w-5xl mx-auto px-5 pb-4">
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="flex items-center justify-between mb-4 px-1"
        >
          <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: "var(--text-tertiary)" }}>
            Featured Projects
          </p>
          <p className="text-[11px]" style={{ color: "var(--text-tertiary)" }}>
            From scalable webapps to AI systems
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {PROJECTS.map((project, i) => (
            <motion.div key={project.title} variants={fadeUp} custom={i * 0.05}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* CONTACT                                                       */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section id="contact" className="max-w-5xl mx-auto px-5 pb-8">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="card p-10 text-center flex flex-col items-center gap-5 relative overflow-hidden"
        >
          {/* Decorative blobs */}
          <div
            className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full blur-3xl opacity-10 pointer-events-none"
            style={{ background: "linear-gradient(135deg, #667eea, #764ba2)" }}
          />
          <div
            className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl opacity-10 pointer-events-none"
            style={{ background: "linear-gradient(135deg, #f093fb, #f5576c)" }}
          />

          <div className="relative z-10 flex flex-col items-center gap-5">
            <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: "var(--text-tertiary)" }}>
              Get in Touch
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Let&apos;s Build Something
            </h2>
            <p
              className="text-sm leading-relaxed max-w-md"
              style={{ color: "var(--text-secondary)" }}
            >
              Open to full-time roles, internships, and interesting engineering challenges.
              I ship fast, own features end-to-end, and care about the product.
            </p>
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <a
                href="mailto:utkarshpushpankar@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
                style={{ background: "var(--text-primary)", color: "var(--bg)" }}
              >
                <Mail size={15} /> Send Email
              </a>
              <a
                href="https://linkedin.com/in/utkarshpushpankar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
                style={{
                  background: "var(--accent-muted)",
                  border: "1px solid var(--border-strong)",
                  color: "var(--text-primary)",
                }}
              >
                <Linkedin size={15} /> LinkedIn
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <p className="text-center text-[11px] pb-20" style={{ color: "var(--text-tertiary)" }}>
        Designed & built by Utkarsh Pushpankar · 2025
      </p>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* FLOATING DOCK                                                 */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {mounted && (
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="floating-dock"
        >
          {DOCK_ITEMS.map(({ icon: Icon, href, label }, i) => (
            <a key={label} href={href} className="dock-item" title={label}>
              <Icon size={16} strokeWidth={1.6} />
            </a>
          ))}
          <div className="dock-divider" />
          {SOCIALS.map(({ icon: Icon, label, href }) => (
            <a key={label} href={href} target={label === "Email" ? undefined : "_blank"} rel="noopener noreferrer" className="dock-item" title={label}>
              <Icon size={15} strokeWidth={1.6} />
            </a>
          ))}
          <div className="dock-divider" />
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="dock-item"
            title="Toggle theme"
          >
            {isDark ? <Sun size={15} strokeWidth={1.6} /> : <Moon size={15} strokeWidth={1.6} />}
          </button>
        </motion.div>
      )}
    </div>
  );
}
