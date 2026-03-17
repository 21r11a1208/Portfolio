"use client";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TimelineEntry } from "@/components/experience/TimelineEntry";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionHeading label="Work History" title="Where I've built things" />
        </ScrollReveal>

        <div className="max-w-2xl flex flex-col gap-10">
          {experience.map((entry, i) => (
            <TimelineEntry key={entry.company} entry={entry} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
