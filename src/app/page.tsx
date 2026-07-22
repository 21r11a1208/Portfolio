import { ScrollRestorer } from "@/components/layout/ScrollRestorer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
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
import { getAllCaseStudySummaries } from "@/lib/content/case-studies";
import { getAllExperience } from "@/lib/content/experience";
import { getAllArticles } from "@/lib/content/articles";

export default function Home() {
  const caseStudies = getAllCaseStudySummaries();
  const experience = getAllExperience();
  const articles = getAllArticles();

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
      <Experience experience={experience} />
      <POV />
      <Projects caseStudies={caseStudies} />
      <Writing articles={articles} />
      <Contact />
      <TerminalSection />
      <footer className="py-10 px-6 text-center border-t border-[var(--border)]">
        <p className="text-[13px] font-body text-[var(--text-25)]">
          Built by B Anish &mdash; 2026 &middot; anibaaabuuu@gmail.com &middot; Hyderabad, available immediately
        </p>
      </footer>
    </main>
  );
}
