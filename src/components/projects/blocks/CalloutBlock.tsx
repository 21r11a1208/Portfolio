import type { Block } from "@/lib/content/schema";
import { ProseBlock } from "./ProseBlock";

type CalloutBlockData = Extract<Block, { type: "callout" }>;

// Matches the smaller "Core insight" callout-box pattern used across all 3
// reference PRDs (e.g. AgriDronePRD.tsx's Problem section: a bordered
// surface card, accent-tinted border + uppercase accent caption). Neutral
// tone swaps the accent border/caption for the muted equivalents used
// elsewhere for non-accent captions (e.g. persona "Pain Points" labels).
// Body markdown is rendered by composing ProseBlock itself, not by
// re-copying its className string — same rendering path, one source of
// truth for markdown typography.
export function CalloutBlock({ data }: { data: CalloutBlockData }) {
  const accent = data.tone === "accent";
  return (
    <div className={`p-5 rounded-xl border bg-[var(--surface)] ${accent ? "border-[var(--accent-25)]" : "border-[var(--border)]"}`}>
      {data.title && (
        <p className={`text-[10px] font-display uppercase tracking-wider mb-2 opacity-70 ${accent ? "text-[var(--accent-text)]" : "text-[var(--text-35)]"}`}>
          {data.title}
        </p>
      )}
      <ProseBlock data={{ type: "prose", body: data.body }} />
    </div>
  );
}
