"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createExperienceAction } from "@/lib/actions/experience";
import { Plus, X, Save } from "lucide-react";

export default function ExperienceFormModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    period: "",
    location: "",
    description: "",
    achievements: "",
    techStack: "",
    isCurrent: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createExperienceAction({
        company: formData.company,
        role: formData.role,
        period: formData.period,
        location: formData.location,
        description: formData.description,
        achievements: formData.achievements.split("\n").map((s) => s.trim()).filter(Boolean),
        techStack: formData.techStack.split(",").map((s) => s.trim()).filter(Boolean),
        isCurrent: formData.isCurrent,
      });

      setIsOpen(false);
      setFormData({
        company: "",
        role: "",
        period: "",
        location: "",
        description: "",
        achievements: "",
        techStack: "",
        isCurrent: false,
      });
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to add experience.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 bg-[#0DFF72] text-black font-bold text-xs uppercase px-5 py-3 shadow-[4px_4px_0px_0px_#FFFFFF] hover:bg-white transition-all active:translate-x-[1px] active:translate-y-[1px]"
      >
        <Plus className="w-4 h-4" />
        <span>ADD EXPERIENCE</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-zinc-950 border-2 border-zinc-800 w-full max-w-2xl p-6 space-y-6 shadow-[8px_8px_0px_0px_#0DFF72] font-mono text-xs max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b-2 border-zinc-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-[#0DFF72]" />
            <h2 className="text-lg font-extrabold uppercase text-white">ADD WORK EXPERIENCE</h2>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-1 hover:text-[#0DFF72]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-zinc-400 font-bold uppercase">COMPANY / INSTITUTION *</label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full bg-black border-2 border-zinc-800 p-2.5 text-white focus:outline-none focus:border-[#0DFF72]"
                placeholder="Saung Angklung Udjo"
              />
            </div>

            <div className="space-y-1">
              <label className="text-zinc-400 font-bold uppercase">ROLE TITLE *</label>
              <input
                type="text"
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full bg-black border-2 border-zinc-800 p-2.5 text-white focus:outline-none focus:border-[#0DFF72]"
                placeholder="Full Stack Engineer"
              />
            </div>

            <div className="space-y-1">
              <label className="text-zinc-400 font-bold uppercase">PERIOD *</label>
              <input
                type="text"
                required
                value={formData.period}
                onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                className="w-full bg-black border-2 border-zinc-800 p-2.5 text-white focus:outline-none focus:border-[#0DFF72]"
                placeholder="Jan 2025 — Present"
              />
            </div>

            <div className="space-y-1">
              <label className="text-zinc-400 font-bold uppercase">LOCATION *</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-black border-2 border-zinc-800 p-2.5 text-white focus:outline-none focus:border-[#0DFF72]"
                placeholder="Bandung, Indonesia"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-zinc-400 font-bold uppercase">ROLE DESCRIPTION *</label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-black border-2 border-zinc-800 p-2.5 text-white focus:outline-none focus:border-[#0DFF72]"
              placeholder="Promoted from intern to primary developer owning venue platforms..."
            />
          </div>

          <div className="space-y-1">
            <label className="text-zinc-400 font-bold uppercase">
              KEY ACHIEVEMENTS (ONE PER LINE)
            </label>
            <textarea
              rows={3}
              value={formData.achievements}
              onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
              className="w-full bg-black border-2 border-zinc-800 p-2.5 text-white focus:outline-none focus:border-[#0DFF72]"
              placeholder="Rebuilt legacy WordPress platform into Laravel 12&#10;Engineered QRIS payment gateway"
            />
          </div>

          <div className="space-y-1">
            <label className="text-zinc-400 font-bold uppercase">TECH STACK (COMMA SEPARATED)</label>
            <input
              type="text"
              value={formData.techStack}
              onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
              className="w-full bg-black border-2 border-zinc-800 p-2.5 text-white focus:outline-none focus:border-[#0DFF72]"
              placeholder="Laravel 12, MySQL, Tailwind CSS, Cloudflare"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="isCurrent"
              checked={formData.isCurrent}
              onChange={(e) => setFormData({ ...formData, isCurrent: e.target.checked })}
              className="w-4 h-4 accent-[#0DFF72]"
            />
            <label htmlFor="isCurrent" className="text-white font-bold uppercase cursor-pointer">
              THIS IS MY CURRENT ACTIVE ROLE
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-zinc-900">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 bg-[#0DFF72] text-black font-bold flex items-center gap-2 hover:bg-white transition-all shadow-[3px_3px_0px_0px_#FFFFFF]"
            >
              <Save className="w-4 h-4" />
              <span>{isSubmitting ? "SAVING..." : "SAVE EXPERIENCE"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
