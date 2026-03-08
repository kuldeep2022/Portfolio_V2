"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const steps = [
      { target: 30, delay: 100 },
      { target: 60, delay: 400 },
      { target: 85, delay: 800 },
      { target: 100, delay: 1200 },
    ];

    steps.forEach(({ target, delay }) => {
      setTimeout(() => setProgress(target), delay);
    });

    setTimeout(() => setIsComplete(true), 1800);
  }, []);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="preloader"
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Background grid */}
          <div className="absolute inset-0 opacity-20">
            <div className="fx-grid" style={{ maskImage: "none", opacity: 0.3 }} />
          </div>

          {/* Logo / Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12 text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-2">
              KD
            </h1>
            <div className="flex items-center gap-3 justify-center">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-white/30" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-neutral-500 font-mono">
                Initializing
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-white/30" />
            </div>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 200 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="preloader-bar"
          >
            <div
              className="preloader-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </motion.div>

          {/* Progress Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 font-mono text-xs text-neutral-600 tabular-nums"
          >
            {progress}%
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
