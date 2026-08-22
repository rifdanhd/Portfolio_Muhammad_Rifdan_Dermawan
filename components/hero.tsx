"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
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
      style={{ maxWidth: "calc(100vw - 1.5rem)", marginTop: "0.75rem", marginBottom: "0.5rem", marginLeft: "0.75rem", marginRight: "0.75rem" }}
    >
      {/* ── Full-cover warm radial gradient (like Stokt's warm orange-red stage) ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_65%_40%,#7c2404_0%,#3d1002_40%,#100603_100%)] pointer-events-none" />

      {/* ── Extra glow center-right ── */}
      <div className="absolute top-1/3 right-[30%] w-[500px] h-[500px] bg-orange-700/20 rounded-full blur-[120px] pointer-events-none" />

      {/* ── Decorative floating dot (like Stokt's small white dot) ── */}
      <div className="absolute top-[22%] left-[32%] w-2 h-2 rounded-full bg-white/60" />

      {/* ── CONTENT: pinned to bottom-left, exact Stokt layout ── */}
      <div className="relative z-10 flex flex-col justify-end flex-1 px-5 sm:px-14 lg:px-20 pb-10 sm:pb-12">
        {/* Eyebrow tag */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 font-mono text-[11px] text-white/70 tracking-[0.18em] uppercase mb-5"
        >
          <span className="text-white/40">[</span>
          <span>{t.hero.badge || "WE ARE RIFDAN"}</span>
          <span className="text-white/40">]</span>
          <ArrowRight className="w-3 h-3 text-white/50" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="font-bold uppercase leading-[1] text-white mb-4"
          style={{ fontSize: "clamp(2rem, 8vw, 5rem)", letterSpacing: "-0.01em" }}
        >
          MOVING BRANDS
          <br />
          FORWARD
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16 }}
          className="text-sm text-white/60 max-w-xs leading-relaxed mb-7 font-sans"
        >
          {t.hero.description ||
            "I build, develop, and deploy Laravel-based web applications for real-world business needs."}
        </motion.p>

        {/* CTA Buttons — exact Stokt pill style */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.22 }}
          className="flex flex-wrap items-center gap-2 sm:gap-3"
        >
          <button
            onClick={scrollToProjects}
            className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg border border-white/30 text-white text-xs font-mono font-bold tracking-wider uppercase hover:bg-white/10 transition-all group"
          >
            <span>{t.hero.viewProjects || "VIEW PROJECTS"}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={scrollToContact}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/30 text-white text-xs font-mono font-bold tracking-wider uppercase hover:bg-white/10 transition-all group"
          >
            <span>GET A QUOTE</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* ── Bottom bar: Scroll for more  •  Est. date ── */}
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.35 }}
        className="relative z-10 flex items-center justify-between px-5 sm:px-14 lg:px-20 py-3 sm:py-4 border-t border-white/8 font-mono text-[11px] text-white/35"
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