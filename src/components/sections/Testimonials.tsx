"use client";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionHeading label="Kind Words" title="What people say" />
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="group relative p-7 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent-15)] transition-colors duration-300 flex flex-col gap-4 h-full">
                <span
                  className="text-6xl font-display leading-none text-[var(--accent-text)] opacity-20 group-hover:opacity-40 transition-opacity duration-300 select-none"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>

                <p className="text-[15px] font-body text-[var(--text-65)] leading-relaxed flex-1 -mt-3">
                  {t.quote}
                </p>

                <div className="pt-5 border-t border-[var(--border)] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[var(--accent-08)] border border-[var(--accent-20)] flex items-center justify-center flex-shrink-0">
                    <span className="text-[11px] font-display font-bold text-[var(--accent-text)]">
                      {t.name === "[ Name ]"
                        ? "?"
                        : t.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <p className="text-[13px] font-display font-semibold text-[var(--text)]">{t.name}</p>
                    <p className="text-[11px] font-body text-[var(--text-40)]">
                      {t.role} &middot; {t.company}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
