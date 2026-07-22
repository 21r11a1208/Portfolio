import type { Block } from "@/lib/content/schema";

type IconListBlockData = Extract<Block, { type: "icon-list" }>;

// Glyphs and colors copied exactly from the decorative bullets already used
// throughout the 3 reference PRDs (not an icon library):
//   check "✓" — FEATURES acceptance-criteria / key-requirements lists
//   cross "✕" — persona Pain Points, AgriDronePRD's Problem-section lists
//   arrow "→" — persona Goals lists, GymatePRD's pricing-feature lists
//   dot   "·" — GymatePRD's competitor lists
const ICON_GLYPH: Record<IconListBlockData["icon"], string> = {
  check: "✓",
  cross: "✕",
  arrow: "→",
  dot: "·",
};
const ICON_COLOR: Record<IconListBlockData["icon"], string> = {
  check: "text-[var(--accent-text)]",
  cross: "text-red-400/60",
  arrow: "text-[var(--accent-text)]",
  dot: "text-[var(--text-35)]",
};

// Literal strings so Tailwind's scanner can find them (see CardGridBlock for
// the same convention). `md:` matches the breakpoint the 3 PRDs use for
// side-by-side text comparisons (e.g. persona Goals/Pains, AgriDronePRD's
// For-Farmers/For-Operators split) — as opposed to `sm:` for compact stat
// grids, which CardGridBlock uses instead.
const COLUMN_CLASSES: Record<IconListBlockData["columns"], string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
};

export function IconListBlock({ data }: { data: IconListBlockData }) {
  const glyph = ICON_GLYPH[data.icon];
  const color = ICON_COLOR[data.icon];
  return (
    <div className={`grid ${COLUMN_CLASSES[data.columns]} gap-x-8 gap-y-5`}>
      {data.groups.map((group, i) => (
        <div key={i}>
          {group.label && (
            <p className="text-sm font-display font-semibold text-[var(--text)] mb-3">{group.label}</p>
          )}
          <ul className="space-y-2">
            {group.items.map((item, j) => (
              <li key={j} className="flex gap-2.5 text-sm font-body text-[var(--text-65)]">
                <span className={`${color} shrink-0`}>{glyph}</span>{item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
