"use client";

import React, { useState } from "react";
import Navbar from "@/components/navbar";
import CommandPalette from "@/components/command-palette";

export default function NavbarWrapper() {
  const [cmdkOpen, setCmdkOpen] = useState(false);

  return (
    <>
      <Navbar onOpenCmdk={() => setCmdkOpen(true)} />
      <CommandPalette open={cmdkOpen} onOpenChange={setCmdkOpen} />
    </>
  );
}
