import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProjectForm from "@/components/admin/project-form";
import { Project } from "@/types";

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params;

  const raw = await prisma.project.findUnique({
    where: { id },
    include: { metrics: true },
  });

  if (!raw) {
    notFound();
  }

  function parseJson(str: string): string[] {
    try {
      return JSON.parse(str);
    } catch {
      return [];
    }
  }

  const project: Project = {
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    subtitle: raw.subtitle,
    role: raw.role,
    period: raw.period,
    description: raw.description,
    heroImage: raw.heroImage,
    techStack: parseJson(raw.techStack),
    githubUrl: raw.githubUrl || undefined,
    liveUrl: raw.liveUrl || undefined,
    featured: raw.featured,
    metrics: raw.metrics.map((m) => ({ label: m.label, value: m.value })),
    content: {
      overview: raw.overview,
      challenge: raw.challenge,
      research: raw.research,
      planning: raw.planning,
      design: raw.design,
      architecture: raw.architecture,
      database: raw.database,
      frontend: raw.frontend,
      backend: raw.backend,
      deployment: raw.deployment,
      performance: raw.performance,
      seo: raw.seo,
      lessonsLearned: raw.lessonsLearned,
      timeline: raw.timeline,
      gallery: parseJson(raw.gallery),
    },
  };

  return <ProjectForm initialProject={project} />;
}
