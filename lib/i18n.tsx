"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export type Language = "en" | "id";

export interface Translations {
  nav: {
    about: string;
    experience: string;
    projects: string;
    layanan: string;
    skills: string;
    stack: string;
    blog: string;
    contact: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    description: string;
    viewProjects: string;
    downloadResume: string;
    stat1Label: string;
    stat2Label: string;
    stat3Label: string;
  };
  about: {
    badge: string;
    heading: string;
    headingHighlight: string;
    intro: string;
    para1: string;
    para2: string;
    currentRole: string;
    education: string;
    focus: string;
    card1Title: string;
    card1Desc: string;
    card2Title: string;
    card2Desc: string;
    card3Title: string;
    card3Desc: string;
    card4Title: string;
    card4Desc: string;
  };
  experience: {
    badge: string;
    heading: string;
    headingHighlight: string;
    subheading: string;
    currentRole: string;
    achievements: string;
  };
  projects: {
    badge: string;
    heading: string;
    headingHighlight: string;
    subheading: string;
    readCaseStudy: string;
    code: string;
    live: string;
  };
  skills: {
    badge: string;
    heading: string;
    headingHighlight: string;
    subheading: string;
    verified: string;
  };
  techStack: {
    badge: string;
    heading: string;
    headingHighlight: string;
    subheading: string;
  };
  achievements: {
    badge: string;
    heading: string;
    headingHighlight: string;
    subheading: string;
  };
  blog: {
    badge: string;
    heading: string;
    headingHighlight: string;
    subheading: string;
    searchPlaceholder: string;
    readArticle: string;
  };
  contact: {
    badge: string;
    heading: string;
    headingHighlight: string;
    subheading: string;
    directChannels: string;
    directChannelsDesc: string;
    sendMessage: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    subjectPlaceholder: string;
    messagePlaceholder: string;
    nameLabel: string;
    emailLabel: string;
    subjectLabel: string;
    messageLabel: string;
    submitBtn: string;
    submitting: string;
    successMsg: string;
    errorMsg: string;
  };
  layanan: {
    badge: string;
    heading: string;
    headingHighlight: string;
    subheading: string;
    popularBadge: string;
    priceLabel: string;
    durationLabel: string;
    noteLabel: string;
    noteText: string;
    ctaBtn: string;
    packages: {
      name: string;
      price: string;
      description: string;
      duration: string;
    }[];
  };
  footer: {
    role: string;
    backToTop: string;
    builtWith: string;
    rights: string;
  };
  detailPages: {
    backToProjects: string;
    backToBlog: string;
    role: string;
    techStack: string;
    publishedOn: string;
    readingTime: string;
    relatedProjects: string;
    relatedArticles: string;
  };
}

