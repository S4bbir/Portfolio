"use client";

import { useEffect, useState } from "react";
import { sections } from "@/config/site";
import { useIsMobile } from "@/lib/hooks/useIsMobile";

export function SectionIndicator() {
  const [active, setActive] = useState("hero");
  const isMobile = useIsMobile();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-20% 0px -20% 0px" }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  if (isMobile) return null;

  return (
    <nav
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex"
      aria-label="Section navigation"
    >
      {sections.map(({ id, number }) => (
        <a
          key={id}
          href={`#${id}`}
          className={`interactive section-label transition-all duration-500 ${
            active === id
              ? "text-accent-blue opacity-100"
              : "text-text-muted opacity-40 hover:opacity-70"
          }`}
          aria-current={active === id ? "true" : undefined}
          aria-label={`Section ${number}`}
        >
          {number}
        </a>
      ))}
    </nav>
  );
}
