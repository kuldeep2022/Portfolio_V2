"use client";

import type React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    company: "Meta",
    role: "Software Engineer 2",
    period: "2025 - Present",
    description: "Architecting the next generation of social connection at scale.",
    color: "bg-blue-600",
  },
  {
    company: "General Motors",
    role: "Software Engineer 2",
    period: "2022 - 2025",
    description: "Revolutionized legacy mobility systems, boosting productivity by 40%.",
    color: "bg-neutral-800",
  },
  {
    company: "Binary Republik",
    role: "Junior Developer",
    period: "2021",
    description: "Built robust enterprise applications with React & cloud tech.",
    color: "bg-neutral-900",
  },
];

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
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
      ref={containerRef}
      id="experience"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="bg-black text-white"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl w-full px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-8 text-gradient">
              The Journey.
            </h2>
            <p className="text-xl text-neutral-300 max-w-md">
              A timeline of relentless innovation with a focus on AI and scalable systems.
            </p>
          </div>
          
          <div className="relative h-[400px]">
            {experiences.map((exp, index) => {
              // Calculate opacity and scale based on scroll position for each card
              const start = index / experiences.length;
              const end = (index + 1) / experiences.length;
              
              const opacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
              const y = useTransform(scrollYProgress, [start, end], [50, -50]);
              
              return (
                <motion.div
                  key={index}
                  style={{ opacity, y }}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="absolute inset-0 flex flex-col justify-center p-8 rounded-3xl glow-card neon-border tilt-card"
                >
                  <span className="text-sm font-medium text-blue-400 mb-2">{exp.period}</span>
                  <h3 className="text-3xl font-bold mb-1">{exp.company}</h3>
                  <h4 className="text-xl text-neutral-300 mb-4">{exp.role}</h4>
                  <p className="text-lg text-neutral-400 leading-relaxed">
                    {exp.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
      
      {/* Spacer to allow scrolling through the sticky section */}
      <div className="h-[300vh]" />
    </motion.section>
  );
}
