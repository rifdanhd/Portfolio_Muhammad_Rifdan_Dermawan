"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight, Layers, Server, ShieldCheck, Terminal, Cpu } from "lucide-react";
import dynamic from "next/dynamic";
import { useLanguage } from "@/lib/i18n";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  SiLaravel, SiPhp, SiNextdotjs, SiMysql, SiTailwindcss, SiRedis,
  SiCloudflare, SiDocker, SiTypescript, SiAlpinedotjs, SiLinux, SiPostman, SiGit,
} from "react-icons/si";

const InteractiveGlobe = dynamic(() => import("@/components/Globe"), {
  ssr: false,
  loading: () => <div className="w-[340px] sm:w-[420px] aspect-square" />,
});

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EXPO_OUT } },
};

const VP = { once: true, amount: 0.1 } as const;

// ⬅️ Konstanta di luar komponen — reference-nya stabil, nggak dibikin ulang tiap render.
// Ini yang mencegah Globe.tsx destroy+recreate globe setiap kali About re-render.
const GLOBE_MARKERS = [
  { location: [-6.9175, 107.6191] as [number, number], size: 0.09, color: [0.98, 0.45, 0.08] as [number, number, number] },
];
const GLOBE_BASE_COLOR: [number, number, number] = [0.65, 0.65, 0.7];
const GLOBE_GLOW_COLOR: [number, number, number] = [0.25, 0.25, 0.35];

const tools = [
  { name: "Laravel", tag: "Backend Core", Icon: SiLaravel, color: "#FF2D20" },
  { name: "PHP 8.3", tag: "Modern Engine", Icon: SiPhp, color: "#777BB4" },
  { name: "Next.js", tag: "React Framework", Icon: SiNextdotjs, color: "#ffffff" },
  { name: "MySQL", tag: "Relational DB", Icon: SiMysql, color: "#4479A1" },
  { name: "Tailwind CSS", tag: "Design System", Icon: SiTailwindcss, color: "#38BDF8" },
  { name: "Redis", tag: "Cache & Queue", Icon: SiRedis, color: "#DC382D" },
  { name: "Cloudflare", tag: "Edge & WAF", Icon: SiCloudflare, color: "#F38020" },
  { name: "Docker", tag: "Containerization", Icon: SiDocker, color: "#2496ED" },
  { name: "TypeScript", tag: "Type Safety", Icon: SiTypescript, color: "#3178C6" },
  { name: "Alpine.js", tag: "Micro Interaction", Icon: SiAlpinedotjs, color: "#8BC0D0" },
  { name: "Linux VPS", tag: "Infrastructure", Icon: SiLinux, color: "#FCC624" },
  { name: "Postman", tag: "API Testing", Icon: SiPostman, color: "#FF6C37" },
  { name: "Git", tag: "Version Control", Icon: SiGit, color: "#F05032" },
];

