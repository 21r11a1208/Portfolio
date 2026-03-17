"use client";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const tools = ["React", "TypeScript", ".NET Core", "SQL", "Python", "Figma"];

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <SectionHeading label="Who I am" title="Engineer turned product thinker" />
        </ScrollReveal>

        <div className="flex flex-col gap-5 text-[var(--text-65)] font-body text-[17px] leading-relaxed">
          <ScrollReveal delay={0.1}>
            <p>
              I&apos;m a recent IT graduate from Hyderabad who spent a year at RealPage co-owning
              PMOrbit — a production project management platform built from 0 to 1 for PMO leads
              and executive leadership. I ran user interviews, managed the roadmap, defined
              requirements, and shipped features that reduced handoff friction by 40%.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p>
              My background is full-stack — React, TypeScript, .NET Core, SQL — which means I
              can sit in a system design conversation and a user interview in the same day and
              add value in both. I don&apos;t need things explained twice.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p>
              I&apos;m currently looking for APM or PM roles where I can own a product area end to
              end. If you&apos;re building something real and need someone who moves fast, thinks in
              user problems, and writes specs developers can build from — let&apos;s talk.
            </p>
          </ScrollReveal>

          {/* Personal line — update this to something true about you */}
          <ScrollReveal delay={0.25}>
            <p className="text-[var(--text-45)] text-[15px]">
              Outside of work, I follow cricket more closely than I should and have opinions
              about Hyderabad biryani that most people disagree with.
            </p>
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