const en: Translations = {
  nav: {
    about: "About",
    experience: "Experience",
    projects: "Projects",
    layanan: "Services",
    skills: "Skills",
    stack: "Stack",
    blog: "Blog",
    contact: "Contact",
  },
  hero: {
    badge: "Full Stack Web Developer (Laravel | PHP | MySQL)",
    title: "Muhammad Rifdan Dermawan",
    subtitle: "Full Stack Web Developer",
    description:
      "I build, develop, and deploy Laravel-based web applications for real-world business needs. Experienced as the sole developer in digitizing the PT Saung Angklung Udjo platform, with a passion for backend systems, application architecture, and Linux server infrastructure.",
    viewProjects: "View Projects",
    downloadResume: "Download Resume",
    stat1Label: "Tickets Processed",
    stat2Label: "Server Uptime",
    stat3Label: "PageSpeed Score",
  },
  about: {
    badge: "About Me",
    heading: "Engineering for Scale &",
    headingHighlight: "Real-World Impact",
    intro:
      "Informatics Engineering student at Universitas Teknologi Bandung and full-stack web developer specializing in Laravel, PHP, and MySQL systems.",
    para1:
      "During my sole developer internship at PT Saung Angklung Udjo, I completely rebuilt the official corporate website from WordPress into a custom Laravel-based platform. I designed the CMS databases, created visitor ticketing portals, and implemented secure integrations to streamline operations.",
    para2:
      "I love designing backend architectures, working with databases like MySQL and PostgreSQL, and maintaining Linux server systems. From setting up Midtrans payment gateway sandboxes, building QR-code-based check-in systems, and connecting Google sheets/analytics APIs, I manage the end-to-end development lifecycle.",
    currentRole: "Current Role",
    education: "Education",
    focus: "Focus",
    card1Title: "Full Stack Architecture",
    card1Desc: "Expertise in Next.js 15, TypeScript, Tailwind, Laravel 12, PHP 8.3, and REST API standards.",
    card2Title: "Cloud & DevOps Owner",
    card2Desc: "Cloudflare WAF, cPanel, Nginx VPS, Linux administration, and automated SSL/DNS proxying.",
    card3Title: "Security & Payments",
    card3Desc: "Midtrans Snap integration, atomic database locks, HMAC signatures, and DDoS mitigation.",
    card4Title: "Academic Excellence",
    card4Desc:
      "Final year Teknik Informatika student at Universitas Teknologi Bandung with thesis on venue reservation systems.",
  },
  experience: {
    badge: "Career Timeline",
    heading: "Proven Track Record of",
    headingHighlight: "Execution",
    subheading:
      "From academic foundations at Universitas Teknologi Bandung to managing production cloud systems for Saung Angklung Udjo.",
    currentRole: "Current Role",
    achievements: "Key Achievements",
  },
  projects: {
    badge: "Featured Portfolio Work",
    heading: "Engineering Production",
    headingHighlight: "Systems",
    subheading:
      "Real systems running in production — handling live ticket transactions, venue logistics, asset security, and WebGL graphics.",
    readCaseStudy: "Read Case Study",
    code: "Code",
    live: "Live",
  },
  skills: {
    badge: "Core Competencies",
    heading: "Technical Mastery &",
    headingHighlight: "Proficiency",
    subheading: "Hands-on technical competencies honed across production software deployments and academic research.",
    verified: "Technical Skills Verified",
  },
  techStack: {
    badge: "Production Arsenal",
    heading: "Tools Used in",
    headingHighlight: "Production",
    subheading: "Battle-tested technologies used to deliver high-performance applications, not just tutorial demos.",
  },
  achievements: {
    badge: "Impact & Milestones",
    heading: "Engineering Achievements in",
    headingHighlight: "Numbers",
    subheading: "Quantifiable benchmarks demonstrating technical reliability, security, and performance.",
  },
  blog: {
    badge: "Technical Blog & Writing",
    heading: "Architectural Insights &",
    headingHighlight: "Lessons",
    subheading:
      "In-depth technical writeups on web system architecture, payment idempotency, and WebGL graphics performance.",
    searchPlaceholder: "Search articles by title or tag...",
    readArticle: "Read Article",
  },
  contact: {
    badge: "Get In Touch",
    heading: "Let's Build Something",
    headingHighlight: "Extraordinary",
    subheading:
      "Available for full-stack engineering roles, technical architecture consulting, and custom high-performance web systems.",
    directChannels: "Direct Channels",
    directChannelsDesc:
      "Whether you have an upcoming project, infrastructure question, or engineering opportunity, feel free to reach out directly.",
    sendMessage: "Send a Direct Message",
    namePlaceholder: "e.g. Alex Morgan",
    emailPlaceholder: "alex@company.com",
    subjectPlaceholder: "Full Stack Opportunity / Technical Project",
    messagePlaceholder: "Describe your project, timeline, or position details...",
    nameLabel: "Your Name",
    emailLabel: "Your Email",
    subjectLabel: "Subject",
    messageLabel: "Message",
    submitBtn: "Dispatch Message via Resend",
    submitting: "Sending...",
    successMsg: "Message delivered! Muhammad Rifdan will get back to you shortly.",
    errorMsg: "Failed to dispatch message. Please try emailing directly.",
  },
  layanan: {
    badge: "Services & Pricing",
    heading: "Web Development",
    headingHighlight: "Services & Pricing",
    subheading:
      "Custom website, landing page, and Laravel-based system development services.",
    popularBadge: "Most Popular",
    priceLabel: "Price Range",
    durationLabel: "Est. Time",
    noteLabel: "Terms",
    noteText:
      "50% DP upfront · 2x free revisions · 14-day bug-fix warranty included.",
    ctaBtn: "Consult via WhatsApp",
    packages: [
      {
        name: "Landing Page (1 Page)",
        price: "Rp 500rb – 3jt",
        description: "Single-page static or dynamic Laravel landing page, optimized for speed and conversions.",
        duration: "3–7 days",
      },
      {
        name: "Company Profile (3–6 Pages)",
        price: "Rp 1,5jt – 7jt",
        description: "Multi-page static or dynamic company profile with optional Laravel admin panel.",
        duration: "7–14 days",
      },
      {
        name: "Website + System (CMS / Dashboard)",
        price: "Rp 5jt – 15jt",
        description: "Full-featured Laravel system: CMS, admin dashboard, or member area tailored to your business workflow.",
        duration: "14–30 days",
      },
      {
        name: "E-Commerce + Payment Gateway",
        price: "Rp 8jt – 25jt",
        description: "Complete online store with product management, cart, checkout, and payment gateway integration.",
        duration: "21–45 days",
      },
      {
        name: "Feature / Page Add-on",
        price: "Rp 500rb – 3,5jt",
        description: "Extend or enhance an existing website system with new pages, features, or integrations.",
        duration: "2–10 days",
      },
    ],
  },
  footer: {
    role: "Full Stack Engineer • Saung Angklung Udjo",
    backToTop: "Back To Top",
    builtWith: "Built with Next.js 15, TypeScript, Tailwind & Three.js",
    rights: "All rights reserved.",
  },
  detailPages: {
    backToProjects: "Back to Projects",
    backToBlog: "Back to Blog",
    role: "Role",
    techStack: "Tech Stack",
    publishedOn: "Published on",
    readingTime: "Reading Time",
    relatedProjects: "Related Projects",
    relatedArticles: "Related Articles",
  },
};

