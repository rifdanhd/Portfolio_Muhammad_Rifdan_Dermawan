"use client";

import React, { useState } from "react";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import TickerMarquee from "@/components/ticker-marquee";
import About from "@/components/about";
import Experience from "@/components/experience";
import ProjectsSection from "@/components/projects-section";
import LayananSection from "@/components/layanan-section";
import Skills from "@/components/skills";
import TechStack from "@/components/tech-stack";
import Achievements from "@/components/achievements";
import BlogSection from "@/components/blog-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import CommandPalette from "@/components/command-palette";

export default function HomePage() {
  const [cmdkOpen, setCmdkOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-studio-grid" style={{ backgroundColor: "var(--bg-page)", color: "hsl(var(--foreground))" }}>
      <Navbar onOpenCmdk={() => setCmdkOpen(true)} />
      <CommandPalette open={cmdkOpen} onOpenChange={setCmdkOpen} />

      <main className="w-full">
        <Hero />
        <TickerMarquee />
        <ProjectsSection />
        <Experience />
        <About />

       
        <Skills />
        <TechStack />
        {/* <Achievements /> */}
        {/* TODO: uncomment when real blog posts are written */}
        {/* <BlogSection /> */}
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
