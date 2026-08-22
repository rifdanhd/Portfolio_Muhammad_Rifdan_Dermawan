"use client";

import React from "react";
import { ArrowDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

interface BrandItem {
  name: string;
  category: string;
  url: string;
  imageSrc?: string;
  customRender?: React.ReactNode;
}

const BRAND_ITEMS: BrandItem[] = [
  {
    name: "Saung Angklung Udjo",
    category: "Official Cultural Platform",
    url: "https://angklung-udjo.co.id",
    imageSrc: "/logos/udjo.png",
  },
  {
    name: "Universitas Teknologi Bandung (UTB)",
    category: "Academic Institution",
    url: "https://utb-univ.ac.id",
    imageSrc: "/logos/utb.png",
  },
  {
    name: "GAMEN Indonesia",
    category: "Brand & Affiliate Partner",
    url: "https://gamen.id",
    imageSrc: "/logos/gamen.png",
  },
  {
    name: "Blackbox AI",
    category: "AI Code Engine",
    url: "https://www.blackbox.ai",
    customRender: (
      <div className="flex items-center gap-3">
        <img
          src="/logos/blackbox.png"
          alt="Blackbox AI"
          className="h-10 sm:h-12 md:h-14 w-auto object-contain rounded-lg shadow-sm"
        />
        <div className="flex flex-col text-left">
          <span className="font-sans font-black tracking-tight text-xl sm:text-2xl md:text-3xl uppercase leading-none text-zinc-900 dark:text-white">
            BLACKBOX<span className="text-emerald-500">.AI</span>
          </span>
          <span className="font-mono text-[8px] sm:text-[9px] text-zinc-400 dark:text-zinc-500 tracking-widest uppercase">
            AI Collaboration
          </span>
        </div>
      </div>
    ),
  },
  {
    name: "EKSAVAPOR / Brand Partner",
    category: "Partner Brand",
    url: "https://instagram.com/idanderrrrr",
    imageSrc: "/logos/logo2.png",
  },
];

export default function TickerMarquee() {
  const { language } = useLanguage();
  const label = language === "id" ? "[MELANGKAH MAJU]" : "[MOVING FORWARD]";

  return (
    <section className="relative w-full overflow-hidden py-16 sm:py-24 md:py-28 select-none border-b border-zinc-200/80 dark:border-zinc-800/80">
      
      {/* Eyebrow Label (Stokt Reference) */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-10 sm:mb-14">
        <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.22em]">
          <span>{label}</span>
          <ArrowDown className="w-3.5 h-3.5 text-orange-500 animate-bounce" />
        </div>
      </div>

      {/* Spacious Logo Track */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Left & Right Soft Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-40 md:w-56 bg-gradient-to-r from-[var(--bg-page)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-40 md:w-56 bg-gradient-to-l from-[var(--bg-page)] to-transparent z-10 pointer-events-none" />

        {/* Scrolling Logo Track */}
        <div className="flex overflow-x-hidden w-full marquee-row items-center">
          <div className="flex animate-marquee space-x-16 sm:space-x-28 md:space-x-36 shrink-0 flex-nowrap items-center py-4 pr-16 sm:pr-28 md:pr-36">
            {/* Repeated list for seamless infinite scroll */}
            {[...BRAND_ITEMS, ...BRAND_ITEMS].map((brand, idx) => (
              <a
                key={`brand-${idx}`}
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center opacity-85 hover:opacity-100 transition-all duration-300 transform hover:scale-105 cursor-pointer grayscale hover:grayscale-0"
                title={`${brand.name} — Visit ${brand.url}`}
              >
                {brand.customRender ? (
                  brand.customRender
                ) : (
                  <img
                    src={brand.imageSrc}
                    alt={brand.name}
                    className="h-14 sm:h-18 md:h-22 w-auto max-w-[180px] sm:max-w-[240px] md:max-w-[280px] object-contain dark:brightness-125 dark:contrast-125 transition-all"
                  />
                )}
              </a>
            ))}
          </div>

          <div className="flex animate-marquee space-x-16 sm:space-x-28 md:space-x-36 shrink-0 flex-nowrap items-center py-4 pr-16 sm:pr-28 md:pr-36" aria-hidden="true">
            {[...BRAND_ITEMS, ...BRAND_ITEMS].map((brand, idx) => (
              <a
                key={`brand-dup-${idx}`}
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center opacity-85 hover:opacity-100 transition-all duration-300 transform hover:scale-105 cursor-pointer grayscale hover:grayscale-0"
                title={`${brand.name} — Visit ${brand.url}`}
              >
                {brand.customRender ? (
                  brand.customRender
                ) : (
                  <img
                    src={brand.imageSrc}
                    alt={brand.name}
                    className="h-14 sm:h-18 md:h-22 w-auto max-w-[180px] sm:max-w-[240px] md:max-w-[280px] object-contain dark:brightness-125 dark:contrast-125 transition-all"
                  />
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
