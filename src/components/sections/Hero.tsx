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

// Particle grid canvas
function ParticleGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let mouseX = 0;
    let mouseY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const cols = Math.floor(canvas.width / 50);
    const rows = Math.floor(canvas.height / 50);

    const particles: { x: number; y: number; baseX: number; baseY: number }[] = [];
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = (i + 0.5) * (canvas.width / cols);
        const y = (j + 0.5) * (canvas.height / rows);
        particles.push({ x, y, baseX: x, baseY: y });
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        const dx = mouseX - p.baseX;
        const dy = mouseY - p.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 180;

        if (dist < maxDist) {
          const force = (1 - dist / maxDist) * 15;
          p.x = p.baseX + (dx / dist) * force;
          p.y = p.baseY + (dy / dist) * force;
        } else {
          p.x += (p.baseX - p.x) * 0.08;
          p.y += (p.baseY - p.y) * 0.08;
        }

        const alpha = dist < maxDist ? 0.15 + (1 - dist / maxDist) * 0.4 : 0.08;
        const size = dist < maxDist ? 1.5 + (1 - dist / maxDist) * 1.5 : 1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(111, 156, 255, ${alpha})`;
        ctx.fill();
      }

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 70) {
            const mdx = mouseX - (particles[i].x + particles[j].x) / 2;
            const mdy = mouseY - (particles[i].y + particles[j].y) / 2;
            const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
            const alpha = mDist < 180 ? 0.08 + (1 - mDist / 180) * 0.15 : 0.03;

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(111, 156, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
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
            href="#contact"
            data-magnet
            className="group relative px-8 py-3.5 rounded-full text-sm font-semibold bg-white text-black overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">Start a Project</span>
          </a>
          <a
            href="#experience"
            data-magnet
            className="px-8 py-3.5 rounded-full text-sm font-semibold border border-white/[0.1] text-white hover:border-white/[0.3] hover:bg-white/[0.03] transition-all duration-300"
          >
            View Experience
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
