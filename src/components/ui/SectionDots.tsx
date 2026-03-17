"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "case-studies", label: "Case Studies" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
];

export function SectionDots() {
  const [active, setActive] = useState("hero");
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="fixed right-4 md:right-5 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3 md:gap-3.5 items-center"
      aria-label="Section navigation"
    >
      {SECTIONS.map(({ id, label }) => (
        <div
          key={id}
          className="relative flex items-center justify-end"
          onMouseEnter={() => setHovered(id)}
          onMouseLeave={() => setHovered(null)}
        >
          <AnimatePresence>
            {hovered === id && (
              <motion.span
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 6 }}
                transition={{ duration: 0.15 }}
                className="absolute right-4 text-[10px] font-display font-semibold tracking-[0.12em] uppercase text-[var(--text-45)] whitespace-nowrap select-none hidden md:block"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>

          <button
            onClick={() => scrollTo(id)}
            aria-label={`Go to ${label}`}
            data-cursor="hover"
            className="relative w-1.5 h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
            style={{
              background:
                active === id ? "var(--accent)" : "var(--text-25)",
              transform: active === id ? "scale(1.5)" : "scale(1)",
            }}
          />
        </div>
      ))}
    </div>
  );
}
