"use client";

import { motion } from "framer-motion";

export function SectionDivider() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative h-24 md:h-32 flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="divider-glow" />
      <svg
        className="divider-svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0 60C200 20 400 100 600 60C800 20 1000 100 1200 60V120H0V60Z"
          fill="url(#dividerGradient)"
          opacity="0.25"
        />
        <path
          d="M0 40C200 0 400 80 600 40C800 0 1000 80 1200 40"
          stroke="url(#dividerStroke)"
          strokeWidth="2"
          fill="none"
          className="divider-stroke"
        />
        <defs>
          <linearGradient id="dividerGradient" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="rgba(111,156,255,0.6)" />
            <stop offset="50%" stopColor="rgba(255,98,168,0.4)" />
            <stop offset="100%" stopColor="rgba(108,255,202,0.5)" />
          </linearGradient>
          <linearGradient id="dividerStroke" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="rgba(111,156,255,0.9)" />
            <stop offset="50%" stopColor="rgba(255,98,168,0.8)" />
            <stop offset="100%" stopColor="rgba(108,255,202,0.9)" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}
