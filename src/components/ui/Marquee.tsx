"use client";
import { motion } from "framer-motion";

const row1 = [
  "PM Mindset",
  "Shipped to Production",
  "0 → 1 Builder",
  "User First",
  "Data Informed",
  "Systems Thinker",
  "APM Ready",
  "Full-Stack Background",
];

const row2 = [
  "RealPage",
  "PMOrbit",
  "User Interviews",
  "Roadmap Owner",
  "Sprint Planning",
  "PRD Writing",
  "Stakeholder Alignment",
  "Hyderabad → Anywhere",
];

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    // overflow: clip (not hidden) — blocks content that escapes via CSS transforms
    <div style={{ overflow: "clip" }}>
      <motion.div
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ willChange: "transform" }}
        className="flex w-max"
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-5 pr-5 text-[11px] font-display font-semibold tracking-[0.22em] uppercase text-[var(--text-28)] hover:text-[var(--text-55)] transition-colors duration-300"
          >
            <span className="text-[var(--accent-text)] opacity-60">✦</span>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function Marquee() {
  return (
    <div
      className="py-5 border-y border-[var(--border)] flex flex-col gap-3"
      style={{ overflow: "clip" }}
      aria-hidden="true"
    >
      <MarqueeRow items={row1} />
      <MarqueeRow items={row2} reverse />
    </div>
  );
}
