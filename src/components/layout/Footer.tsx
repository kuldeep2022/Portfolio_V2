"use client";

import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";

const socialLinks = [
  { name: "GitHub", href: "https://github.com", icon: <Github className="w-4 h-4" /> },
  { name: "LinkedIn", href: "https://linkedin.com/in/kuldeep-dave-011844157", icon: <Linkedin className="w-4 h-4" /> },
  { name: "Email", href: "mailto:davekuldeep98@gmail.com", icon: <Mail className="w-4 h-4" /> },
];

const navLinks = [
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Expertise", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#030306] border-t border-white/[0.04] pt-20 pb-8 px-6">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
                KD
              </div>
              <span className="text-lg font-semibold text-white tracking-tight">
                Kuldeep Dave
              </span>
            </div>
            <p className="text-neutral-500 text-sm leading-relaxed max-w-sm mb-6">
              Software Engineer at Meta. Building AI-powered systems and
              scalable cloud infrastructure that impacts billions.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="p-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] text-neutral-500 hover:text-white hover:border-white/[0.12] transition-all duration-300"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-600 mb-5">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-neutral-500 hover:text-white transition-colors duration-300 flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Back to top */}
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-600 mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={scrollToTop}
                  className="text-sm text-neutral-500 hover:text-white transition-colors duration-300 flex items-center gap-1 group"
                >
                  Back to Top
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-sm text-neutral-500 hover:text-white transition-colors duration-300"
                >
                  Start a Project
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.04] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-neutral-600 font-mono">
            &copy; {new Date().getFullYear()} Kuldeep Dave. All rights reserved.
          </p>
          <p className="text-xs text-neutral-700 font-mono">
            Designed & built with precision
          </p>
        </div>
      </div>
    </footer>
  );
}
