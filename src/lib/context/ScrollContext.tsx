"use client";

import { createContext, useContext, useRef, type ReactNode, type RefObject } from "react";

interface ScrollContextValue {
  heroProgress: RefObject<number>;
  mouseX: RefObject<number>;
  mouseY: RefObject<number>;
  activeSection: RefObject<string>;
}

const ScrollContext = createContext<ScrollContextValue | null>(null);

export function ScrollProvider({ children }: { children: ReactNode }) {
  const heroProgress = useRef(0);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const activeSection = useRef("hero");

  return (
    <ScrollContext.Provider value={{ heroProgress, mouseX, mouseY, activeSection }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScrollContext(): ScrollContextValue {
  const ctx = useContext(ScrollContext);
  if (!ctx) throw new Error("useScrollContext must be used within ScrollProvider");
  return ctx;
}