export default function About() {
  const { language } = useLanguage();
  const reduced = useReducedMotion();
  const isId = language === "id";

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="about"
      className="py-16 sm:py-24 md:py-28 mx-2 sm:mx-4 lg:mx-6 rounded-b-3xl bg-black text-white border-b border-zinc-800/80 select-none overflow-hidden"
    >
      <div className="w-full px-4 sm:px-5 lg:px-6 space-y-6 sm:space-y-8">

        {/* ── Section Tag / Header (Stokt Exact Style) ── */}
        <motion.div
          className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-400"
          variants={fadeUp}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={VP}
        >
          <span>[ {isId ? "TENTANG KAMI" : "ABOUT ME"} ]</span>
          <ArrowDown className="w-3.5 h-3.5 text-zinc-400" />
        </motion.div>

        {/* ════════════════════════════════════════════════════════════════
            ROW 1: BENTO GRID (Metrics + 3D Monogram + Interactive Globe)
        ════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-stretch">

          {/* ── Column 1: 3 Stacked Metrics Cards (3 cols) ── */}
          <div className="md:col-span-12 lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">

            {/* Metric 1 */}
            <motion.div
              variants={fadeUp}
              initial={reduced ? false : "hidden"}
              whileInView="visible"
              viewport={VP}
              className="bg-black rounded-2xl p-6 sm:p-7 border border-zinc-800/80 flex flex-col justify-center shadow-lg"
            >
              <div className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-2 font-sans">
                3+
              </div>
              <div className="text-xs text-zinc-400 uppercase tracking-wider font-mono">
                {isId ? "Tahun Rekayasa Software" : "Years Software Engineering"}
              </div>
            </motion.div>

            {/* Metric 2 */}
            <motion.div
              variants={fadeUp}
              initial={reduced ? false : "hidden"}
              whileInView="visible"
              viewport={VP}
              className="bg-black rounded-2xl p-6 sm:p-7 border border-zinc-800/80 flex flex-col justify-center shadow-lg"
            >
              <div className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-2 font-sans">
                10+
              </div>
              <div className="text-xs text-zinc-400 uppercase tracking-wider font-mono">
                {isId ? "Sistem & Proyek Produksi" : "Production Platforms Built"}
              </div>
            </motion.div>

            {/* Metric 3 */}
            <motion.div
              variants={fadeUp}
              initial={reduced ? false : "hidden"}
              whileInView="visible"
              viewport={VP}
              className="bg-black rounded-2xl p-6 sm:p-7 border border-zinc-800/80 flex flex-col justify-center shadow-lg"
            >
              <div className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-2 font-sans">
                50K+
              </div>
              <div className="text-xs text-zinc-400 uppercase tracking-wider font-mono">
                {isId ? "Tiket & Transaksi Lapangan" : "Tickets & Operations Handled"}
              </div>
            </motion.div>

          </div>

          {/* ── Column 2: 3D Monogram Sculpture Card (4 cols) ── */}
          <motion.div
            variants={fadeUp}
            initial={reduced ? false : "hidden"}
            whileInView="visible"
            viewport={VP}
            className="md:col-span-6 lg:col-span-4 bg-black rounded-2xl p-6 sm:p-8 border border-zinc-800/80 flex flex-col justify-between shadow-lg relative overflow-hidden group min-h-[300px]"
          >
            {/* 3D Geometric Sculpture Stage */}
            <div className="relative w-full flex-1 flex items-center justify-center py-4">
              <div className="relative w-36 h-36 flex items-center justify-center">

                {/* 3D Modern Angular Metallic Monogram */}
                <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-zinc-950 via-zinc-800 to-zinc-600 p-[1.5px] shadow-2xl transform group-hover:rotate-6 group-hover:scale-105 transition-all duration-700">
                  <div className="w-full h-full rounded-[22px] bg-gradient-to-br from-zinc-900 via-black to-zinc-950 flex flex-col items-center justify-center p-4 border border-white/10 relative overflow-hidden">

                    {/* Metallic Ribbon Cut */}
                    <div className="w-14 h-14 border-4 border-white/80 rounded-2xl transform -rotate-12 flex items-center justify-center">
                      <span className="font-mono text-xl font-black text-white">R</span>
                    </div>

                    {/* Subtle Reflection Glare */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Soft Ambient Glow */}
                <div className="absolute inset-0 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
              </div>
            </div>

            {/* Bottom Info Bar */}
            <div className="relative z-10 pt-4 space-y-1">
              <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Full-Stack Software Architecture
              </h4>
              <Link
                href="/#experience"
                className="group/link inline-flex items-center gap-1 text-xs font-mono text-zinc-400 hover:text-orange-400 transition-colors"
              >
                <span>{isId ? "Pelajari Selengkapnya" : "Learn More"}</span>
                <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

        {/* ── Column 3: Interactive WebGL Dot-Matrix Globe Card (5 cols) ── */}
<motion.div
  variants={fadeUp}
  initial={reduced ? false : "hidden"}
  whileInView="visible"
  viewport={VP}
  className="md:col-span-6 lg:col-span-5 bg-black rounded-2xl p-6 sm:p-8 border border-zinc-800/80 flex flex-col shadow-lg relative overflow-hidden min-h-[360px] group"
>
  {/* Top Text & Live Status Badge */}
  <div className="relative z-10 space-y-2">
    <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-white">
      {isId ? "Berbasis di Bandung, Indonesia" : "Based in Bandung, Indonesia"}
    </h3>

    <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <span className="uppercase tracking-widest text-[11px] text-zinc-300 font-mono">
        {isId ? "TERSEDIA SELURUH DUNIA" : "AVAILABLE WORLDWIDE"}
      </span>
    </div>
  </div>

  {/* ── Globe pinned to the card's own bottom edge — overflow-hidden on THIS card clips it cleanly ── */}
  <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-[38%] sm:translate-y-[34%] z-0 pointer-events-auto">
    <InteractiveGlobe
      className="w-[420px] sm:w-[520px] lg:w-[560px] max-w-none"
      markers={GLOBE_MARKERS}
      baseColor={GLOBE_BASE_COLOR}
      glowColor={GLOBE_GLOW_COLOR}
      scale={1.1}
      autoRotateSpeed={0.003}
    />
  </div>
</motion.div>

        </div>

        {/* ════════════════════════════════════════════════════════════════
            ROW 2: FOUNDER / PROFILE NARRATIVE BENTO
        ════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">

          {/* ── Left: Profile Portrait Card (4 cols) ── */}
          <motion.div
            variants={fadeUp}
            initial={reduced ? false : "hidden"}
            whileInView="visible"
            viewport={VP}
            className="lg:col-span-4 bg-black rounded-2xl overflow-hidden border border-zinc-800/80 shadow-lg relative min-h-[300px] sm:min-h-[360px] flex flex-col justify-end p-6 group"
          >
            {/* Background Portrait Photo with Warm Amber Stage */}
            <img
              src="/Portfolio.jpg"
              alt="Muhammad Rifdan Dermawan"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-105"
            />

            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

            {/* Bottom-left Founder Label */}
            <div className="relative z-10 space-y-1">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-md">
                Muhammad Rifdan
              </h3>
              <p className="text-xs font-mono uppercase tracking-widest text-orange-400">
                SOFTWARE ENGINEER &amp; ARCHITECT
              </p>
            </div>
          </motion.div>

          {/* ── Center: Bio & Engineering Narrative Card (5 cols) ── */}
          <motion.div
            variants={fadeUp}
            initial={reduced ? false : "hidden"}
            whileInView="visible"
            viewport={VP}
            className="lg:col-span-5 bg-black rounded-2xl p-6 sm:p-8 border border-zinc-800/80 flex flex-col justify-between shadow-lg space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {isId ? "Dedikasi & Rekayasa Sistem" : "Craft & Systems Engineering"}
              </h3>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                {isId
                  ? "Rifdan mendedikasikan fokusnya dalam merancang arsitektur web modern yang andal, scalable, dan siap menghadapi beban transaksi nyata. Dari sistem ticketing ribuan pengunjung di Saung Angklung Udjo hingga gateway pembayaran dinamis QRIS."
                  : "Rifdan specializes in engineering high-performance web systems and bulletproof payment architectures built for real-world traffic surges, operational durability, and seamless user experiences."}
              </p>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                {isId
                  ? "Menggabungkan performa backend Laravel 12 yang presisi, optimasi query database relasional, serta antarmuka digital yang bersih dan intuitif."
                  : "Combining monolithic & modular Laravel backend precision, database caching optimizations, and modern responsive frontend design systems."}
              </p>
            </div>

            {/* Bottom CTA Link */}
            <div className="pt-2 border-t border-zinc-800/80">
              <a
                href="#contact"
                onClick={scrollToContact}
                className="group/cta inline-flex items-center gap-2 text-xs font-mono text-zinc-300 hover:text-orange-400 transition-colors uppercase tracking-wider font-semibold"
              >
                <span>{isId ? "Bekerja sama dengan Rifdan" : "Collaborate with Rifdan"}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/cta:translate-x-1 transition-transform text-orange-500" />
              </a>
            </div>
          </motion.div>

          {/* ── Right: Production Stack Monogram Card (3 cols) ── */}
          <motion.div
            variants={fadeUp}
            initial={reduced ? false : "hidden"}
            whileInView="visible"
            viewport={VP}
            className="lg:col-span-3 bg-black rounded-2xl p-6 sm:p-7 border border-zinc-800/80 flex flex-col justify-between shadow-lg group"
          >
            {/* 3D Modern Visual Icon */}
            <div className="relative w-full flex-1 flex items-center justify-center py-6">
              <div className="w-36 h-36 rounded-3xl bg-gradient-to-br from-zinc-800 to-zinc-950 p-3 flex items-center justify-center border border-zinc-700/60 shadow-2xl transform group-hover:scale-110 transition-transform duration-500">
                <Terminal className="w-16 h-16 text-orange-500" />
              </div>
            </div>

            {/* Bottom Label */}
            <div className="space-y-1 pt-3">
              <h4 className="text-sm font-bold text-white tracking-tight">
                Production-Ready Stack
              </h4>
              <Link
                href="/#tech-stack"
                className="group/link inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400 hover:text-orange-400 transition-colors"
              >
                <span>{isId ? "Pelajari Selengkapnya" : "Learn More"}</span>
                <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

        </div>

        {/* ════════════════════════════════════════════════════════════════
            ROW 3: PRODUCTION ARSENAL MARQUEE (Stokt Bottom Marquee)
        ════════════════════════════════════════════════════════════════ */}
        <motion.div
          variants={fadeUp}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={VP}
          className="w-full bg-black rounded-2xl p-4 sm:p-5 border border-zinc-800/80 flex flex-col lg:flex-row items-center gap-4 lg:gap-8 overflow-hidden shadow-lg"
        >
          {/* Label on Left */}
          <div className="shrink-0 text-xs font-mono uppercase tracking-widest text-zinc-400 px-2 text-center lg:text-left">
        <span className="text-white font-bold block">Everyday's Toolbox</span>
<span className="text-[10px] text-zinc-400">Mastered for every project.</span>
          </div>

       <div className="flex-1 overflow-hidden relative w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
  <div
    className="flex items-center gap-3 animate-marquee whitespace-nowrap will-change-transform hover:[animation-play-state:paused]"
    style={{ animationDuration: "140s" }}
  >
    {[...tools, ...tools].map((tool, idx) => (
      <div
        key={idx}
        className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-zinc-900/90 border border-zinc-700/60 shrink-0 hover:scale-110 hover:border-zinc-500 transition-all duration-300"
      >
        <tool.Icon className="w-7 h-7 sm:w-8 sm:h-8" style={{ color: tool.color }} />
      </div>
    ))}
  </div>
</div>
        </motion.div>

      </div>
    </section>
  );
}