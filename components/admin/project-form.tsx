"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createProjectAction, updateProjectAction } from "@/lib/actions/projects";
import { Project } from "@/types";
import { Save, Plus, Trash2, ArrowLeft } from "lucide-react";

interface ProjectFormProps {
  initialProject?: Project;
}

export default function ProjectForm({ initialProject }: ProjectFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    slug: initialProject?.slug || "",
    title: initialProject?.title || "",
    subtitle: initialProject?.subtitle || "",
    role: initialProject?.role || "",
    period: initialProject?.period || "",
    description: initialProject?.description || "",
    heroImage: initialProject?.heroImage || "",
    techStack: initialProject?.techStack ? initialProject.techStack.join(", ") : "",
    githubUrl: initialProject?.githubUrl || "",
    liveUrl: initialProject?.liveUrl || "",
    featured: initialProject?.featured ?? true,
    metrics: initialProject?.metrics || [
      { label: "Core Framework", value: "Laravel 12" },
      { label: "Performance Score", value: "99/100" },
    ],
    content: {
      overview: initialProject?.content?.overview || "",
      challenge: initialProject?.content?.challenge || "",
      research: initialProject?.content?.research || "",
      planning: initialProject?.content?.planning || "",
      design: initialProject?.content?.design || "",
      architecture: initialProject?.content?.architecture || "",
      database: initialProject?.content?.database || "",
      frontend: initialProject?.content?.frontend || "",
      backend: initialProject?.content?.backend || "",
      deployment: initialProject?.content?.deployment || "",
      performance: initialProject?.content?.performance || "",
      seo: initialProject?.content?.seo || "",
      lessonsLearned: initialProject?.content?.lessonsLearned || "",
      timeline: initialProject?.content?.timeline || "",
      gallery: initialProject?.content?.gallery ? initialProject.content.gallery.join("\n") : "",
    },
  });

  const handleMetricChange = (index: number, field: "label" | "value", val: string) => {
    const updated = [...formData.metrics];
    updated[index][field] = val;
    setFormData({ ...formData, metrics: updated });
  };

  const addMetric = () => {
    setFormData({
      ...formData,
      metrics: [...formData.metrics, { label: "", value: "" }],
    });
  };

  const removeMetric = (index: number) => {
    setFormData({
      ...formData,
      metrics: formData.metrics.filter((_, idx) => idx !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        slug: formData.slug,
        title: formData.title,
        subtitle: formData.subtitle,
        role: formData.role,
        period: formData.period,
        description: formData.description,
        heroImage: formData.heroImage,
        techStack: formData.techStack.split(",").map((s) => s.trim()).filter(Boolean),
        githubUrl: formData.githubUrl || undefined,
        liveUrl: formData.liveUrl || undefined,
        featured: formData.featured,
        metrics: formData.metrics,
        content: {
          ...formData.content,
          gallery: formData.content.gallery.split("\n").map((s) => s.trim()).filter(Boolean),
        },
      };

      if (initialProject) {
        await updateProjectAction(initialProject.id, payload);
      } else {
        await createProjectAction(payload);
      }

      router.push("/admin/projects");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to save project. Ensure slug is unique and fields are valid.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 font-mono text-xs max-w-5xl">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-6 border-b-2 border-zinc-800">
        <div>
          <button
            type="button"
            onClick={() => router.back()}
            className="text-zinc-500 hover:text-white flex items-center gap-1 mb-2 uppercase"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK</span>
          </button>
          <h1 className="text-2xl font-extrabold uppercase text-white">
            {initialProject ? `EDIT // ${initialProject.title}` : "CREATE NEW PROJECT"}
          </h1>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#0DFF72] text-black font-bold uppercase py-3 px-6 text-xs flex items-center gap-2 hover:bg-white transition-all shadow-[4px_4px_0px_0px_#FFFFFF] active:translate-x-[1px] active:translate-y-[1px] disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{isSubmitting ? "SAVING..." : "SAVE PROJECT"}</span>
        </button>
      </div>

      {/* Basic Attributes Section */}
      <div className="bg-zinc-950 border-2 border-zinc-800 p-6 space-y-6 shadow-[6px_6px_0px_0px_#27272A]">
        <div className="text-sm font-bold uppercase text-[#0DFF72] border-b border-zinc-800 pb-2">
          01 // CORE METADATA
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-zinc-400 font-bold uppercase">PROJECT TITLE *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-black border-2 border-zinc-800 p-3 text-white focus:outline-none focus:border-[#0DFF72]"
              placeholder="Official Website & Booking Platform"
            />
          </div>

          <div className="space-y-2">
            <label className="text-zinc-400 font-bold uppercase">SLUG (URL KEY) *</label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full bg-black border-2 border-zinc-800 p-3 text-white focus:outline-none focus:border-[#0DFF72]"
              placeholder="saung-angklung-udjo"
            />
          </div>

          <div className="space-y-2">
            <label className="text-zinc-400 font-bold uppercase">SUBTITLE / CLIENT *</label>
            <input
              type="text"
              required
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full bg-black border-2 border-zinc-800 p-3 text-white focus:outline-none focus:border-[#0DFF72]"
              placeholder="Saung Angklung Udjo"
            />
          </div>

          <div className="space-y-2">
            <label className="text-zinc-400 font-bold uppercase">ROLE *</label>
            <input
              type="text"
              required
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full bg-black border-2 border-zinc-800 p-3 text-white focus:outline-none focus:border-[#0DFF72]"
              placeholder="Full Stack Engineer & Infrastructure Owner"
            />
          </div>

          <div className="space-y-2">
            <label className="text-zinc-400 font-bold uppercase">PERIOD *</label>
            <input
              type="text"
              required
              value={formData.period}
              onChange={(e) => setFormData({ ...formData, period: e.target.value })}
              className="w-full bg-black border-2 border-zinc-800 p-3 text-white focus:outline-none focus:border-[#0DFF72]"
              placeholder="Jan 2025 — Present"
            />
          </div>

          <div className="space-y-2">
            <label className="text-zinc-400 font-bold uppercase">HERO IMAGE URL *</label>
            <input
              type="text"
              required
              value={formData.heroImage}
              onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
              className="w-full bg-black border-2 border-zinc-800 p-3 text-white focus:outline-none focus:border-[#0DFF72]"
              placeholder="https://images.unsplash.com/photo-..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-zinc-400 font-bold uppercase">GITHUB REPO URL</label>
            <input
              type="text"
              value={formData.githubUrl}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              className="w-full bg-black border-2 border-zinc-800 p-3 text-white focus:outline-none focus:border-[#0DFF72]"
              placeholder="https://github.com/..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-zinc-400 font-bold uppercase">LIVE PLATFORM URL</label>
            <input
              type="text"
              value={formData.liveUrl}
              onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
              className="w-full bg-black border-2 border-zinc-800 p-3 text-white focus:outline-none focus:border-[#0DFF72]"
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-zinc-400 font-bold uppercase">SHORT DESCRIPTION *</label>
          <textarea
            required
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-black border-2 border-zinc-800 p-3 text-white focus:outline-none focus:border-[#0DFF72]"
            placeholder="A complete architectural overhaul..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-zinc-400 font-bold uppercase">TECH STACK (COMMA SEPARATED) *</label>
          <input
            type="text"
            required
            value={formData.techStack}
            onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
            className="w-full bg-black border-2 border-zinc-800 p-3 text-white focus:outline-none focus:border-[#0DFF72]"
            placeholder="Laravel 12, MySQL, Tailwind CSS, Cloudflare"
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <input
            type="checkbox"
            id="featured"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="w-4 h-4 accent-[#0DFF72]"
          />
          <label htmlFor="featured" className="text-white font-bold uppercase cursor-pointer">
            FEATURE ON PORTFOLIO HOMEPAGE
          </label>
        </div>
      </div>

      {/* Metrics Section */}
      <div className="bg-zinc-950 border-2 border-zinc-800 p-6 space-y-6 shadow-[6px_6px_0px_0px_#27272A]">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
          <div className="text-sm font-bold uppercase text-[#0DFF72]">
            02 // PERFORMANCE METRICS
          </div>
          <button
            type="button"
            onClick={addMetric}
            className="text-xs bg-zinc-900 border border-zinc-800 px-3 py-1 text-zinc-300 hover:text-white hover:bg-zinc-800 flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>ADD METRIC</span>
          </button>
        </div>

        <div className="space-y-3">
          {formData.metrics.map((m, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Metric Label (e.g. Core Framework)"
                value={m.label}
                onChange={(e) => handleMetricChange(idx, "label", e.target.value)}
                className="flex-1 bg-black border-2 border-zinc-800 p-2.5 text-white focus:outline-none focus:border-[#0DFF72]"
              />
              <input
                type="text"
                placeholder="Value (e.g. Laravel 12)"
                value={m.value}
                onChange={(e) => handleMetricChange(idx, "value", e.target.value)}
                className="flex-1 bg-black border-2 border-zinc-800 p-2.5 text-white focus:outline-none focus:border-[#0DFF72]"
              />
              <button
                type="button"
                onClick={() => removeMetric(idx)}
                className="p-2.5 bg-red-950/40 text-red-400 border border-red-900/50 hover:bg-red-900 hover:text-white"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Comprehensive Technical Case Study Content */}
      <div className="bg-zinc-950 border-2 border-zinc-800 p-6 space-y-6 shadow-[6px_6px_0px_0px_#27272A]">
        <div className="text-sm font-bold uppercase text-[#0DFF72] border-b border-zinc-800 pb-2">
          03 // CASE STUDY CASE DETAILS
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-zinc-400 font-bold uppercase">OVERVIEW</label>
            <textarea
              rows={3}
              value={formData.content.overview}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  content: { ...formData.content, overview: e.target.value },
                })
              }
              className="w-full bg-black border-2 border-zinc-800 p-3 text-white focus:outline-none focus:border-[#0DFF72]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-zinc-400 font-bold uppercase">THE CORE CHALLENGE</label>
            <textarea
              rows={3}
              value={formData.content.challenge}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  content: { ...formData.content, challenge: e.target.value },
                })
              }
              className="w-full bg-black border-2 border-zinc-800 p-3 text-white focus:outline-none focus:border-[#0DFF72]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-zinc-400 font-bold uppercase">RESEARCH & AUDIT</label>
            <textarea
              rows={3}
              value={formData.content.research}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  content: { ...formData.content, research: e.target.value },
                })
              }
              className="w-full bg-black border-2 border-zinc-800 p-3 text-white focus:outline-none focus:border-[#0DFF72]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-zinc-400 font-bold uppercase">ARCHITECTURE & DATABASE</label>
            <textarea
              rows={3}
              value={formData.content.architecture}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  content: { ...formData.content, architecture: e.target.value },
                })
              }
              className="w-full bg-black border-2 border-zinc-800 p-3 text-white focus:outline-none focus:border-[#0DFF72]"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-zinc-400 font-bold uppercase">DATABASE SCHEMA / INDEXING DETAILS</label>
            <textarea
              rows={2}
              value={formData.content.database}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  content: { ...formData.content, database: e.target.value },
                })
              }
              className="w-full bg-black border-2 border-zinc-800 p-3 text-white focus:outline-none focus:border-[#0DFF72]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-zinc-400 font-bold uppercase">FRONTEND IMPLEMENTATION</label>
            <textarea
              rows={3}
              value={formData.content.frontend}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  content: { ...formData.content, frontend: e.target.value },
                })
              }
              className="w-full bg-black border-2 border-zinc-800 p-3 text-white focus:outline-none focus:border-[#0DFF72]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-zinc-400 font-bold uppercase">BACKEND & APIS</label>
            <textarea
              rows={3}
              value={formData.content.backend}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  content: { ...formData.content, backend: e.target.value },
                })
              }
              className="w-full bg-black border-2 border-zinc-800 p-3 text-white focus:outline-none focus:border-[#0DFF72]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-zinc-400 font-bold uppercase">DEPLOYMENT & INFRASTRUCTURE</label>
            <textarea
              rows={3}
              value={formData.content.deployment}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  content: { ...formData.content, deployment: e.target.value },
                })
              }
              className="w-full bg-black border-2 border-zinc-800 p-3 text-white focus:outline-none focus:border-[#0DFF72]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-zinc-400 font-bold uppercase">LESSONS LEARNED</label>
            <textarea
              rows={3}
              value={formData.content.lessonsLearned}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  content: { ...formData.content, lessonsLearned: e.target.value },
                })
              }
              className="w-full bg-black border-2 border-zinc-800 p-3 text-white focus:outline-none focus:border-[#0DFF72]"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-zinc-400 font-bold uppercase">GALLERY IMAGE URLS (ONE PER LINE)</label>
            <textarea
              rows={3}
              value={formData.content.gallery}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  content: { ...formData.content, gallery: e.target.value },
                })
              }
              placeholder="https://images.unsplash.com/photo-1...&#10;https://images.unsplash.com/photo-2..."
              className="w-full bg-black border-2 border-zinc-800 p-3 text-white focus:outline-none focus:border-[#0DFF72] font-mono text-xs"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#0DFF72] text-black font-bold uppercase py-4 px-8 text-sm flex items-center gap-2 hover:bg-white transition-all shadow-[6px_6px_0px_0px_#FFFFFF] active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          <span>{isSubmitting ? "SAVING..." : "SAVE & PUBLISH PROJECT"}</span>
        </button>
      </div>
    </form>
  );
}
