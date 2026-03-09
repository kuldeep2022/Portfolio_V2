"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";
import type React from "react";

const FloatingGeometry = dynamic(
  () => import("@/components/three/FloatingGeometry").then((m) => m.FloatingGeometry),
  { ssr: false }
);

interface Project {
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  accent: string;
  borderAccent: string;
  github: string;
  live: string;
  category: "ai" | "infra" | "viz";
  icon: string;
}

const FEATURED_PROJECTS: Project[] = [
  {
    title: "Chief of Staff AI",
    description:
      "Autonomous AI agent with multi-step reasoning, 10 specialized tools, and real-time execution dashboard. Plans, reasons, and executes complex tasks end-to-end.",
    tags: ["Next.js", "Claude API", "Zustand", "TypeScript"],
    gradient: "from-indigo-500/20 to-violet-500/10",
    accent: "text-indigo-400",
    borderAccent: "hover:border-indigo-500/30",
    github: "https://github.com/kuldeep2022/chief-of-staff-ai",
    live: "https://chief-of-staff-ai.vercel.app",
    category: "ai",
    icon: "🧠",
  },
  {
    title: "AgentFlow",
    description:
      "Visual multi-agent AI pipeline builder with drag-and-drop interface. Connect AI agents, execute with topological sorting, and watch real-time streaming output.",
    tags: ["React Flow", "Claude API", "SSE Streaming", "TypeScript"],
    gradient: "from-purple-500/20 to-pink-500/10",
    accent: "text-purple-400",
    borderAccent: "hover:border-purple-500/30",
    github: "https://github.com/kuldeep2022/agentflow",
    live: "https://agentflow-bice.vercel.app",
    category: "ai",
    icon: "🔀",
  },
  {
    title: "City Intelligence AI",
    description:
      "Real-time urban incident detection dashboard with AI-powered analysis, zone heatmaps, 12-camera network, and predictive analytics for city monitoring.",
    tags: ["Next.js", "Recharts", "Zustand", "Framer Motion"],
    gradient: "from-cyan-500/20 to-blue-500/10",
    accent: "text-cyan-400",
    borderAccent: "hover:border-cyan-500/30",
    github: "https://github.com/kuldeep2022/city-intelligence-ai",
    live: "https://city-intelligence-ai.vercel.app",
    category: "ai",
    icon: "🏙️",
  },
  {
    title: "RepoMind AI",
    description:
      "AI-powered codebase debugger with IDE-like code viewer, syntax highlighting, bug detection across 3 repos, and interactive AI debug console.",
    tags: ["TypeScript", "Code Analysis", "Recharts", "Zustand"],
    gradient: "from-emerald-500/20 to-teal-500/10",
    accent: "text-emerald-400",
    borderAccent: "hover:border-emerald-500/30",
    github: "https://github.com/kuldeep2022/repomind-ai",
    live: "https://repomind-ai-three.vercel.app",
    category: "ai",
    icon: "🔬",
  },
  {
    title: "LifeTwin",
    description:
      "Digital twin life simulator — model health, finance, career, and wellness trajectories with 5 what-if scenarios and interactive data visualizations.",
    tags: ["Next.js", "Recharts", "Simulation Engine", "TypeScript"],
    gradient: "from-amber-500/20 to-orange-500/10",
    accent: "text-amber-400",
    borderAccent: "hover:border-amber-500/30",
    github: "https://github.com/kuldeep2022/lifetwin",
    live: "https://lifetwin-green.vercel.app",
    category: "viz",
    icon: "🧬",
  },
  {
    title: "MemoryNet",
    description:
      "AI internet memory with semantic search, knowledge graph visualization, smart collections, and pattern detection across 30+ saved memories.",
    tags: ["SVG Graph", "Semantic Search", "Zustand", "TypeScript"],
    gradient: "from-rose-500/20 to-pink-500/10",
    accent: "text-rose-400",
    borderAccent: "hover:border-rose-500/30",
    github: "https://github.com/kuldeep2022/memorynet",
    live: "https://memorynet.vercel.app",
    category: "ai",
    icon: "🧩",
  },
  {
    title: "Neural OS",
    description:
      "Browser-based operating system with draggable windows, terminal (10 commands), file explorer, system monitor, and AI chat — all in the browser.",
    tags: ["React", "TypeScript", "Canvas API", "Framer Motion"],
    gradient: "from-blue-500/20 to-cyan-500/10",
    accent: "text-blue-400",
    borderAccent: "hover:border-blue-500/30",
    github: "https://github.com/kuldeep2022/neural-os",
    live: "https://neural-os.vercel.app",
    category: "infra",
    icon: "💻",
  },
  {
    title: "Raft Live",
    description:
      "Interactive Raft consensus protocol visualization with real leader election, log replication, network partition simulation, and SVG cluster view.",
    tags: ["Raft Protocol", "State Machine", "SVG", "TypeScript"],
    gradient: "from-violet-500/20 to-purple-500/10",
    accent: "text-violet-400",
    borderAccent: "hover:border-violet-500/30",
    github: "https://github.com/kuldeep2022/raft-live",
    live: "https://raft-live.vercel.app",
    category: "infra",
    icon: "🗳️",
  },
  {
    title: "Knowledge Graph 3D",
    description:
      "Three.js powered 3D knowledge graph with 20 nodes, 29 edges, orbit controls, search, category filters, and interactive node detail panels.",
    tags: ["Three.js", "React Three Fiber", "WebGL", "TypeScript"],
    gradient: "from-fuchsia-500/20 to-violet-500/10",
    accent: "text-fuchsia-400",
    borderAccent: "hover:border-fuchsia-500/30",
    github: "https://github.com/kuldeep2022/knowledge-graph-3d",
    live: "https://knowledge-graph-3d.vercel.app",
    category: "viz",
    icon: "🌐",
  },
  {
    title: "Infra Copilot",
    description:
      "AI infrastructure assistant with 12 mock AWS resources, natural language query parser, copilot chat, and real-time resource dashboard.",
    tags: ["NL Parsing", "AWS Mock", "Chat UI", "TypeScript"],
    gradient: "from-orange-500/20 to-red-500/10",
    accent: "text-orange-400",
    borderAccent: "hover:border-orange-500/30",
    github: "https://github.com/kuldeep2022/infra-copilot",
    live: "https://infra-copilot-delta.vercel.app",
    category: "infra",
    icon: "☁️",
  },
];

