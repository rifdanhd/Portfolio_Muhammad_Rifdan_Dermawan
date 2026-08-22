"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { skillsData } from "@/lib/skills-data";
import { Layout, Server, Database, Cpu, Palette, Cloud, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const categoryIconMap: Record<string, React.ReactNode> = {
  Frontend: <Layout className="w-4 h-4 text-orange-500" />,
  Backend:  <Server  className="w-4 h-4 text-orange-500" />,
  Database: <Database className="w-4 h-4 text-orange-500" />,
  DevOps:   <Cpu     className="w-4 h-4 text-orange-500" />,
  "UI Design": <Palette className="w-4 h-4 text-orange-500" />,
  Cloud:    <Cloud   className="w-4 h-4 text-orange-500" />,
};

export default function Skills() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("Frontend");
  const selectedCategoryData = skillsData.find((c) => c.category === activeCategory) ?? skillsData[0];
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (reduced) {
      setReady(true);
      return;
    }
    setReady(false);
    const timer = setTimeout(() => {
      setReady(true);
    }, 150);
    return () => clearTimeout(timer);
  }, [activeCategory, reduced]);

  return (
    <section
      id="skills"
      className="py-24 relative overflow-hidden bg-background border-b border-zinc-200/80 dark:border-zinc-800/80"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="studio-badge text-orange-600 dark:text-orange-400">
            <Sparkles className="w-3 h-3" />
            <span>05 / TECHNICAL COMPETENCIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-none text-foreground">
            {t.skills.heading}{" "}
            <span className="text-orange-gradient">
              {t.skills.headingHighlight}
            </span>
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 font-sans">
            {t.skills.subheading}
          </p>
        </div>

        {/* Category Tabs Pill Switcher — scrollable on mobile */}
        <div className="mb-10 overflow-x-auto pb-2 -mx-2 px-2">
          <div className="flex items-center gap-2 min-w-max mx-auto max-w-4xl p-1.5 rounded-2xl bg-zinc-200/60 dark:bg-zinc-900/80 border border-zinc-300/60 dark:border-zinc-800">
            {skillsData.map((cat) => {
              const isActive = activeCategory === cat.category;
              return (
                <button
                  key={cat.category}
                  onClick={() => setActiveCategory(cat.category)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-all h-9 sm:h-10 whitespace-nowrap ${
                    isActive
                      ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-300/50 dark:hover:bg-zinc-800/50"
                  }`}
                >
                  {categoryIconMap[cat.category]}
                  <span>{cat.category}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Competencies Details Block */}
        <motion.div
          key={activeCategory}
          initial={reduced ? false : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="studio-card p-6 sm:p-8 rounded-3xl">
            
            {/* Header info line */}
            <div className="flex items-center gap-3 pb-6 border-b border-zinc-200/80 dark:border-zinc-800/80 mb-8 font-mono">
              <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20">
                {categoryIconMap[selectedCategoryData.category]}
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground uppercase tracking-wide">
                  {selectedCategoryData.category} STACK
                </h3>
                <span className="text-[11px] text-zinc-500 uppercase tracking-widest">
                  {selectedCategoryData.skills.length} {t.skills.verified}
                </span>
              </div>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {selectedCategoryData.skills.map((skill, sIdx) => (
                <div key={sIdx} className="space-y-2.5">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-foreground font-semibold uppercase tracking-wider">{skill.name}</span>
                    <div className="flex items-center gap-3 text-zinc-500">
                      <span>{skill.experience}</span>
                      <span className="text-orange-600 dark:text-orange-400 font-bold">{skill.level}%</span>
                    </div>
                  </div>
                  
                  {/* Studio Smooth Progress bar */}
                  <div className="w-full h-3 rounded-full bg-zinc-200/80 dark:bg-zinc-800 overflow-hidden p-0.5">
                    <div
                      className="h-full bg-orange-500 rounded-full skill-bar-fill transition-all duration-700"
                      style={{ width: ready ? `${skill.level}%` : "0%" }}
                    />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}

