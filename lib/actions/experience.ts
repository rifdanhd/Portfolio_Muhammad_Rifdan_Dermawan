"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";
import { ExperienceItem } from "@/types";

function parseJsonArray(jsonStr: string): string[] {
  try {
    return JSON.parse(jsonStr);
  } catch {
    return [];
  }
}

export async function getExperiences(): Promise<ExperienceItem[]> {
  try {
    const raw = await prisma.experience.findMany({
      orderBy: { order: "asc" },
    });

    return raw.map((e) => ({
      id: e.id,
      company: e.company,
      role: e.role,
      period: e.period,
      location: e.location,
      description: e.description,
      achievements: parseJsonArray(e.achievements),
      techStack: parseJsonArray(e.techStack),
      isCurrent: e.isCurrent,
    }));
  } catch (error) {
    console.error("Failed to fetch experiences:", error);
    return [];
  }
}

export async function createExperienceAction(data: {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  techStack: string[];
  isCurrent: boolean;
}) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) throw new Error("Unauthorized");

  const exp = await prisma.experience.create({
    data: {
      company: data.company,
      role: data.role,
      period: data.period,
      location: data.location,
      description: data.description,
      achievements: JSON.stringify(data.achievements),
      techStack: JSON.stringify(data.techStack),
      isCurrent: data.isCurrent,
    },
  });

  revalidatePath("/");
  return exp;
}

export async function updateExperienceAction(
  id: string,
  data: {
    company: string;
    role: string;
    period: string;
    location: string;
    description: string;
    achievements: string[];
    techStack: string[];
    isCurrent: boolean;
  }
) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) throw new Error("Unauthorized");

  const exp = await prisma.experience.update({
    where: { id },
    data: {
      company: data.company,
      role: data.role,
      period: data.period,
      location: data.location,
      description: data.description,
      achievements: JSON.stringify(data.achievements),
      techStack: JSON.stringify(data.techStack),
      isCurrent: data.isCurrent,
    },
  });

  revalidatePath("/");
  return exp;
}

export async function deleteExperienceAction(id: string) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) throw new Error("Unauthorized");

  await prisma.experience.delete({ where: { id } });
  revalidatePath("/");
}
