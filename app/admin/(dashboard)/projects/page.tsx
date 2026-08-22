import React from "react";
import Link from "next/link";
import { getProjects, deleteProjectAction } from "@/lib/actions/projects";
import { Plus, Trash2, Edit3, ExternalLink, ArrowLeft } from "lucide-react";

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-8 font-mono">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-zinc-800">
        <div>
          <Link
            href="/admin"
            className="text-xs text-zinc-500 hover:text-white flex items-center gap-1 mb-2 uppercase"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO DASHBOARD</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight uppercase">
            PROJECT MANAGEMENT
          </h1>
        </div>

        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 bg-[#0DFF72] text-black font-bold text-xs uppercase px-5 py-3 shadow-[4px_4px_0px_0px_#FFFFFF] hover:bg-white transition-all active:translate-x-[1px] active:translate-y-[1px]"
        >
          <Plus className="w-4 h-4" />
          <span>NEW PROJECT</span>
        </Link>
      </div>

      {/* Projects Table */}
      <div className="border-2 border-zinc-800 bg-zinc-950 overflow-hidden shadow-[8px_8px_0px_0px_#27272A]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-zinc-800 bg-zinc-900 text-zinc-400 uppercase tracking-wider font-bold">
                <th className="p-4">PROJECT TITLE</th>
                <th className="p-4">SLUG</th>
                <th className="p-4">ROLE & PERIOD</th>
                <th className="p-4 text-center">FEATURED</th>
                <th className="p-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-zinc-900/60 transition-colors">
                  <td className="p-4 font-bold text-white">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.heroImage}
                        alt={p.title}
                        className="w-10 h-10 object-cover border border-zinc-800 shrink-0"
                      />
                      <div>
                        <div>{p.title}</div>
                        <div className="text-[10px] text-zinc-500 font-normal">{p.subtitle}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-zinc-400 font-mono text-[11px]">{p.slug}</td>
                  <td className="p-4 text-zinc-400">
                    <div>{p.role}</div>
                    <div className="text-[10px] text-zinc-500">{p.period}</div>
                  </td>
                  <td className="p-4 text-center">
                    {p.featured ? (
                      <span className="bg-[#0DFF72] text-black font-bold text-[9px] px-2 py-0.5 uppercase">
                        YES
                      </span>
                    ) : (
                      <span className="text-zinc-600 uppercase text-[9px]">NO</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/projects/${p.slug}`}
                        target="_blank"
                        className="p-2 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                        title="View Public Page"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={`/admin/projects/${p.id}/edit`}
                        className="p-2 bg-zinc-800 text-white hover:bg-[#0DFF72] hover:text-black transition-colors font-bold"
                        title="Edit Project"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </Link>
                      <form
                        action={async () => {
                          "use server";
                          await deleteProjectAction(p.id);
                        }}
                      >
                        <button
                          type="submit"
                          className="p-2 bg-red-950/40 text-red-400 border border-red-900/50 hover:bg-red-900 hover:text-white transition-colors"
                          title="Delete Project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
