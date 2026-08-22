"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n";
import { Sparkles } from "lucide-react";

interface TechItem {
  name: string;
  category: string;
  desc: string;
  iconSvg: React.ReactNode;
}

const techItems: TechItem[] = [
  {
    name: "Laravel 12",
    category: "Backend",
    desc: "Core Monolithic & API Framework",
    iconSvg: (
      <svg className="w-4 h-4 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    name: "PHP 8.3",
    category: "Language",
    desc: "Strictly Typed Backend Logic",
    iconSvg: (
      <svg className="w-4 h-4 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 12h16M12 4v16" />
      </svg>
    ),
  },
  {
    name: "Next.js 16",
    category: "Frontend",
    desc: "App Router & React Server Components",
    iconSvg: (
      <svg className="w-4 h-4 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    category: "Language",
    desc: "Compile-Time Type Safety",
    iconSvg: (
      <svg className="w-4 h-4 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
        <text x="3" y="17" fontSize="14" fontFamily="monospace" fontWeight="bold">TS</text>
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    category: "Styling",
    desc: "Utility-First Design System",
    iconSvg: (
      <svg className="w-4 h-4 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 3c-4.97 3-6 7-3 11 3 4 7 1 7-4 0-2-1-4-4-7z" />
      </svg>
    ),
  },
  {
    name: "MySQL / MariaDB",
    category: "Database",
    desc: "Relational Data Modeling & Indexing",
    iconSvg: (
      <svg className="w-4 h-4 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    name: "Three.js",
    category: "3D WebGL",
    desc: "Interactive WebGL Shaders & Canvas",
    iconSvg: (
      <svg className="w-4 h-4 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    name: "Cloudflare",
    category: "DevOps",
    desc: "Edge WAF, DNS Proxy & CDN",
    iconSvg: (
      <svg className="w-4 h-4 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    ),
  },
  {
    name: "Midtrans API",
    category: "Payments",
    desc: "Snap JS & Dynamic QRIS Gateways",
    iconSvg: (
      <svg className="w-4 h-4 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
  },
  {
    name: "Alpine.js & Vite",
    category: "Frontend",
    desc: "Lightweight Reactivity & Build Tool",
    iconSvg: (
      <svg className="w-4 h-4 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    name: "cPanel & VPS",
    category: "Infrastructure",
    desc: "Linux Server Administration & SSL",
    iconSvg: (
      <svg className="w-4 h-4 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
  },
  {
    name: "Git Version Control",
    category: "Tooling",
    desc: "Branching, PR Audits & CI/CD",
    iconSvg: (
      <svg className="w-4 h-4 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="18" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M18 15V9a6 6 0 0 0-6-6H6" />
      </svg>
    ),
  },
];

const row1 = techItems.slice(0, 6);
const row2 = techItems.slice(6, 12);

export default function TechStack() {
  const { t } = useLanguage();

  return (
    <section
      id="tech-stack"
      className="py-24 relative overflow-hidden bg-background border-b border-zinc-200/80 dark:border-zinc-800/80 select-none"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 mb-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="studio-badge text-orange-600 dark:text-orange-400">
            <Sparkles className="w-3 h-3" />
            <span>06 / PRODUCTION ARSENAL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-none text-foreground">
            {t.techStack.heading}{" "}
            <span className="text-orange-gradient">
              {t.techStack.headingHighlight}
            </span>
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 font-sans">
            {t.techStack.subheading}
          </p>
        </div>
      </div>

      {/* Marquee Ticker Container */}
      <div className="flex flex-col gap-6 relative w-full overflow-hidden py-4">
        {/* Gradient Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

        {/* Row 1: Left to Right Marquee */}
        <div className="flex overflow-x-hidden w-full marquee-row">
          <div className="flex animate-marquee space-x-6 shrink-0 flex-nowrap items-center">
            {row1.map((item, idx) => (
              <TechCard key={`r1-${idx}`} item={item} globalIndex={idx + 1} />
            ))}
          </div>
          <div className="flex animate-marquee space-x-6 shrink-0 flex-nowrap items-center" aria-hidden="true">
            {row1.map((item, idx) => (
              <TechCard key={`r1-dup-${idx}`} item={item} globalIndex={idx + 1} />
            ))}
          </div>
        </div>

        {/* Row 2: Right to Left Marquee */}
        <div className="flex overflow-x-hidden w-full marquee-row">
          <div className="flex animate-marquee-reverse space-x-6 shrink-0 flex-nowrap items-center">
            {row2.map((item, idx) => (
              <TechCard key={`r2-${idx}`} item={item} globalIndex={idx + 7} />
            ))}
          </div>
          <div className="flex animate-marquee-reverse space-x-6 shrink-0 flex-nowrap items-center" aria-hidden="true">
            {row2.map((item, idx) => (
              <TechCard key={`r2-dup-${idx}`} item={item} globalIndex={idx + 7} />
            ))}
          </div>
        </div>
      </div>

      {/* Custom Keyframe Styles */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee {
          display: flex;
          flex-wrap: nowrap;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
        .animate-marquee-reverse {
          display: flex;
          flex-wrap: nowrap;
          width: max-content;
          animation: marquee-reverse 35s linear infinite;
        }
        .marquee-row:hover .animate-marquee,
        .marquee-row:hover .animate-marquee-reverse {
          animation-play-state: running;
        }
        .marquee-row .tech-card:hover {
          animation-play-state: paused !important;
        }
      `}</style>
    </section>
  );
}

function TechCard({ item, globalIndex }: { item: TechItem; globalIndex: number }) {
  const formattedIndex = globalIndex < 10 ? `0${globalIndex}` : `${globalIndex}`;

  return (
    <div className="tech-card studio-card w-[320px] h-[150px] rounded-2xl p-5 flex flex-col justify-between hover:border-orange-500/50 transition-all shrink-0">
      <div className="space-y-3 font-mono">
        {/* Info row */}
        <div className="flex items-center justify-between border-b border-zinc-200/80 dark:border-zinc-800/80 pb-2">
          <span className="text-[10px] text-zinc-400 uppercase tracking-widest">NO. // {formattedIndex}</span>
          <div className="flex items-center gap-2">
            {item.iconSvg}
            <span className="text-[10px] font-semibold text-orange-600 dark:text-orange-400 uppercase bg-orange-500/10 px-2 py-0.5 rounded-full border border-orange-500/20">
              {item.category}
            </span>
          </div>
        </div>

        <h3 className="text-base font-bold text-foreground group-hover:text-orange-500 uppercase tracking-tight truncate">
          {item.name}
        </h3>
        <p className="text-[12px] text-zinc-600 dark:text-zinc-400 leading-normal line-clamp-2 font-sans">
          {item.desc}
        </p>
      </div>
    </div>
  );
}