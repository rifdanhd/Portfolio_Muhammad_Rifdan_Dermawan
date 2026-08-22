"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Ticket, Server } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/i18n";

const achievements = [
  {
    icon: <Ticket className="w-5 h-5" />,
    number: "50,000+",
    title: "Cultural Tickets Processed",
    subtitle: "Saung Angklung Udjo",
    description: "Architected the primary Laravel 12 ticketing backend handling international tourists daily.",
  },
  {
    icon: <Server className="w-5 h-5" />,
    number: "99.95%",
    title: "Production System Uptime",
    subtitle: "Cloudflare & cPanel Infrastructure",
    description: "Defended platform against malicious subdomain injection attacks with zero downtime.",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    number: "100/100",
    title: "PageSpeed & Lighthouse Score",
    subtitle: "Performance & SEO Optimization",
    description: "Reduced mobile page load latency from 4.8 seconds to sub-800ms initial paint.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    number: "100%",
    title: "Idempotent Payment Settlement",
    subtitle: "Midtrans Gateway Integration",
    description: "Implemented atomic database locking to process real-time QRIS & bank transfer webhooks.",
  },
];

export default function Achievements() {
  const { t } = useLanguage();

  return (
    <section
      id="achievements"
      className="py-20 relative overflow-hidden bg-background border-b-2 border-foreground dark:border-zinc-800"
    >
      <div className="absolute inset-0 bg-editorial-grid opacity-100 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Index Eyebrow */}
        <div className="flex items-center gap-2 font-mono text-xs font-bold text-foreground mb-8">
          <span className="bg-foreground text-background px-2 py-0.5 border border-foreground">06</span>
          <span className="uppercase tracking-widest">// {t.achievements.badge}</span>
        </div>

        {/* Heading Block */}
        <div className="max-w-3xl mb-16 space-y-4">
          <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tighter uppercase leading-none text-foreground font-display-strict">
            {t.achievements.heading} <br />
            <span className="text-background bg-foreground px-2 py-0.5 mt-1 inline-block">
              {t.achievements.headingHighlight}
            </span>
          </h2>
          <p className="font-mono text-sm text-zinc-500 dark:text-zinc-400 font-medium">
            {t.achievements.subheading}
          </p>
        </div>

        {/* Stats Grid - Brutalist spreadsheet layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t-2 border-l-2 border-foreground dark:border-zinc-800 bg-background">
          {achievements.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 border-r-2 border-b-2 border-foreground dark:border-zinc-800 hover:bg-[#0DFF72]/5 transition-colors group flex flex-col justify-between h-full"
            >
              <div className="space-y-4 font-mono">
                {/* Meta Indicator */}
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2">
                  <div className="w-8 h-8 border-2 border-foreground dark:border-zinc-800 flex items-center justify-center bg-background text-foreground group-hover:bg-[#0DFF72] group-hover:text-black transition-colors duration-100">
                    {item.icon}
                  </div>
                  <span className="text-[10px] text-zinc-400 font-bold uppercase">INDEX // 0{idx + 1}</span>
                </div>

                {/* Stat Big Number */}
                <div className="text-3xl sm:text-4xl font-display font-black tracking-tighter text-foreground uppercase font-display-strict">
                  {item.number}
                </div>

                <div className="space-y-1">
                  <h3 className="text-xs font-bold text-foreground uppercase tracking-wide">
                    {item.title}
                  </h3>
                  <span className="text-[10px] text-zinc-400 block font-bold uppercase">{item.subtitle}</span>
                </div>

                <p className="text-[11px] text-zinc-500 leading-normal border-t border-zinc-200 dark:border-zinc-800 pt-3">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
