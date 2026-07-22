"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { Block } from "@/lib/content/schema";

type CardGridBlockData = Extract<Block, { type: "card-grid" }>;

// Identical count-up mechanics to the `Counter` in KeyStayPRD.tsx /
// AgriDronePRD.tsx / GymatePRD.tsx (50 steps over 1400ms, starts once the
// span scrolls into view) — copied verbatim, extended with an optional
// `prefix` since those 3 components only ever needed `suffix`.
function Counter({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let cur = 0;
    const steps = 50, dur = 1400;
    const timer = setInterval(() => {
      cur = Math.min(cur + to / steps, to);
      setN(Math.round(cur));
      if (cur >= to) clearInterval(timer);
    }, dur / steps);
    return () => clearInterval(timer);
  }, [inView, to]);
  return <span ref={ref} className="tabular-nums">{prefix}{n}{suffix}</span>;
}

// Literal class strings (not template-interpolated) so Tailwind's build-time
// scanner can find them — matches the "2 base columns, N at sm:" convention
// used by every metrics grid across the 3 reference PRDs (KeyStayPRD.tsx
// `grid-cols-2 sm:grid-cols-3`, AgriDronePRD.tsx `grid-cols-2 sm:grid-cols-4`).
const COLUMN_CLASSES: Record<CardGridBlockData["columns"], string> = {
  2: "grid-cols-2",
  3: "grid-cols-2 sm:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4",
};

export function CardGridBlock({ data }: { data: CardGridBlockData }) {
  return (
    <div className={`grid ${COLUMN_CLASSES[data.columns]} gap-4`}>
      {data.cards.map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: i * 0.07 }}
          className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent-25)] transition-colors duration-300"
        >
          <p className="text-3xl font-display font-bold text-[var(--accent-text)] mb-1">
            {data.variant === "counter" ? (
              <Counter to={Number(card.value)} prefix={card.prefix} suffix={card.suffix} />
            ) : (
              <>{card.prefix}{card.value}{card.suffix}</>
            )}
          </p>
          <p className="text-xs font-body text-[var(--text-50)] leading-snug">{card.label}</p>
          {card.sub && (
            <p className="text-[10px] font-body text-[var(--text-35)] leading-snug mt-0.5">{card.sub}</p>
          )}
        </motion.div>
      ))}
    </div>
  );
}
