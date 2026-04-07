"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Star, Users, Award } from "lucide-react";

const stats = [
  { icon: Users, value: "2,000+", label: "Happy Clients" },
  { icon: Star, value: "4.9★", label: "Average Rating" },
  { icon: Award, value: "8+", label: "Years of Excellence" },
  { icon: Heart, value: "100%", label: "Passion in Every Session" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12 },
  }),
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="relative py-24 md:py-32 bg-cream overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/5 -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-accent/5 translate-y-1/3 -translate-x-1/3 blur-2xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.span
            custom={0}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            className="inline-block text-accent font-semibold text-sm tracking-widest uppercase mb-3"
          >
            Who We Are
          </motion.span>
          <motion.h2
            custom={1}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-ink leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            More Than a Store.{" "}
            <span className="text-gradient">Your beauty home.</span>
          </motion.h2>
        </div>

        {/* Two column layout */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mb-20">
          {/* Left: text */}
          <motion.div
            custom={2}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            className="space-y-6"
          >
            <p className="text-lg text-ink/70 leading-relaxed">
              At <strong className="text-primary font-semibold">Emjay</strong>, we believe that beauty is a feeling — one that should be accessible, consistent, and completely yours. We're Uyo's premier beauty products store, stocking a curated range of cosmetics, skincare, hair care, and wellness products from trusted brands.
            </p>
            <p className="text-lg text-ink/70 leading-relaxed">
              Beyond our shelves, we also offer professional beauty services — from hair styling and nail art to facials and makeup — so you can shop, pamper, and leave feeling your absolute best, all in one place.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {["Cosmetics", "Skincare", "Hair Care", "Nail Art", "Makeup", "Beauty Services"].map((tag) => (
                <span
                  key={tag}
                  className="bg-white border border-primary/20 text-primary text-sm font-medium px-4 py-1.5 rounded-full shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: visual card */}
          <motion.div
            custom={3}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            className="relative"
          >
            <div className="relative bg-brand-gradient rounded-3xl p-8 md:p-10 text-white overflow-hidden shadow-2xl shadow-primary/30">
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: "radial-gradient(circle at 30% 30%, white 1px, transparent 1px), radial-gradient(circle at 70% 70%, white 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                }}
              />
              <div className="relative z-10 space-y-5">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                  <Heart size={24} fill="white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>
                  Our Promise to You
                </h3>
                <p className="text-white/80 leading-relaxed">
                  Every client who walks through our doors receives personalised attention, premium products, and a result that exceeds expectations. We don't do average — we do exceptional.
                </p>
                <div className="pt-2 border-t border-white/20">
                  <p className="text-white/60 text-sm italic" style={{ fontFamily: "var(--font-playfair)" }}>
                    "Your beauty journey starts here."
                  </p>
                </div>
              </div>
            </div>

            {/* Floating accent card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl shadow-primary/10 p-4 flex items-center gap-3 border border-primary/10"
            >
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-lg">
                ★
              </div>
              <div>
                <p className="text-xs text-ink/50 font-medium">Client Love</p>
                <p className="text-sm font-bold text-ink">Trusted by thousands</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              custom={i + 4}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              className="bg-white rounded-2xl p-6 text-center shadow-sm border border-primary/5 card-hover"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <s.icon size={20} className="text-primary" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-ink mb-1">{s.value}</p>
              <p className="text-sm text-ink/50">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
