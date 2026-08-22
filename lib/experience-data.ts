import { ExperienceItem } from "@/types";

export const experienceData: ExperienceItem[] = [
  {
    id: "sau-developer",
    company: "PT Saung Angklung Udjo",
    role: "Full Stack Developer (Internship) — Sole Developer",
    period: "Jan 2026 — Jul 2026",
    location: "Bandung, Indonesia",
    isCurrent: false,
    description:
      "Served as the sole developer responsible for rebuilding the official corporate website from WordPress into a custom Laravel-based platform, managing everything from database design to production deployment.",
    achievements: [
      "Rebuilt the official company website from WordPress into a custom Laravel-based application for easier management and scalability.",
      "Designed and built CMS databases and user interfaces independently for hero banners, articles, events, testimonials, and products.",
      "Developed custom visitor ticketing management, show scheduling, and reservation systems.",
      "Engineered a QR-code ticket scanning module to support collaborative events (Saung Angklung Udjo x Persib Bandung) for faster visitor check-in.",
      "Integrated Midtrans payment gateway sandbox for online payments and set up static QRIS payments for the production system.",
      "Implemented Google OAuth 2.0, Google Analytics API, and Google Sheets API for user authentication and administrative monitoring.",
      "Developed an AI-powered chatbot to automate customer support responses and successfully deployed the platform to production servers.",
    ],
    techStack: ["Laravel", "PHP", "MySQL", "Midtrans API", "Google API", "AI Chatbot", "Git", "Linux Server"],
  },
  {
    id: "eksavapor",
    company: "EKSAVAPOR",
    role: "Content Creator & E-Commerce Admin",
    period: "Jan 2020 — Aug 2025",
    location: "Bandung, Indonesia",
    isCurrent: false,
    description:
      "Managed e-commerce marketplaces and digital brand social media accounts, creating visual marketing materials and optimizing content strategy.",
    achievements: [
      "Managed product listings, customer inquiries, and optimized social media marketing across Shopee, Tokopedia, Instagram, and TikTok.",
      "Grew official brand social accounts from scratch to tens of thousands of followers through consistent engagement strategies.",
      "Designed promotional visuals using CorelDraw and Canva to build brand awareness, which honed UI/UX sensibilities for digital products.",
    ],
    techStack: ["E-Commerce", "Digital Marketing", "Social Media", "CorelDraw", "Canva", "UI/UX Design"],
  },
  {
    id: "education-utb",
    company: "Universitas Teknologi Bandung",
    role: "Undergraduate Informatics Engineering Student",
    period: "Aug 2023 — Present (Expected 2027)",
    location: "Bandung, Indonesia",
    isCurrent: true,
    description:
      "Majoring in Informatics Engineering (Teknik Informatika). Currently in Semester 7, specializing in backend architectures, database schemas, and server environments.",
    achievements: [
      "Undergraduate Thesis: Automated Ticket Reservation System for Cultural Venues using Laravel & Midtrans Payment Gateway.",
      "Maintained solid academic performance across data structures, software engineering, databases, and Linux operating systems.",
    ],
    techStack: ["Teknik Informatika", "Data Structures", "Web Development", "Database Systems", "Software Design"],
  },
  {
    id: "education-sma3",
    company: "SMA Negeri 3 Cimahi",
    role: "High School Graduate (IPA — Science)",
    period: "Aug 2018 — Oct 2021",
    location: "Cimahi, Indonesia",
    isCurrent: false,
    description:
      "Majored in Science (IPA). Actively participated in school organizations and leadership roles.",
    achievements: [
      "Served as Vice President of Paskibra SMAN 3 Cimahi (won 3rd place Madya statewide in West Java).",
      "Member of MPK (Majelis Perwakilan Kelas) in the Legal Commission.",
      "Member of Bidang Syiar at iKPIM (won 1st place Qori at Bandung city level).",
    ],
    techStack: ["Paskibra", "Leadership", "Public Speaking", "Collaboration"],
  },
];

