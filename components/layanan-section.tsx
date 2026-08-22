"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Clock, MessageCircle, ShieldCheck, Zap, LayoutTemplate, Database, ShoppingCart, Wrench, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// WhatsApp link
const WA_NUMBER = "6281234567890";
const WA_MESSAGE = "Halo, saya tertarik dengan layanan pembuatan website & sistem";
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

const packageIcons = [
  { id: "landing",   icon: <Zap className="w-5 h-5 text-orange-500" />,          isPopular: false },
  { id: "company",   icon: <LayoutTemplate className="w-5 h-5 text-orange-500" />,isPopular: false },
  { id: "system",    icon: <Database className="w-5 h-5 text-orange-500" />,      isPopular: true  },
  { id: "ecommerce", icon: <ShoppingCart className="w-5 h-5 text-orange-500" />,  isPopular: false },
  { id: "addon",     icon: <Wrench className="w-5 h-5 text-orange-500" />,        isPopular: false },
];

// ─── Easing ──────────────────────────────────────────────────
const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

// ─── Variants ────────────────────────────────────────────────
const headingVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EXPO_OUT } },
};

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: EXPO_OUT },
  },
};

const popularCardVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 14,
      mass: 1,
    },
  },
};

const footerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EXPO_OUT },
  },
};

const VP = { once: true, amount: 0.12 } as const;

export default function LayananSection() {
  const { t } = useLanguage();
  const ls = t.layanan;
  const reduced = useReducedMotion();

  return (
    <section
      id="layanan"
      className="py-16 sm:py-24 relative overflow-hidden bg-background border-b border-zinc-200/80 dark:border-zinc-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          className="max-w-3xl mb-10 sm:mb-16 space-y-3 sm:space-y-4"
          variants={headingVariants}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={VP}
        >
          <div className="studio-badge text-orange-600 dark:text-orange-400">
            <Sparkles className="w-3 h-3" />
            <span>04 / SERVICES &amp; PRICING</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight text-foreground">
            {ls.heading}{" "}
            <span className="text-orange-gradient">
              {ls.headingHighlight}
            </span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-sans">
            {ls.subheading}
          </p>
        </motion.div>

        {/* Packages Grid
            Mobile  : 1 kolom (semua card full-width, rapi)
            sm ≥640 : 2 kolom  (card ke-5/addon center-span)
            xl ≥1280: 3 kolom  (semua 1 kolom per card)
        */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 xl:gap-6 mb-8 sm:mb-12"
          variants={gridVariants}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={VP}
        >
          {ls.packages.map((pkg: { name: string; price: string; description: string; duration: string }, index: number) => {
            const meta = packageIcons[index];
            // Card ke-5 (Add-on): center di sm 2-col grid
            const isLastOdd = index === 4;
            return (
              <motion.div
                key={meta.id}
                variants={meta.isPopular ? popularCardVariants : cardVariants}
                className={isLastOdd ? "sm:col-span-2 sm:max-w-sm sm:mx-auto sm:w-full xl:col-span-1 xl:max-w-none xl:mx-0" : ""}
              >
                <div
                  className={`studio-card relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 h-full flex flex-col justify-between gap-4 sm:gap-5 ${
                    meta.isPopular
                      ? "border-orange-500/40 dark:border-orange-500/40 ring-1 ring-orange-500/20 shadow-orange-500/5"
                      : ""
                  }`}
                >
                  {/* Popular Badge */}
                  {meta.isPopular && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="px-2.5 py-1 text-[10px] font-mono font-semibold bg-orange-500 text-white rounded-full uppercase tracking-widest shadow-xs">
                        {ls.popularBadge}
                      </span>
                    </div>
                  )}

                  <div className="space-y-3 sm:space-y-4">
                    {/* Icon + Package Name */}
                    <div className="flex items-center gap-3">
                      <div className="p-2 sm:p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 shrink-0">
                        {meta.icon}
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-foreground leading-tight">
                        {pkg.name}
                      </h3>
                    </div>

                    {/* Price Range */}
                    <div className="border-t border-zinc-200/80 dark:border-zinc-800/80 pt-3">
                      <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-1">
                        {ls.priceLabel}
                      </p>
                      <p className="text-lg sm:text-xl font-bold tracking-tight text-orange-600 dark:text-orange-400 font-mono leading-tight break-words">
                        {pkg.price}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
                      {pkg.description}
                    </p>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-2 pt-3 border-t border-zinc-200/80 dark:border-zinc-800/80 font-mono">
                    <Clock className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    <span className="text-[11px] uppercase tracking-wider text-zinc-500">
                      {ls.durationLabel}:{" "}
                      <span className="text-foreground font-semibold">{pkg.duration}</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Terms Note + CTA Banner */}
        <motion.div
          className="studio-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
          variants={footerVariants}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={VP}
        >
          {/* Note */}
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100 font-mono uppercase tracking-wide">
                {ls.noteLabel}:{" "}
              </span>
              {ls.noteText}
            </p>
          </div>

          {/* WhatsApp CTA Button — full width on mobile */}
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            id="layanan-wa-cta"
            className="flex items-center justify-center gap-2.5 w-full sm:w-auto sm:shrink-0 px-6 py-3.5 rounded-xl bg-emerald-600 text-white font-mono font-medium text-xs uppercase tracking-wider shadow-md hover:bg-emerald-500 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{ls.ctaBtn}</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
