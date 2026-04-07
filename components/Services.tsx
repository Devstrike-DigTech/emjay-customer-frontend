"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Scissors, Sparkles, ShoppingBag, Clock, Palette, Leaf } from "lucide-react";

const services = [
  {
    icon: ShoppingBag,
    title: "Cosmetics & Makeup",
    description:
      "A curated range of foundations, lipsticks, eyeshadows, concealers, and more. Premium brands you trust, at prices you'll love.",
    highlight: "Foundations · Lips · Eyes",
  },
  {
    icon: Leaf,
    title: "Skincare Products",
    description:
      "From serums and moisturisers to cleansers and SPF. We stock proven skincare solutions for every skin type and concern.",
    highlight: "Serums · Moisturisers · SPF",
  },
  {
    icon: Scissors,
    title: "Hair Care Products",
    description:
      "Shampoos, conditioners, treatments, and styling products for all hair types — relaxed, natural, locs, and everything in between.",
    highlight: "Shampoos · Treatments · Styling",
  },
  {
    icon: Sparkles,
    title: "Nail Art & Manicure",
    description:
      "Elegant nail designs, gel extensions, classic manicures, and pedicures. Attention to detail in every stroke — your nails, elevated.",
    highlight: "Manicure · Pedicure · Gel",
  },
  {
    icon: Palette,
    title: "Makeup & Glam Services",
    description:
      "Flawless looks for every occasion — from everyday natural makeup to full bridal glam. Our artists make you feel camera-ready.",
    highlight: "Bridal · Events · Everyday",
  },
  {
    icon: Clock,
    title: "Hair Styling Services",
    description:
      "Creative cuts, colour transformations, and deep conditioning treatments. Our stylists craft looks that frame your face beautifully.",
    highlight: "Cuts · Colour · Treatments",
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

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" ref={ref} className="relative py-24 md:py-32 bg-white overflow-hidden">
      {/* BG decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-72 h-72 rounded-full bg-primary/4 blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-72 h-72 rounded-full bg-accent/4 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            custom={0}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            className="inline-block text-accent font-semibold text-sm tracking-widest uppercase mb-3"
          >
            Products & Services
          </motion.span>
          <motion.h2
            custom={1}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-ink leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Everything Beauty,{" "}
            <span className="text-gradient">All in One Place</span>
          </motion.h2>
          <motion.p
            custom={2}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            className="mt-4 text-lg text-ink/60 max-w-xl mx-auto"
          >
            Shop premium beauty products or book a professional service — we've got everything you need to look and feel your best.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              custom={i + 3}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              className="group relative bg-white rounded-3xl p-7 border border-ink/5 shadow-sm hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-400 cursor-default overflow-hidden"
            >
              {/* Hover gradient bg */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/3 group-hover:to-accent/3 transition-all duration-400 rounded-3xl" />

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-13 h-13 rounded-2xl bg-primary/8 group-hover:bg-brand-gradient flex items-center justify-center mb-5 transition-all duration-400 shadow-sm w-12 h-12">
                  <s.icon
                    size={22}
                    className="text-primary group-hover:text-white transition-colors duration-400"
                  />
                </div>

                {/* Title */}
                <h3
                  className="text-xl font-bold text-ink mb-3 group-hover:text-primary transition-colors duration-300"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {s.title}
                </h3>

                {/* Description */}
                <p className="text-ink/60 text-sm leading-relaxed mb-5">
                  {s.description}
                </p>

                {/* Tag */}
                <span className="inline-block text-xs font-semibold text-primary/70 bg-primary/8 group-hover:bg-primary/12 px-3 py-1.5 rounded-full transition-colors duration-300">
                  {s.highlight}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          custom={services.length + 3}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          className="text-center mt-14"
        >
          <a
            href="https://wa.me/2347035088106"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-brand-gradient text-white font-semibold px-10 py-4 rounded-full text-base hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-xl shadow-primary/30"
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
            Shop or Book via WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
