"use client";

import { useState, type ReactNode } from "react";
import { ScrollProvider } from "@/lib/context/ScrollContext";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { Navbar } from "@/components/navigation/Navbar";
import { SectionIndicator } from "@/components/ui/SectionIndicator";

export function AppProviders({ children }: { children: ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <ScrollProvider>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <CustomCursor />
      <GrainOverlay />
      <Navbar visible={loaded} />
      <SectionIndicator />
      <SmoothScroll>{children}</SmoothScroll>
    </ScrollProvider>
  );
}
