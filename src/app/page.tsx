import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { AIChat } from "@/components/ui/AIChat";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { FxCursor } from "@/components/ui/FxCursor";
import { AmbientAudio } from "@/components/ui/AmbientAudio";
import { Preloader } from "@/components/ui/Preloader";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export default function Home() {
  return (
    <main className="relative z-10 min-h-screen bg-[#030306] text-foreground scroll-smooth">
      <Preloader />
      <ScrollProgress />
      <FxCursor />
      <Navbar />
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Experience />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <Skills />
      <SectionDivider />
      <Contact />
      <Footer />
      <AIChat />
      <AmbientAudio />
    </main>
  );
}
