"use client";

import { motion, type Transition } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";

const floatAnim = (delay: number) => ({
  animate: { y: [0, -12, 0] },
  transition: { duration: 4 + delay, repeat: Infinity, ease: "easeInOut" as const, delay } as Transition,
});

export default function Hero() {
  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-gradient">
      {/* Decorative orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl" />
      </div>

      {/* Floating shapes */}
      <motion.div
        {...floatAnim(0)}
        className="absolute top-20 left-[8%] w-12 h-12 rounded-full border border-white/10 bg-white/5"
      />
      <motion.div
        {...floatAnim(1)}
        className="absolute top-40 right-[12%] w-6 h-6 rounded-full bg-accent/40"
      />
      <motion.div
        {...floatAnim(0.5)}
        className="absolute bottom-32 left-[15%] w-8 h-8 rotate-45 border border-gold/30 bg-gold/5"
      />
      <motion.div
        {...floatAnim(1.5)}
        className="absolute bottom-48 right-[8%] w-14 h-14 rounded-full border-2 border-primary-light/30"
      />
      <motion.div
        {...floatAnim(0.8)}
        className="absolute top-1/3 right-[20%] w-3 h-3 rounded-full bg-gold/60"
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs sm:text-sm font-medium px-4 py-2 rounded-full mb-6"
        >
          <Sparkles size={14} className="text-gold" />
          Beauty Store & Wellness Services · Uyo
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Feel Beautiful,{" "}
          <span className="block">
            <em className="not-italic text-gradient-gold">Be Emjay.</em>
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Uyo's go-to destination for premium cosmetics, skincare, hair care products, and professional beauty services.
          Shop what you love, or come in and be transformed.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/2347035088106"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold px-8 py-4 rounded-full text-base transition-all duration-300 hover:scale-105 shadow-xl shadow-green-900/30 flex items-center gap-3 w-full sm:w-auto justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.553 4.1 1.523 5.824L.057 23.273a.75.75 0 0 0 .92.92l5.45-1.466A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.7-.496-5.263-1.373l-.374-.22-3.882 1.046 1.046-3.882-.22-.374A9.955 9.955 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
            Shop on WhatsApp
          </a>

          {/* Explore services */}
          <button
            onClick={scrollToAbout}
            className="group border-2 border-white/30 hover:border-white/60 text-white font-semibold px-8 py-4 rounded-full text-base transition-all duration-300 hover:bg-white/10 backdrop-blur-sm flex items-center gap-3 w-full sm:w-auto justify-center"
          >
            Explore Our Store
            <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform duration-300" />
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          onClick={scrollToAbout}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/80 transition-colors duration-300 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={24} />
          </motion.div>
        </motion.button>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/5 to-transparent pointer-events-none" />
    </section>
  );
}
