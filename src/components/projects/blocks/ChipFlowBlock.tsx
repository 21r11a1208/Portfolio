import type { Block } from "@/lib/content/schema";

type ChipFlowBlockData = Extract<Block, { type: "chip-flow" }>;

// Matches AgriDronePRD.tsx's booking-status state-machine box exactly
// (inside <section id="features">, right after the feature detail card):
// a bordered surface card, optional small uppercase accent label, then pill
// chips joined by a dim "→" text separator. The source hardcodes its
// separators inline (`["pending", "→", "accepted", ...]`); here they're
// generated from `steps.length` instead so content authors never write "→".
export function ChipFlowBlock({ data }: { data: ChipFlowBlockData }) {
  return (
    <div className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
      {data.label && (
        <p className="text-[10px] font-display uppercase tracking-wider text-[var(--accent-text)] mb-3 opacity-70">
          {data.label}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-2 text-sm font-body">
        {data.steps.map((step, i) => (
          <span key={i} className="flex items-center gap-2">
            {i > 0 && <span className="text-[var(--text-35)]">→</span>}
            <span className="px-3 py-1 rounded-full bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text-65)] text-xs font-display">
              {step}
            </span>
          </span>
        ))}
        {data.note && <span className="text-[var(--text-35)] ml-2 text-xs">{data.note}</span>}
      </div>
    </div>
  );
}
