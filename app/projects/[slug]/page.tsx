import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getProjects, getProjectBySlug } from "@/lib/actions/projects";
import Footer from "@/components/footer";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.title} — Case Study`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Case Study`,
      description: project.description,
      images: [{ url: project.heroImage }],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = await getProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const nextProject = allProjects[currentIndex + 1] || allProjects[0];

  // Use showcase.webm for saung-angklung-udjo
  const heroMedia = project.slug === "saung-angklung-udjo" ? "/videos/showcase.webm" : project.heroImage;
  const isVideo = heroMedia.endsWith(".webm") || heroMedia.endsWith(".mp4");

  return (
    <div className="min-h-screen bg-[#f5f0eb] dark:bg-zinc-950 text-zinc-900 dark:text-white selection:bg-orange-500 selection:text-white">

      {/* ═══════════════════════════════════════════════════
          SECTION 1: Full-Viewport Hero
          Stokt style — full bleed image/video with overlay
      ═══════════════════════════════════════════════════ */}
      <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
        
        {/* Background Media (full bleed) */}
        {isVideo ? (
          <video
            src={heroMedia}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <img
            src={heroMedia}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Top Navigation */}
        <div className="absolute top-0 left-0 right-0 z-20 px-5 sm:px-8 py-5 flex items-center justify-between">
          <Link
            href="/#projects"
            className="group flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back Home</span>
          </Link>

          <span className="px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs border border-white/20">
            Web Design &amp; Development
          </span>
        </div>

        {/* Center Title */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end px-5 sm:px-8 pb-24 sm:pb-28">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white uppercase leading-[0.9]">
            {project.title}
          </h1>
          <p className="text-sm sm:text-base text-white/60 uppercase tracking-widest font-mono mt-3">
            {project.subtitle}
          </p>
        </div>

        {/* Bottom Meta Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-5 sm:px-8 py-5 flex flex-wrap items-end justify-between gap-4 border-t border-white/10">
          <div className="flex flex-wrap items-center gap-8 sm:gap-16">
            <div>
              <span className="block text-[10px] text-white/50 uppercase tracking-widest font-mono">Industry</span>
              <span className="text-sm text-white font-medium uppercase tracking-wide">{project.subtitle}</span>
            </div>
            <div>
              <span className="block text-[10px] text-white/50 uppercase tracking-widest font-mono">Year</span>
              <span className="text-sm text-white font-medium uppercase tracking-wide">{project.period.split("—")[0].trim()}</span>
            </div>
            <div>
              <span className="block text-[10px] text-white/50 uppercase tracking-widest font-mono">Role</span>
              <span className="text-sm text-white font-medium uppercase tracking-wide">{project.role}</span>
            </div>
          </div>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 text-sm text-orange-400 hover:text-orange-300 font-mono uppercase tracking-wider transition-colors"
            >
              <span>Visit the website</span>
              <span className="font-bold underline underline-offset-2">{project.liveUrl.replace("https://", "").toUpperCase()}</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 2: { INTRO } — Large Quote + Description
          Two-column layout: big display text left, body right
      ═══════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-32 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">

          <span className="text-xs font-mono text-orange-500 uppercase tracking-widest mb-10 block">
            {"{ INTRO }"}
          </span>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
            <div>
              <p className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] text-zinc-900 dark:text-white">
                {project.content.overview.split(".").slice(0, 2).join(".")}.
              </p>
            </div>
            <div>
              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {project.content.overview}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 3: { CREDITS }
          Clean centered credits block
      ═══════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 px-5 sm:px-8 text-center">
        <div className="max-w-7xl mx-auto">
          <span className="text-xs font-mono text-orange-500 uppercase tracking-widest mb-8 block">
            {"{ CREDITS }"}
          </span>

          <h3 className="text-3xl sm:text-4xl font-medium tracking-tight text-zinc-900 dark:text-white">
            Rifdan Dermawan
          </h3>
          <p className="text-sm text-zinc-500 uppercase tracking-widest font-mono mt-2">
            {project.role}
          </p>

          <div className="w-3 h-3 bg-zinc-900 dark:bg-white mx-auto mt-8" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 4: { TECH STACK } — Horizontal Dark Bar
          Icons row across full width
      ═══════════════════════════════════════════════════ */}
      <section className="w-full bg-zinc-900 dark:bg-zinc-800/50 py-6 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-6 sm:gap-10">
          <span className="text-xs font-mono text-orange-500 uppercase tracking-widest shrink-0">
            {"{ TECH STACK }"}
          </span>
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-sm font-mono text-white/80 uppercase tracking-wider"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 5: { THE CHALLENGE } — Quote + Body
      ═══════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-32 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">

          <span className="text-xs font-mono text-orange-500 uppercase tracking-widest mb-10 block">
            {"{ THE CHALLENGE }"}
          </span>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
            <div>
              <p className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] text-zinc-900 dark:text-white">
                {project.content.challenge.split(".").slice(0, 2).join(".")}.
              </p>
            </div>
            <div className="space-y-6">
              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {project.content.challenge}
              </p>
              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {project.content.research}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 6: Gallery Image (Full Bleed)
      ═══════════════════════════════════════════════════ */}
      {project.content.gallery.length > 0 && (
        <section className="w-full px-5 sm:px-8 pb-8">
          <div className="max-w-7xl mx-auto">
            <img
              src={project.content.gallery[0]}
              alt={`${project.title} showcase`}
              className="w-full h-[300px] sm:h-[500px] object-cover rounded-2xl"
            />
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════
          SECTION 7: { THE SOLUTION } — Architecture & Design
      ═══════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-32 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">

          <span className="text-xs font-mono text-orange-500 uppercase tracking-widest mb-10 block">
            {"{ THE SOLUTION }"}
          </span>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
            <div>
              <p className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] text-zinc-900 dark:text-white">
                {project.content.architecture.split(".").slice(0, 2).join(".")}.
              </p>
            </div>
            <div className="space-y-6">
              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {project.content.architecture}
              </p>
              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {project.content.frontend}
              </p>
              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {project.content.backend}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 8: Second Gallery Image
      ═══════════════════════════════════════════════════ */}
      {project.content.gallery.length > 1 && (
        <section className="w-full px-5 sm:px-8 pb-8">
          <div className="max-w-7xl mx-auto">
            <img
              src={project.content.gallery[1]}
              alt={`${project.title} detail`}
              className="w-full h-[300px] sm:h-[500px] object-cover rounded-2xl"
            />
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════
          SECTION 9: { RESULTS } — Performance & Impact
      ═══════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-32 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">

          <span className="text-xs font-mono text-orange-500 uppercase tracking-widest mb-10 block">
            {"{ RESULTS }"}
          </span>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-16">
            {project.metrics.map((m, idx) => (
              <div key={idx}>
                <div className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">{m.value}</div>
                <div className="text-xs text-zinc-500 uppercase tracking-widest font-mono mt-2">{m.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
            <div>
              <p className="text-3xl sm:text-4xl font-medium tracking-tight leading-[1.1] text-zinc-900 dark:text-white">
                {project.content.performance.split(".").slice(0, 2).join(".")}.
              </p>
            </div>
            <div className="space-y-6">
              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {project.content.performance}
              </p>
              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {project.content.deployment}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 10: { TAKEAWAY }
      ═══════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-32 px-5 sm:px-8 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto text-center">

          <span className="text-xs font-mono text-orange-500 uppercase tracking-widest mb-10 block">
            {"{ TAKEAWAY }"}
          </span>

          <p className="text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.15] text-zinc-900 dark:text-white">
            {project.content.lessonsLearned}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 11: Next Case Study Navigation
      ═══════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-6 block">
            Next Case Study
          </span>

          <Link
            href={`/projects/${nextProject.slug}`}
            className="group inline-block"
          >
            <h3 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white uppercase group-hover:text-orange-500 transition-colors leading-tight">
              {nextProject.title}
            </h3>
            <p className="text-sm text-zinc-500 uppercase tracking-widest font-mono mt-3">
              {nextProject.subtitle}
            </p>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
