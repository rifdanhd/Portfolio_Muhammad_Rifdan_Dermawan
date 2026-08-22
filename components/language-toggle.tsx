"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      title={language === "en" ? "Switch to Bahasa Indonesia" : "Switch to English"}
      className="font-mono text-xs px-2.5 h-7 gap-1 text-zinc-300 hover:text-white hover:bg-white/10 rounded-full"
    >
      <span className={language === "en" ? "text-orange-400 font-bold" : "text-zinc-400"}>EN</span>
      <span className="text-zinc-500">/</span>
      <span className={language === "id" ? "text-orange-400 font-bold" : "text-zinc-400"}>ID</span>
    </Button>
  );
}