const id: Translations = {
  nav: {
    about: "Tentang",
    experience: "Pengalaman",
    projects: "Proyek",
    layanan: "Layanan",
    skills: "Keahlian",
    stack: "Stack",
    blog: "Blog",
    contact: "Kontak",
  },
  hero: {
    badge: "Full Stack Web Developer (Laravel | PHP | MySQL)",
    title: "Muhammad Rifdan Dermawan",
    subtitle: "Full Stack Web Developer",
    description:
      "Saya membangun, mengembangkan, dan men-deploy aplikasi web berbasis Laravel untuk kebutuhan bisnis nyata. Berpengalaman sebagai sole developer dalam proyek digitalisasi website PT Saung Angklung Udjo dengan ketertarikan pada backend, arsitektur aplikasi, dan Linux.",
    viewProjects: "Lihat Proyek",
    downloadResume: "Unduh Resume",
    stat1Label: "Tiket Diproses",
    stat2Label: "Uptime Server",
    stat3Label: "Skor PageSpeed",
  },
  about: {
    badge: "Tentang Saya",
    heading: "Engineering untuk Skala &",
    headingHighlight: "Dampak Nyata",
    intro:
      "Mahasiswa Teknik Informatika di Universitas Teknologi Bandung dan pengembang full-stack web spesialis sistem berbasis Laravel, PHP, dan MySQL.",
    para1:
      "Selama masa magang saya sebagai pengembang tunggal (sole developer) di PT Saung Angklung Udjo, saya mendesain database, membangun CMS internal, serta membuat sistem ticketing lengkap guna menggantikan platform lama berbasis WordPress.",
    para2:
      "Saya memiliki ketertarikan mendalam dalam merancang arsitektur backend, mengelola database MySQL/PostgreSQL, dan memelihara server berbasis Linux. Dari integrasi sandbox Midtrans, pembuatan sistem check-in tiket QR code, hingga otomasi laporan via Google Sheets & Analytics API.",
    currentRole: "Posisi Saat Ini",
    education: "Pendidikan",
    focus: "Fokus",
    card1Title: "Arsitektur Full Stack",
    card1Desc:
      "Keahlian dalam Next.js 15, TypeScript, Tailwind, Laravel 12, PHP 8.3, dan standar REST API.",
    card2Title: "Cloud & DevOps Owner",
    card2Desc:
      "Cloudflare WAF, cPanel, Nginx VPS, administrasi Linux, dan SSL/DNS proxying otomatis.",
    card3Title: "Keamanan & Pembayaran",
    card3Desc:
      "Integrasi Midtrans Snap, atomic database locks, HMAC signature, dan mitigasi DDoS.",
    card4Title: "Prestasi Akademik",
    card4Desc:
      "Mahasiswa Teknik Informatika tahun akhir di Universitas Teknologi Bandung dengan skripsi tentang sistem reservasi venue.",
  },
  experience: {
    badge: "Linimasa Karir",
    heading: "Rekam Jejak yang Telah Terbukti dalam",
    headingHighlight: "Eksekusi",
    subheading:
      "Dari fondasi akademik di Universitas Teknologi Bandung hingga mengelola sistem cloud produksi untuk Saung Angklung Udjo.",
    currentRole: "Posisi Saat Ini",
    achievements: "Pencapaian Utama",
  },
  projects: {
    badge: "Portofolio Unggulan",
    heading: "Engineering Sistem",
    headingHighlight: "Produksi",
    subheading:
      "Sistem nyata yang berjalan di produksi — menangani transaksi tiket live, logistik venue, keamanan aset, dan grafis WebGL.",
    readCaseStudy: "Baca Studi Kasus",
    code: "Kode",
    live: "Live",
  },
  skills: {
    badge: "Kompetensi Utama",
    heading: "Penguasaan Teknis &",
    headingHighlight: "Kemahiran",
    subheading:
      "Kompetensi teknis langsung yang diasah melalui deployment perangkat lunak produksi dan penelitian akademik.",
    verified: "Keahlian Teknis Terverifikasi",
  },
  techStack: {
    badge: "Senjata Produksi",
    heading: "Tools yang Digunakan di",
    headingHighlight: "Produksi",
    subheading:
      "Teknologi yang telah teruji dalam mendelivery aplikasi berperforma tinggi, bukan sekadar demo tutorial.",
  },
  achievements: {
    badge: "Dampak & Pencapaian",
    heading: "Pencapaian Engineering dalam",
    headingHighlight: "Angka",
    subheading:
      "Benchmark terukur yang menunjukkan keandalan teknis, keamanan, dan performa.",
  },
  blog: {
    badge: "Blog Teknis & Tulisan",
    heading: "Wawasan Arsitektur &",
    headingHighlight: "Pelajaran",
    subheading:
      "Tulisan teknis mendalam tentang arsitektur sistem web, idempotency pembayaran, dan optimasi performa grafis WebGL.",
    searchPlaceholder: "Cari artikel berdasarkan judul atau tag...",
    readArticle: "Baca Artikel",
  },
  contact: {
    badge: "Hubungi Saya",
    heading: "Mari Membangun Sesuatu yang",
    headingHighlight: "Luar Biasa",
    subheading:
      "Tersedia untuk peran engineering full-stack, konsultasi arsitektur teknis, dan sistem web berperforma tinggi khusus.",
    directChannels: "Saluran Langsung",
    directChannelsDesc:
      "Baik Anda memiliki proyek mendatang, pertanyaan infrastruktur, atau peluang engineering, jangan ragu untuk menghubungi langsung.",
    sendMessage: "Kirim Pesan Langsung",
    namePlaceholder: "cth. Budi Santoso",
    emailPlaceholder: "budi@perusahaan.com",
    subjectPlaceholder: "Kesempatan Full Stack / Proyek Teknis",
    messagePlaceholder: "Jelaskan proyek, timeline, atau detail posisi Anda...",
    nameLabel: "Nama Anda",
    emailLabel: "Email Anda",
    subjectLabel: "Subjek",
    messageLabel: "Pesan",
    submitBtn: "Kirim Pesan via Resend",
    submitting: "Mengirim...",
    successMsg: "Pesan terkirim! Muhammad Rifdan akan segera menghubungi Anda.",
    errorMsg: "Gagal mengirim pesan. Silakan coba email langsung.",
  },
  layanan: {
    badge: "Layanan & Harga",
    heading: "Layanan",
    headingHighlight: "& Harga",
    subheading:
      "Jasa pembuatan website, landing page, dan sistem berbasis Laravel.",
    popularBadge: "Paling Laku",
    priceLabel: "Estimasi Harga",
    durationLabel: "Est. Waktu",
    noteLabel: "Ketentuan",
    noteText:
      "DP 50% di awal · Revisi 2x gratis · Garansi bug fix 14 hari.",
    ctaBtn: "Konsultasi via WhatsApp",
    packages: [
      {
        name: "Landing Page (1 Halaman)",
        price: "Rp 500rb – 3jt",
        description: "Landing page statis atau dinamis berbasis Laravel, dioptimalkan untuk kecepatan dan konversi.",
        duration: "3–7 hari",
      },
      {
        name: "Company Profile (3–6 Halaman)",
        price: "Rp 1,5jt – 7jt",
        description: "Company profile multi-halaman statis atau dinamis, opsional lengkap dengan admin panel Laravel.",
        duration: "7–14 hari",
      },
      {
        name: "Website + Sistem (CMS / Dashboard)",
        price: "Rp 5jt – 15jt",
        description: "Sistem Laravel lengkap: CMS, admin dashboard, atau member area sesuai kebutuhan bisnis Anda.",
        duration: "14–30 hari",
      },
      {
        name: "Toko Online + Payment Gateway",
        price: "Rp 8jt – 25jt",
        description: "Toko online lengkap dengan manajemen produk, keranjang, checkout, dan integrasi payment gateway.",
        duration: "21–45 hari",
      },
      {
        name: "Tambahan Halaman / Fitur",
        price: "Rp 500rb – 3,5jt",
        description: "Tambahkan halaman, fitur, atau integrasi baru ke website / sistem yang sudah ada.",
        duration: "2–10 hari",
      },
    ],
  },
  footer: {
    role: "Full Stack Engineer • Saung Angklung Udjo",
    backToTop: "Kembali ke Atas",
    builtWith: "Dibangun dengan Next.js 15, TypeScript, Tailwind & Three.js",
    rights: "Hak cipta dilindungi.",
  },
  detailPages: {
    backToProjects: "Kembali ke Proyek",
    backToBlog: "Kembali ke Blog",
    role: "Peran",
    techStack: "Tech Stack",
    publishedOn: "Diterbitkan pada",
    readingTime: "Waktu Membaca",
    relatedProjects: "Proyek Terkait",
    relatedArticles: "Artikel Terkait",
  },
};

interface LanguageContextType {
  language: Language;
  t: Translations;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  t: en,
  toggleLanguage: () => {},
  setLanguage: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLang] = useState<Language>("en");

  const toggleLanguage = useCallback(() => {
    setLang((prev) => (prev === "en" ? "id" : "en"));
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLang(lang);
  }, []);

  const t = language === "en" ? en : id;

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
