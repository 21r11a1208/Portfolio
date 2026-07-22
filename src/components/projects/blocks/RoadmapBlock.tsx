"use client";

import { motion } from "framer-motion";
import type { Block } from "@/lib/content/schema";

type RoadmapBlockData = Extract<Block, { type: "roadmap" }>;
type Phase = RoadmapBlockData["phases"][number];

// Binary badge treatment: "Complete" gets the accent styling, everything
// else (Planned, In Progress, P0, ...) gets the neutral styling — matches
// AgriDronePRD.tsx's roadmap status badge exactly. RoadmapBlockSchema's
// `status` is free text (not the PRDs' own closed FeatureStatus enum), so a
// 3-way switch like KeyStayPRD.tsx's StatusBadge isn't reproducible
// generically; AgriDronePRD's simpler complete-vs-not treatment is.
function StatusBadge({ status }: { status: string }) {
  const complete = status === "Complete";
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-[10px] font-display font-bold border ${
        complete
          ? "bg-[var(--accent-08)] text-[var(--accent-text)] border-[var(--accent-25)]"
          : "bg-[var(--surface-2)] text-[var(--text-35)] border-[var(--border)]"
      }`}
    >
      {status}
    </span>
  );
}

function PhaseCard({ phase, index }: { phase: Phase; index: number }) {
  const progress = phase.progress ?? 0;
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="p-5 md:p-6 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent-25)] transition-colors duration-300"
    >
      <div className="flex items-center gap-3 mb-3 flex-wrap">
        <span className="text-[10px] font-display font-bold text-[var(--accent-text)] opacity-60">{phase.label}</span>
        {phase.title && <h3 className="text-base font-display font-semibold text-[var(--text)]">{phase.title}</h3>}
        {phase.status && <StatusBadge status={phase.status} />}
        {phase.period && <span className="text-[11px] font-body text-[var(--text-35)] ml-auto">{phase.period}</span>}
      </div>
      {progress > 0 && (
        <div className="mb-3">
          <div className="h-1 rounded-full bg-[var(--surface-2)] overflow-hidden">
            <motion.div
              className="h-full bg-[var(--accent)] rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: `${progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <p className="text-[10px] font-body text-[var(--text-35)] mt-1">{progress}% complete</p>
        </div>
      )}
      <ul className="flex flex-wrap gap-2">
        {phase.items.map((item, j) => (
          <li key={j} className="px-2.5 py-1 rounded-lg text-[11px] font-body bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text-50)]">
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function RoadmapBlock({ data }: { data: RoadmapBlockData }) {
  return (
    <div className="space-y-4">
      {data.phases.map((phase, i) => (
        <PhaseCard key={i} phase={phase} index={i} />
      ))}
    </div>
  );
}
