"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Gem, Smile, RefreshCw, Clock4, MapPin } from "lucide-react";

const reasons = [
  {
    icon: Gem,
    title: "Premium Quality",
    description:
      "We use only top-tier products and tools. Every service meets the highest standard — no compromises.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted & Certified",
    description:
      "Our professionals are trained, certified, and continuously upskilled to bring you the latest techniques.",
  },
  {
    icon: Smile,
    title: "Client-First Approach",
    description:
      "Your comfort and satisfaction are our priority. We listen, we personalise, and we deliver beyond expectations.",
  },
  {
    icon: RefreshCw,
    title: "Consistent Results",
    description:
      "Whether it's your first or fiftieth visit, you leave looking and feeling great — every single time.",
  },
  {
    icon: Clock4,
    title: "Flexible Scheduling",
    description:
      "Book at your convenience — mornings, evenings, or weekends. We work around your busy life.",
  },
  {
    icon: MapPin,
    title: "Welcoming Space",
    description:
      "Our salon is a calm, clean, and inviting space designed for you to relax and enjoy the experience.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1 },
  }),
};

export default function WhyUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="why-us" ref={ref} className="relative py-24 md:py-32 bg-dark-gradient overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            custom={0}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            className="inline-block text-gold font-semibold text-sm tracking-widest uppercase mb-3"
          >
            Why Emjay
          </motion.span>
          <motion.h2
            custom={1}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            The Emjay{" "}
            <span className="text-gradient-gold">Difference</span>
          </motion.h2>
          <motion.p
            custom={2}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            className="mt-4 text-lg text-white/50 max-w-xl mx-auto"
          >
            We're not just another beauty spot. Here's what sets us apart.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              custom={i + 3}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              className="group relative bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 rounded-3xl p-7 transition-all duration-400 cursor-default overflow-hidden"
            >
              {/* Top-right glow on hover */}
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-accent/10 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-primary/30 group-hover:bg-brand-gradient flex items-center justify-center mb-5 transition-all duration-400">
                  <r.icon size={22} className="text-primary-light group-hover:text-white transition-colors duration-400" />
                </div>

                <h3
                  className="text-lg font-bold text-white mb-2.5"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {r.title}
                </h3>

                <p className="text-white/55 text-sm leading-relaxed">
                  {r.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom testimonial quote */}
        <motion.div
          custom={reasons.length + 3}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-white/5 border border-white/10 rounded-3xl px-8 py-8 max-w-2xl mx-auto">
            <p
              className="text-xl sm:text-2xl text-white/80 italic leading-relaxed"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              "I've been coming to Emjay for years. Every single visit exceeds my expectations. It's not just a salon — it's my happy place."
            </p>
            <p className="mt-4 text-white/40 text-sm font-medium">— A loyal Emjay client</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
