"use client";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const beliefs = [
  {
    n: "01",
    statement: "Ships change minds. Specs don't.",
    body: "I've seen brilliant PRDs kill momentum. At RealPage I learned to get features in front of users fast — even rough ones — because a working thing in someone's hands tells you more than six rounds of internal alignment ever will.",
  },
  {
    n: "02",
    statement: "If the dev is confused, the spec is wrong.",
    body: "Requirements exist to make building obvious. I rewrite until the first question from engineering is \"when do you need this?\" not \"what does this mean?\" That's the only measure of a good spec.",
  },
  {
    n: "03",
    statement: "Talk to users before you have a solution.",
    body: "50+ user interviews at RealPage. The most useful ones had zero assumptions going in. Most PMs use interviews to validate — I use them to understand. The difference shows in what actually gets built.",
  },
];

export function POV() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <span className="text-xs font-display font-semibold tracking-[0.2em] uppercase text-[var(--accent-text)] mb-16 block">
            How I think
          </span>
        </ScrollReveal>

        <div className="flex flex-col">
          {beliefs.map((b, i) => (
            <ScrollReveal key={b.n} delay={i * 0.08}>
              <motion.div
                whileHover={{ x: 6 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="group grid md:grid-cols-[80px_1fr_1fr] gap-6 md:gap-12 py-10 border-b border-[var(--border)] items-start cursor-default"
              >
                {/* Number */}
                <span className="text-[11px] font-display font-semibold tracking-[0.2em] text-[var(--accent-text)] opacity-60 pt-1">
                  {b.n}
                </span>

                {/* Statement */}
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-[var(--text)] leading-tight group-hover:text-[var(--accent-text)] transition-colors duration-300">
                  {b.statement}
                </h3>

                {/* Body */}
                <p className="text-[15px] font-body text-[var(--text-50)] leading-relaxed md:pt-1">
                  {b.body}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
