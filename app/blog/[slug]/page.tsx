import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react";
import { blogPostsData } from "@/lib/blog-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import NavbarWrapper from "@/components/navbar-wrapper";
import Footer from "@/components/footer";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPostsData.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPostsData.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostDetailPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPostsData.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      <NavbarWrapper />

      <main className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/blog">
          <Button
            variant="ghost"
            size="sm"
            className="mb-8 font-mono text-xs text-zinc-400 hover:text-white flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </Button>
        </Link>

        {/* Post Header */}
        <div className="space-y-6 mb-12 border-b border-zinc-800 pb-12">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="default" className="font-mono text-xs">
                #{tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                <User className="w-4 h-4" />
              </div>
              <div>
                <div className="text-white font-semibold">{post.author.name}</div>
                <div className="text-zinc-500">{post.author.role}</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-purple-400" />
                {post.readingTime}
              </span>
            </div>
          </div>
        </div>

        {/* MDX Body Content View */}
        <article className="prose prose-invert prose-blue max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-400 prose-code:text-blue-300 prose-pre:bg-[#111113] prose-pre:border prose-pre:border-zinc-800 leading-relaxed text-zinc-300">
          <div className="whitespace-pre-wrap font-sans space-y-6 text-base">
            {post.content}
          </div>
        </article>

        {/* Back Link */}
        <div className="mt-16 pt-8 border-t border-zinc-800 flex justify-between items-center">
          <Link href="/blog">
            <Button variant="outline" className="font-mono text-xs border-zinc-800">
              ← Read More Articles
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
