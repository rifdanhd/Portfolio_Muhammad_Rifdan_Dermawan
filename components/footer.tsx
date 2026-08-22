"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function Footer() {
  const { language } = useLanguage();
  const isId = language === "id";

  return (
    <footer
      className="relative w-full min-h-[520px] sm:min-h-[600px] flex flex-col justify-between bg-[#100603] text-white overflow-hidden rounded-2xl sm:rounded-3xl mx-auto select-none border border-white/10"
      style={{
        maxWidth: "calc(100vw - 1.5rem)",
        marginTop: "1.5rem",
        marginBottom: "1rem",
        marginLeft: "0.75rem",
        marginRight: "0.75rem",
      }}
    >
      {/* ── Same Warm Radial Gradient as Hero (Stokt Red-Orange Stage) ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_85%_at_50%_75%,#7c2404_0%,#3d1002_45%,#100603_100%)] pointer-events-none" />

      {/* ── Center Atmospheric Glow ── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-orange-600/15 rounded-full blur-[140px] pointer-events-none" />

      {/* ── Decorative Floating Dot (like Stokt Hero) ── */}
      <div className="absolute top-[18%] left-[28%] w-2 h-2 rounded-full bg-white/60" />

      {/* ── TOP SECTION: 5-Column Navigation (Stokt Exact Hierarchy) ── */}
      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-16 pt-10 sm:pt-14 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">
          
          {/* Brand Info (Col 1-2 on desktop) */}
          <div className="col-span-2 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              rifdan<span className="text-orange-500">.dev</span>
            </h2>
            <div className="space-y-1 text-xs sm:text-sm text-zinc-400 font-sans">
              <p>Bandung — Indonesia</p>
              <a
                href="mailto:rifdandermawan252@gmail.com"
                className="block text-zinc-300 hover:text-orange-400 transition-colors font-mono pt-0.5"
              >
                rifdandermawan252@gmail.com
              </a>
            </div>
          </div>

          {/* Index */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400">
              {isId ? "Navigasi" : "Index"}
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-400 font-sans">
              <li>
                <Link href="/#hero" className="hover:text-white transition-colors">
                  {isId ? "Beranda" : "Home"}
                </Link>
              </li>
              <li>
                <Link href="/#projects" className="hover:text-white transition-colors">
                  {isId ? "Proyek Pilihan" : "Featured Work"}
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-white transition-colors">
                  {isId ? "Tentang Saya" : "About"}
                </Link>
              </li>
              <li>
                <Link href="/#experience" className="hover:text-white transition-colors">
                  {isId ? "Pengalaman" : "Experience"}
                </Link>
              </li>
              <li>
                <Link href="/#layanan" className="hover:text-white transition-colors">
                  {isId ? "Layanan" : "Services"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Capabilities */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400">
              {isId ? "Keahlian" : "Expertise"}
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-400 font-sans">
              <li>
                <span className="text-zinc-300">Full-Stack Web Apps</span>
              </li>
              <li>
                <span className="text-zinc-300">Payment Gateways</span>
              </li>
              <li>
                <span className="text-zinc-300">Laravel Architecture</span>
              </li>
              <li>
                <span className="text-zinc-300">Database Optimization</span>
              </li>
              <li>
                <span className="text-zinc-300">Cloud Infrastructure</span>
              </li>
            </ul>
          </div>

          {/* Case Studies */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400">
              {isId ? "Studi Kasus" : "Case Studies"}
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-400 font-sans">
              <li>
                <Link href="/projects/saung-angklung-udjo" className="hover:text-white transition-colors">
                  Saung Angklung Udjo
                </Link>
              </li>
              <li>
                <Link href="/#experience" className="hover:text-white transition-colors">
                  EKSAVAPOR Visuals
                </Link>
              </li>
              <li>
                <Link href="/projects/warranty-system" className="hover:text-white transition-colors">
                  QR Warranty Engine
                </Link>
              </li>
              <li>
                <Link href="/projects/ticket-reservation" className="hover:text-white transition-colors">
                  Ticket Platform
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400">
              Socials
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-400 font-sans">
              <li>
                <a
                  href="https://github.com/rifdanhd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between hover:text-white transition-colors"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-orange-400 transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/muhammad-rifdan-dermawan-1532a7388"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between hover:text-white transition-colors"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-orange-400 transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/idanderrrrr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between hover:text-white transition-colors"
                >
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-orange-400 transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href="mailto:rifdandermawan252@gmail.com"
                  className="group flex items-center justify-between hover:text-white transition-colors"
                >
                  <span>Email</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-orange-400 transition-colors" />
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* ── MIDDLE ATMOSPHERE STAGE (Visual Stage Presence) ── */}
      <div className="relative z-10 w-full flex-1 flex items-center justify-center pointer-events-none opacity-40">
        <div className="w-24 h-24 rounded-full border border-orange-500/20 bg-orange-500/5 backdrop-blur-3xl animate-pulse" />
      </div>

      {/* ── BOTTOM BAR: Copyright & Tech Attribution ── */}
      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-16 py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-zinc-400">
        <p>
          © {new Date().getFullYear()} M. Rifdan Dermawan. All rights reserved.
        </p>

        <div className="flex items-center gap-6 font-mono text-[11px] text-zinc-400 uppercase tracking-wider">
          <span>Built with Next.js 15 &amp; TypeScript</span>
        </div>
      </div>
    </footer>
  );
}
