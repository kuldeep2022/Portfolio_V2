"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Experience", href: "#experience" },
  { name: "Expertise", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 py-4",
        scrolled
          ? "bg-black/70 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.35)]"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold tracking-tight text-white hover:opacity-80 transition-opacity">
          Kuldeep Dave
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              data-magnet
              className="text-sm font-medium text-neutral-300 hover:text-white transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-blue-400 after:via-pink-400 after:to-emerald-300 after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="#contact"
            data-magnet
            className="px-4 py-2 text-xs font-semibold bg-white text-black rounded-full hover:bg-neutral-200 transition-colors"
          >
            Hire Me
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
