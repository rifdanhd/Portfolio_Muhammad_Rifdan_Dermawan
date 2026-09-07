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

  const heroMedia = project.slug === "saung-angklung-udjo" ? "/videos/showcase.webm" : project.heroImage;
  const isVideo = heroMedia.endsWith(".webm") || heroMedia.endsWith(".mp4");

  return (
    <div className="min-h-screen bg-[#f5f0eb] dark:bg-zinc-950 text-zinc-900 dark:text-white selection:bg-orange-500 selection:text-white">

      {/* ═══════════════════════════════════════════════════
          SECTION 1: Full-Viewport Hero
      ═══════════════════════════════════════════════════ */}
      <section className="relative w-full h-[100svh] min-h-[560px] overflow-hidden">

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

        <div className="absolute inset-0 bg-black/50" />

        {/* Top Navigation */}
        <div className="absolute top-0 left-0 right-0 z-20 px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between gap-3">
          <Link
            href="/#projects"
            className="group flex items-center gap-1.5 sm:gap-2 text-white/80 hover:text-white transition-colors text-xs sm:text-sm shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Link>

          <span className="px-3 sm:px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-[10px] sm:text-xs border border-white/20 text-center leading-tight">
            Web Design &amp; Development
          </span>
        </div>

        {/* Center Title */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end px-4 sm:px-8 pb-40 sm:pb-32">
          <h1 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white uppercase leading-[0.95] sm:leading-[0.9] break-words">
            {project.title}
          </h1>
          <p className="text-xs sm:text-base text-white/60 uppercase tracking-widest font-mono mt-2 sm:mt-3">
            {project.subtitle}
          </p>
        </div>

        {/* Bottom Meta Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-4 sm:px-8 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-t border-white/10">
          <div className="flex flex-wrap items-start gap-x-6 gap-y-3 sm:gap-x-16">
            <div>
              <span className="block text-[9px] sm:text-[10px] text-white/50 uppercase tracking-widest font-mono">Industry</span>
              <span className="text-xs sm:text-sm text-white font-medium uppercase tracking-wide">{project.subtitle}</span>
            </div>
            <div>
              <span className="block text-[9px] sm:text-[10px] text-white/50 uppercase tracking-widest font-mono">Year</span>
              <span className="text-xs sm:text-sm text-white font-medium uppercase tracking-wide">{project.period.split("—")[0].trim()}</span>
            </div>
            <div>
              <span className="block text-[9px] sm:text-[10px] text-white/50 uppercase tracking-widest font-mono">Role</span>
              <span className="text-xs sm:text-sm text-white font-medium uppercase tracking-wide">{project.role}</span>
            </div>
          </div>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 text-xs sm:text-sm text-orange-400 hover:text-orange-300 font-mono uppercase tracking-wider transition-colors min-w-0"
            >
              <span className="shrink-0">Visit</span>
              <span className="font-bold underline underline-offset-2 truncate">
                {project.liveUrl.replace("https://", "").toUpperCase()}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 2: { INTRO }
      ═══════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-32 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">

          <span className="text-xs font-mono text-orange-500 uppercase tracking-widest mb-6 sm:mb-10 block">
            {"{ INTRO }"}
          </span>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-20">
            <div>
              <p className="text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.15] sm:leading-[1.1] text-zinc-900 dark:text-white">
                {project.content.overview.split(".").slice(0, 2).join(".")}.
              </p>
            </div>
            <div>
              <p className="text-sm sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {project.content.overview}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 3: { CREDITS }
      ═══════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-24 px-4 sm:px-8 text-center">
        <div className="max-w-7xl mx-auto">
          <span className="text-xs font-mono text-orange-500 uppercase tracking-widest mb-6 sm:mb-8 block">
            {"{ CREDITS }"}
          </span>

          <h3 className="text-2xl sm:text-4xl font-medium tracking-tight text-zinc-900 dark:text-white">
            Rifdan Dermawan
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500 uppercase tracking-widest font-mono mt-2">
            {project.role}
          </p>

          <div className="w-3 h-3 bg-zinc-900 dark:bg-white mx-auto mt-6 sm:mt-8" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 4: { TECH STACK }
      ═══════════════════════════════════════════════════ */}
      <section className="w-full bg-zinc-900 dark:bg-zinc-800/50 py-5 sm:py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-3 sm:gap-10">
          <span className="text-xs font-mono text-orange-500 uppercase tracking-widest shrink-0 w-full sm:w-auto mb-1 sm:mb-0">
            {"{ TECH STACK }"}
          </span>
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs sm:text-sm font-mono text-white/80 uppercase tracking-wider"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 5: { THE CHALLENGE }
      ═══════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-32 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">

          <span className="text-xs font-mono text-orange-500 uppercase tracking-widest mb-6 sm:mb-10 block">
            {"{ THE CHALLENGE }"}
          </span>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-20">
            <div>
              <p className="text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.15] sm:leading-[1.1] text-zinc-900 dark:text-white">
                {project.content.challenge.split(".").slice(0, 2).join(".")}.
              </p>
            </div>
            <div className="space-y-4 sm:space-y-6">
              <p className="text-sm sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {project.content.challenge}
              </p>
              <p className="text-sm sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {project.content.research}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 6: Gallery Image 1
      ═══════════════════════════════════════════════════ */}
      {project.content.gallery.length > 0 && (
        <section className="w-full px-4 sm:px-8 pb-6 sm:pb-8">
          <div className="max-w-7xl mx-auto">
            <img
              src={project.content.gallery[0]}
              alt={`${project.title} showcase`}
              className="w-full h-[220px] sm:h-[500px] object-cover rounded-xl sm:rounded-2xl"
            />
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════
          SECTION 7: { THE SOLUTION }
      ═══════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-32 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">

          <span className="text-xs font-mono text-orange-500 uppercase tracking-widest mb-6 sm:mb-10 block">
            {"{ THE SOLUTION }"}
          </span>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-20">
            <div>
              <p className="text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.15] sm:leading-[1.1] text-zinc-900 dark:text-white">
                {project.content.architecture.split(".").slice(0, 2).join(".")}.
              </p>
            </div>
            <div className="space-y-4 sm:space-y-6">
              <p className="text-sm sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {project.content.architecture}
              </p>
              <p className="text-sm sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {project.content.frontend}
              </p>
              <p className="text-sm sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {project.content.backend}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 8: Gallery Image 2
      ═══════════════════════════════════════════════════ */}
      {project.content.gallery.length > 1 && (
        <section className="w-full px-4 sm:px-8 pb-6 sm:pb-8">
          <div className="max-w-7xl mx-auto">
            <img
              src={project.content.gallery[1]}
              alt={`${project.title} detail`}
              className="w-full h-[220px] sm:h-[500px] object-cover rounded-xl sm:rounded-2xl"
            />
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════
          SECTION 9: { RESULTS }
      ═══════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-32 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">

          <span className="text-xs font-mono text-orange-500 uppercase tracking-widest mb-6 sm:mb-10 block">
            {"{ RESULTS }"}
          </span>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-12 mb-10 sm:mb-16">
            {project.metrics.map((m, idx) => (
              <div key={idx}>
                <div className="text-2xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">{m.value}</div>
                <div className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-widest font-mono mt-1 sm:mt-2">{m.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-20">
            <div>
              <p className="text-2xl sm:text-4xl font-medium tracking-tight leading-[1.15] sm:leading-[1.1] text-zinc-900 dark:text-white">
                {project.content.performance.split(".").slice(0, 2).join(".")}.
              </p>
            </div>
            <div className="space-y-4 sm:space-y-6">
              <p className="text-sm sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {project.content.performance}
              </p>
              <p className="text-sm sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {project.content.deployment}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 10: { TAKEAWAY }
      ═══════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-32 px-4 sm:px-8 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto text-center">

          <span className="text-xs font-mono text-orange-500 uppercase tracking-widest mb-6 sm:mb-10 block">
            {"{ TAKEAWAY }"}
          </span>

          <p className="text-xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.2] sm:leading-[1.15] text-zinc-900 dark:text-white">
            {project.content.lessonsLearned}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 11: Next Case Study Navigation
      ═══════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-24 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4 sm:mb-6 block">
            Next Case Study
          </span>

          <Link
            href={`/projects/${nextProject.slug}`}
            className="group inline-block"
          >
            <h3 className="text-2xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white uppercase group-hover:text-orange-500 transition-colors leading-tight break-words">
              {nextProject.title}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 uppercase tracking-widest font-mono mt-2 sm:mt-3">
              {nextProject.subtitle}
            </p>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}