"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExperienceEntry } from "@/types";

interface TimelineEntryProps {
  entry: ExperienceEntry;
  index: number;
}

export function TimelineEntry({ entry, index }: TimelineEntryProps) {
  const [open, setOpen] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-8 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-[var(--accent)] before:shadow-[0_0_8px_var(--accent-25)]"
    >
      {index === 0 && (
        <div className="absolute left-[3px] top-4 bottom-0 w-px bg-gradient-to-b from-[var(--accent-25)] to-transparent" aria-hidden="true" />
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        data-cursor="hover"
        className="w-full text-left group"
        aria-expanded={open}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-display font-semibold text-[var(--text)] group-hover:text-[var(--accent-text)] transition-colors">
              {entry.company}
            </h3>
            <p className="text-sm font-body text-[var(--text-50)] mt-0.5">
              {entry.role} &bull; {entry.duration} &bull; {entry.location}
            </p>
            {entry.highlight && (
              <p className="text-xs font-body text-[var(--accent-text)] mt-1">{entry.highlight}</p>
            )}
          </div>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            className="mt-1 flex-shrink-0 text-[var(--text-40)] group-hover:text-[var(--accent-text)] transition-colors text-xl leading-none"
          >
            +
          </motion.span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <ul className="mt-4 flex flex-col gap-2.5 text-sm font-body text-[var(--text-65)] leading-relaxed pb-2">
              {entry.achievements.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--accent-25)]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
