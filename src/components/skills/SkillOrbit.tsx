"use client";

import { useMemo, useState } from "react";
import { skills } from "@/config/projects";
import { siteConfig } from "@/config/site";
import { useDeviceType } from "@/lib/hooks/useIsMobile";
import type { Skill } from "@/types";

const CATEGORY_LABELS: Record<Skill["category"], string> = {
  frontend: "Frontend",
  backend: "Backend / Database",
  programming: "Programming",
  ai: "AI / Data",
  tools: "Tools",
};

export function SkillOrbit() {
  const [active, setActive] = useState<Skill | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const device = useDeviceType();
  const radius = device === "mobile" ? 140 : 200;

  const orbitSkills = useMemo(
    () =>
      ["React", "Next.js", "TypeScript", "JavaScript", "Python", "C#", "SQL", "Supabase", "Three.js", "AI", "Git", "GitHub"],
    []
  );

  const displaySkills = skills.filter((s) => orbitSkills.includes(s.name));

  return (
    <div className="relative mx-auto flex h-[500px] w-full max-w-2xl items-center justify-center md:h-[600px]">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="orbit-ring h-48 w-48 rounded-full border border-white/5 md:h-64 md:w-64" />
        <div className="orbit-ring-slow absolute h-72 w-72 rounded-full border border-dashed border-white/[0.06] md:h-96 md:w-96" />
      </div>

      <div className="relative z-10 text-center">
        <p className="font-display text-2xl tracking-wider md:text-3xl">{siteConfig.shortName}</p>
        {active && (
          <div className="mt-4">
            <p className="section-label text-accent-blue">{CATEGORY_LABELS[active.category]}</p>
            <p className="mt-1 text-lg text-text-primary">{active.name}</p>
            <p className="mt-1 max-w-xs text-sm text-text-muted">{active.description}</p>
          </div>
        )}
      </div>

      {displaySkills.map((skill, i) => {
        const angle = (i / displaySkills.length) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const isHovered = hovered === skill.name;

        return (
          <button
            key={skill.name}
            type="button"
            className="skill-orbit-item interactive absolute section-label rounded-full border border-white/10 bg-bg-surface/80 px-3 py-2 text-text-secondary backdrop-blur-sm hover:border-accent-blue/30 hover:text-text-primary focus-visible:outline-accent-blue"
            style={{
              transform: `translate(${x}px, ${y}px) scale(${isHovered ? 1.15 : 1})`,
              zIndex: isHovered ? 10 : 1,
            }}
            onMouseEnter={() => {
              setHovered(skill.name);
              setActive(skill);
            }}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setActive(skill)}
            aria-label={`${skill.name} — ${CATEGORY_LABELS[skill.category]}`}
          >
            {skill.name}
          </button>
        );
      })}
    </div>
  );
}
