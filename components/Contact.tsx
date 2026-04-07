"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { MessageCircle, ArrowUpRight, MapPin, Clock } from "lucide-react";
import {
  WhatsAppIcon,
  InstagramIcon,
  FacebookIcon,
  TwitterXIcon,
  YoutubeIcon,
} from "./SocialIcons";

const WHATSAPP = "https://wa.me/2347035088106";
const PHONE = "tel:+2347035088106";

const socials = [
  {
    name: "Instagram",
    handle: "@emjay_beauty",
    Icon: InstagramIcon,
    href: "https://www.instagram.com/emjay_beauty",
    bg: "bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045]",
    live: true,
  },
  {
    name: "Facebook",
    handle: "Emjay Beauty",
    Icon: FacebookIcon,
    href: null,
    bg: "bg-gradient-to-br from-[#1877f2] to-[#0d5cb5]",
    live: false,
  },
  {
    name: "Twitter / X",
    handle: "@emjay_beauty",
    Icon: TwitterXIcon,
    href: null,
    bg: "bg-gradient-to-br from-[#1a1a1a] to-[#333333]",
    live: false,
  },
  {
    name: "YouTube",
    handle: "Emjay Beauty",
    Icon: YoutubeIcon,
    href: null,
    bg: "bg-gradient-to-br from-[#ff0000] to-[#cc0000]",
    live: false,
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

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [comingSoon, setComingSoon] = useState<string | null>(null);

  const handleSocialClick = (s: typeof socials[0], e: React.MouseEvent) => {
    if (!s.live) {
      e.preventDefault();
      setComingSoon(s.name);
      setTimeout(() => setComingSoon(null), 2200);
    }
  };

  return (
    <section id="contact" ref={ref} className="relative py-24 md:py-32 bg-cream overflow-hidden">
      {/* BG decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />
      </div>

      {/* Coming Soon toast */}
      <AnimatePresence>
        {comingSoon && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-ink text-white text-sm font-semibold px-6 py-3 rounded-full shadow-xl flex items-center gap-2"
          >
            <span>🚀</span>
            {comingSoon} — Coming Soon!
          </motion.div>
        )}
      </AnimatePresence>

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
            Get In Touch
          </motion.span>
          <motion.h2
            custom={1}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-ink leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Let&apos;s Connect,{" "}
            <span className="text-gradient">Beautifully.</span>
          </motion.h2>
          <motion.p
            custom={2}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            className="mt-4 text-lg text-ink/60 max-w-xl mx-auto"
          >
            Have a question? Want to book an appointment? We&apos;re just a message away.
          </motion.p>
        </div>

        {/* WhatsApp + Info grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {/* WhatsApp hero CTA — spans 2 cols */}
          <motion.div
            custom={3}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            className="md:col-span-2 relative bg-[#075E54] rounded-3xl p-8 sm:p-10 overflow-hidden shadow-2xl shadow-green-900/20 text-center"
          >
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)",
                backgroundSize: "25px 25px",
              }}
            />
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[#25D366]/20 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-[#128C7E]/30 blur-3xl" />

            <div className="relative z-10">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" as const }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#25D366] text-white mb-5 shadow-lg shadow-green-900/30"
              >
                <WhatsAppIcon size={30} />
              </motion.div>

              <h3
                className="text-2xl sm:text-3xl font-bold text-white mb-2"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Chat with us on WhatsApp
              </h3>
              <p className="text-white/60 mb-7 max-w-md mx-auto text-sm">
                For bookings, enquiries, or just to say hi — our team is ready to help.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-8 py-3.5 rounded-full text-base transition-all duration-300 hover:scale-105 shadow-xl shadow-green-900/30 w-full sm:w-auto justify-center"
                >
                  <MessageCircle size={20} />
                  Start a Chat
                  <ArrowUpRight
                    size={16}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                  />
                </a>
                <a
                  href={PHONE}
                  className="flex items-center gap-3 border-2 border-white/30 hover:border-white/60 text-white/80 hover:text-white font-semibold px-7 py-3.5 rounded-full text-base transition-all duration-300 hover:bg-white/10 w-full sm:w-auto justify-center"
                >
                  Call Us
                </a>
              </div>
            </div>
          </motion.div>

          {/* Info card */}
          <motion.div
            custom={4}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            className="bg-white rounded-3xl p-7 border border-ink/5 shadow-sm flex flex-col gap-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-ink mb-1">Our Location</p>
                <p className="text-sm text-ink/60 leading-relaxed">
                  2 Sampson Akpan Street, by Timber Junction off Uyo-Oron Rd, Uyo
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Clock size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-ink mb-1">Opening Hours</p>
                <p className="text-sm text-ink/60">Mon – Sat: 9am – 7pm</p>
                <p className="text-sm text-ink/60">Sunday: 10am – 4pm</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <WhatsAppIcon size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-ink mb-1">WhatsApp / Call</p>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:text-accent transition-colors duration-200 font-medium"
                >
                  +234 703 508 8106
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Social media cards */}
        <motion.h3
          custom={5}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          className="text-center text-xl font-bold text-ink mb-6"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Follow us on social media
        </motion.h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {socials.map((s, i) => (
            <motion.a
              key={s.name}
              href={s.href ?? "#"}
              target={s.live ? "_blank" : undefined}
              rel={s.live ? "noopener noreferrer" : undefined}
              onClick={(e) => handleSocialClick(s, e)}
              custom={i + 6}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              className="group relative bg-white rounded-2xl p-5 border border-ink/5 shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 overflow-hidden cursor-pointer"
            >
              <div
                className={`absolute inset-0 ${s.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl`}
              />

              <div className="relative z-10 flex flex-col items-center text-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}
                >
                  <s.Icon size={22} />
                </div>
                <div>
                  <p className="font-bold text-ink group-hover:text-white text-sm transition-colors duration-300">
                    {s.name}
                  </p>
                  <p className="text-ink/50 group-hover:text-white/70 text-xs transition-colors duration-300">
                    {s.live ? s.handle : "Coming Soon"}
                  </p>
                </div>
                {s.live ? (
                  <ArrowUpRight
                    size={14}
                    className="text-ink/30 group-hover:text-white/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                  />
                ) : (
                  <span className="text-[10px] font-semibold text-ink/30 group-hover:text-white/60 transition-colors duration-300 bg-ink/5 group-hover:bg-white/20 px-2 py-0.5 rounded-full">
                    Soon
                  </span>
                )}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
