"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import type React from "react";

const projects = [
  {
    title: "AI-Powered Analytics Platform",
    description:
      "Real-time data pipeline processing 10M+ events/day with ML-driven insights. Built with distributed microservices architecture.",
    tags: ["Python", "Kubernetes", "TensorFlow", "Kafka"],
    gradient: "from-blue-500/20 to-cyan-500/10",
    accent: "text-blue-400",
    borderAccent: "hover:border-blue-500/30",
  },
  {
    title: "Cloud Infrastructure Orchestrator",
    description:
      "Automated multi-cloud deployment system reducing provisioning time by 85%. Zero-downtime rollouts across 200+ services.",
    tags: ["Go", "Terraform", "Azure", "Docker"],
    gradient: "from-purple-500/20 to-pink-500/10",
    accent: "text-purple-400",
    borderAccent: "hover:border-purple-500/30",
  },
  {
    title: "Next-Gen Design System",
    description:
      "Component library powering 50+ internal applications with accessibility-first architecture and real-time theme engine.",
    tags: ["React", "TypeScript", "Storybook", "Figma"],
    gradient: "from-emerald-500/20 to-teal-500/10",
    accent: "text-emerald-400",
    borderAccent: "hover:border-emerald-500/30",
  },
  {
    title: "Autonomous Vehicle Data Pipeline",
    description:
      "Processing and visualizing terabytes of sensor data for autonomous driving systems. Real-time 3D point cloud rendering.",
    tags: ["C++", "ROS", "WebGL", "PostgreSQL"],
    gradient: "from-orange-500/20 to-red-500/10",
    accent: "text-orange-400",
    borderAccent: "hover:border-orange-500/30",
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

export function Projects() {
  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8 }}
      className="py-32 px-6 bg-[#030306] relative"
    >
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
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
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-neutral-400 max-w-md text-lg"
          >
            Selected projects that showcase engineering at scale, from AI
            systems to cloud infrastructure.
          </motion.p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className={`group relative glow-card holo-card tilt-card rounded-3xl p-8 md:p-10 overflow-hidden border border-white/[0.06] ${project.borderAccent} transition-all duration-500`}
            >
              {/* Gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Top row */}
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`text-xs font-mono ${project.accent} tracking-wider uppercase`}
                  >
                    Featured Project
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-full border border-white/[0.08] bg-white/[0.03] opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/[0.08]">
                      <Github className="w-4 h-4 text-neutral-400" />
                    </button>
                    <button className="p-2 rounded-full border border-white/[0.08] bg-white/[0.03] opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/[0.08]">
                      <ExternalLink className="w-4 h-4 text-neutral-400" />
                    </button>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight group-hover:text-gradient transition-all duration-300">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-neutral-400 leading-relaxed mb-8 text-sm md:text-base">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.15em] text-neutral-500 border border-white/[0.06] bg-white/[0.02] font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* View Project Link */}
                <div className="mt-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <span className={`text-sm font-medium ${project.accent}`}>
                    View Project
                  </span>
                  <ArrowUpRight className={`w-4 h-4 ${project.accent}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
