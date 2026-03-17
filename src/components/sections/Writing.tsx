"use client";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { articles } from "@/data/articles";

export function Writing() {
  return (
    <section id="writing" className="py-24 md:py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionHeading label="Writing" title="How I think in public" />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((article, i) => (
            <motion.a
              key={i}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="group flex flex-col p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent-20)] hover:shadow-[0_0_30px_var(--accent-08)] transition-all duration-300"
            >
              <span className="text-[10px] font-body text-[var(--text-35)] uppercase tracking-wider mb-3">
                {article.readTime}
              </span>
              <h3 className="text-base font-display font-semibold text-[var(--text)] group-hover:text-[var(--accent-text)] transition-colors leading-snug mb-2 flex-1">
                {article.title}
              </h3>
              <p className="text-sm font-body text-[var(--text-45)] leading-relaxed mb-5">
                {article.subtitle}
              </p>
              <span className="text-xs font-display font-semibold text-[var(--text-35)] group-hover:text-[var(--accent-text)] transition-colors flex items-center gap-1.5">
                Read on Medium
                <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