const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const rx = ((y - rect.height / 2) / rect.height) * -6;
  const ry = ((x - rect.width / 2) / rect.width) * 6;
  card.style.setProperty("--rx", `${rx}deg`);
  card.style.setProperty("--ry", `${ry}deg`);
  card.style.setProperty("--mx", `${x}px`);
  card.style.setProperty("--my", `${y}px`);
};

const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
  const card = event.currentTarget;
  card.style.setProperty("--rx", "0deg");
  card.style.setProperty("--ry", "0deg");
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative glow-card holo-card tilt-card rounded-3xl p-7 md:p-8 overflow-hidden border border-white/[0.06] ${project.borderAccent} transition-all duration-500`}
    >
      {/* Gradient background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Top row */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{project.icon}</span>
            <span
              className={`text-[10px] font-mono ${project.accent} tracking-wider uppercase`}
            >
              {project.category === "ai"
                ? "AI / ML"
                : project.category === "infra"
                ? "Infrastructure"
                : "Visualization"}
            </span>
          </div>
          <div className="flex gap-2">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-white/[0.08] bg-white/[0.03] opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/[0.08]"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="w-4 h-4 text-neutral-400" />
            </a>
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-white/[0.08] bg-white/[0.03] opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/[0.08]"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4 text-neutral-400" />
            </a>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-gradient transition-all duration-300">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-neutral-400 leading-relaxed mb-6 text-sm">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.12em] text-neutral-500 border border-white/[0.06] bg-white/[0.02] font-mono"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* View Project Link */}
        <div className="mt-6 flex items-center gap-4">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 text-sm font-medium ${project.accent} opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0`}
          >
            Live Demo
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-neutral-500 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 hover:text-neutral-300"
          >
            Source Code
            <Github className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.8 }}
      className="py-32 px-6 bg-[#030306] relative overflow-hidden"
    >
      {/* Three.js Background */}
      <FloatingGeometry />

      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="floating-label mb-4 font-mono"
            >
              // Featured Work
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-7xl font-bold tracking-tighter text-white"
            >
              Projects<span className="text-gradient-multi">.</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-md"
          >
            <p className="text-neutral-400 text-lg mb-2">
              10 production-grade projects showcasing AI agents, distributed
              systems, 3D visualization, and cloud infrastructure.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-600">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              <span>All with live demos + source code</span>
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-8 mb-14"
        >
          {[
            { label: "Projects", value: "10" },
            { label: "AI/ML", value: "6" },
            { label: "Live Demos", value: "10" },
            { label: "Tech Stack", value: "15+" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">{stat.value}</span>
              <span className="text-xs font-mono text-neutral-600 uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Project Grid — first 4 featured (2-col) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {FEATURED_PROJECTS.slice(0, 4).map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* Remaining 6 projects (3-col) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURED_PROJECTS.slice(4).map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index + 4}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
