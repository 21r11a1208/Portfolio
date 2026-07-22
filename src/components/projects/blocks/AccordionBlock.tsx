"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Block } from "@/lib/content/schema";
import { ProseBlock } from "./ProseBlock";

type AccordionBlockData = Extract<Block, { type: "accordion" }>;

// Matches the 3 reference PRDs' accordion pattern exactly (KeyStayPRD.tsx's
// `openProblem`/`openRisk`, AgriDronePRD.tsx's `openQ`, GymatePRD.tsx's
// `openRisk`): a bordered card per item, a "+" toggle that rotates 45deg
// (becomes a visual "×") on open, and a height/opacity AnimatePresence
// reveal for the body. All 3 references hardcode single-open behavior via
// single-value state (`number | null`); this block also supports
// `singleOpen: false` (no reference exists for that case), so state is one
// array of open indices instead — for `singleOpen: true` it never holds
// more than one index, so it's behaviorally identical to the reference's
// single-value pattern (opening one item always closes any other).
export function AccordionBlock({ data }: { data: AccordionBlockData }) {
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  function toggle(i: number) {
    setOpenIndices((prev) => {
      const isOpen = prev.includes(i);
      if (data.singleOpen) return isOpen ? [] : [i];
      return isOpen ? prev.filter((x) => x !== i) : [...prev, i];
    });
  }

  return (
    <div className="space-y-3">
      {data.items.map((item, i) => {
        const open = openIndices.includes(i);
        return (
          <motion.div key={i} layout className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
            <button
              onClick={() => toggle(i)}
              data-cursor="hover"
              className="w-full flex items-center justify-between px-5 py-4 text-left group"
            >
              <div>
                <p className="text-sm font-display font-semibold text-[var(--text)] group-hover:text-[var(--accent-text)] transition-colors duration-200">
                  {item.title}
                </p>
                {item.meta && item.meta.length > 0 && (
                  <div className="flex gap-3 mt-0.5 flex-wrap">
                    {item.meta.map((m, j) => (
                      <span key={j} className="text-[11px] font-body text-[var(--text-35)]">{m}</span>
                    ))}
                  </div>
                )}
              </div>
              <motion.span
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-[var(--text-40)] text-xl font-light ml-4 shrink-0 leading-none"
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key="body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="px-5 pb-5 pt-1 border-t border-[var(--border)]">
                    <div className="mt-3">
                      <ProseBlock data={{ type: "prose", body: item.body }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
