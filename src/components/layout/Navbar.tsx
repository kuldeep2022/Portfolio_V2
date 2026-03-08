"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Expertise", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section
      const sections = ["experience", "projects", "skills", "contact"];
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(`#${section}`);
            return;
          }
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out px-6",
        scrolled
          ? "py-3"
          : "py-5"
      )}
    >
      <div
        className={cn(
          "max-w-6xl mx-auto flex items-center justify-between rounded-2xl transition-all duration-500 px-6",
          scrolled
            ? "bg-black/50 backdrop-blur-2xl border border-white/[0.06] py-3 shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
            : "bg-transparent py-0"
        )}
      >
        <Link
          href="/"
          className="group flex items-center gap-3 text-white hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold">
            KD
          </div>
          <span className="text-sm font-semibold tracking-tight hidden md:block">
            Kuldeep Dave
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              data-magnet
              className={cn(
                "relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg",
                activeSection === item.href
                  ? "text-white"
                  : "text-neutral-500 hover:text-neutral-300"
              )}
            >
              {activeSection === item.href && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-white/[0.06] rounded-lg"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.name}</span>
            </Link>
          ))}
          <div className="ml-3 h-5 w-px bg-white/[0.08]" />
          <Link
            href="#contact"
            data-magnet
            className="ml-3 px-5 py-2 text-xs font-semibold bg-white text-black rounded-full hover:bg-neutral-200 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          >
            Hire Me
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden p-2 text-neutral-400 hover:text-white transition-colors">
          <div className="space-y-1.5">
            <div className="w-5 h-px bg-current" />
            <div className="w-3.5 h-px bg-current" />
          </div>
        </button>
      </div>
    </motion.header>
  );
}
