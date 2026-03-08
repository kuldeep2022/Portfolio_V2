"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, ArrowUpRight, MapPin } from "lucide-react";
import { ContactForm } from "../ui/ContactForm";

export function Contact() {
  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8 }}
      className="py-32 px-6 bg-[#030306] text-white relative"
    >
      {/* Background accents */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="floating-label mb-4 font-mono"
          >
            // Get in Touch
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-7xl font-bold tracking-tighter mb-6"
          >
            Let&apos;s Connect<span className="text-gradient-multi">.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-neutral-400 text-lg max-w-lg mx-auto"
          >
            Have a project in mind? Let&apos;s build something extraordinary together.
          </motion.p>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Contact Info Cards */}
          <div className="md:col-span-2 space-y-4">
            <motion.a
              href="mailto:davekuldeep98@gmail.com"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group flex items-center gap-4 p-5 rounded-2xl glow-card neon-border hover:bg-white/[0.02] transition-all duration-300"
            >
              <div className="p-3 bg-blue-500/10 rounded-xl">
                <Mail className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-neutral-500 uppercase tracking-wider font-mono mb-1">
                  Email
                </div>
                <div className="text-sm text-neutral-300 truncate">
                  davekuldeep98@gmail.com
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-white transition-colors" />
            </motion.a>

            <motion.a
              href="https://linkedin.com/in/kuldeep-dave-011844157"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="group flex items-center gap-4 p-5 rounded-2xl glow-card neon-border hover:bg-white/[0.02] transition-all duration-300"
            >
              <div className="p-3 bg-purple-500/10 rounded-xl">
                <Linkedin className="w-5 h-5 text-purple-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-neutral-500 uppercase tracking-wider font-mono mb-1">
                  LinkedIn
                </div>
                <div className="text-sm text-neutral-300">Kuldeep Dave</div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-white transition-colors" />
            </motion.a>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-4 p-5 rounded-2xl glow-card"
            >
              <div className="p-3 bg-emerald-500/10 rounded-xl">
                <MapPin className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="text-xs text-neutral-500 uppercase tracking-wider font-mono mb-1">
                  Location
                </div>
                <div className="text-sm text-neutral-300">
                  United States
                </div>
              </div>
            </motion.div>

            {/* Status */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center gap-3 p-5 rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.02]"
            >
              <span className="status-dot" />
              <span className="text-sm text-emerald-400/80">
                Currently available for new opportunities
              </span>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-3"
          >
            <div className="glow-card neon-border rounded-3xl p-6 md:p-8">
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
