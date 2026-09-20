"use client";

export function Marquee() {
  const phrase = "SABBIR  ·  CREATIVE DEVELOPER  ·  AI  ·  SOFTWARE  ·  DIGITAL EXPERIENCES  ·  NEXT.JS  ·  THREE.JS  ·  GSAP  ·  ";

  return (
    <div
      className="relative overflow-hidden border-y border-white/[0.04] py-5"
      aria-hidden="true"
      data-skew
    >
      {/* Top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-blue/20 to-transparent" />
      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-violet/20 to-transparent" />

      {/* Row 1 — left */}
      <div className="marquee-track flex w-max">
        {Array.from({ length: 4 }).map((_, i) => (
          <p
            key={i}
            className="section-label whitespace-nowrap px-4 text-text-muted"
          >
            {phrase}
          </p>
        ))}
      </div>

      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-bg-primary to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-bg-primary to-transparent" />
    </div>
  );
}
