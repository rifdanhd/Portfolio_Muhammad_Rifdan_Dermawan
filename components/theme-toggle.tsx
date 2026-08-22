"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className="text-zinc-300 hover:text-white hover:bg-white/10 rounded-full h-7 w-7 p-0 flex items-center justify-center"
    >
      {isDark ? (
        <Sun className="w-3.5 h-3.5 text-orange-400" />
      ) : (
        <Moon className="w-3.5 h-3.5 text-zinc-300" />
      )}
    </Button>
  );
}

