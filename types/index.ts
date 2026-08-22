export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  role: string;
  period: string;
  description: string;
  heroImage: string;
  videoSrc?: string;
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

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  techStack: string[];
  isCurrent?: boolean;
}

export interface SkillCategory {
  category: "Frontend" | "Backend" | "Database" | "DevOps" | "UI Design" | "Cloud";
  iconName: string;
  skills: { name: string; level: number; experience: string }[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  content: string;
}

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  statNumber?: string;
  statLabel?: string;
  link?: string;
}
