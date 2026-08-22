import { PrismaClient } from "@prisma/client";
import { projectsData } from "../lib/projects-data";
import { experienceData } from "../lib/experience-data";

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "file:./dev.db";
}

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Seed Projects
  for (let i = 0; i < projectsData.length; i++) {
    const p = projectsData[i];
    const createdProject = await prisma.project.upsert({
      where: { slug: p.slug },
      update: {
        title: p.title,
        subtitle: p.subtitle,
        role: p.role,
        period: p.period,
        description: p.description,
        heroImage: p.heroImage,
        techStack: JSON.stringify(p.techStack),
        githubUrl: p.githubUrl || null,
        liveUrl: p.liveUrl || null,
        featured: p.featured,
        order: i,
        overview: p.content.overview,
        challenge: p.content.challenge,
        research: p.content.research,
        planning: p.content.planning,
        design: p.content.design,
        architecture: p.content.architecture,
        database: p.content.database,
        frontend: p.content.frontend,
        backend: p.content.backend,
        deployment: p.content.deployment,
        performance: p.content.performance,
        seo: p.content.seo,
        lessonsLearned: p.content.lessonsLearned,
        timeline: p.content.timeline,
        gallery: JSON.stringify(p.content.gallery),
      },
      create: {
        slug: p.slug,
        title: p.title,
        subtitle: p.subtitle,
        role: p.role,
        period: p.period,
        description: p.description,
        heroImage: p.heroImage,
        techStack: JSON.stringify(p.techStack),
        githubUrl: p.githubUrl || null,
        liveUrl: p.liveUrl || null,
        featured: p.featured,
        order: i,
        overview: p.content.overview,
        challenge: p.content.challenge,
        research: p.content.research,
        planning: p.content.planning,
        design: p.content.design,
        architecture: p.content.architecture,
        database: p.content.database,
        frontend: p.content.frontend,
        backend: p.content.backend,
        deployment: p.content.deployment,
        performance: p.content.performance,
        seo: p.content.seo,
        lessonsLearned: p.content.lessonsLearned,
        timeline: p.content.timeline,
        gallery: JSON.stringify(p.content.gallery),
      },
    });

    // Delete old metrics and re-insert
    await prisma.projectMetric.deleteMany({
      where: { projectId: createdProject.id },
    });

    for (const m of p.metrics) {
      await prisma.projectMetric.create({
        data: {
          projectId: createdProject.id,
          label: m.label,
          value: m.value,
        },
      });
    }
  }

  // Seed Experiences
  for (let i = 0; i < experienceData.length; i++) {
    const e = experienceData[i];
    await prisma.experience.upsert({
      where: { id: e.id },
      update: {
        company: e.company,
        role: e.role,
        period: e.period,
        location: e.location,
        description: e.description,
        achievements: JSON.stringify(e.achievements),
        techStack: JSON.stringify(e.techStack),
        isCurrent: e.isCurrent ?? false,
        order: i,
      },
      create: {
        id: e.id,
        company: e.company,
        role: e.role,
        period: e.period,
        location: e.location,
        description: e.description,
        achievements: JSON.stringify(e.achievements),
        techStack: JSON.stringify(e.techStack),
        isCurrent: e.isCurrent ?? false,
        order: i,
      },
    });
  }

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
