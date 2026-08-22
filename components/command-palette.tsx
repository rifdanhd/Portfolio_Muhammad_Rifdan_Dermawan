"use client";

import React, { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import {
  FileText,
  FolderGit2,
  Mail,
  Home,
  User,
  Briefcase,
  Layers,
  Sparkles,
  ExternalLink,
  Github,
  Linkedin,
} from "lucide-react";
import { projectsData } from "@/lib/projects-data";
import { blogPostsData } from "@/lib/blog-data";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === "Escape") {
        onOpenChange(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  if (!open) return null;

  const navigateTo = (path: string, isExternal = false) => {
    onOpenChange(false);
    if (isExternal) {
      window.open(path, "_blank");
    } else if (path.startsWith("#")) {
      const el = document.getElementById(path.substring(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(path);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-zinc-800 bg-[#111113] shadow-2xl">
        <Command className="w-full bg-transparent font-sans text-white">
          <div className="flex items-center border-b border-zinc-800 px-4">
            <Command.Input
              placeholder="Type a command or search projects & articles..."
              className="w-full bg-transparent py-4 text-sm text-white placeholder-zinc-500 outline-none font-mono"
            />
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-zinc-500 bg-zinc-900 border border-zinc-800 rounded">
              ESC
            </kbd>
          </div>

          <Command.List className="max-h-[360px] overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-xs font-mono text-zinc-500">
              No results found.
            </Command.Empty>

            <Command.Group heading="Navigation" className="px-2 py-1.5 text-[11px] font-mono uppercase text-zinc-500">
              <Command.Item
                onSelect={() => navigateTo("#hero")}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white cursor-pointer"
              >
                <Home className="w-4 h-4 text-blue-400" />
                <span>Go to Home</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigateTo("#about")}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white cursor-pointer"
              >
                <User className="w-4 h-4 text-blue-400" />
                <span>Go to About</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigateTo("#experience")}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white cursor-pointer"
              >
                <Briefcase className="w-4 h-4 text-purple-400" />
                <span>Experience Timeline</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigateTo("#projects")}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white cursor-pointer"
              >
                <FolderGit2 className="w-4 h-4 text-blue-400" />
                <span>View Projects</span>
              </Command.Item>
              <Command.Item
                onSelect={() => navigateTo("#contact")}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white cursor-pointer"
              >
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>Send Message</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Projects" className="px-2 py-1.5 text-[11px] font-mono uppercase text-zinc-500">
              {projectsData.map((project) => (
                <Command.Item
                  key={project.id}
                  onSelect={() => navigateTo(`/projects/${project.slug}`)}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    <span>{project.title}</span>
                  </div>
                  <span className="text-xs font-mono text-zinc-500">{project.subtitle}</span>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Blog Articles" className="px-2 py-1.5 text-[11px] font-mono uppercase text-zinc-500">
              {blogPostsData.map((post) => (
                <Command.Item
                  key={post.slug}
                  onSelect={() => navigateTo(`/blog/${post.slug}`)}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white cursor-pointer"
                >
                  <div className="flex items-center gap-3 truncate">
                    <FileText className="w-4 h-4 text-purple-400" />
                    <span className="truncate">{post.title}</span>
                  </div>
                  <span className="text-xs font-mono text-zinc-500 shrink-0">{post.readingTime}</span>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Social Links" className="px-2 py-1.5 text-[11px] font-mono uppercase text-zinc-500">
              <Command.Item
                onSelect={() => navigateTo("https://github.com/rifdanhd", true)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white cursor-pointer"
              >
                <Github className="w-4 h-4 text-zinc-400" />
                <span>GitHub Profile</span>
                <ExternalLink className="w-3 h-3 text-zinc-600 ml-auto" />
              </Command.Item>
              <Command.Item
                onSelect={() => navigateTo("https://linkedin.com/in/muhammad-rifdan-dermawan-1532a7388", true)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white cursor-pointer"
              >
                <Linkedin className="w-4 h-4 text-blue-400" />
                <span>LinkedIn Profile</span>
                <ExternalLink className="w-3 h-3 text-zinc-600 ml-auto" />
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
