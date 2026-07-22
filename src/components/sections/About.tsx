"use client";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { AboutContent, SkillGroupContent } from "@/lib/content/schema";

interface AboutProps {
  about: AboutContent;
  skills: SkillGroupContent[];
}

export function About({ about, skills }: AboutProps) {
  const tools = skills.find((group) => group.category === "Technical")?.skills ?? [];

  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <SectionHeading label="Who I am" title="Engineer turned product thinker" />
        </ScrollReveal>

        <div className="flex flex-col gap-5 text-[var(--text-65)] font-body text-[17px] leading-relaxed">
          <ScrollReveal delay={0.1}>
            <p>{about.paragraph1}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p>{about.paragraph2}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p>{about.paragraph3}</p>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <p className="text-[var(--text-45)] text-[15px]">{about.personalLine}</p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-8 pt-8 border-t border-[var(--border)]">
            <span className="text-[11px] font-display font-semibold tracking-[0.18em] uppercase text-[var(--text-30)] mb-3 block">
              Tools I work in
            </span>
            <p className="text-[13px] font-body text-[var(--text-40)]">
              {tools.join(" · ")}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
