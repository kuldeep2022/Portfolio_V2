"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin } from "lucide-react";
import { ContactForm } from "../ui/ContactForm";

export function Contact() {
  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-32 px-6 bg-black text-white"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Let's Connect.
        </h2>
        <p className="text-xl text-neutral-400 mb-16 max-w-xl mx-auto">
          Ready to start your next project? Fill out the form below or reach out directly.
        </p>
        
        <div className="mb-20">
          <div className="glow-card neon-border rounded-3xl p-8">
            <ContactForm />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-8 pt-12 border-t border-white/10">
           <a 
             href="mailto:davekuldeep98@gmail.com"
             className="flex items-center justify-center gap-3 text-neutral-400 hover:text-white transition-colors"
           >
             <div className="p-2 bg-white/5 rounded-full">
               <Mail className="w-5 h-5" />
             </div>
             davekuldeep98@gmail.com
           </a>
           <a 
             href="https://linkedin.com/in/kuldeep-dave-011844157"
             className="flex items-center justify-center gap-3 text-neutral-400 hover:text-white transition-colors"
           >
             <div className="p-2 bg-white/5 rounded-full">
               <Linkedin className="w-5 h-5" />
             </div>
             LinkedIn Profile
           </a>
        </div>
      </div>
    </motion.section>
  );
}
