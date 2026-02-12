"use client";

import type React from "react";
import { motion } from "framer-motion";
import { Cpu, Globe, Database, Cloud, Code, Terminal } from "lucide-react";

const bentoItems = [
  {
    title: "Kubernetes",
    description: "Orchestration & Scale",
    icon: <Cloud className="w-8 h-8 text-blue-500" />,
    className: "md:col-span-2 md:row-span-2",
  },
  {
    title: "React & Next.js",
    description: "Modern Frontend",
    icon: <Globe className="w-8 h-8 text-purple-500" />,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Azure DevOps",
    description: "CI/CD Pipelines",
    icon: <Cpu className="w-8 h-8 text-cyan-500" />,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Core Engineering",
    description: "System Design & Architecture",
    icon: <Code className="w-8 h-8 text-green-500" />,
    className: "md:col-span-1 md:row-span-2",
  },
  {
    title: "Backend",
    description: "Node.js, Java, Python",
    icon: <Terminal className="w-8 h-8 text-yellow-500" />,
    className: "md:col-span-2 md:row-span-1",
  },
  {
    title: "Databases",
    description: "SQL & NoSQL",
    icon: <Database className="w-8 h-8 text-red-500" />,
    className: "md:col-span-2 md:row-span-1",
  },
];

export function Skills() {
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rx = ((y - rect.height / 2) / rect.height) * -10;
    const ry = ((x - rect.width / 2) / rect.width) * 10;
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-32 px-6 bg-black"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Expertise.
            <span className="block text-neutral-400">Deep dive into the stack.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-4 gap-6 h-[800px] md:h-[600px]">
          {bentoItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className={`relative glow-card neon-border tilt-card rounded-3xl p-8 overflow-hidden transition-transform group ${item.className}`}
            >
              <div className="absolute top-8 right-8 p-3 bg-white/5 rounded-2xl group-hover:bg-white/10 transition-colors">
                {item.icon}
              </div>
              <div className="absolute bottom-8 left-8">
                <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-neutral-400 font-medium">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
