"use client";

import type React from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";

const experiences = [
  {
    company: "Meta",
    role: "Software Engineer 2",
    period: "2025 — Present",
    description:
      "Architecting the next generation of social connection at scale. Building AI-powered systems that serve billions of users worldwide.",
    highlights: ["AI Systems", "Distributed Computing", "React Native"],
    accent: "#6f9cff",
  },
  {
    company: "General Motors",
    role: "Software Engineer 2",
    period: "2022 — 2025",
    description:
      "Revolutionized legacy mobility systems, boosting team productivity by 40%. Led cloud migration of critical automotive platforms.",
    highlights: ["Cloud Migration", "Azure DevOps", "Microservices"],
    accent: "#ff62a8",
  },
  {
    company: "Binary Republik",
    role: "Junior Developer",
    period: "2021",
    description:
      "Built robust enterprise applications with React & cloud technologies. Delivered 12+ client projects with 100% on-time delivery.",
    highlights: ["React", "Node.js", "Enterprise Apps"],
    accent: "#6cfcca",
  },
];

function AnimatedStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 40, stiffness: 100 });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${Math.round(latest)}${suffix}`;
      }
    });
    return unsubscribe;
  }, [springValue, suffix]);

  return (
    <div>
      <div ref={ref} className="text-2xl md:text-3xl font-bold text-white tabular-nums">
        0{suffix}
      </div>
      <div className="text-xs text-neutral-500 uppercase tracking-wider mt-1 font-mono">
        {label}
      </div>
    </div>
  );
}

function ExperienceCard({
  exp,
  index,
}: {
  exp: (typeof experiences)[number];
  index: number;
}) {
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

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`relative flex items-center gap-8 ${
        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Timeline dot */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 flex-col items-center">
        <div
          className="w-4 h-4 rounded-full border-2"
          style={{
            borderColor: exp.accent,
            background: "#030306",
            boxShadow: `0 0 12px ${exp.accent}40`,
          }}
        />
      </div>

      {/* Card */}
      <div className={`w-full md:w-[calc(50%-2rem)] ${index % 2 === 0 ? "md:pr-0" : "md:pl-0"}`}>
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="glow-card neon-border tilt-card rounded-3xl p-7 md:p-9"
        >
          {/* Period badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.03] w-fit mb-5">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: exp.accent, boxShadow: `0 0 8px ${exp.accent}` }}
            />
            <span className="text-xs font-mono text-neutral-400">{exp.period}</span>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold mb-1 tracking-tight text-white">
            {exp.company}
          </h3>
          <h4 className="text-base text-neutral-400 mb-4">{exp.role}</h4>
          <p className="text-neutral-500 leading-relaxed mb-6 text-sm md:text-base">
            {exp.description}
          </p>

          {/* Highlight tags */}
          <div className="flex flex-wrap gap-2">
            {exp.highlights.map((h) => (
              <span
                key={h}
                className="px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.15em] font-mono border border-white/[0.06] bg-white/[0.02]"
                style={{ color: exp.accent }}
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="py-32 px-6 bg-[#030306] text-white relative">
      {/* Background accent */}
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-pink-600/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="floating-label mb-4 font-mono"
            >
              // Career Timeline
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-7xl font-bold tracking-tighter"
            >
              <span className="text-gradient">The Journey</span>
              <span className="text-gradient-multi">.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-neutral-400 max-w-md leading-relaxed"
          >
            A timeline of relentless innovation — from enterprise apps to
            AI-powered systems at the world&apos;s most impactful companies.
          </motion.p>
        </div>

        {/* Animated Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-3 gap-6 mb-20 max-w-md"
        >
          {[
            { value: 4, suffix: "+", label: "Years" },
            { value: 20, suffix: "+", label: "Projects" },
            { value: 3, suffix: "", label: "Companies" },
          ].map((stat) => (
            <AnimatedStat key={stat.label} {...stat} />
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/[0.08] to-transparent" />

          <div className="space-y-12 md:space-y-16">
            {experiences.map((exp, index) => (
              <ExperienceCard key={exp.company} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
