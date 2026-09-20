"use client";

import { SkillOrbit } from "./SkillOrbit";

function splitChars(text: string) {
  return text.split("").map((char, i) => (
    <span key={i} className="inline-block overflow-hidden">
      <span className="char inline-block will-change-transform">
        {char === " " ? "\u00A0" : char}
      </span>
    </span>
  ));
}

export function Skills() {
  return (
    <section
      id="stack"
      className="relative overflow-hidden min-h-screen px-6 py-32 md:px-16 lg:px-24"
      aria-labelledby="skills-heading"
    >
      {/* Violet ambient glow */}
      <div
        className="pointer-events-none absolute right-0 top-1/4 h-[600px] w-[400px] opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-6xl">
        <p className="section-label mb-4" data-reveal>
          04 / STACK
        </p>
        <h2
          id="skills-heading"
          className="font-display mb-20 text-4xl md:text-6xl lg:text-7xl"
          data-chars
        >
          {splitChars("TOOLS I BUILD WITH")}
        </h2>

        {/* Orbit */}
        <div data-scale>
          <SkillOrbit />
        </div>

        {/* Category legend */}
        <div className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-3" data-stagger>
          {(["frontend", "backend", "programming", "ai", "tools"] as const).map((cat) => (
            <div key={cat} className="flex items-center gap-2">
              <div
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  background: {
                    frontend: "#4D7CFF",
                    backend: "#8B5CF6",
                    programming: "#5B8CFF",
                    ai: "#6366F1",
                    tools: "#A78BFA",
                  }[cat],
                }}
              />
              <span className="section-label text-text-muted capitalize">
                {{
                  frontend: "Frontend",
                  backend: "Backend",
                  programming: "Programming",
                  ai: "AI / Data",
                  tools: "Tools",
                }[cat]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
