import { ScrollRestorer } from "@/components/layout/ScrollRestorer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Writing } from "@/components/sections/Writing";
import { Contact } from "@/components/sections/Contact";
import { TerminalSection } from "@/components/sections/TerminalSection";
import { POV } from "@/components/sections/POV";
import { KonamiCode } from "@/components/easter-eggs/KonamiCode";
import { Marquee } from "@/components/ui/Marquee";
import { CircularText } from "@/components/ui/CircularText";
import { SectionDots } from "@/components/ui/SectionDots";
import { BackToTop } from "@/components/ui/BackToTop";

export default function Home() {
  return (
    <main>
      <ScrollRestorer />
      <KonamiCode />
      <CircularText />
      <SectionDots />
      <BackToTop />
      <Hero />
      <Marquee />
      <About />
      <POV />
      <Projects />
      <Writing />
      <Contact />
      <TerminalSection />
      <footer className="py-10 px-6 text-center border-t border-[var(--border)]">
        <p className="text-[13px] font-body text-[var(--text-25)]">
          Built by B Anish &mdash; 2025. No lorem ipsum was harmed in the making of this site.
        </p>
      </footer>
    </main>
  );
}
