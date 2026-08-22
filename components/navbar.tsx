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
  const activeSection = useActiveSection(sectionIds);
  const { t } = useLanguage();

  // Deteksi scroll untuk efek dinamis
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header className="fixed top-3 inset-x-0 z-50 max-w-7xl mx-auto px-3 sm:px-5 lg:px-8 pointer-events-none">
      <div
        className={`pointer-events-auto flex items-center justify-between gap-2 sm:gap-4 h-12 sm:h-14 px-3 sm:px-6 rounded-2xl transition-all duration-300 backdrop-blur-2xl border ${
          scrolled
            ? "bg-white/80 dark:bg-white/15 border-white/80 dark:border-white/20 text-zinc-900 dark:text-white shadow-xl shadow-zinc-950/10"
            : "bg-white/60 dark:bg-white/10 border-white/60 dark:border-white/15 text-zinc-900 dark:text-white shadow-lg shadow-zinc-950/5"
        }`}
      >
        {/* Brand / Logo (White Glass Theme) */}
        <Link
          href="/"
          className="flex items-center gap-2 group font-bold text-base tracking-tight shrink-0 text-zinc-900 dark:text-white"
        >
          <div className="w-5 h-5 flex items-center justify-center transition-transform duration-300 group-hover:rotate-90">
            <span className="text-zinc-900 dark:text-white text-base leading-none font-sans font-black">❊</span>
          </div>
          <span className="font-mono text-sm font-bold tracking-tight">
            rifdan<span className="text-orange-500">.dev</span>
          </span>
        </Link>

        {/* Desktop Nav Items (Transparent White Glass Styling) */}
        <nav className="hidden xl:flex items-center gap-7 font-mono text-[11px] uppercase tracking-[0.16em]">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleScrollTo(item.id)}
                className={`relative py-1 flex flex-col items-center transition-colors ${
                  isActive
                    ? "text-zinc-900 dark:text-white font-bold"
                    : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white font-medium"
                }`}
              >
                <span>{item.label.toUpperCase()}</span>
                {isActive ? (
                  <motion.div
                    layoutId="stoktActiveDot"
                    className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-white mt-1 shadow-xs"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                ) : (
                  <div className="w-1.5 h-1.5 mt-1 opacity-0" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Utility Row (Clean Controls & CTA Button) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Utility toggles — hide music on very small screens to save space */}
          <div className="flex items-center gap-0.5 sm:gap-1">
            <LanguageToggle />
            <ThemeToggle />
            <div className="hidden xs:block sm:block">
              <MusicToggle />
            </div>
          </div>

          <button
            onClick={() => handleScrollTo("contact")}
            className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-zinc-900 text-white dark:bg-[#f5f0e9] dark:text-zinc-950 hover:bg-orange-600 dark:hover:bg-white font-mono text-[11px] font-bold tracking-wider uppercase transition-all shadow-xs"
          >
            <span>{t.nav.contact}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <Button
            onClick={onOpenCmdk}
            className="hidden sm:flex items-center gap-1 text-[11px] font-mono font-semibold rounded-xl border border-zinc-300/80 dark:border-white/15 bg-zinc-100/80 dark:bg-white/10 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-white/20 h-8 px-3 transition-all backdrop-blur-md"
          >
            <Command className="w-3 h-3 text-orange-500" />
            <span>⌘K</span>
          </Button>

          {/* Mobile / Tablet Menu Toggle */}
          <Button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-white/20 border border-zinc-300/80 dark:border-white/15 bg-white/40 dark:bg-white/10 h-8 w-8 p-0 flex items-center justify-center rounded-xl backdrop-blur-md shrink-0"
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
            className="pointer-events-auto xl:hidden mt-2 p-3 sm:p-4 rounded-2xl bg-white/98 dark:bg-zinc-900/98 text-zinc-900 dark:text-white backdrop-blur-2xl border border-zinc-200/80 dark:border-white/15 shadow-2xl"
          >
            {/* Nav grid — 2 cols on mobile, 4 cols on sm+ */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 font-mono text-xs">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleScrollTo(item.id)}
                  className={`flex items-center justify-between text-left py-2.5 px-3 rounded-xl transition-all ${
                    activeSection === item.id
                      ? "bg-zinc-900 text-white dark:bg-[#f5f0e9] dark:text-zinc-950 font-bold"
                      : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/10"
                  }`}
                >
                  <span className="uppercase tracking-wider text-[10px] sm:text-xs">{item.label}</span>
                  <span className="text-[10px] opacity-60 ml-1">→</span>
                </button>
              ))}
            </div>

            {/* Bottom row: music toggle (mobile only) + cmd palette */}
            <div className="pt-3 mt-3 border-t border-zinc-200/80 dark:border-white/10 flex items-center gap-2">
              {/* Show MusicToggle here on smallest screens */}
              <div className="xs:hidden flex-shrink-0">
                <MusicToggle />
              </div>
              <Button
                onClick={() => { setMobileMenuOpen(false); onOpenCmdk(); }}
                className="flex-1 flex justify-center items-center gap-2 text-xs font-mono font-semibold rounded-xl border border-zinc-300/80 dark:border-white/15 bg-zinc-100 dark:bg-white/10 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-white/20 h-10 shadow-xs"
              >
                <Command className="w-3.5 h-3.5 text-orange-500" />
                <span>Command Palette (⌘K)</span>
              </Button>
              <button
                onClick={() => handleScrollTo("contact")}
                className="md:hidden flex-shrink-0 flex items-center gap-1 px-3 py-2 rounded-xl bg-zinc-900 text-white dark:bg-[#f5f0e9] dark:text-zinc-950 font-mono text-[10px] font-bold tracking-wider uppercase transition-all"
              >
                <span>Contact</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}