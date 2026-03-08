"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { sendContactEmail, type ContactState } from "@/app/actions";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowRight } from "lucide-react";

const initialState: ContactState = {
  success: false,
  message: "",
};

export function ContactForm() {
  const [state, formAction] = useActionState(sendContactEmail, initialState);

  return (
    <form action={formAction} className="w-full space-y-5 text-left">
      <AnimatePresence>
        {state.message && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`p-4 rounded-xl text-sm font-medium ${
              state.success
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : "bg-red-500/10 text-red-400 border border-red-500/20"
            }`}
          >
            {state.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-[10px] font-mono uppercase tracking-[0.15em] text-neutral-500 ml-1">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your name"
            required
            className="input-futuristic"
          />
          {state.errors?.name && (
            <p className="text-xs text-red-400 ml-1 mt-1">{state.errors.name[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="company" className="text-[10px] font-mono uppercase tracking-[0.15em] text-neutral-500 ml-1">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            placeholder="Company name"
            className="input-futuristic"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-[10px] font-mono uppercase tracking-[0.15em] text-neutral-500 ml-1">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="name@example.com"
            required
            className="input-futuristic"
          />
          {state.errors?.email && (
            <p className="text-xs text-red-400 ml-1 mt-1">{state.errors.email[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="text-[10px] font-mono uppercase tracking-[0.15em] text-neutral-500 ml-1">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="+1 (555) 123-4567"
            className="input-futuristic"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-[10px] font-mono uppercase tracking-[0.15em] text-neutral-500 ml-1">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell me about your project..."
          rows={4}
          required
          className="input-futuristic resize-none"
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
      className={`group w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold text-sm transition-all duration-300 ${
        pending
          ? "bg-white/[0.05] text-neutral-600 cursor-not-allowed"
          : "bg-white text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
      }`}
    >
      {pending ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Sending...
        </>
      ) : (
        <>
          Send Message
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </>
      )}
    </button>
  );
}
