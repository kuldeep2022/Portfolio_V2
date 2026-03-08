"use client";

import type React from "react";
import { motion } from "framer-motion";
import { Cpu, Globe, Database, Cloud, Code, Terminal, Braces, Layers } from "lucide-react";

const bentoItems = [
  {
    title: "Cloud & Kubernetes",
    description: "Orchestrating at scale across multi-cloud environments",
    icon: <Cloud className="w-7 h-7" />,
    className: "md:col-span-2 md:row-span-2",
    accent: "text-blue-400",
    gradient: "from-blue-500/10 to-transparent",
    iconBg: "bg-blue-500/10",
  },
  {
    title: "React & Next.js",
    description: "Building performant, accessible interfaces",
    icon: <Globe className="w-7 h-7" />,
    className: "md:col-span-1 md:row-span-1",
    accent: "text-purple-400",
    gradient: "from-purple-500/10 to-transparent",
    iconBg: "bg-purple-500/10",
  },
  {
    title: "CI/CD Pipelines",
    description: "Azure DevOps & GitHub Actions",
    icon: <Cpu className="w-7 h-7" />,
    className: "md:col-span-1 md:row-span-1",
    accent: "text-cyan-400",
    gradient: "from-cyan-500/10 to-transparent",
    iconBg: "bg-cyan-500/10",
  },
  {
    title: "System Design",
    description: "Architecture for millions of users",
    icon: <Layers className="w-7 h-7" />,
    className: "md:col-span-1 md:row-span-2",
    accent: "text-emerald-400",
    gradient: "from-emerald-500/10 to-transparent",
    iconBg: "bg-emerald-500/10",
  },
  {
    title: "Backend Engineering",
    description: "Node.js · Java · Python · Go",
    icon: <Terminal className="w-7 h-7" />,
    className: "md:col-span-2 md:row-span-1",
    accent: "text-yellow-400",
    gradient: "from-yellow-500/10 to-transparent",
    iconBg: "bg-yellow-500/10",
  },
  {
    title: "Databases",
    description: "PostgreSQL · MongoDB · Redis · DynamoDB",
    icon: <Database className="w-7 h-7" />,
    className: "md:col-span-1 md:row-span-1",
    accent: "text-red-400",
    gradient: "from-red-500/10 to-transparent",
    iconBg: "bg-red-500/10",
  },
];

export function Skills() {
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rx = ((y - rect.height / 2) / rect.height) * -8;
    const ry = ((x - rect.width / 2) / rect.width) * 8;
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

  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8 }}
      className="py-32 px-6 bg-[#030306] relative"
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="floating-label mb-4 font-mono"
          >
            // Tech Stack
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-7xl font-bold tracking-tighter text-white mb-4"
          >
            Expertise<span className="text-gradient-multi">.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-neutral-400 text-lg max-w-lg"
          >
            Deep dive into the technologies powering production systems at scale.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-4 gap-4 h-auto md:h-[620px]">
          {bentoItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className={`relative glow-card neon-border tilt-card rounded-2xl md:rounded-3xl p-6 md:p-8 overflow-hidden group ${item.className}`}
            >
              {/* Gradient overlay on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
              />

              {/* Icon */}
              <div className={`relative z-10 p-3 ${item.iconBg} rounded-xl w-fit mb-auto`}>
                <div className={item.accent}>{item.icon}</div>
              </div>

              {/* Content */}
              <div className="relative z-10 mt-auto pt-6">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-neutral-500 text-sm font-medium">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
