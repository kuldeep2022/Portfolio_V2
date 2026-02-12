"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);

  return (
    <section 
      ref={containerRef} 
      className="h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black"
    >
      <motion.div 
        style={{ y, opacity, scale }}
        className="text-center z-10 px-4 max-w-5xl mx-auto"
      >
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm md:text-lg font-semibold text-blue-300 mb-6 tracking-[0.4em] uppercase"
        >
          Senior Software Engineer · AI Systems
        </motion.h2>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-8xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-blue-200/60 mb-8"
        >
          Kuldeep Dave.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-3xl font-medium text-neutral-300 max-w-3xl mx-auto leading-tight"
        >
          Engineering the future at <span className="text-white">Meta</span>.
          <br />
          Formerly building at General Motors.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          {["AI Automation", "Cloud Systems", "Full-stack", "DevOps"].map((chip) => (
            <span
              key={chip}
              className="px-4 py-2 rounded-full text-xs uppercase tracking-[0.3em] text-neutral-300 border border-white/10 bg-white/5 backdrop-blur"
            >
              {chip}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <a
            href="#contact"
            data-magnet
            className="px-6 py-3 rounded-full text-sm font-semibold bg-white text-black hover:bg-neutral-200 transition-colors"
          >
            Start a Project
          </a>
          <a
            href="#experience"
            data-magnet
            className="px-6 py-3 rounded-full text-sm font-semibold border border-white/15 text-white hover:border-white/40 transition-colors"
          >
            View Experience
          </a>
        </motion.div>
      </motion.div>

      {/* Video/Background Element (Abstract) */}
      <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[820px] h-[820px] bg-blue-600/20 rounded-full blur-[140px] opacity-40 animate-pulse" />
          <div className="absolute top-10 left-1/3 w-[320px] h-[320px] rounded-full border border-blue-500/40 opacity-40 animate-[spin_24s_linear_infinite]" />
          <div className="absolute bottom-20 right-1/4 w-[240px] h-[240px] rounded-full border border-pink-400/40 opacity-40 animate-[spin_30s_linear_infinite_reverse]" />
          <svg
            className="absolute inset-0 w-full h-full opacity-40"
            viewBox="0 0 1200 800"
            fill="none"
          >
            <path
              className="circuit"
              d="M80 140H420L500 220H820L920 320H1120"
              stroke="rgba(111,156,255,0.8)"
              strokeWidth="2"
            />
            <path
              className="circuit"
              d="M140 520H380L520 420H760L860 520H1100"
              stroke="rgba(255,98,168,0.7)"
              strokeWidth="2"
            />
            <path
              className="circuit"
              d="M220 260H320L420 360H680L760 280H1000"
              stroke="rgba(108,255,202,0.7)"
              strokeWidth="2"
            />
          </svg>
      </div>
    </section>
  );
}
