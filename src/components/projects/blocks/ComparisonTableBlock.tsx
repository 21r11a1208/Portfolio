import type { Block } from "@/lib/content/schema";

type ComparisonTableBlockData = Extract<Block, { type: "comparison-table" }>;

// Matches CluelyTeardown.tsx's feature comparison table exactly: "✓" renders
// accent-green, "—" renders muted, anything else (e.g. "Partial") renders as
// plain text. The reference hardcoded the first column's product name
// ("Cluely") in accent color — here that's whichever column is first,
// keeping the rule generic instead of matching a specific name.
function cellColor(value: string): string {
  if (value === "✓") return "text-[#22c55e]";
  if (value === "—") return "text-[var(--text-35)]";
  return "text-[var(--text)]";
}

export function ComparisonTableBlock({ data }: { data: ComparisonTableBlockData }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[var(--surface-2)] border-b border-[var(--border)]">
            <th className="text-left px-4 py-3 font-display font-semibold text-[var(--text)]">Capability</th>
            {data.columns.map((col, i) => (
              <th key={col} className={`px-4 py-3 font-display font-semibold text-center ${i === 0 ? "text-[var(--accent-text)]" : "text-[var(--text)]"}`}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, i) => (
            <tr key={row.label} className={`border-b border-[var(--border)] ${i % 2 === 0 ? "bg-[var(--surface)]" : "bg-[var(--surface-2)]"}`}>
              <td className="px-4 py-3 font-body text-[var(--text-65)]">{row.label}</td>
              {row.values.map((val, j) => (
                <td key={j} className={`px-4 py-3 text-center font-body ${cellColor(val)}`}>
                  {val}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
