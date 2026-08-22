import React from "react";
import Link from "next/link";
import { getProjects } from "@/lib/actions/projects";
import { getExperiences } from "@/lib/actions/experience";
import { FolderGit2, Briefcase, Plus, ArrowUpRight, Database, CheckCircle2 } from "lucide-react";

export default async function AdminDashboardPage() {
  const projects = await getProjects();
  const experiences = await getExperiences();

  return (
    <div className="space-y-8 font-mono">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-zinc-800">
        <div>
          <div className="text-xs text-[#0DFF72] uppercase tracking-wider mb-1 font-bold">
            00 // SYSTEM OVERVIEW
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight uppercase">
            ADMINISTRATIVE CONTROL CENTER
          </h1>
        </div>

        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 bg-[#0DFF72] text-black font-bold text-xs uppercase px-5 py-3 shadow-[4px_4px_0px_0px_#FFFFFF] hover:bg-white transition-all active:translate-x-[1px] active:translate-y-[1px]"
        >
          <Plus className="w-4 h-4" />
          <span>ADD NEW PROJECT</span>
        </Link>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-zinc-950 border-2 border-zinc-800 p-6 shadow-[4px_4px_0px_0px_#27272A]">
          <div className="flex items-center justify-between text-zinc-500 mb-2">
            <span className="text-xs uppercase font-bold">TOTAL PROJECTS</span>
            <FolderGit2 className="w-5 h-5 text-[#0DFF72]" />
          </div>
          <div className="text-4xl font-extrabold text-white">{projects.length}</div>
          <div className="text-[10px] text-zinc-500 mt-2 uppercase">
            {projects.filter((p) => p.featured).length} FEATURED ON HOME
          </div>
        </div>

        <div className="bg-zinc-950 border-2 border-zinc-800 p-6 shadow-[4px_4px_0px_0px_#27272A]">
          <div className="flex items-center justify-between text-zinc-500 mb-2">
            <span className="text-xs uppercase font-bold">WORK EXPERIENCES</span>
            <Briefcase className="w-5 h-5 text-[#0DFF72]" />
          </div>
          <div className="text-4xl font-extrabold text-white">{experiences.length}</div>
          <div className="text-[10px] text-zinc-500 mt-2 uppercase">
            {experiences.filter((e) => e.isCurrent).length} ACTIVE ROLE
          </div>
        </div>

        <div className="bg-zinc-950 border-2 border-zinc-800 p-6 shadow-[4px_4px_0px_0px_#27272A]">
          <div className="flex items-center justify-between text-zinc-500 mb-2">
            <span className="text-xs uppercase font-bold">DATABASE STATUS</span>
            <Database className="w-5 h-5 text-[#0DFF72]" />
          </div>
          <div className="text-2xl font-extrabold text-[#0DFF72] flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6" />
            <span>PRISMA / SQLITE</span>
          </div>
          <div className="text-[10px] text-zinc-500 mt-2 uppercase">
            LIVE LOCAL REPO ENGINE
          </div>
        </div>
      </div>

      {/* Projects Overview List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
            RECENT PROJECTS ({projects.length})
          </h2>
          <Link
            href="/admin/projects"
            className="text-xs text-[#0DFF72] hover:underline flex items-center gap-1 uppercase"
          >
            <span>VIEW ALL</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-zinc-800 border-2 border-zinc-800 bg-zinc-950">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-zinc-900/60 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-sm text-white">{project.title}</span>
                  {project.featured && (
                    <span className="bg-[#0DFF72] text-black text-[9px] font-bold px-2 py-0.5 uppercase">
                      FEATURED
                    </span>
                  )}
                </div>
                <div className="text-xs text-zinc-500">{project.role} • {project.period}</div>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <Link
                  href={`/projects/${project.slug}`}
                  target="_blank"
                  className="border border-zinc-800 px-3 py-1.5 hover:bg-zinc-800 text-zinc-300 transition-colors"
                >
                  PREVIEW
                </Link>
                <Link
                  href={`/admin/projects/${project.id}/edit`}
                  className="bg-zinc-800 hover:bg-[#0DFF72] hover:text-black font-bold px-3 py-1.5 transition-colors"
                >
                  EDIT
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
