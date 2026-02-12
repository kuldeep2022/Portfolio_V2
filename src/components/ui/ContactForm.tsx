"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { sendContactEmail, type ContactState } from "@/app/actions";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Send } from "lucide-react";

const initialState: ContactState = {
  success: false,
  message: "",
};

export function ContactForm() {
  const [state, formAction] = useActionState(sendContactEmail, initialState);

  return (
    <form action={formAction} className="w-full max-w-lg mx-auto space-y-6 text-left">
      <AnimatePresence>
        {state.message && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`p-4 rounded-xl text-sm font-medium ${
              state.success 
                ? "bg-green-500/10 text-green-400 border border-green-500/20" 
                : "bg-red-500/10 text-red-400 border border-red-500/20"
            }`}
          >
            {state.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-neutral-400 ml-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="your name"
          required
          className="w-full px-5 py-4 bg-neutral-900/50 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-white placeholder-neutral-600"
        />
        {state.errors?.name && (
          <p className="text-xs text-red-400 ml-1 mt-1">{state.errors.name[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="company" className="text-sm font-medium text-neutral-400 ml-1">
          Company (optional)
        </label>
        <input
          type="text"
          id="company"
          name="company"
          placeholder="Company name"
          className="w-full px-5 py-4 bg-neutral-900/50 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-white placeholder-neutral-600"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-neutral-400 ml-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="name@example.com"
          required
          className="w-full px-5 py-4 bg-neutral-900/50 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-white placeholder-neutral-600"
        />
        {state.errors?.email && (
          <p className="text-xs text-red-400 ml-1 mt-1">{state.errors.email[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium text-neutral-400 ml-1">
          Phone (optional)
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="+1 (555) 123-4567"
          className="w-full px-5 py-4 bg-neutral-900/50 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-white placeholder-neutral-600"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-neutral-400 ml-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="How can we help you?"
          rows={5}
          required
          className="w-full px-5 py-4 bg-neutral-900/50 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-white resize-none placeholder-neutral-600"
        />
        {state.errors?.message && (
          <p className="text-xs text-red-400 ml-1 mt-1">{state.errors.message[0]}</p>
        )}
      </div>

      <input type="hidden" name="source" value="portfolio_v2" />

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full flex items-center justify-center gap-2 py-4 rounded-full font-semibold transition-all ${
        pending
          ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
          : "bg-white text-black hover:bg-neutral-200"
      }`}
    >
      {pending ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Sending...
        </>
      ) : (
        <>
          Send Message
          <Send className="w-4 h-4 ml-1" />
        </>
      )}
    </button>
  );
}
