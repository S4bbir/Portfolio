"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, registerGSAP } from "@/lib/animations/gsap";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

type CursorMode = "default" | "view" | "open" | "drag";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [mode, setMode] = useState<CursorMode>("default");
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (isMobile || reducedMotion) return;

    registerGSAP();
    const cursor = cursorRef.current;
    if (!cursor) return;

    const pos = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    let rafId = 0;
    const tick = () => {
      pos.x += (target.x - pos.x) * 0.15;
      pos.y += (target.y - pos.y) * 0.15;
      gsap.set(cursor, { x: pos.x, y: pos.y });
      rafId = requestAnimationFrame(tick);
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest("[data-cursor='view']")) setMode("view");
      else if (el.closest("[data-cursor='open']")) setMode("open");
      else if (el.closest("[data-cursor='drag']")) setMode("drag");
      else if (el.closest("a, button, [role='button'], .interactive")) setMode("open");
      else setMode("default");
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(rafId);
    };
  }, [isMobile, reducedMotion]);

  useEffect(() => {
    if (!cursorRef.current || isMobile || reducedMotion) return;
    const scale = mode === "default" ? 1 : 2.5;
    gsap.to(cursorRef.current, { scale, duration: 0.3, ease: "power2.out" });
  }, [mode, isMobile, reducedMotion]);

  if (isMobile || reducedMotion) return null;

  const labels: Record<CursorMode, string> = {
    default: "",
    view: "VIEW",
    open: "OPEN ↗",
    drag: "DRAG",
  };

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      aria-hidden="true"
    >
      <div
        className={`flex items-center justify-center rounded-full border border-white/30 bg-white/10 transition-all duration-300 ${
          mode === "default" ? "h-2 w-2" : "h-14 w-14"
        }`}
      >
        {mode !== "default" && (
          <span ref={labelRef} className="text-[9px] font-medium tracking-widest text-white">
            {labels[mode]}
          </span>
        )}
      </div>
    </div>
  );
}
