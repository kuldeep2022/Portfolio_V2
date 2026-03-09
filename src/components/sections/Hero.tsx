"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const roles = [
  "Software Engineer",
  "Cloud Architect",
  "AI Systems Builder",
  "Full-Stack Developer",
];

function useTypingEffect(words: string[], typingSpeed = 80, deletingSpeed = 40, pauseTime = 2000) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.slice(0, text.length + 1));
        if (text.length === currentWord.length) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        setText(currentWord.slice(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return text;
}

// Optimized particle grid — grid-neighbor connections O(n) instead of O(n²),
// HiDPI canvas, passive listeners, avoids sqrt where possible
function ParticleGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Skip on touch devices — particles aren't interactive without a mouse
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationId: number;
    let mouseX = 0;
    let mouseY = 0;
    let width = 0;
    let height = 0;
    let cols = 0;

    type Particle = { x: number; y: number; baseX: number; baseY: number };
    let particles: Particle[] = [];

    const SPACING = 55;
    const MAX_DIST = 180;
    const MAX_DIST_SQ = MAX_DIST * MAX_DIST;
    const CONN_DIST = 70;
    const CONN_DIST_SQ = CONN_DIST * CONN_DIST;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.floor(width / SPACING);
      const rows = Math.floor(height / SPACING);
      particles = [];
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = (i + 0.5) * (width / cols);
          const y = (j + 0.5) * (height / rows);
          particles.push({ x, y, baseX: x, baseY: y });
        }
      }
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("mousemove", (e) => { mouseX = e.clientX; mouseY = e.clientY; }, { passive: true });

    // Pre-create style strings to avoid per-frame string allocation
    const FILL_DIM = "rgba(111,156,255,0.08)";
    const STROKE_DIM = "rgba(111,156,255,0.03)";

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = mouseX - p.baseX;
        const dy = mouseY - p.baseY;
        const distSq = dx * dx + dy * dy;

        if (distSq < MAX_DIST_SQ) {
          const dist = Math.sqrt(distSq);
          const ratio = 1 - dist / MAX_DIST;
          const force = ratio * 15;
          p.x = p.baseX + (dx / dist) * force;
          p.y = p.baseY + (dy / dist) * force;

          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.5 + ratio * 1.5, 0, 6.2832);
          ctx.fillStyle = `rgba(111,156,255,${(0.15 + ratio * 0.4).toFixed(2)})`;
          ctx.fill();
        } else {
          p.x += (p.baseX - p.x) * 0.08;
          p.y += (p.baseY - p.y) * 0.08;

          ctx.beginPath();
          ctx.arc(p.x, p.y, 1, 0, 6.2832);
          ctx.fillStyle = FILL_DIM;
          ctx.fill();
        }
      }

      // Connections — only check right and below neighbors (grid topology)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        const neighbors = [i + 1, i + cols];
        for (const j of neighbors) {
          if (j >= particles.length) continue;
          const p2 = particles[j];
          const cdx = p1.x - p2.x;
          const cdy = p1.y - p2.y;
          if (cdx * cdx + cdy * cdy < CONN_DIST_SQ) {
            const mx = (p1.x + p2.x) * 0.5;
            const my = (p1.y + p2.y) * 0.5;
            const mdSq = (mouseX - mx) ** 2 + (mouseY - my) ** 2;
            if (mdSq < MAX_DIST_SQ) {
              const md = Math.sqrt(mdSq);
              ctx.strokeStyle = `rgba(111,156,255,${(0.08 + (1 - md / MAX_DIST) * 0.15).toFixed(2)})`;
            } else {
              ctx.strokeStyle = STROKE_DIM;
            }
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const typedRole = useTypingEffect(roles);

  const y = useTransform(scrollY, [0, 600], [0, 250]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.85]);

  return (
    <section
      ref={containerRef}
      className="h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#030306]"
    >
      {/* Particle Grid Background */}
      <ParticleGrid />

      {/* Radial gradient overlays */}
      <div className="absolute inset-0 z-[1]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-blue-600/10 rounded-full blur-[180px]" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-pink-500/6 rounded-full blur-[100px]" />
      </div>

      {/* Spinning orbital rings */}
      <div className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full border border-white/[0.04] animate-[spin_40s_linear_infinite]" />
        <div className="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full border border-white/[0.03] animate-[spin_30s_linear_infinite_reverse]" />
        <div className="absolute w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-full border border-blue-500/[0.06] animate-[spin_20s_linear_infinite]" />
      </div>

      {/* Main Content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="text-center z-10 px-4 max-w-5xl mx-auto"
      >
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm mb-8"
        >
          <span className="status-dot" />
          <span className="text-xs font-medium text-neutral-400 tracking-wide">
            Available for opportunities
          </span>
        </motion.div>

        {/* Name with glitch effect */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-6xl md:text-9xl font-bold tracking-tighter mb-6 glitch-text text-shimmer"
          data-text="Kuldeep Dave"
        >
          Kuldeep Dave
        </motion.h1>

        {/* Typing Role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8"
        >
          <span className="font-mono text-sm md:text-base text-neutral-500 tracking-wider">
            {">"} <span className="text-blue-400">{typedRole}</span>
            <span className="animate-pulse text-blue-400 ml-0.5">|</span>
          </span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg md:text-2xl text-neutral-400 max-w-2xl mx-auto leading-relaxed mb-4"
        >
          Engineering the future at{" "}
          <span className="text-white font-semibold">Meta</span>.
          <br className="hidden md:block" />{" "}
          Formerly building at{" "}
          <span className="text-neutral-300">General Motors</span>.
        </motion.p>

        {/* Skill Chips */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8 flex flex-wrap justify-center gap-2"
        >
          {["AI Automation", "Cloud Systems", "Full-Stack", "DevOps", "System Design"].map(
            (chip, i) => (
              <span
                key={chip}
                className="px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.25em] text-neutral-400 border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm font-mono hover:border-white/[0.15] hover:text-neutral-300 transition-all duration-300"
              >
                {chip}
              </span>
            )
          )}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <a
            href="#projects"
            data-magnet
            className="group relative px-8 py-3.5 rounded-full text-sm font-semibold bg-white text-black overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">View 10 Live Projects</span>
          </a>
          <a
            href="#contact"
            data-magnet
            className="px-8 py-3.5 rounded-full text-sm font-semibold border border-white/[0.1] text-white hover:border-white/[0.3] hover:bg-white/[0.03] transition-all duration-300"
          >
            Start a Project
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-neutral-600 font-mono">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/[0.1] flex items-start justify-center p-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
