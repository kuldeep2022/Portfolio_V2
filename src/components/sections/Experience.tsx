"use client";

import type React from "react";
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
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
    <section
      ref={containerRef}
      id="experience"
      className="bg-[#030306] text-white relative"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="max-w-7xl w-full px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left side - Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="floating-label mb-4 font-mono">
              // Career Timeline
            </div>
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-6">
              <span className="text-gradient">The Journey</span>
              <span className="text-gradient-multi">.</span>
            </h2>
            <p className="text-lg text-neutral-400 max-w-md leading-relaxed">
              A timeline of relentless innovation — from enterprise apps to
              AI-powered systems at the world&apos;s most impactful companies.
            </p>

            {/* Animated Stats */}
            <div className="mt-10 grid grid-cols-3 gap-6">
              {[
                { value: 4, suffix: "+", label: "Years" },
                { value: 20, suffix: "+", label: "Projects" },
                { value: 3, suffix: "", label: "Companies" },
              ].map((stat) => (
                <AnimatedStat key={stat.label} {...stat} />
              ))}
            </div>
          </motion.div>

          {/* Right side - Cards */}
          <div className="relative h-[420px]">
            {experiences.map((exp, index) => {
              const start = index / experiences.length;
              const end = (index + 1) / experiences.length;
              const cardOpacity = useTransform(
                scrollYProgress,
                [start, start + 0.1, end - 0.1, end],
                [0, 1, 1, 0]
              );
              const cardY = useTransform(scrollYProgress, [start, end], [60, -60]);

              return (
                <motion.div
                  key={index}
                  style={{ opacity: cardOpacity, y: cardY }}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="absolute inset-0 flex flex-col justify-center p-8 md:p-10 rounded-3xl glow-card neon-border tilt-card"
                >
                  {/* Period badge */}
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.03] w-fit mb-5"
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: exp.accent, boxShadow: `0 0 8px ${exp.accent}` }}
                    />
                    <span className="text-xs font-mono text-neutral-400">
                      {exp.period}
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold mb-1 tracking-tight">
                    {exp.company}
                  </h3>
                  <h4 className="text-lg text-neutral-400 mb-5">{exp.role}</h4>
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
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Spacer for sticky scroll */}
      <div className="h-[300vh]" />
    </section>
  );
}
