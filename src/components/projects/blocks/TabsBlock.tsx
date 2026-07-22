"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Block } from "@/lib/content/schema";
import { ProseBlock } from "./ProseBlock";

type TabsBlockData = Extract<Block, { type: "tabs" }>;

// Free-text badge, binary "Complete"-vs-not treatment — same precedent
// RoadmapBlock.tsx established for RoadmapBlockSchema's own free-text
// `status` field. The reference PRDs' own badge/priority pills aren't
// reproducible generically here: KeyStayPRD/AgriDronePRD's `StatusBadge` is
// a closed 3-way enum (Complete/In Progress/Planned) `badge` can't express
// (it's `z.string().optional()`), and GymatePRD's priority pill has no
// value-based condition at all (always accent). Reusing RoadmapBlock's
// binary treatment keeps one consistent rule for "free-text status" across
// the block system instead of a third, block-specific guess.
function StatusPill({ text }: { text: string }) {
  const complete = text === "Complete";
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-[10px] font-display font-bold border ${
        complete
          ? "bg-[var(--accent-08)] text-[var(--accent-text)] border-[var(--accent-25)]"
          : "bg-[var(--surface-2)] text-[var(--text-35)] border-[var(--border)]"
      }`}
    >
      {text}
    </span>
  );
}

// Panel header composes two reference layouts that the schema unifies into
// one shape: the persona pattern (title+subtitle stacked left, small pill
// badges `ml-auto` on the right — KeyStayPRD.tsx/AgriDronePRD.tsx/
// GymatePRD.tsx's PERSONAS `activePersona` card) supplies the outer
// structure (title/subtitle stack + `meta` pills `ml-auto`), extended with
// the feature pattern's badge-next-to-title (their FEATURES `StatusBadge`/
// priority pill next to the title). Real content only ever populates one
// side (persona: subtitle/meta, feature: badge), so in practice this
// renders exactly like whichever single reference pattern applies.
function PanelHeader({ panel }: { panel: TabsBlockData["panels"][number] }) {
  return (
    <div className="flex flex-wrap items-start gap-4 mb-5">
      <div>
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-xl font-display font-bold text-[var(--text)]">{panel.title}</h3>
          {panel.badge && <StatusPill text={panel.badge} />}
        </div>
        {panel.subtitle && <p className="text-sm font-body text-[var(--text-50)]">{panel.subtitle}</p>}
      </div>
      {panel.meta && panel.meta.length > 0 && (
        <div className="flex gap-2 flex-wrap ml-auto">
          {panel.meta.map((m, j) => (
            <span key={j} className="px-3 py-1 rounded-full text-[11px] font-body bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text-50)]">
              {m}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// `goals` uses "→" (PERSONAS Goals list), `pains` uses "✕" (PERSONAS Pain
// Points list), `acceptanceCriteria` uses "✓" (FEATURES acceptance-criteria
// list) — 3 distinct glyphs for 3 distinct fields, each copied from its own
// exact reference, not a single reused choice.
function BulletList({ items, glyph, glyphClass, textClass = "text-[var(--text-65)]" }: { items: string[]; glyph: string; glyphClass: string; textClass?: string }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item, j) => (
        <li key={j} className={`flex gap-2 text-sm font-body ${textClass}`}>
          <span className={`${glyphClass} shrink-0`}>{glyph}</span>{item}
        </li>
      ))}
    </ul>
  );
}

export function TabsBlock({ data }: { data: TabsBlockData }) {
  const [active, setActive] = useState(0);
  const panel = data.panels[active];

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-5">
        {data.panels.map((p, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            data-cursor="hover"
            className={`px-4 py-2 rounded-full text-[12px] font-display font-semibold border transition-all duration-200 ${
              active === i
                ? "bg-[var(--accent)] text-[var(--text-on-accent)] border-[var(--accent)]"
                : "bg-transparent text-[var(--text-50)] border-[var(--border)] hover:border-[var(--accent-25)] hover:text-[var(--text)]"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22 }}
          className="p-6 md:p-8 rounded-2xl bg-[var(--surface)] border border-[var(--border)]"
        >
          <PanelHeader panel={panel} />

          {panel.description && (
            <div className="mb-5">
              <ProseBlock data={{ type: "prose", body: panel.description }} />
            </div>
          )}

          {panel.userStory && (
            <div className="p-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] mb-4">
              <p className="text-[10px] font-display uppercase tracking-wider text-[var(--text-35)] mb-1">User story</p>
              <p className="text-xs font-body text-[var(--text-55)] leading-relaxed italic">{panel.userStory}</p>
            </div>
          )}

          {(panel.goals || panel.pains) && (
            <div className="grid md:grid-cols-2 gap-5 mb-5">
              {panel.goals && (
                <div>
                  <p className="text-[10px] font-display uppercase tracking-wider text-[var(--accent-text)] mb-2 opacity-70">Goals</p>
                  <BulletList items={panel.goals} glyph="→" glyphClass="text-[var(--accent-text)]" />
                </div>
              )}
              {panel.pains && (
                <div>
                  <p className="text-[10px] font-display uppercase tracking-wider text-[var(--text-35)] mb-2">Pain Points</p>
                  <BulletList items={panel.pains} glyph="✕" glyphClass="text-red-400/60" />
                </div>
              )}
            </div>
          )}

          {panel.acceptanceCriteria && panel.acceptanceCriteria.length > 0 && (
            <div className="pt-4 border-t border-[var(--border)]">
              <p className="text-[10px] font-display uppercase tracking-[0.12em] text-[var(--accent-text)] mb-3 opacity-70">Acceptance criteria</p>
              <ul className="space-y-2">
                {panel.acceptanceCriteria.map((a, j) => (
                  <li key={j} className="flex gap-2.5 text-sm font-body text-[var(--text-55)]">
                    <span className="text-[var(--accent-text)] shrink-0 text-xs mt-0.5">✓</span>{a}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {panel.quote && (
            <div className="pt-4 border-t border-[var(--border)]">
              <p className="text-sm font-body text-[var(--text-50)] italic">&ldquo;{panel.quote}&rdquo;</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
