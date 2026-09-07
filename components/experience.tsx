"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { experienceData } from "@/lib/experience-data";
import { useLanguage } from "@/lib/i18n";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EXPO_OUT } },
};

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EXPO_OUT } },
};

const VP = { once: true, amount: 0.1 } as const;

function EyebrowArrow() {
  return (
    <svg
      viewBox="0 0 15 12"
      className="h-3 w-3 shrink-0 -rotate-90 text-zinc-400 dark:text-zinc-500"
      aria-hidden="true"
    >
      <path
        d="M3.44.15 1.85 1.65a.83.83 0 0 0 0 1.07l2.86 2.7a.13.13 0 0 1-.12.2H.54A.42.42 0 0 0 0 6.05v1.9c0 .27.24.48.54.48h4.05c.13 0 .2.15.11.24L1.85 11.4c-.21.2-.21.5 0 .7l1.6 1.4a.62.62 0 0 0 .76 0l6.78-6.36a.62.62 0 0 0 0-.9L4.2.13a.62.62 0 0 0-.76 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Experience() {
  const { t } = useLanguage();
  const reduced = useReducedMotion();

  const experiences = experienceData;

  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const toggleCard = (idx: number) => {
    setActiveIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="experience"
      className="relative mx-2 overflow-hidden rounded-t-3xl border-b border-zinc-800/80 bg-black py-16 sm:mx-4 sm:py-24 lg:mx-6"
    >
      <div className="relative z-10 w-full px-4 sm:px-5 lg:px-6">
        {/* Header */}
        <motion.div
          className="mb-10 space-y-3 px-1 sm:mb-16 sm:space-y-4 sm:px-2 lg:px-2"
          variants={headingVariants}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={VP}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-500 sm:text-xs">
              ( Career Journey )
            </span>
            <EyebrowArrow />
          </div>

          {/* Mobile: allow natural wrap at a smaller size so it never gets
              squished unreadable. Desktop: keep it on one line as before. */}
          <h2
            className="font-bold leading-[1.1] tracking-tight text-white sm:whitespace-nowrap sm:leading-none"
            style={{ fontSize: "clamp(1.75rem, 8vw, 3.75rem)" }}
          >
            {t.experience.heading}{" "}
            <span className="text-orange-gradient">{t.experience.headingHighlight}</span>
          </h2>

          <p className="max-w-2xl text-sm text-zinc-400 sm:text-base">
            {t.experience.subheading}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 sm:gap-4"
          variants={gridVariants}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={VP}
        >
          {experiences.map((item, idx) => {
            const isOpen = activeIdx === idx;
            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                onClick={() => toggleCard(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") toggleCard(idx);
                }}
                className="group relative flex h-full cursor-pointer flex-col rounded-2xl border border-zinc-800 bg-black p-5 transition-colors duration-300 hover:bg-zinc-950 hover:border-zinc-700 sm:rounded-3xl sm:p-8"
              >
                {/* Meta — stacks on very small screens so long location text
                    never collides with the period label */}
                <div className="mb-3 flex flex-wrap items-center justify-between gap-1.5 pr-7 font-mono text-[11px] text-zinc-500 sm:mb-4 sm:flex-nowrap sm:gap-3 sm:pr-10 sm:text-xs">
                  <span>{item.period}</span>
                  <span className="truncate text-right">{item.location}</span>
                </div>

                {/* Title — slightly smaller on mobile so long role names don't
                    force awkward wraps against the corner icon */}
                <h3 className="mb-1.5 text-xl font-bold leading-tight text-white sm:text-2xl">
                  {item.role}
                </h3>
                <p className="mb-3 font-mono text-xs text-zinc-500 sm:mb-4 sm:text-sm">
                  {item.company}
                </p>

                <div className="mb-3 h-6 sm:mb-4">
                  {item.isCurrent && (
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-[10px] text-emerald-400">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                      {t.experience.currentRole}
                    </span>
                  )}
                </div>

                <p className="mb-4 line-clamp-3 text-[13px] leading-relaxed text-zinc-400 sm:mb-5 sm:text-sm">
                  {item.description}
                </p>

                {/* Tags — slightly tighter gap/padding on mobile */}
                <div className="mt-auto flex flex-wrap gap-1.5">
                  {item.techStack.slice(0, 6).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-zinc-800 bg-zinc-900/80 px-2 py-0.5 font-mono text-[9px] text-zinc-400 sm:px-2.5 sm:py-1 sm:text-[10px]"
                    >
                      {tech}
                    </span>
                  ))}
                  {item.techStack.length > 6 && (
                    <span className="rounded-full border border-zinc-800 bg-zinc-900/80 px-2 py-0.5 font-mono text-[9px] text-zinc-500 sm:px-2.5 sm:py-1 sm:text-[10px]">
                      +{item.techStack.length - 6}
                    </span>
                  )}
                </div>

                {/* Expand indicator — pulled in slightly on mobile so it
                    never sits flush against the rounded corner */}
                <ArrowUpRight
                  className={`absolute right-5 top-5 h-4 w-4 text-zinc-600 transition-all duration-300 sm:right-8 sm:top-8 ${
                    isOpen ? "translate-x-0.5 -translate-y-0.5 rotate-90 text-orange-500" : ""
                  }`}
                />

                <AnimatePresence initial={false}>
                  {isOpen && item.achievements.length > 0 && (
                    <motion.div
                      key="achievements"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: EXPO_OUT }}
                      className="mt-4 space-y-1.5 overflow-hidden border-t border-zinc-800 pt-4"
                    >
                      {item.achievements.slice(0, 3).map((ach, aIdx) => (
                        <p key={aIdx} className="text-xs leading-relaxed text-zinc-400">
                          • {ach}
                        </p>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}