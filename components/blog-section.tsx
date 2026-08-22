"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Search, Sparkles } from "lucide-react";
import { blogPostsData } from "@/lib/blog-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";

export default function BlogSection() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPostsData.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <section
      id="blog"
      className="py-24 relative overflow-hidden bg-background border-b border-zinc-200/80 dark:border-zinc-800/80"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="studio-badge text-orange-600 dark:text-orange-400">
            <Sparkles className="w-3 h-3" />
            <span>07 / TECHNICAL BLOG & WRITING</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-none text-foreground">
            {t.blog.heading}{" "}
            <span className="text-orange-gradient">
              {t.blog.headingHighlight}
            </span>
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 font-sans">
            {t.blog.subheading}
          </p>
        </div>

        {/* Studio Search Bar */}
        <div className="max-w-md mb-12 relative">
          <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-3.5" />
          <Input
            placeholder={t.blog.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 h-11 border border-zinc-300/80 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-900/80 text-sm font-mono text-foreground placeholder:text-zinc-400 rounded-xl w-full focus-visible:ring-1 focus-visible:ring-orange-500"
          />
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPosts.map((post, idx) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <div className="studio-card group rounded-3xl p-6 flex flex-col justify-between h-full space-y-6">
                
                <div className="space-y-4">
                  {/* Meta Indicators */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-orange-500" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-orange-500" />
                      {post.readingTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-orange-500 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Hash Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono bg-zinc-200/60 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 border border-zinc-300/60 dark:border-zinc-800 px-2 py-0.5 rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Read Button */}
                <div className="pt-4 border-t border-zinc-200/80 dark:border-zinc-800/80 mt-auto">
                  <Link href={`/blog/${post.slug}`} className="w-full">
                    <Button
                      variant="ghost"
                      className="w-full flex items-center justify-between font-mono text-xs font-semibold text-foreground border border-zinc-300/80 dark:border-zinc-800 bg-background hover:bg-orange-600 hover:text-white dark:hover:bg-orange-500 transition-all rounded-xl h-10 px-4"
                    >
                      <span>{t.blog.readArticle}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

