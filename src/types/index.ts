export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "facebook" | "email";
}

export interface Education {
  year: string;
  degree: string;
  institution: string;
}

export interface Experience {
  year: string;
  title: string;
  organization: string;
  description?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  results: string;
  technologies: string[];
  year: string;
  image: string;
  github?: string;
  live?: string;
  color: string;
}

export interface Skill {
  name: string;
  category: "frontend" | "backend" | "programming" | "ai" | "tools";
  description: string;
}

export interface Experiment {
  id: string;
  title: string;
  description: string;
  tags: string[];
  href?: string;
  gradient: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Section {
  id: string;
  number: string;
  label: string;
}
