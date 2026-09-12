"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGSAP } from "@/lib/animations/gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { cn } from "@/lib/utils/cn";

interface SplitTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  splitBy?: "words" | "chars";
}

export function SplitText({
  text,
  className,
  as: Tag = "h2",
  delay = 0,
  splitBy = "words",
}: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  const parts = splitBy === "words" ? text.split(" ") : text.split("");

  useEffect(() => {
    if (reducedMotion || !ref.current) return;

    registerGSAP();
    const words = ref.current.querySelectorAll(".split-word");

    gsap.fromTo(
      words,
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 0.8,
        stagger: splitBy === "words" ? 0.06 : 0.03,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
      }
    );
  }, [delay, reducedMotion, splitBy]);

  return (
    <Tag className={cn("overflow-hidden", className)}>
      <span ref={ref as React.RefObject<HTMLSpanElement>} className="inline">
        {parts.map((part, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <span className="split-word inline-block">
              {part}
              {splitBy === "words" && i < parts.length - 1 ? "\u00A0" : ""}
            </span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
