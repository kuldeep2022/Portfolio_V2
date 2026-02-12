import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { AIChat } from "@/components/ui/AIChat";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { FxCursor } from "@/components/ui/FxCursor";
import { AmbientAudio } from "@/components/ui/AmbientAudio";

export default function Home() {
  return (
    <main className="relative z-10 min-h-screen bg-black text-foreground scroll-smooth">
      <FxCursor />
      <Navbar />
      <Hero />
      <SectionDivider />
      <Experience />
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
