"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  MapPin,
  Home as HomeIcon,
  Briefcase,
  FolderGit2,
  MessageCircle,
  Sun,
  Moon,
  ExternalLink,
  User,
  Terminal,
  Brain,
  Globe,
  Database,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import InfiniteTicker from "./components/InfiniteTicker";
import ProjectCard from "./components/ProjectCard";
import GitHubGraph from "./components/GitHubGraph";

/* â”€â”€â”€ Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const TECH_ROW1 = [
  { name: "React" },
  { name: "Next.js" },
  { name: "TypeScript" },
  { name: "Node.js" },
  { name: "Python" },
  { name: "FastAPI" },
  { name: "PostgreSQL" },
  { name: "MongoDB" },
  { name: "Redis" },
  { name: "Prisma" },
  { name: "Tailwind CSS" },
  { name: "Docker" },
  { name: "AWS S3" },
  { name: "WebSockets" },
  { name: "C++" },
  { name: "Java" },
];

const TECH_ROW2 = [
  { name: "PyTorch" },
  { name: "TensorFlow" },
  { name: "OpenCV" },
  { name: "YOLOv8" },
  { name: "Firebase" },
  { name: "XGBoost" },
  { name: "GSAP" },
  { name: "Framer Motion" },
  { name: "Redux" },
  { name: "Express.js" },
  { name: "Clerk" },
  { name: "ShadCN UI" },
  { name: "ElevenLabs" },
  { name: "Gemini AI" },
  { name: "MySQL" },
  { name: "NetworkX" },
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
    color: "linear-gradient(135deg, #0284c7 0%, #0f766e 100%)",
  },
  {
    title: "VocalHire",
    description:
      "Real-time AI voice interview platform â€” Deepgram STT, ElevenLabs TTS, Gemini scoring across 5 categories with detailed analysis.",
    tech: ["Next.js", "TypeScript", "Firebase", "Vapi.ai", "Deepgram", "ElevenLabs"],
    github: "https://github.com/utkarshpushpankar",
    demo: "",
    screenshots: [],
    color: "linear-gradient(135deg, #f97316 0%, #ef4444 100%)",
  },
  {
    title: "Women Safety Analytics",
    description:
      "Real-time CV system â€” fine-tuned YOLOv8 for person detection + ResNet50 for gender classification at 81% accuracy on live video.",
    tech: ["Python", "PyTorch", "YOLOv8", "ResNet50", "OpenCV"],
    github: "https://github.com/utkarshpushpankar",
    demo: "",
    screenshots: [],
    color: "linear-gradient(135deg, #0891b2 0%, #22c55e 100%)",
  },
  {
    title: "AgriConnect",
    description:
      "AI crop monitoring â€” 92.5% classification accuracy, pest detection, NDVI indices, and geospatial heatmaps via React Leaflet.",
    tech: ["React", "Node.js", "Flask", "TensorFlow", "OpenCV"],
    github: "https://github.com/utkarshpushpankar",
    demo: "",
    screenshots: [],
    color: "linear-gradient(135deg, #16a34a 0%, #06b6d4 100%)",
  },
];

const SOCIALS = [
  { icon: Github, label: "GitHub", href: "https://github.com/utkarshpushpankar" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/utkarshpushpankar" },
  { icon: Mail, label: "Email", href: "mailto:utkarshpushpankar@gmail.com" },
];

const HERO_PILLS = ["AI-native products", "real-time systems", "full-stack ownership"];

const HERO_STATS = [
  { value: "450+", label: "law firms on the platform I currently help scale" },
  { value: "9.41", label: "CGPA while pursuing B.Tech Computer Science" },
  { value: "3x", label: "Dean's List recognition across consecutive years" },
];

const SKILLS_CATEGORIES = [
  {
    icon: Globe,
    label: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP", "Redux", "ShadCN UI"],
  },
  {
    icon: Terminal,
    label: "Backend",
    items: ["Node.js", "Express.js", "FastAPI", "Python", "WebSockets", "REST APIs"],
  },
  {
    icon: Database,
    label: "Databases & Cloud",
    items: ["PostgreSQL", "MongoDB", "Redis", "Firebase", "AWS S3", "Prisma", "MySQL"],
  },
  {
    icon: Brain,
    label: "AI / ML",
    items: ["PyTorch", "TensorFlow", "OpenCV", "YOLOv8", "ResNet50", "XGBoost", "Gemini", "Deepgram"],
  },
];

const DOCK_ITEMS = [
  { icon: HomeIcon, href: "#hero", label: "Home" },
  { icon: User, href: "#about", label: "About" },
  { icon: Briefcase, href: "#experience", label: "Experience" },
  { icon: FolderGit2, href: "#projects", label: "Projects" },
  { icon: MessageCircle, href: "#contact", label: "Contact" },
];

const DEANS_HOVER_TEXT = "Won Dean's List award three times";

const DEANS_LIST_AWARDS = [
  {
    title: "Dean's List - First Time",
    term: "Academic Year 2023 - 2024",
    src: "/PIC-01.jpeg",
    objectPosition: "center 30%",
    showInMain: false,
  },
  {
    title: "Dean's List - Second Time",
    term: "Academic Year 2024 - 2025",
    src: "/PIC-02.jpeg",
    objectPosition: "center center",
  },
  {
    title: "Dean's List - Third Time",
    term: "Academic Year 2025 - 2026",
    src: "/PIC-03.jpeg",
    objectPosition: "center 38%",
  },
];

const AESTHETIC_GALLERY = [
  { src: "/PIC-05.jpeg", objectPosition: "center center" },
  { src: "/PIC-06.jpeg", objectPosition: "center center" },
  { src: "/PIC-07.jpeg", objectPosition: "center center" },
  { src: "/PIC-08.jpeg", objectPosition: "center center" },
  { src: "/PIC-09.jpeg", objectPosition: "center center" },
  { src: "/PIC-10.jpeg", objectPosition: "center center" },
  { src: "/PIC-11.jpeg", objectPosition: "center center" },
];

const SKILL_BOARD_ITEMS = [
  "Next.js",
  "TypeScript",
  "React",
  "Node.js",
  "FastAPI",
  "Redis",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "WebSockets",
  "PyTorch",
  "TensorFlow",
  "YOLOv8",
  "Framer Motion",
  "GSAP",
  "AWS S3",
  "Gemini AI",
  "Prisma",
  "Redux",
  "ShadCN UI",
];

/* â”€â”€â”€ Animation Variants â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

/* â”€â”€â”€ Helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function TechChip({ name }: { name: string }) {
  return (
    <div className="tech-chip">
      <span className="text-[13px] font-semibold" style={{ color: "var(--text-primary)" }}>
        {name}
      </span>
    </div>
  );
}

/* â”€â”€â”€ Page Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export default function Home() {
  const { theme, setTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("#hero");
  const [activeDeanIndex, setActiveDeanIndex] = useState(0);
  const [aestheticIndex, setAestheticIndex] = useState(0);
  const skillBoardRef = useRef<HTMLDivElement>(null);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const isDark = mounted && theme === "dark";

  useEffect(() => {
    const sectionIds = DOCK_ITEMS.map((item) => item.href.slice(1));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(`#${visible.target.id}`);
        }
      },
      {
        root: null,
        rootMargin: "-40% 0px -45% 0px",
        threshold: [0.2, 0.4, 0.6],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setAestheticIndex((prev) => (prev + 1) % AESTHETIC_GALLERY.length);
    }, 2000);
    return () => window.clearInterval(id);
  }, []);

  const deansMainAwards = DEANS_LIST_AWARDS.filter((award) => award.showInMain !== false);
  const activeDean = deansMainAwards[activeDeanIndex] ?? deansMainAwards[0];

  const switchDean = (dir: 1 | -1) => {
    setActiveDeanIndex((prev) => (prev + dir + deansMainAwards.length) % deansMainAwards.length);
  };

  return (
    <div className="page-shell min-h-screen w-full pb-24" style={{ background: "var(--bg)" }}>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      {/* HERO SECTION                                                  */}
      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section id="hero" className="max-w-6xl mx-auto px-5 pt-16 sm:pt-20 pb-6">
        <motion.div variants={stagger} initial="hidden" animate="show" className="hero-split">
          <motion.div variants={fadeUp} custom={0} className="hero-portrait-panel">
            <div className="hero-portrait-frame">
              <Image
                src="/Professional_Photo.jpeg"
                alt="Utkarsh Pushpankar"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="hero-portrait-image"
                priority
              />
              <div className="hero-portrait-overlay" />
              <div className="hero-portrait-topline">
                <span className="hero-portrait-chip">Full-Stack</span>
                <span className="hero-portrait-chip">AI Systems</span>
              </div>
              <div className="hero-portrait-caption">
                <p className="text-sm font-semibold tracking-[0.16em] uppercase text-white/72">Utkarsh Pushpankar</p>
                <p className="display-font text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Building with speed, taste, and ownership.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} custom={0.08} className="hero-details-panel">
            <div className="hero-meta-row">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                style={{ background: "var(--active-badge)", color: "var(--active-text)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" /> Available for work
              </span>
              <span className="hero-location">
                <MapPin size={13} />
                India · Open to Remote
              </span>
            </div>

            <p className="hero-kicker">Full-stack developer · web · AI · real-time</p>

            <h1 className="hero-title display-font">
              Utkarsh
              <span className="gradient-text">Pushpankar</span>
            </h1>

            <div className="hero-copy">
              <p>
                Shipping <span className="hero-inline-highlight">production-grade products</span> across
                frontend, backend, and AI workflows. I currently help scale a platform serving{" "}
                <strong style={{ color: "var(--text-primary)", fontWeight: 700 }}>450+ law firms</strong>,
                while also building real-time systems that feel fast, polished, and reliable.
              </p>
            </div>

            <div className="hero-support-top">
              <div className="hero-pill-row">
                {HERO_PILLS.map((pill) => (
                  <span key={pill} className="hero-pill">
                    {pill}
                  </span>
                ))}
              </div>

              <div className="hero-actions">
                <a href="#projects" className="btn-primary">
                  View Projects <ArrowUpRight size={14} />
                </a>
                <a href="#contact" className="btn-secondary">
                  Let&apos;s Talk
                </a>
                <a href="/Utkarsh_Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  <FileText size={14} /> Resume
                </a>
              </div>

              <div className="hero-social-row">
                {SOCIALS.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={label === "Email" ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="hero-social-link"
                  >
                    <Icon size={15} strokeWidth={1.7} />
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="max-w-5xl mx-auto px-5 pb-4">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="hero-support-shell"
        >
          <div className="hero-proof-grid">
            <div className="card hero-stats-card">
              {HERO_STATS.map(({ value, label }) => (
                <div key={label} className="hero-stat-item">
                  <p className="hero-stat-value">{value}</p>
                  <p className="hero-stat-label">{label}</p>
                </div>
              ))}
            </div>

            <div className="card hero-side-note">
              <p className="hero-side-note-label">Currently</p>
              <p className="hero-side-note-title">Next.js + TypeScript Engineer at Claw LegalTech</p>
              <p className="hero-side-note-copy">
                Sole frontend developer shipping high-impact product work while studying Computer Science at Bennett University.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      {/* TECH STACK â€” Infinite Ticker                                  */}
      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section className="max-w-5xl mx-auto px-5 pb-4">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="card py-6"
        >
          <div className="flex items-center justify-between px-6 mb-4">
            <p
              className="text-[11px] font-semibold uppercase tracking-widest"
              style={{ color: "var(--text-tertiary)" }}
            >
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
                  <TechChip key={t.name} name={t.name} />
                ))}
              </div>
            </InfiniteTicker>
            <InfiniteTicker direction="x-reverse">
              <div className="flex items-center">
                {TECH_ROW2.map((t) => (
                  <TechChip key={t.name} name={t.name} />
                ))}
              </div>
            </InfiniteTicker>
          </div>
        </motion.div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      {/* ABOUT ME                                                      */}
      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section id="about" className="max-w-5xl mx-auto px-5 pb-4">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="card p-8 grid md:grid-cols-2 gap-8 items-center"
        >
          <div>
            <p
              className="text-[11px] font-semibold uppercase tracking-widest mb-3"
              style={{ color: "var(--text-tertiary)" }}
            >
              About Me
            </p>
            <h2
              className="display-font text-2xl font-bold mb-4 leading-snug"
              style={{ color: "var(--text-primary)" }}
            >
              I build things that{" "}
              <span className="gradient-text">
                matter.
              </span>
            </h2>
            <p
              className="text-sm leading-[1.85]"
              style={{ color: "var(--text-secondary)" }}
            >
              I&apos;m a full-stack engineer with 1.5+ years shipping real production features â€” not
              side projects, but live systems used daily. I specialize in AI-native architectures,
              real-time systems, and owning features end-to-end. Currently the sole frontend dev
              scaling Claw LegalTech, a platform serving{" "}
              <strong style={{ color: "var(--text-primary)" }}>450+ law firms</strong>. I don&apos;t
              just write code â€” I own outcomes.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Production Experience", value: "1.5+ yrs" },
              { label: "CGPA at Bennett", value: "9.41/10" },
              { label: "AI/ML Projects", value: "5+" },
              { label: "Law Firms Served", value: "450+" },
            ].map(({ label, value }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="stat-tile rounded-2xl p-4 flex flex-col gap-1"
              >
                <p
                  className="text-2xl font-bold tracking-tight"
                  style={{ background: "var(--brand-grad)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                >
                  {value}
                </p>
                <p className="text-[11px] leading-snug" style={{ color: "var(--text-tertiary)" }}>
                  {label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      {/* WORK EXPERIENCE                                               */}
      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section id="experience" className="max-w-5xl mx-auto px-5 pb-4">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="card p-6 sm:p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <p
              className="text-[11px] font-semibold uppercase tracking-widest"
              style={{ color: "var(--text-tertiary)" }}
            >
              Work Experience
            </p>
            <Briefcase size={15} style={{ color: "var(--text-tertiary)" }} />
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col items-center pt-1.5">
              <div className="timeline-dot active" style={{ background: "var(--accent-green)" }} />
              <div className="w-px flex-1 my-2" style={{ background: "var(--border-strong)" }} />
              <div className="timeline-dot" style={{ background: "var(--border-strong)" }} />
              <div className="w-px flex-1 my-2" style={{ background: "var(--border-strong)" }} />
              <div className="timeline-dot" style={{ background: "var(--border-strong)" }} />
            </div>

            <div className="flex flex-col gap-8 flex-1 min-w-0">
              {/* Claw LegalTech */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                  <div>
                    <h3 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
                      Next.js + TypeScript Engineer
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                        Claw LegalTech
                      </span>
                      <span
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                        style={{ background: "var(--active-badge)", color: "var(--active-text)" }}
                      >
                        Active
                      </span>
                    </div>
                  </div>
                  <span
                    className="text-xs flex-shrink-0 mt-1 sm:mt-0"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    Aug 2025 â€“ Present
                  </span>
                </div>

                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                  Sole frontend developer scaling a production platform serving{" "}
                  <strong style={{ color: "var(--text-primary)" }}>450+ law firms</strong> and{" "}
                  <strong style={{ color: "var(--text-primary)" }}>100+ paid customers</strong>. Built
                  centralized Redux state management, scaled architecture across 15+ core features, and
                  optimized performance with debouncing, memoization, and code splitting.
                </p>

                <div className="highlight-box">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm">ðŸš€</span>
                    <h4 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                      Flagship: Liquid Text
                    </h4>
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                      style={{
                        background: "var(--brand-grad-soft)",
                        color: "var(--accent-blue)",
                        border: "1px solid color-mix(in srgb, var(--accent-blue) 34%, transparent)",
                      }}
                    >
                      Full-Stack
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    Architected and shipped a standalone PDF annotation engine in 3â€“4 weeks â€” dual-canvas
                    sync, infinite canvas drawing, threaded annotations, stylus/touch support,
                    bounding-box mapping, and persistent storage via Node.js + MongoDB.
                  </p>
                </div>
              </div>

              {/* Revive */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                  <div>
                    <h3 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
                      Backend Developer
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                        Revive
                      </span>
                      <span
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                        style={{
                          background: "var(--accent-muted)",
                          color: "var(--text-secondary)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        Freelance
                      </span>
                    </div>
                  </div>
                  <span
                    className="text-xs flex-shrink-0 mt-1 sm:mt-0"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    Previously
                  </span>
                </div>

                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                  Backend developer at Revive, a preventive and predictive health subscription platform.
                  Architected a production-ready backend, integrated{" "}
                  <strong style={{ color: "var(--text-primary)" }}>Dodo Payments</strong> for payment
                  workflows, implemented{" "}
                  <strong style={{ color: "var(--text-primary)" }}>Firebase OTP authentication</strong>,
                  and built a <strong style={{ color: "var(--text-primary)" }}>LangChain chatbot pipeline</strong>.
                </p>
              </div>

              {/* Education */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                  <div>
                    <h3 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
                      B.Tech Computer Science
                    </h3>
                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                      Bennett University Â· CGPA 9.41/10
                    </span>
                  </div>
                  <span
                    className="text-xs flex-shrink-0 mt-1 sm:mt-0"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    2023 â€“ 2027
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      {/* GITHUB ACTIVITY                                               */}
      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
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
              <p
                className="text-[11px] font-semibold uppercase tracking-widest"
                style={{ color: "var(--text-tertiary)" }}
              >
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

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      {/* PHASE 2 â€” PROOF OF WORK + DEAN'S LIST STRIP                  */}
      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section id="proof" className="max-w-5xl mx-auto px-5 pb-4">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="card p-6 sm:p-8"
        >
          <div className="proof-layout">
            <div className="proof-top-row">
              <div className="deans-main-column">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p
                      className="text-[11px] font-semibold uppercase tracking-widest mb-1.5"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      Dean&apos;s List
                    </p>
                    <h2 className="display-font text-2xl sm:text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
                      Recognition earned consistently
                    </h2>
                  </div>
                  <span className="awards-badge">Won 3 Times</span>
                </div>

                <article className="deans-hero group">
                  <Image
                    src={activeDean.src}
                    alt={activeDean.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 62vw"
                    className="proof-media"
                    style={{ objectPosition: activeDean.objectPosition }}
                  />
                  <div className="proof-overlay-strong">
                    <p className="deans-hover-text">{DEANS_HOVER_TEXT}</p>
                  </div>
                  <button
                    type="button"
                    className="deans-nav-btn left"
                    aria-label="Previous Dean's List photo"
                    onClick={() => switchDean(-1)}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    className="deans-nav-btn right"
                    aria-label="Next Dean's List photo"
                    onClick={() => switchDean(1)}
                  >
                    <ChevronRight size={18} />
                  </button>
                </article>
              </div>

              <div className="aesthetic-panel">
                <article className="aesthetic-main">
                  {AESTHETIC_GALLERY.map((item, idx) => (
                    <Image
                      key={`${item.src}-${idx}`}
                      src={item.src}
                      alt={`Coding and computer science aesthetic shot ${idx + 1}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 35vw"
                      className={`aesthetic-slide ${idx === aestheticIndex ? "active" : ""}`}
                      style={{ objectPosition: item.objectPosition }}
                    />
                  ))}
                </article>

                <div className="aesthetic-dots">
                  {AESTHETIC_GALLERY.map((_, idx) => (
                    <button
                      key={`dot-${idx}`}
                      type="button"
                      aria-label={`Go to aesthetic image ${idx + 1}`}
                      className={`aesthetic-dot ${idx === aestheticIndex ? "active" : ""}`}
                      onClick={() => setAestheticIndex(idx)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="deans-timeline-wrap">
              <div className="deans-timeline">
                {DEANS_LIST_AWARDS.map((award, idx) => {
                  const isMainSelectable = award.showInMain !== false;
                  const mappedMainIndex = deansMainAwards.findIndex((item) => item.src === award.src);
                  const isActive =
                    isMainSelectable && deansMainAwards[activeDeanIndex]?.src === award.src;

                  return (
                    <article
                      key={award.title}
                      className={`deans-step-card ${isActive ? "active" : ""} ${!isMainSelectable ? "muted" : ""}`}
                      onMouseEnter={() => {
                        if (isMainSelectable && mappedMainIndex !== -1) setActiveDeanIndex(mappedMainIndex);
                      }}
                      onFocus={() => {
                        if (isMainSelectable && mappedMainIndex !== -1) setActiveDeanIndex(mappedMainIndex);
                      }}
                      onClick={() => {
                        if (isMainSelectable && mappedMainIndex !== -1) setActiveDeanIndex(mappedMainIndex);
                      }}
                      tabIndex={isMainSelectable ? 0 : -1}
                      role={isMainSelectable ? "button" : undefined}
                      aria-label={
                        isMainSelectable
                          ? `Show ${award.title}`
                          : `${award.title} preview only`
                      }
                    >
                    <span className="deans-step-index">{`0${idx + 1}`}</span>
                    <div className="award-image-wrap">
                      <Image
                        src={award.src}
                        alt={award.title}
                        fill
                        sizes="160px"
                        className="award-image"
                        style={{ objectPosition: award.objectPosition }}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                        {award.title}
                      </p>
                      <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                        {award.term}
                      </p>
                    </div>
                    </article>
                  );
                })}
                <div className="deans-timeline-line" />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      {/* FEATURED PROJECTS                                             */}
      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section id="projects" className="max-w-5xl mx-auto px-5 pb-4">
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="flex items-center justify-between mb-4 px-1"
        >
          <p
            className="text-[11px] font-semibold uppercase tracking-widest"
            style={{ color: "var(--text-tertiary)" }}
          >
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

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      {/* SKILLS                                                        */}
      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section className="max-w-5xl mx-auto px-5 pb-4">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="card p-6 sm:p-8"
        >
          <p
            className="text-[11px] font-semibold uppercase tracking-widest mb-6"
            style={{ color: "var(--text-tertiary)" }}
          >
            Technical Skills
          </p>
          <div className="skills-board-shell mb-6">
            <div className="skills-board-head">
              <p className="display-font text-lg sm:text-xl font-semibold" style={{ color: "var(--text-primary)" }}>
                Skill Board
              </p>
              <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                Drag chips around
              </p>
            </div>
            <div ref={skillBoardRef} className="skills-board">
              {SKILL_BOARD_ITEMS.map((item) => (
                <motion.button
                  key={item}
                  type="button"
                  drag
                  dragConstraints={skillBoardRef}
                  dragElastic={0.12}
                  whileHover={{ y: -4, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="skill-node"
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SKILLS_CATEGORIES.map(({ icon: Icon, label, items }) => (
              <div key={label}>
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ background: "var(--accent-muted)", border: "1px solid var(--border)" }}
                  >
                    <Icon size={14} style={{ color: "var(--text-secondary)" }} strokeWidth={1.6} />
                  </div>
                  <span className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>
                    {label}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all duration-200 hover:scale-[1.04]"
                      style={{
                        background: "var(--accent-muted)",
                        color: "var(--text-secondary)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      {/* CONTACT                                                       */}
      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <section id="contact" className="max-w-5xl mx-auto px-5 pb-8">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="card p-10 text-center flex flex-col items-center gap-5 relative overflow-hidden"
        >
          <div
            className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full blur-3xl opacity-10 pointer-events-none"
            style={{ background: "var(--brand-grad)" }}
          />
          <div
            className="absolute -top-20 -right-20 w-56 h-56 rounded-full blur-3xl opacity-10 pointer-events-none"
            style={{ background: "linear-gradient(135deg, #22d3ee, #f97316)" }}
          />

          <div className="relative z-10 flex flex-col items-center gap-5">
            <p
              className="text-[11px] font-semibold uppercase tracking-widest"
              style={{ color: "var(--text-tertiary)" }}
            >
              Get in Touch
            </p>
            <h2
              className="display-font text-3xl sm:text-4xl font-bold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Let&apos;s Build Something
            </h2>
            <p
              className="text-sm leading-relaxed max-w-md"
              style={{ color: "var(--text-secondary)" }}
            >
              Open to full-time roles, internships, and interesting engineering challenges. I ship
              fast, own features end-to-end, and care about the product.
            </p>
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <a
                href="mailto:utkarshpushpankar@gmail.com"
                className="btn-primary"
              >
                <Mail size={15} /> Send Email
              </a>
              <a
                href="/Utkarsh_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{
                  color: "var(--accent-blue)",
                }}
              >
                <FileText size={15} /> View Resume
              </a>
              <a
                href="https://linkedin.com/in/utkarshpushpankar"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <Linkedin size={15} /> LinkedIn
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* â”€â”€ Footer â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <p className="text-center text-[11px] pb-20" style={{ color: "var(--text-tertiary)" }}>
        Designed & built by Utkarsh Pushpankar Â· 2026
      </p>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      {/* FLOATING DOCK                                                 */}
      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      {mounted && (
        <div className="floating-dock-wrap">
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="floating-dock"
          >
            {DOCK_ITEMS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                className={`dock-item ${activeSection === href ? "active" : ""}`}
                title={label}
                aria-current={activeSection === href ? "page" : undefined}
              >
                <Icon size={16} strokeWidth={1.6} />
              </a>
            ))}
            <div className="dock-divider" />
            {SOCIALS.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={label === "Email" ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="dock-item"
                title={label}
              >
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
        </div>
      )}
    </div>
  );
}




