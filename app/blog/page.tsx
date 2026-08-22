import React from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Calendar, Clock, ArrowRight } from "lucide-react";
import { blogPostsData } from "@/lib/blog-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import NavbarWrapper from "@/components/navbar-wrapper";
import Footer from "@/components/footer";

export const metadata = {
  title: "Blog & Technical Articles",
  description: "Technical writing and architectural guides by Muhammad Rifdan Dermawan.",
};

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      <NavbarWrapper />

      <main className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/">
          <Button
            variant="ghost"
            size="sm"
            className="mb-8 font-mono text-xs text-zinc-400 hover:text-white flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </Button>
        </Link>

        {/* Header */}
        <div className="space-y-4 mb-16">
          <Badge variant="default" className="font-mono uppercase tracking-widest text-xs px-4 py-1">
            Engineering Blog
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            Technical Writing & <span className="text-gradient-primary">Architectural Notes</span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl">
            Deep dives into web platform rebuilds, payment webhook resiliency, and 3D WebGL performance optimization.
          </p>
        </div>

        {/* Articles List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPostsData.map((post) => (
            <Card
              key={post.slug}
              className="border-zinc-800 bg-[#18181B]/80 hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between p-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-purple-400" />
                    {post.readingTime}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-white hover:text-blue-400 transition-colors leading-snug">
                  {post.title}
                </h2>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded border border-zinc-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-800/80 mt-6">
                <Link href={`/blog/${post.slug}`}>
                  <Button
                    variant="default"
                    size="sm"
                    className="w-full flex items-center justify-between font-mono text-xs"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
