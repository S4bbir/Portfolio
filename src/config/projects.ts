import type { Experiment, Project, Skill } from "@/types";

export const projects: Project[] = [
  {
    id: "01",
    slug: "synaptiq",
    title: "SynaptiQ",
    category: "AI Research Platform",
    description: "An AI-powered research assistant for exploring, organizing, and synthesizing information.",
    overview:
      "SynaptiQ is an AI research platform designed to help users navigate complex topics, summarize sources, and build structured knowledge bases.",
    problem:
      "Research workflows often scatter across tabs, notes, and tools — making it difficult to connect insights and retain context.",
    solution:
      "Built an intelligent interface that combines document ingestion, semantic search, and conversational AI to streamline the research process.",
    features: [
      "Semantic document search and indexing",
      "AI-assisted summarization and Q&A",
      "Project-based knowledge organization",
      "Real-time collaborative notes",
    ],
    results: "[ADD RESULTS — metrics, learnings, or outcomes]",
    technologies: ["Next.js", "React", "TypeScript", "AI", "Supabase"],
    year: "2025",
    image: "/projects/synaptiq.svg",
    github: "[ADD GITHUB URL]",
    live: "[ADD LIVE URL]",
    color: "#4D7CFF",
  },
  {
    id: "02",
    slug: "shortcutx",
    title: "ShortcutX",
    category: "Browser Productivity System",
    description: "A browser extension and workflow system for faster navigation and task automation.",
    overview:
      "ShortcutX brings keyboard-first productivity to the browser with custom shortcuts, command palettes, and workflow automation.",
    problem:
      "Repetitive browser tasks consume time — switching tabs, filling forms, and navigating sites lacks efficient shortcuts.",
    solution:
      "Developed a Chrome extension with a command palette interface, customizable shortcuts, and context-aware actions.",
    features: [
      "Global command palette",
      "Custom keyboard shortcuts",
      "Tab and bookmark management",
      "Workflow automation scripts",
    ],
    results: "[ADD RESULTS]",
    technologies: ["JavaScript", "Chrome Extension API", "React", "TypeScript"],
    year: "2025",
    image: "/projects/shortcutx.svg",
    github: "[ADD GITHUB URL]",
    live: "[ADD LIVE URL]",
    color: "#8B5CF6",
  },
  {
    id: "03",
    slug: "vibeo",
    title: "Vibeo",
    category: "Interactive Media Platform",
    description: "An experimental platform for creating and sharing interactive visual experiences.",
    overview:
      "Vibeo explores the intersection of video, motion, and interactivity — allowing creators to build immersive media experiences.",
    problem:
      "Traditional video platforms lack interactivity — viewers passively consume content without engagement layers.",
    solution:
      "Created a web-based platform with timeline-based interactions, WebGL effects, and responsive playback.",
    features: [
      "Interactive timeline editor",
      "WebGL-powered visual effects",
      "Responsive playback engine",
      "Shareable experience links",
    ],
    results: "[ADD RESULTS]",
    technologies: ["Next.js", "Three.js", "GSAP", "TypeScript"],
    year: "2025",
    image: "/projects/vibeo.svg",
    github: "[ADD GITHUB URL]",
    live: "[ADD LIVE URL]",
    color: "#5B8CFF",
  },
  {
    id: "04",
    slug: "tastybite",
    title: "TastyBite",
    category: "Food Discovery App",
    description: "A food discovery and recipe platform with personalized recommendations.",
    overview:
      "TastyBite helps users discover recipes, plan meals, and explore cuisines through a curated, visual-first interface.",
    problem:
      "Finding recipes that match dietary preferences and available ingredients is often fragmented across multiple apps.",
    solution:
      "Built a unified discovery platform with smart filtering, visual recipe cards, and meal planning tools.",
    features: [
      "Visual recipe discovery feed",
      "Dietary preference filtering",
      "Meal planning calendar",
      "Ingredient-based search",
    ],
    results: "[ADD RESULTS]",
    technologies: ["React", "Node.js", "Supabase", "Tailwind CSS"],
    year: "2024",
    image: "/projects/tastybite.svg",
    github: "[ADD GITHUB URL]",
    live: "[ADD LIVE URL]",
    color: "#6366F1",
  },
];

export const skills: Skill[] = [
  { name: "React", category: "frontend", description: "Component-based UI development." },
  { name: "Next.js", category: "frontend", description: "Full-stack React framework." },
  { name: "TypeScript", category: "frontend", description: "Type-safe JavaScript development." },
  { name: "JavaScript", category: "frontend", description: "Core web programming language." },
  { name: "HTML", category: "frontend", description: "Semantic markup and structure." },
  { name: "CSS", category: "frontend", description: "Styling and layout systems." },
  { name: "Tailwind", category: "frontend", description: "Utility-first CSS framework." },
  { name: "Three.js", category: "frontend", description: "3D graphics and WebGL experiences." },
  { name: "Node.js", category: "backend", description: "Server-side JavaScript runtime." },
  { name: "Supabase", category: "backend", description: "Backend-as-a-service platform." },
  { name: "SQL", category: "backend", description: "Relational database queries." },
  { name: "Python", category: "programming", description: "General-purpose programming." },
  { name: "C#", category: "programming", description: "Object-oriented development." },
  { name: "C++", category: "programming", description: "Systems and performance code." },
  { name: "Java", category: "programming", description: "Enterprise application development." },
  { name: "Machine Learning", category: "ai", description: "Predictive models and training." },
  { name: "AI APIs", category: "ai", description: "Integration with LLM services." },
  { name: "Data Analysis", category: "ai", description: "Extracting insights from data." },
  { name: "Data Visualization", category: "ai", description: "Visual representation of data." },
  { name: "Git", category: "tools", description: "Version control and collaboration." },
  { name: "GitHub", category: "tools", description: "Code hosting and CI/CD." },
  { name: "VS Code", category: "tools", description: "Primary development environment." },
  { name: "Figma", category: "tools", description: "UI design and prototyping." },
];

export const experiments: Experiment[] = [
  {
    id: "01",
    title: "Neural Interface",
    description: "Experimental AI chat UI with fluid typography and context visualization.",
    tags: ["AI", "UI", "React"],
    gradient: "from-blue-600/20 to-violet-600/20",
  },
  {
    id: "02",
    title: "Particle Field",
    description: "Interactive WebGL particle simulation with cursor-reactive forces.",
    tags: ["Three.js", "WebGL", "Shaders"],
    gradient: "from-violet-600/20 to-indigo-600/20",
  },
  {
    id: "03",
    title: "Data Stream",
    description: "Real-time data visualization with animated chart transitions.",
    tags: ["D3", "Data Viz", "Animation"],
    gradient: "from-cyan-600/20 to-blue-600/20",
  },
  {
    id: "04",
    title: "Command Palette",
    description: "Keyboard-driven navigation prototype inspired by developer tools.",
    tags: ["Extension", "Productivity"],
    gradient: "from-indigo-600/20 to-purple-600/20",
  },
  {
    id: "05",
    title: "Morph Grid",
    description: "CSS grid layout that morphs between configurations on scroll.",
    tags: ["CSS", "Layout", "GSAP"],
    gradient: "from-purple-600/20 to-pink-600/20",
  },
];
