"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Expertise", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ["about", "experience", "projects", "skills", "contact"];
      for (const section of [...sections].reverse()) {
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out px-6",
          scrolled ? "py-3" : "py-5"
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

          {/* Desktop nav */}
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
          <button
            className="md:hidden p-2 text-neutral-400 hover:text-white transition-colors relative z-[70]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <motion.div
                animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                className="w-5 h-px bg-current origin-center"
                transition={{ duration: 0.2 }}
              />
              <motion.div
                animate={mobileOpen ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
                className="w-3.5 h-px bg-current origin-center"
                transition={{ duration: 0.2 }}
              />
            </div>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-[#030306]/95 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-2">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block px-8 py-4 text-2xl font-semibold tracking-tight transition-colors duration-300",
                      activeSection === item.href
                        ? "text-white"
                        : "text-neutral-500 hover:text-white"
                    )}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: navItems.length * 0.05, duration: 0.3 }}
                className="mt-6"
              >
                <Link
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="px-8 py-3 text-sm font-semibold bg-white text-black rounded-full"
                >
                  Hire Me
                </Link>
              </motion.div>

              {/* Social / email at bottom */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-12 text-xs text-neutral-600 font-mono"
              >
                davekuldeep98@gmail.com
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
