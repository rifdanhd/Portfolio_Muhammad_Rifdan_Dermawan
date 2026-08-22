"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";
import { Project } from "@/types";

function parseJsonArray(jsonStr: string): string[] {
  try {
    return JSON.parse(jsonStr);
  } catch {
    return [];
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const rawProjects = await prisma.project.findMany({
      orderBy: { order: "asc" },
      include: { metrics: true },
    });

    return rawProjects.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      subtitle: p.subtitle,
      role: p.role,
      period: p.period,
      description: p.description,
      heroImage: p.heroImage,
      techStack: parseJsonArray(p.techStack),
      githubUrl: p.githubUrl || undefined,
      liveUrl: p.liveUrl || undefined,
      featured: p.featured,
      metrics: p.metrics.map((m) => ({ label: m.label, value: m.value })),
      content: {
        overview: p.overview,
        challenge: p.challenge,
        research: p.research,
        planning: p.planning,
        design: p.design,
        architecture: p.architecture,
        database: p.database,
        frontend: p.frontend,
        backend: p.backend,
        deployment: p.deployment,
        performance: p.performance,
        seo: p.seo,
        lessonsLearned: p.lessonsLearned,
        timeline: p.timeline,
        gallery: parseJsonArray(p.gallery),
      },
    }));
  } catch (error) {
    console.error("Failed to fetch projects from DB:", error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const p = await prisma.project.findUnique({
      where: { slug },
      include: { metrics: true },
    });

    if (!p) return null;

    return {
      id: p.id,
      slug: p.slug,
      title: p.title,
      subtitle: p.subtitle,
      role: p.role,
      period: p.period,
      description: p.description,
      heroImage: p.heroImage,
      techStack: parseJsonArray(p.techStack),
      githubUrl: p.githubUrl || undefined,
      liveUrl: p.liveUrl || undefined,
      featured: p.featured,
      metrics: p.metrics.map((m) => ({ label: m.label, value: m.value })),
      content: {
        overview: p.overview,
        challenge: p.challenge,
        research: p.research,
        planning: p.planning,
        design: p.design,
        architecture: p.architecture,
        database: p.database,
        frontend: p.frontend,
        backend: p.backend,
        deployment: p.deployment,
        performance: p.performance,
        seo: p.seo,
        lessonsLearned: p.lessonsLearned,
        timeline: p.timeline,
        gallery: parseJsonArray(p.gallery),
      },
    };
  } catch (error) {
    console.error("Failed to fetch project by slug:", error);
    return null;
  }
}

export async function createProjectAction(data: {
  slug: string;
  title: string;
  subtitle: string;
  role: string;
  period: string;
  description: string;
  heroImage: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  metrics: { label: string; value: string }[];
  content: {
    overview: string;
    challenge: string;
    research: string;
    planning: string;
    design: string;
    architecture: string;
    database: string;
    frontend: string;
    backend: string;
    deployment: string;
    performance: string;
    seo: string;
    lessonsLearned: string;
    timeline: string;
    gallery: string[];
  };
}) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) throw new Error("Unauthorized");

  const project = await prisma.project.create({
    data: {
      slug: data.slug,
      title: data.title,
      subtitle: data.subtitle,
      role: data.role,
      period: data.period,
      description: data.description,
      heroImage: data.heroImage,
      techStack: JSON.stringify(data.techStack),
      githubUrl: data.githubUrl || null,
      liveUrl: data.liveUrl || null,
      featured: data.featured,
      overview: data.content.overview,
      challenge: data.content.challenge,
      research: data.content.research,
      planning: data.content.planning,
      design: data.content.design,
      architecture: data.content.architecture,
      database: data.content.database,
      frontend: data.content.frontend,
      backend: data.content.backend,
      deployment: data.content.deployment,
      performance: data.content.performance,
      seo: data.content.seo,
      lessonsLearned: data.content.lessonsLearned,
      timeline: data.content.timeline,
      gallery: JSON.stringify(data.content.gallery),
      metrics: {
        create: data.metrics,
      },
    },
  });

  revalidatePath("/");
  revalidatePath("/projects/" + data.slug);
  return project;
}

export async function updateProjectAction(
  id: string,
  data: {
    slug: string;
    title: string;
    subtitle: string;
    role: string;
    period: string;
    description: string;
    heroImage: string;
    techStack: string[];
    githubUrl?: string;
    liveUrl?: string;
    featured: boolean;
    metrics: { label: string; value: string }[];
    content: {
      overview: string;
      challenge: string;
      research: string;
      planning: string;
      design: string;
      architecture: string;
      database: string;
      frontend: string;
      backend: string;
      deployment: string;
      performance: string;
      seo: string;
      lessonsLearned: string;
      timeline: string;
      gallery: string[];
    };
  }
) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) throw new Error("Unauthorized");

  // Delete existing metrics
  await prisma.projectMetric.deleteMany({ where: { projectId: id } });

  const project = await prisma.project.update({
    where: { id },
    data: {
      slug: data.slug,
      title: data.title,
      subtitle: data.subtitle,
      role: data.role,
      period: data.period,
      description: data.description,
      heroImage: data.heroImage,
      techStack: JSON.stringify(data.techStack),
      githubUrl: data.githubUrl || null,
      liveUrl: data.liveUrl || null,
      featured: data.featured,
      overview: data.content.overview,
      challenge: data.content.challenge,
      research: data.content.research,
      planning: data.content.planning,
      design: data.content.design,
      architecture: data.content.architecture,
      database: data.content.database,
      frontend: data.content.frontend,
      backend: data.content.backend,
      deployment: data.content.deployment,
      performance: data.content.performance,
      seo: data.content.seo,
      lessonsLearned: data.content.lessonsLearned,
      timeline: data.content.timeline,
      gallery: JSON.stringify(data.content.gallery),
      metrics: {
        create: data.metrics,
      },
    },
  });

  revalidatePath("/");
  revalidatePath("/projects/" + data.slug);
  return project;
}

export async function deleteProjectAction(id: string) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) throw new Error("Unauthorized");

  await prisma.project.delete({ where: { id } });
  revalidatePath("/");
}
