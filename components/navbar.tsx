"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Command, Menu, X, ArrowUpRight } from "lucide-react";
import { useActiveSection } from "@/hooks/use-active-section";
import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import MusicToggle from "@/components/music-toggle";
import ThemeToggle from "@/components/theme-toggle";
import LanguageToggle from "@/components/language-toggle";

const sectionIds = ["projects", "about", "experience", "layanan", "skills", "tech-stack", "blog", "contact"];

interface NavbarProps {
  onOpenCmdk: () => void;
}

export default function Navbar({ onOpenCmdk }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const activeSection = useActiveSection(sectionIds);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 20);

      // Jangan sembunyikan navbar kalau mobile menu lagi kebuka
      if (mobileMenuOpen) {
        setLastScrollY(currentScrollY);
        return;
      }

      if (currentScrollY < 80) {
        // Selalu tampil di dekat top halaman
        setHidden(false);
      } else if (currentScrollY > lastScrollY) {
        // Scroll ke bawah -> sembunyikan
        setHidden(true);
      } else {
        // Scroll ke atas -> tampilkan
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  // Auto-close mobile menu kalau navbar ke-hide
  useEffect(() => {
    if (hidden && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [hidden, mobileMenuOpen]);

  const navItems = [
    { id: "projects", label: t.nav.projects },
    { id: "about", label: t.nav.about },
    { id: "experience", label: t.nav.experience },
    { id: "layanan", label: t.nav.layanan },
    { id: "skills", label: t.nav.skills },
    { id: "tech-stack", label: t.nav.stack },
    { id: "blog", label: t.nav.blog },
    { id: "contact", label: t.nav.contact },
  ];

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <motion.header
      animate={{ y: hidden ? "-150%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-8 sm:top-10 inset-x-3 sm:inset-x-6 lg:inset-x-10 z-50 pointer-events-none"
    >
      <div
        className={`pointer-events-auto relative flex items-center justify-between gap-3 sm:gap-6 h-16 sm:h-20 px-4 sm:px-8 rounded-2xl transition-all duration-300 backdrop-blur-2xl backdrop-saturate-50 border overflow-hidden ${
          scrolled
            ? "bg-black/50 border-white/15 text-white shadow-2xl shadow-black/30"
            : "bg-black/40 border-white/10 text-white shadow-xl shadow-black/20"
        }`}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent" />

        {/* Brand / Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group font-bold text-base tracking-tight shrink-0 text-white"
        >
          <div className="w-7 h-7 flex items-center justify-center transition-transform duration-300 group-hover:rotate-90">
            <span className="text-white text-xl leading-none font-sans font-black">❊</span>
          </div>
          <span className="font-mono text-base sm:text-lg font-bold tracking-tight">
            rifdan<span className="text-orange-500">.dev</span>
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden xl:flex items-center h-full gap-8 font-mono text-xs uppercase tracking-[0.16em]">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleScrollTo(item.id)}
                className={`flex items-center justify-center text-center py-3 px-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-white text-zinc-950 font-bold"
                    : "text-white hover:bg-white/10"
                }`}
              >
                <span>{item.label.toUpperCase()}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Utility Row */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <div className="flex items-center gap-0.5 sm:gap-1">
            <LanguageToggle />
            <ThemeToggle />
            <div className="hidden xs:block sm:block">
              <MusicToggle />
            </div>
          </div>

          <button
            onClick={() => handleScrollTo("contact")}
            className="hidden md:flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-white text-zinc-950 hover:bg-orange-600 hover:text-white font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-xs"
          >
            <span>{t.nav.contact}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <Button
            onClick={onOpenCmdk}
            className="hidden sm:flex items-center gap-1 text-[11px] font-mono font-semibold rounded-xl border border-white/15 bg-white/10 text-white hover:bg-white/20 h-8 px-3 transition-all backdrop-blur-md"
          >
            <Command className="w-3 h-3 text-orange-500" />
            <span>⌘K</span>
          </Button>

          {/* Mobile / Tablet Menu Toggle */}
          <Button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden text-white hover:bg-white/20 border border-white/15 bg-white/10 h-8 w-8 p-0 flex items-center justify-center rounded-xl backdrop-blur-md shrink-0"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 text-orange-500" /> : <Menu className="w-4 h-4 text-orange-500" />}
          </Button>
        </div>
      </div>

      {/* Mobile / Tablet Dropdown Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto xl:hidden mt-2 p-3 sm:p-4 rounded-2xl bg-black/70 backdrop-saturate-50 text-white backdrop-blur-2xl border border-white/15 shadow-2xl"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 font-mono text-xs">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleScrollTo(item.id)}
                  className={`flex items-center justify-between text-left py-2.5 px-3 rounded-xl transition-all ${
                    activeSection === item.id
                      ? "bg-white text-zinc-950 font-bold"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  <span className="uppercase tracking-wider text-[10px] sm:text-xs">{item.label}</span>
                  <span className="text-[10px] opacity-60 ml-1">→</span>
                </button>
              ))}
            </div>

            <div className="pt-3 mt-3 border-t border-white/10 flex items-center gap-2">
              <div className="xs:hidden flex-shrink-0">
                <MusicToggle />
              </div>
              <Button
                onClick={() => { setMobileMenuOpen(false); onOpenCmdk(); }}
                className="flex-1 flex justify-center items-center gap-2 text-xs font-mono font-semibold rounded-xl border border-white/15 bg-white/10 text-white hover:bg-white/20 h-10 shadow-xs"
              >
                <Command className="w-3.5 h-3.5 text-orange-500" />
                <span>Command Palette (⌘K)</span>
              </Button>
              <button
                onClick={() => handleScrollTo("contact")}
                className="md:hidden flex-shrink-0 flex items-center gap-1 px-3 py-2 rounded-xl bg-white text-zinc-950 font-mono text-[10px] font-bold tracking-wider uppercase transition-all"
              >
                <span>Contact</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}