import { Hero } from "@/components/hero/Hero";
import { ProjectShowcase } from "@/components/projects/ProjectShowcase";
import { About } from "@/components/about/About";
import { Skills } from "@/components/skills/Skills";
import { Journey } from "@/components/journey/Journey";
import { Lab } from "@/components/lab/Lab";
import { Contact } from "@/components/contact/Contact";
import { Footer } from "@/components/ui/Footer";
import { Marquee } from "@/components/ui/Marquee";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <ProjectShowcase />
      <About />
      <Skills />
      <Journey />
      <Lab />
      <Contact />
      <Footer />
    </main>
  );
}
