"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { projectsData } from "@/lib/projects-data";
import { getProjects } from "@/lib/actions/projects";
import { useLanguage } from "@/lib/i18n";
import { Project } from "@/types";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EXPO_OUT } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.99 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: EXPO_OUT },
  },
};

const VP = { once: true, amount: 0.1 } as const;

export default function ProjectsSection() {
  const { language } = useLanguage();
  const reduced = useReducedMotion();
  const [projects, setProjects] = useState<Project[]>(projectsData);

  useEffect(() => {
    getProjects().then((dbProjects) => {
      if (dbProjects && dbProjects.length > 0) {
        setProjects(dbProjects.filter((p) => p.featured));
      }
    });
  }, []);

  const headingText = language === "id" ? "Featured Work" : "Featured Work";
  const allWorkText = language === "id" ? "ALL WORK" : "ALL WORK";

  const p1 = projects[0] || projectsData[0];
  const p2 = projects[1] || projectsData[1];

  const mediaSrc = p1.slug === "saung-angklung-udjo" ? "/videos/showcase.webm" : (p1.videoSrc || p1.heroImage || "/videos/showcase.webm");
  const isVideo = mediaSrc.endsWith(".webm") || mediaSrc.endsWith(".mp4") || mediaSrc.endsWith(".mov");

  return (
    <section
      id="projects"
      className="py-14 sm:py-20 md:py-24 relative overflow-hidden bg-background border-b border-zinc-200/80 dark:border-zinc-800/80 select-none"
    >
      <div className="w-full px-4 sm:px-5 lg:px-6 relative z-10">
        
        {/* ── Section Header (Stokt Clean Minimal Style) ── */}
        <motion.div
          className="flex flex-row items-center justify-between gap-4 mb-6 sm:mb-10"
          variants={headingVariants}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={VP}
        >
          {/* Clean Title + Down Arrow */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-none">
              {headingText}
            </h2>
            <ArrowDown className="w-5 h-5 sm:w-8 sm:h-8 text-foreground stroke-[2.5]" />
          </div>

          {/* Top Right "ALL WORK ->" link */}
          <Link
            href="#projects"
            className="group flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-zinc-500 hover:text-foreground transition-colors"
          >
            <span>{allWorkText}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* ── Projects Grid: 2 Columns Side-by-Side (Stokt Exact Ratio) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
          
          {/* ── Left Card (~65% width): Video Laptop Showcase ── */}
          <motion.div
            variants={cardVariants}
            initial={reduced ? false : "hidden"}
            whileInView="visible"
            viewport={VP}
            className="lg:col-span-8"
          >
            <Link
              href={`/projects/${p1.slug}`}
              className="group block relative w-full h-[380px] sm:h-[480px] md:h-[540px] rounded-2xl sm:rounded-3xl overflow-hidden bg-zinc-950 shadow-lg border border-zinc-200/60 dark:border-zinc-800/60"
            >
              {/* Full-Bleed Video Media */}
              {isVideo ? (
                <video
                  src={mediaSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                >
                  <source src={mediaSrc} type="video/webm" />
                  <source src={mediaSrc} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={mediaSrc}
                  alt={p1.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                />
              )}

              {/* Subtle Bottom Shadow Gradient for Crisp Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Clean Floating "SEE PROJECT ➔" Badge on Hover */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                <div className="px-4 py-2 rounded-lg bg-black/80 text-white font-mono text-[11px] font-semibold tracking-wider uppercase flex items-center gap-1.5 shadow-xl border border-white/10 backdrop-blur-md">
                  <span>SEE PROJECT</span>
                  <ArrowRight className="w-3 h-3 text-orange-400" />
                </div>
              </div>

              {/* Clean Bottom-Left Title & Subtitle (Stokt Exact Typography) */}
              <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7 z-10 space-y-2">
                <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-white drop-shadow-sm">
                  Saung Angklung Udjo
                </h3>
                <div className="inline-block px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white/90 text-xs font-normal border border-white/15">
                  Web Design &amp; Development
                </div>
              </div>
            </Link>
          </motion.div>

          {/* ── Right Card (~35% width): EKSAVAPOR Creative Artwork ── */}
          <motion.div
            variants={cardVariants}
            initial={reduced ? false : "hidden"}
            whileInView="visible"
            viewport={VP}
            className="lg:col-span-4"
          >
            <Link
              href="#experience"
              className="group block relative w-full h-[380px] sm:h-[480px] md:h-[540px] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0d0c0b] shadow-lg border border-zinc-200/60 dark:border-zinc-800/60 p-5 sm:p-7 flex flex-col justify-between"
            >
              {/* ── 3D Poster Stack ── */}
              <div className="relative w-full flex-1 flex items-center justify-center overflow-hidden">
                <div className="relative w-full max-w-[240px] h-[200px] sm:h-[240px] flex items-center justify-center">
                  
                  {/* Left Poster */}
                  <div className="absolute left-0 w-24 sm:w-28 aspect-[9/16] rounded-lg overflow-hidden shadow-xl border border-zinc-700/80 transform -rotate-12 -translate-x-2 group-hover:-rotate-16 group-hover:-translate-x-5 transition-all duration-500 z-10 bg-zinc-900">
                    <img
                      src="/projects/eksavapor/manis.jpg"
                      alt="Eksavapor"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Center Poster */}
                  <div className="absolute w-28 sm:w-32 aspect-[9/16] rounded-lg overflow-hidden shadow-2xl border border-white/20 transform group-hover:scale-105 transition-all duration-500 z-20 bg-zinc-900">
                    <img
                      src="/projects/eksavapor/chrome.jpg"
                      alt="Eksavapor Chrome"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Right Poster */}
                  <div className="absolute right-0 w-24 sm:w-28 aspect-[9/16] rounded-lg overflow-hidden shadow-xl border border-zinc-700/80 transform rotate-12 translate-x-2 group-hover:rotate-16 group-hover:translate-x-5 transition-all duration-500 z-10 bg-zinc-900">
                    <img
                      src="/projects/eksavapor/anodized.jpg"
                      alt="Eksavapor Anodized"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Ambient Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 rounded-full blur-2xl pointer-events-none" />
                </div>
              </div>

              {/* Floating "SEE PROJECT ➔" Badge on Hover */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                <div className="px-4 py-2 rounded-lg bg-black/80 text-white font-mono text-[11px] font-semibold tracking-wider uppercase flex items-center gap-1.5 shadow-xl border border-white/10 backdrop-blur-md">
                  <span>SEE PROJECT</span>
                  <ArrowRight className="w-3 h-3 text-orange-400" />
                </div>
              </div>

              {/* Clean Bottom-Left Title & Subtitle (Stokt Exact Typography) */}
              <div className="relative z-10 space-y-2 pt-2">
                <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-white drop-shadow-sm">
                  We Scale It
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-block px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white/90 text-xs font-normal border border-white/10">
                    Brand Identity
                  </div>
                  <div className="inline-block px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white/90 text-xs font-normal border border-white/10">
                    Web Design &amp; Development
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

        </div>

      </div>
    </section>
  );
}