"use client";

import { motion } from "framer-motion";
import { Download, MapPin, Briefcase, GraduationCap } from "lucide-react";

const highlights = [
  {
    icon: <Briefcase className="w-4 h-4" />,
    label: "Current Role",
    value: "Software Engineer 2 @ Meta",
  },
  {
    icon: <MapPin className="w-4 h-4" />,
    label: "Location",
    value: "United States",
  },
  {
    icon: <GraduationCap className="w-4 h-4" />,
    label: "Education",
    value: "Master's in Computer Science",
  },
];

const techStack = [
  "React", "Next.js", "TypeScript", "Node.js", "Python", "Java",
  "Go", "Kubernetes", "Docker", "Azure", "AWS", "PostgreSQL",
  "MongoDB", "Redis", "GraphQL", "TensorFlow", "Kafka", "Terraform",
];

export function About() {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8 }}
      className="py-32 px-6 bg-[#030306] relative"
    >
      {/* Background accent */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          {/* Left Column */}
          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="floating-label mb-4 font-mono"
            >
              // About Me
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-8"
            >
              Building the
              <br />
              <span className="text-gradient-multi">impossible</span>.
            </motion.h2>

            {/* Info cards */}
            <div className="space-y-3 mb-8">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.04] bg-white/[0.02]"
                >
                  <div className="p-2 bg-white/[0.05] rounded-lg text-blue-400">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-neutral-600">
                      {item.label}
                    </div>
                    <div className="text-sm text-neutral-300">{item.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Resume Download */}
            <motion.a
              href="/resume.pdf"
              target="_blank"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/[0.08] bg-white/[0.03] text-sm text-neutral-300 hover:border-white/[0.15] hover:text-white transition-all duration-300"
            >
              <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              Download Resume
            </motion.a>
          </div>

          {/* Right Column */}
          <div className="md:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-lg text-neutral-300 leading-relaxed">
                I&apos;m a software engineer passionate about building products that
                push the boundaries of what&apos;s possible. Currently at{" "}
                <span className="text-white font-medium">Meta</span>, I work on
                AI-powered systems serving billions of users worldwide.
              </p>
              <p className="text-lg text-neutral-400 leading-relaxed">
                My journey spans from enterprise applications to autonomous vehicle
                systems at{" "}
                <span className="text-neutral-300">General Motors</span>, where I led
                cloud migration initiatives that boosted team productivity by 40%.
                I specialize in distributed systems, cloud infrastructure, and
                building developer tools that scale.
              </p>
              <p className="text-lg text-neutral-400 leading-relaxed">
                When I&apos;m not writing code, I&apos;m exploring the intersection of AI
                and human-computer interaction — always looking for the next
                challenge that seems impossible until it&apos;s done.
              </p>
            </motion.div>

            {/* Tech Marquee */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12"
            >
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-600 mb-4">
                Technologies I work with
              </div>
              <div className="relative overflow-hidden">
                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#030306] to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#030306] to-transparent z-10" />

                {/* Scrolling row */}
                <div className="flex gap-3 animate-[marquee_25s_linear_infinite]">
                  {[...techStack, ...techStack].map((tech, i) => (
                    <span
                      key={`${tech}-${i}`}
                      className="flex-none px-4 py-2 rounded-lg text-xs font-mono text-neutral-500 border border-white/[0.04] bg-white/[0.02] whitespace-nowrap"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
