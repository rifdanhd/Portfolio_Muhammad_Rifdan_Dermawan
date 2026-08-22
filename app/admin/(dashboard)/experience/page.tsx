import React from "react";
import Link from "next/link";
import { getExperiences, deleteExperienceAction } from "@/lib/actions/experience";
import ExperienceFormModal from "@/components/admin/experience-form-modal";
import { Trash2, Edit3, ArrowLeft, Briefcase } from "lucide-react";

export default async function AdminExperiencePage() {
  const experiences = await getExperiences();

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
            EXPERIENCE MANAGEMENT
          </h1>
        </div>

        <ExperienceFormModal />
      </div>

      {/* Experience List */}
      <div className="space-y-4">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="bg-zinc-950 border-2 border-zinc-800 p-6 space-y-4 shadow-[6px_6px_0px_0px_#27272A]"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-base text-white">{exp.role}</span>
                  {exp.isCurrent && (
                    <span className="bg-[#0DFF72] text-black font-bold text-[9px] px-2 py-0.5 uppercase">
                      CURRENT ROLE
                    </span>
                  )}
                </div>
                <div className="text-xs text-[#0DFF72] font-semibold">{exp.company} • {exp.location}</div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-zinc-500">{exp.period}</span>
                <form
                  action={async () => {
                    "use server";
                    await deleteExperienceAction(exp.id);
                  }}
                >
                  <button
                    type="submit"
                    className="p-2 bg-red-950/40 text-red-400 border border-red-900/50 hover:bg-red-900 hover:text-white transition-colors text-xs flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>DELETE</span>
                  </button>
                </form>
              </div>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">{exp.description}</p>

            {exp.achievements.length > 0 && (
              <div className="space-y-1 pt-2">
                <div className="text-[10px] text-zinc-500 uppercase font-bold">KEY ACHIEVEMENTS:</div>
                <ul className="list-disc list-inside text-xs text-zinc-400 space-y-1">
                  {exp.achievements.map((ach, idx) => (
                    <li key={idx}>{ach}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap gap-1.5 pt-2">
              {exp.techStack.map((tech) => (
                <span key={tech} className="bg-zinc-900 text-zinc-300 border border-zinc-800 px-2 py-0.5 text-[10px]">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
