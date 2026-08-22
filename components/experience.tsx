"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { Briefcase, MapPin, CheckCircle2, Sparkles } from "lucide-react";
import { experienceData } from "@/lib/experience-data";
import { getExperiences } from "@/lib/actions/experience";
import { useLanguage } from "@/lib/i18n";
import { ExperienceItem } from "@/types";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// ─── Easing ──────────────────────────────────────────────────
const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

// ─── Variants ────────────────────────────────────────────────
const lineVariants: Variants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 1.2, ease: EXPO_OUT },
  },
};

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: EXPO_OUT },
  },
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EXPO_OUT },
  },
};

const VP = { once: true, amount: 0.1 } as const;

export default function Experience() {
  const { t } = useLanguage();
  const reduced = useReducedMotion();
  const [experiences, setExperiences] = useState<ExperienceItem[]>(experienceData);

  useEffect(() => {
    getExperiences().then((dbExp) => {
      if (dbExp && dbExp.length > 0) {
        setExperiences(dbExp);
      }
    });
  }, []);

  return (
    <section
      id="experience"
      className="py-24 relative overflow-hidden bg-background border-b border-zinc-200/80 dark:border-zinc-800/80"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          className="max-w-3xl mb-16 space-y-4"
          variants={headingVariants}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={VP}
        >
          <div className="studio-badge text-orange-600 dark:text-orange-400">
            <Sparkles className="w-3 h-3" />
            <span>02 / CAREER TIMELINE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-none text-foreground">
            {t.experience.heading}{" "}
            <span className="text-orange-gradient">
              {t.experience.headingHighlight}
            </span>
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400">
            {t.experience.subheading}
          </p>
        </motion.div>

        {/* Studio Timeline Grid */}
        <div className="relative max-w-4xl mx-auto pl-8 sm:pl-10">

          {/* Animated timeline line */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-[2px] bg-orange-500/30 dark:bg-orange-500/20 origin-top"
            variants={lineVariants}
            initial={reduced ? false : "hidden"}
            whileInView="visible"
            viewport={VP}
          />

          {/* Staggered timeline items */}
          <motion.div
            className="space-y-12"
            variants={listVariants}
            initial={reduced ? false : "hidden"}
            whileInView="visible"
            viewport={VP}
          >
            {experiences.map((item, idx) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="relative"
              >
                {/* Timeline Connector Box Node */}
                <div className="absolute -left-[39px] sm:-left-[51px] top-2 z-10 flex items-center justify-center w-7 h-7 rounded-full border border-orange-500/40 bg-zinc-900 text-white shadow-sm">
                  <span className="text-[10px] font-mono font-semibold text-orange-400">{idx + 1}</span>
                </div>

                {/* Job Card Block */}
                <div className="studio-card p-5 sm:p-8 rounded-2xl sm:rounded-3xl space-y-5 sm:space-y-6">

                  {/* Meta Row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-200/80 dark:border-zinc-800/80 font-mono text-xs">
                    <span className="font-semibold text-orange-600 dark:text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                      {item.period}
                    </span>
                    {item.isCurrent && (
                      <span className="flex items-center gap-2 font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        {t.experience.currentRole}
                      </span>
                    )}
                  </div>

                  {/* Job Title & Org */}
                  <div className="space-y-1.5">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                      {item.role}
                    </h3>
                    <div className="text-sm font-semibold font-mono text-zinc-500 tracking-wide flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-orange-500" />
                      <span>{item.company}</span>
                      <span>•</span>
                      <span>{item.location}</span>
                    </div>
                  </div>

                  {/* Task Description */}
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
                    {item.description}
                  </p>

                  {/* Accomplishments */}
                  <div className="space-y-2 border-t border-zinc-200/80 dark:border-zinc-800/80 pt-4">
                    <span className="block text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                      {t.experience.achievements}
                    </span>
                    {item.achievements.map((ach, aIdx) => (
                      <div key={aIdx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 font-sans">
                        <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technical Stack Tags */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-200/80 dark:border-zinc-800/80">
                    {item.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono bg-zinc-200/60 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 border border-zinc-300/60 dark:border-zinc-800 px-2.5 py-1 rounded-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                </div>

              </motion.div>
            ))}
          </motion.div>

        </div>

      </div>
    </section>
  );
}

