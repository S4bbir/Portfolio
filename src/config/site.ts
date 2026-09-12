import type { Education, Experience, NavItem, Section, SocialLink } from "@/types";

export const siteConfig = {
  name: "Sabbir Hossan",
  displayName: "S4BBIR",
  role: "Creative Developer",
  tagline: "AI × SOFTWARE × DIGITAL EXPERIENCES",
  email: "sabbir.hossan@example.com",
  github: "https://github.com/s4bbir",
  linkedin: "https://linkedin.com/in/s4bbir",
  location: "Dhaka, Bangladesh",
  locationShort: "BD",
  year: "2026",
  description:
    "Sabbir Hossan is a creative developer building software, AI systems, and interactive digital experiences.",
  hero: {
    line1: "I BUILD",
    line2: "DIGITAL SYSTEMS",
    line3: "AND INTELLIGENT",
    line4: "EXPERIENCES.",
  },
  about: {
    heading: ["I BUILD", "DIGITAL PRODUCTS", "AND INTELLIGENT", "SYSTEMS."],
    paragraph:
      "I'm a computer science student and developer interested in building useful software, AI-powered products, and interactive digital experiences. I combine engineering fundamentals with creative frontend work to ship products that feel as good as they function.",
  },
} as const;

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: siteConfig.github, icon: "github" },
  { label: "LinkedIn", href: siteConfig.linkedin, icon: "linkedin" },
  { label: "Email", href: `mailto:${siteConfig.email}`, icon: "email" },
];

export const navigation: NavItem[] = [
  { label: "S4BBIR", href: "#hero" },
  { label: "ABOUT", href: "#about" },
  { label: "PROJECTS", href: "#projects" },
  { label: "CONTACT", href: "#contact" },
];

export const sections: Section[] = [
  { id: "hero", number: "01", label: "Intro" },
  { id: "projects", number: "02", label: "Projects" },
  { id: "about", number: "03", label: "About" },
  { id: "stack", number: "04", label: "Stack" },
  { id: "journey", number: "05", label: "Journey" },
  { id: "lab", number: "06", label: "Lab" },
  { id: "contact", number: "07", label: "Contact" },
];

export const education: Education[] = [
  {
    year: "2026",
    degree: "BSc in Computer Science & Engineering",
    institution: "American International University-Bangladesh (AIUB)",
  },
];

export const experience: Experience[] = [
  {
    year: "[ADD YEAR]",
    title: "[ADD POSITION]",
    organization: "[ADD COMPANY]",
    description: "[ADD DESCRIPTION]",
  },
];
