"use client";

import { useEffect, useState } from "react";
import { navigation } from "@/config/site";
import { cn } from "@/lib/utils/cn";

export function Navbar({ visible }: { visible: boolean }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-6 left-1/2 z-50 -translate-x-1/2 transition-all duration-700",
        visible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
      )}
    >
      <nav
        className={cn(
          "glass-nav flex items-center gap-1 rounded-full px-2 py-1.5 transition-all duration-500",
          scrolled && "bg-bg-secondary/80"
        )}
        aria-label="Main navigation"
      >
        {navigation.map(({ label, href }, i) => (
          <a
            key={href}
            href={href}
            onClick={(e) => handleClick(e, href)}
            className={cn(
              "interactive rounded-full px-4 py-2 text-[10px] tracking-[0.2em] transition-colors duration-300",
              i === 0
                ? "text-text-primary font-medium"
                : "text-text-muted hover:text-text-primary"
            )}
            data-cursor="open"
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
