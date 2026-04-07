"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg shadow-primary/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a
          href="#"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 group"
        >
          <div className="w-9 h-9 rounded-full bg-brand-gradient flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
            <span className="text-white font-bold text-base" style={{ fontFamily: "var(--font-outfit)" }}>
              E
            </span>
          </div>
          <span
            className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${
              scrolled ? "text-primary" : "text-white"
            }`}
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Emjay
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:text-accent relative group cursor-pointer ${
                scrolled ? "text-ink" : "text-white/90"
              }`}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent rounded-full group-hover:w-full transition-all duration-300" />
            </button>
          ))}
          <a
            href="https://wa.me/2347035088106"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-gradient text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-md shadow-primary/30"
          >
            Shop Now
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
            scrolled ? "text-primary hover:bg-primary/10" : "text-white hover:bg-white/10"
          }`}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white/98 backdrop-blur-md border-t border-primary/10 px-5 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-left text-ink font-medium py-3 px-2 rounded-lg hover:bg-cream hover:text-primary transition-colors duration-200 cursor-pointer"
            >
              {link.label}
            </button>
          ))}
          <a
            href="https://wa.me/2347035088106"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 bg-brand-gradient text-white font-semibold px-5 py-3 rounded-full text-center hover:opacity-90 transition-opacity duration-300 shadow-md"
          >
            Shop Now
          </a>
        </div>
      </div>
    </nav>
  );
}
