"use client";

import { motion } from "framer-motion";

export function SectionDivider() {
  return (
    <div className="relative h-16 md:h-24 flex items-center justify-center overflow-hidden" aria-hidden="true">
      {/* Simple gradient line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
      />
      {/* Center dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="absolute w-1 h-1 rounded-full bg-white/20"
      />
    </div>
  );
}
