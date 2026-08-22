import React from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdminAuthenticated } from "@/lib/auth";
import { logoutAction } from "@/lib/actions/auth";
import { LayoutDashboard, FolderGit2, Briefcase, LogOut, Globe, Plus } from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-black text-white font-mono flex flex-col">
      {/* Top Brutalist Nav Header */}
      <header className="border-b-2 border-zinc-800 bg-zinc-950 px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 bg-[#0DFF72] animate-pulse" />
          <Link href="/admin" className="font-bold text-lg tracking-tight hover:text-[#0DFF72] transition-colors">
            PORTFOLIO // ADMIN
          </Link>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 border border-zinc-800 px-3 py-1.5 hover:bg-zinc-900 text-zinc-300 transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>VIEW LIVE SITE</span>
          </Link>

          <form action={logoutAction}>
            <button
              type="submit"
              className="flex items-center gap-2 bg-red-950/40 text-red-400 border border-red-900/50 px-3 py-1.5 hover:bg-red-900 hover:text-white transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>LOGOUT</span>
            </button>
          </form>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 border-b-2 md:border-b-0 md:border-r-2 border-zinc-800 bg-zinc-950 p-4 space-y-6 shrink-0">
          <div className="text-[10px] uppercase text-zinc-500 tracking-wider font-bold">
            NAVIGATION
          </div>

          <nav className="space-y-1">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-3 py-2.5 text-xs text-zinc-300 hover:text-black hover:bg-[#0DFF72] transition-colors border border-transparent hover:border-black font-semibold"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>DASHBOARD</span>
            </Link>

            <Link
              href="/admin/projects"
              className="flex items-center gap-3 px-3 py-2.5 text-xs text-zinc-300 hover:text-black hover:bg-[#0DFF72] transition-colors border border-transparent hover:border-black font-semibold"
            >
              <FolderGit2 className="w-4 h-4" />
              <span>PROJECTS</span>
            </Link>

            <Link
              href="/admin/experience"
              className="flex items-center gap-3 px-3 py-2.5 text-xs text-zinc-300 hover:text-black hover:bg-[#0DFF72] transition-colors border border-transparent hover:border-black font-semibold"
            >
              <Briefcase className="w-4 h-4" />
              <span>EXPERIENCES</span>
            </Link>
          </nav>

          <div className="pt-6 border-t border-zinc-900 space-y-2">
            <div className="text-[10px] uppercase text-zinc-500 tracking-wider font-bold">
              QUICK ACTIONS
            </div>
            <Link
              href="/admin/projects/new"
              className="flex items-center gap-2 px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 text-[#0DFF72] hover:bg-[#0DFF72] hover:text-black transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>NEW PROJECT</span>
            </Link>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-8 overflow-x-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
