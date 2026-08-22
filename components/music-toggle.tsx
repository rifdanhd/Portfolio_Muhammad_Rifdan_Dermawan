"use client";

import React, { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSoundEffect } from "@/hooks/use-sound-effect";

export default function MusicToggle() {
  const [enabled, setEnabledState] = useState(false);
  const sound = useSoundEffect();

  const toggleSound = () => {
    const nextState = !enabled;
    setEnabledState(nextState);
    sound.setEnabled(nextState);
    if (nextState) {
      sound.playClick();
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSound}
      title={enabled ? "Sound FX: On" : "Sound FX: Off"}
      className="text-zinc-400 hover:text-white hover:bg-zinc-800/60"
    >
      {enabled ? (
        <Volume2 className="w-4 h-4 text-blue-400" />
      ) : (
        <VolumeX className="w-4 h-4 text-zinc-500" />
      )}
    </Button>
  );
}
