"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { skills } from "@/config/projects";
import { siteConfig } from "@/config/site";
import { useDeviceType } from "@/lib/hooks/useIsMobile";
import { gsap, registerGSAP } from "@/lib/animations/gsap";
import type { Skill } from "@/types";

const CATEGORY_LABELS: Record<Skill["category"], string> = {
  frontend: "Frontend",
  backend: "Backend / Database",
  programming: "Programming",
  ai: "AI / Data",
  tools: "Tools",
};

const CATEGORY_COLORS: Record<Skill["category"], string> = {
  frontend: "#4D7CFF",
  backend: "#8B5CF6",
  programming: "#5B8CFF",
  ai: "#6366F1",
  tools: "#A78BFA",
};

export function SkillOrbit() {
  const [active, setActive] = useState<Skill | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const device = useDeviceType();
  const radius = device === "mobile" ? 130 : 210;
  const centerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const orbitSkills = useMemo(
    () =>
      ["React", "Next.js", "TypeScript", "JavaScript", "Python", "C#", "SQL", "Supabase", "Three.js", "AI APIs", "Git", "Figma"],
    []
  );

  const displaySkills = skills.filter((s) => orbitSkills.includes(s.name));

  // Animate center content swap
  useEffect(() => {
    if (!centerRef.current) return;
    registerGSAP();
    gsap.fromTo(
      centerRef.current.querySelectorAll(".center-content"),
      { opacity: 0, y: 10, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power3.out" }
    );
  }, [active]);

  // Slowly orbit the ring
  useEffect(() => {
    if (!containerRef.current) return;
    const buttons = containerRef.current.querySelectorAll<HTMLElement>(".orbit-btn");
    let angle = 0;
    let rafId = 0;
    const tick = () => {
      angle += 0.0015;
      buttons.forEach((btn, i) => {
        const baseAngle = (i / displaySkills.length) * Math.PI * 2 - Math.PI / 2;
        const a = baseAngle + angle;
        const x = Math.cos(a) * radius;
        const y = Math.sin(a) * radius;
        btn.style.transform = `translate(${x}px, ${y}px) scale(${hovered === btn.dataset.skill ? 1.18 : 1})`;
      });
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [displaySkills.length, radius, hovered]);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto flex h-[520px] w-full max-w-2xl items-center justify-center md:h-[640px]"
    >
      {/* Outer orbit rings */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="absolute h-44 w-44 rounded-full border border-white/[0.06] md:h-56 md:w-56" />
        <div className="orbit-ring absolute h-72 w-72 rounded-full border border-dashed border-white/[0.04] md:h-96 md:w-96" />
        <div className="absolute h-[500px] w-[500px] rounded-full border border-white/[0.02] md:h-[580px] md:w-[580px]" />
        {/* Center glow */}
        <div
          className="absolute h-48 w-48 rounded-full opacity-40 blur-3xl"
          style={{
            background: active
              ? `radial-gradient(circle, ${CATEGORY_COLORS[active.category]}55 0%, transparent 70%)`
              : "radial-gradient(circle, #4D7CFF33 0%, transparent 70%)",
            transition: "background 0.5s ease",
          }}
        />
      </div>

      {/* Center display */}
      <div
        ref={centerRef}
        className="relative z-10 flex min-w-[200px] flex-col items-center text-center"
      >
        {!active ? (
          <div className="center-content">
            <p className="font-display text-2xl tracking-wider text-text-primary md:text-3xl">
              {siteConfig.displayName}
            </p>
            <p className="mt-2 text-xs tracking-[0.3em] text-text-muted">HOVER A SKILL</p>
          </div>
        ) : (
          <div className="center-content">
            <p
              className="section-label mb-1"
              style={{ color: CATEGORY_COLORS[active.category] }}
            >
              {CATEGORY_LABELS[active.category]}
            </p>
            <p className="font-display text-2xl text-text-primary md:text-3xl">{active.name}</p>
            <p className="mt-2 max-w-[180px] text-sm leading-relaxed text-text-muted">
              {active.description}
            </p>
          </div>
        )}
      </div>

      {/* Orbit skill buttons */}
      {displaySkills.map((skill) => {
        const isHov = hovered === skill.name;
        return (
          <button
            key={skill.name}
            type="button"
            data-skill={skill.name}
            className="orbit-btn interactive absolute section-label rounded-full border bg-bg-surface/80 px-3 py-2 text-text-secondary backdrop-blur-sm transition-colors duration-300 focus-visible:outline-accent-blue"
            style={{
              borderColor: isHov ? `${CATEGORY_COLORS[skill.category]}50` : "rgba(255,255,255,0.06)",
              color: isHov ? CATEGORY_COLORS[skill.category] : undefined,
              boxShadow: isHov ? `0 0 20px ${CATEGORY_COLORS[skill.category]}30` : "none",
              zIndex: isHov ? 10 : 1,
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
