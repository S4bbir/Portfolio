"use client";

import { siteConfig } from "@/config/site";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/5 px-6 py-8 md:px-16 lg:px-24">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <p className="section-label text-text-muted">
          © {siteConfig.year} {siteConfig.displayName}
        </p>
        <p className="section-label text-text-muted">
          BUILT WITH REACT / THREE.JS / GSAP
        </p>
        <button
          type="button"
          onClick={scrollToTop}
          className="interactive section-label text-text-muted transition-colors hover:text-text-primary"
          data-cursor="open"
          aria-label="Back to top"
        >
          BACK TO TOP ↑
        </button>
      </div>
    </footer>
  );
}
