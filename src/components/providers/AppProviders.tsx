"use client";

import { useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ScrollProvider } from "@/lib/context/ScrollContext";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { Navbar } from "@/components/navigation/Navbar";
import { SectionIndicator } from "@/components/ui/SectionIndicator";
import { PageTransition } from "@/components/ui/PageTransition";
import { MotionRoot } from "@/components/ui/MotionRoot";

export function AppProviders({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [loaded, setLoaded] = useState(!isHome);

  return (
    <ScrollProvider>
      {isHome && !loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <CustomCursor />
      <GrainOverlay />
      <PageTransition />
      <Navbar visible={loaded} />
      {isHome && loaded && <SectionIndicator />}
      <SmoothScroll>
        <MotionRoot ready={loaded}>{children}</MotionRoot>
      </SmoothScroll>
    </ScrollProvider>
  );
}
