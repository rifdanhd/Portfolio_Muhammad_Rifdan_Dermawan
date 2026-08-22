"use client";

import { soundManager } from "@/lib/sound-effects";

export function useSoundEffect() {
  return {
    playClick: () => soundManager.playClick(),
    playHover: () => soundManager.playHover(),
    setEnabled: (val: boolean) => soundManager.setEnabled(val),
    isEnabled: () => soundManager.isEnabled(),
  };
}
