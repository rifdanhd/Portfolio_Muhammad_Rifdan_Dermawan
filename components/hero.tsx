"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, Download } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export default function Hero() {
  const { t } = useLanguage();
  const reduced = useReducedMotion();

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative w-full h-[calc(100svh-1.5rem)] sm:h-[calc(100vh-2rem)] flex flex-col bg-[#100603] text-white overflow-hidden rounded-2xl sm:rounded-3xl mx-auto"
      style={{
        maxWidth: "calc(100vw - 1.5rem)",
        marginTop: "0.75rem",
        marginBottom: "0.5rem",
        marginLeft: "0.75rem",
        marginRight: "0.75rem",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_65%_40%,#7c2404_0%,#3d1002_40%,#100603_100%)] pointer-events-none" />

      <div className="absolute top-1/3 right-[30%] w-[500px] h-[500px] bg-orange-700/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Profile image — full-bleed background on mobile, portrait-right from sm: up */}
      <motion.div
        initial={reduced ? false : { opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="pointer-events-none absolute inset-0 z-[5] w-full sm:inset-y-0 sm:right-0 sm:left-auto sm:w-[62%] lg:w-[52%]"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 30%, black 75%, transparent 100%)",
          WebkitMaskComposite: "source-in",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 30%, black 75%, transparent 100%)",
          maskComposite: "intersect",
        }}
      >
        <div
          className="absolute inset-0 blur-3xl opacity-80"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 60% 45%, #7c2404 0%, #3d1002 45%, transparent 75%)",
          }}
        />

        <img
          src="/images/heroprofile.PNG"
          alt=""
          className="absolute bottom-0 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-0 h-[65%] sm:h-[92%] w-auto max-w-none scale-x-[-1] object-contain object-bottom grayscale-[25%] opacity-40 sm:opacity-100"
          style={{
            mixBlendMode: "luminosity",
            filter: "contrast(1.15) saturate(1.3) brightness(0.95)",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 45% 35% at 68% 18%, rgba(60,16,4,0.65) 0%, rgba(60,16,4,0.25) 50%, transparent 80%)",
            mixBlendMode: "multiply",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 90% at 75% 45%, transparent 0%, transparent 25%, rgba(60,16,4,0.55) 65%, rgba(16,6,3,0.8) 100%)",
            mixBlendMode: "multiply",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(16,6,3,0.55) 0%, transparent 22%, transparent 70%, rgba(16,6,3,0.65) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle 220px at 62% 38%, rgba(60,16,4,0.4) 0%, transparent 70%)",
            mixBlendMode: "multiply",
          }}
        />

        {/* Extra dark scrim behind mobile text so it stays readable over the photo */}
        <div className="absolute inset-0 bg-[#100603]/55 sm:hidden" />
      </motion.div>

      {/* ── CONTENT: centered on mobile, left-aligned from sm: up ── */}
      <div className="relative z-10 flex flex-col items-center text-center sm:items-start sm:text-left justify-center flex-1 px-4 sm:px-14 lg:px-20">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-[11px] text-white/70 tracking-[0.14em] sm:tracking-[0.18em] uppercase mb-4 sm:mb-5"
        >
          <span className="text-white/40">[</span>
          <span className="max-w-[220px] sm:max-w-none truncate sm:whitespace-normal">
            {t.hero.badge || "WE ARE RIFDAN"}
          </span>
          <span className="text-white/40">]</span>
          <ArrowRight className="w-3 h-3 text-white/50 shrink-0" />
        </motion.div>

        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="font-extrabold uppercase leading-[1] sm:leading-[0.95] text-white mb-3 sm:mb-4 max-w-[15ch] sm:max-w-2xl mx-auto sm:mx-0"
          style={{ fontSize: "clamp(2rem, 10vw, 4.5rem)", letterSpacing: "-0.02em" }}
        >
          MOVING BRANDS
          <br />
          FORWARD
        </motion.h1>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16 }}
          className="text-[13px] sm:text-sm text-white/60 max-w-[85%] sm:max-w-xs leading-relaxed mb-6 sm:mb-7 font-sans mx-auto sm:mx-0"
        >
          {t.hero.description ||
            "I build, develop, and deploy Laravel-based web applications for real-world business needs."}
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.22 }}
          className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 w-full"
        >
          <button
            onClick={scrollToProjects}
            className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-lg border border-white/30 text-white text-[11px] sm:text-xs font-mono font-bold tracking-wide sm:tracking-wider uppercase hover:bg-white/10 transition-all group"
          >
            <span>{t.hero.viewProjects || "VIEW PROJECTS"}</span>
            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={scrollToContact}
            className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-lg border border-white/30 text-white text-[11px] sm:text-xs font-mono font-bold tracking-wide sm:tracking-wider uppercase hover:bg-white/10 transition-all group"
          >
            <span>GET A QUOTE</span>
            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
<a
          
            href="/cv/rifdan-cv.pdf"
            download
            className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-orange-500 text-white text-[11px] sm:text-xs font-mono font-bold tracking-wide sm:tracking-wider uppercase hover:bg-orange-400 transition-all group"
          >
            <span>{t.hero.downloadResume || "DOWNLOAD CV"}</span>
            <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>

      {/* ── Bottom bar ── */}
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.35 }}
        className="relative z-10 flex flex-row items-center justify-between gap-1 px-4 sm:px-14 lg:px-20 py-2.5 sm:py-4 border-t border-white/8 font-mono text-[10px] sm:text-[11px] text-white/35"
      >
        <div className="flex items-center gap-1.5">
          <span>Scroll for more</span>
          <ArrowDown className="w-3 h-3 text-orange-400/70 animate-bounce" />
        </div>
        <span>Est. in 2024</span>
      </motion.div>
    </section>
  );
}