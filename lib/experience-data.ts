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
      "Sole developer responsible for rebuilding the official corporate website from WordPress into a custom Laravel platform — from database design to production deployment.",
    achievements: [
      "Rebuilt the company website from WordPress into a custom Laravel application for easier management and scalability.",
      "Designed and built CMS databases and interfaces independently for hero banners, articles, events, testimonials, and products.",
      "Developed a custom visitor ticketing, show scheduling, and reservation system.",
      "Engineered a QR-code ticket scanning module for collaborative events (Saung Angklung Udjo x Persib Bandung) to speed up visitor check-in.",
      "Integrated Midtrans sandbox and static QRIS for online and on-site payments.",
      "Implemented Google OAuth 2.0, Google Analytics API, and Google Sheets API for authentication and admin monitoring.",
      "Built an AI-powered chatbot to automate customer support and deployed the platform to production.",
    ],
    techStack: ["Laravel", "PHP", "MySQL", "Midtrans API", "Google API", "AI Chatbot", "Git", "Linux Server"],
  },
 {
  id: "eksavapor-content-creator",
  company: "EKSAVAPOR",
  role: "Content Creator & E-Commerce Admin",
  period: "Jan 2020 — Aug 2025",
  location: "Bandung, Indonesia",
  isCurrent: false,
  description:
    "Mengelola operasional marketplace dan media sosial brand secara end-to-end — dari strategi konten dan penjualan hingga pemrograman chip custom untuk kebutuhan produk.",
  achievements: [
    "Mengelola operasional marketplace dan media sosial brand (Shopee, Tokopedia, Instagram, TikTok), termasuk listing produk dan respons pelanggan.",
    "Menjual ribuan unit produk dengan harga di atas Rp1.000.000, mencerminkan kemampuan strategi penjualan dan copywriting yang efektif.",
    "Membangun akun media sosial brand dari nol hingga puluhan ribu followers melalui strategi konten yang konsisten.",
    "Memprogram Arduino (C/C++) ke chip custom rancangan sendiri, menambah pengalaman praktis embedded system/hardware.",
  ],
  techStack: ["E-Commerce Ops", "Social Media Strategy", "Copywriting", "Arduino", "C/C++"],
},
  {
    id: "education-utb",
    company: "Universitas Teknologi Bandung",
    role: "Undergraduate Informatics Engineering Student",
    period: "Aug 2023 — Present (Expected 2027)",
    location: "Bandung, Indonesia",
    isCurrent: true,
    description:
      "Majoring in Informatics Engineering, currently in Semester 7 — specializing in backend architecture, database schemas, and server environments.",
    achievements: [
      "Undergraduate thesis: automated ticket reservation system for cultural venues using Laravel & Midtrans payment gateway.",
      "Maintained solid academic performance across data structures, software engineering, databases, and Linux operating systems.",
    ],
    techStack: ["Teknik Informatika", "Data Structures", "Web Development", "Database Systems", "Software Design"],
  },
];