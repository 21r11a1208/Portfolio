"use client";

import { motion } from "framer-motion";
import type { Block } from "@/lib/content/schema";

type CardListBlockData = Extract<Block, { type: "card-list" }>;

// Matches GymatePRD.tsx's monetisation-tier cards exactly: `highlight` maps
// to that section's `i === 1` "Gymate Pro" treatment (accent border, accent
// price, accent bullet arrows) vs the neutral treatment for every other
// card. Per-card scroll reveal (opacity/y stagger) is that same section's
// `motion.div` usage, values copied verbatim.
export function CardListBlock({ data }: { data: CardListBlockData }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {data.cards.map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className={`p-6 rounded-2xl border bg-[var(--surface)] ${card.highlight ? "border-[var(--accent-25)]" : "border-[var(--border)]"}`}
        >
          <div className="flex items-center justify-between gap-3 mb-4">
            <h3 className="text-base font-display font-semibold text-[var(--text)] flex items-center gap-2">
              {data.numbered && (
                <span className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-display font-bold bg-[var(--accent-08)] text-[var(--accent-text)] border border-[var(--accent-25)]">
                  {i + 1}
                </span>
              )}
              {card.title}
            </h3>
            {card.price && (
              <span className={`text-lg font-display font-bold shrink-0 ${card.highlight ? "text-[var(--accent-text)]" : "text-[var(--text-50)]"}`}>
                {card.price}
              </span>
            )}
          </div>
          {card.body && (
            <p className="text-sm font-body text-[var(--text-65)] leading-relaxed mb-4">{card.body}</p>
          )}
          {card.items && card.items.length > 0 && (
            <ul className="space-y-2 mb-4">
              {card.items.map((item, j) => (
                <li key={j} className="flex gap-2 text-sm font-body text-[var(--text-65)]">
                  <span className={`shrink-0 ${card.highlight ? "text-[var(--accent-text)]" : "text-[var(--text-35)]"}`}>→</span>{item}
                </li>
              ))}
            </ul>
          )}
          {card.note && <p className="text-[11px] font-body text-[var(--text-35)] italic">{card.note}</p>}
        </motion.div>
      ))}
    </div>
  );
}
