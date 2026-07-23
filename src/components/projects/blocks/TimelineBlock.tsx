"use client";

import { motion } from "framer-motion";
import type { Block } from "@/lib/content/schema";

type TimelineBlockData = Extract<Block, { type: "timeline" }>;

// Matches ArattaiRCA.tsx/StackOverflowRCA.tsx's timeline exactly: a bordered
// left rail, a colored dot per event, date + event + a severity pill on one
// line, then the detail paragraph. The reference components looked up each
// event's color from a local `SEVERITY_COLORS` map keyed by severity text;
// here `color` travels with the event itself in content, since severity
// labels (and which color they map to) are bespoke per case study, not a
// fixed enum a component could own.
export function TimelineBlock({ data }: { data: TimelineBlockData }) {
  return (
    <div>
      {data.label && (
        <p className="text-[11px] font-display font-bold text-[var(--accent-text)] uppercase tracking-wider mb-4">
          {data.label}
        </p>
      )}
      <div className="relative pl-7 border-l border-[var(--border)] space-y-6">
        {data.events.map((ev, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="relative"
          >
            <div
              className="absolute -left-9 top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center bg-[var(--surface)]"
              style={{ borderColor: ev.color }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: ev.color }} />
            </div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs font-display font-semibold text-[var(--accent-text)]">{ev.date}</span>
              <span className="font-display font-semibold text-sm text-[var(--text)]">{ev.event}</span>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-body"
                style={{ background: ev.color + "22", color: ev.color }}
              >
                {ev.severity}
              </span>
            </div>
            <p className="text-sm font-body leading-relaxed text-[var(--text-65)]">{ev.detail}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
