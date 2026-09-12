"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { navigation, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/cn";

export function Navbar({ visible }: { visible: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (pathname === "/") {
      document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/");
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("/#", "").replace("#", "");
    if (pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    router.push(`/#${id}`);
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
        <a
          href="/"
          onClick={goHome}
          className="interactive rounded-full px-4 py-2 font-display text-sm tracking-[0.08em] text-text-primary"
          data-cursor="open"
          aria-label="Sabbir home"
        >
          {siteConfig.shortName}
        </a>
        {navigation.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            onClick={(e) => handleClick(e, href)}
            className="interactive rounded-full px-4 py-2 text-[10px] tracking-[0.2em] text-text-muted transition-colors duration-300 hover:text-text-primary"
            data-cursor="open"
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
