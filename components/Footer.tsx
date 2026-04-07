"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  InstagramIcon,
  FacebookIcon,
  TwitterXIcon,
  YoutubeIcon,
} from "./SocialIcons";

const socials = [
  { Icon: InstagramIcon, href: "https://www.instagram.com/emjay_beauty", label: "Instagram", live: true },
  { Icon: FacebookIcon, href: null, label: "Facebook", live: false },
  { Icon: TwitterXIcon, href: null, label: "Twitter / X", live: false },
  { Icon: YoutubeIcon, href: null, label: "YouTube", live: false },
];

const links = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

const WHATSAPP = "https://wa.me/2347035088106";

export default function Footer() {
  const [toast, setToast] = useState<string | null>(null);

  const handleSocialClick = (s: typeof socials[0], e: React.MouseEvent) => {
    if (!s.live) {
      e.preventDefault();
      setToast(s.label);
      setTimeout(() => setToast(null), 2200);
    }
  };

  return (
    <footer className="bg-ink text-white/60">
      {/* Coming soon toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-white text-ink text-sm font-semibold px-6 py-3 rounded-full shadow-xl flex items-center gap-2"
          >
            <span>🚀</span>
            {toast} — Coming Soon!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Top section */}
        <div className="py-12 md:py-16 grid md:grid-cols-3 gap-10 border-b border-white/10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-full bg-brand-gradient flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-base" style={{ fontFamily: "var(--font-outfit)" }}>
                  E
                </span>
              </div>
              <span className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
                Emjay
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Your destination for premium beauty services, curated products, and exceptional experiences.
              Where every visit leaves you feeling your best.
            </p>
            <div className="flex gap-3 mt-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href ?? "#"}
                  target={s.live ? "_blank" : undefined}
                  rel={s.live ? "noopener noreferrer" : undefined}
                  aria-label={s.label}
                  onClick={(e) => handleSocialClick(s, e)}
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-brand-gradient flex items-center justify-center transition-all duration-300 hover:scale-110 text-white/70 hover:text-white cursor-pointer"
                >
                  <s.Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">Quick Links</h4>
            <ul className="space-y-3">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                >
                  +234 703 508 8106
                </a>
              </li>
              <li className="text-white/50 leading-relaxed">
                2 Sampson Akpan Street, by Timber Junction off Uyo-Oron Rd, Uyo
              </li>
              <li className="text-white/50">Mon – Sat: 9am – 7pm</li>
              <li className="text-white/50">Sunday: 10am – 4pm</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <p>© {new Date().getFullYear()} Emjay. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart size={12} className="text-accent fill-accent" /> for our clients
          </p>
        </div>
      </div>
    </footer>
  );
}
