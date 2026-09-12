"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { initPageMotion } from "@/lib/animations/motion";
import { ScrollTrigger } from "@/lib/animations/gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export function MotionRoot({
  children,
  ready,
}: {
  children: ReactNode;
  ready: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (!ref.current || !ready) return;
    const ctx = initPageMotion(ref.current, reduced);
    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      window.clearTimeout(refresh);
      ctx.revert();
    };
  }, [pathname, reduced, ready]);

  return (
    <div ref={ref} className="motion-root">
      {children}
    </div>
  );
}
