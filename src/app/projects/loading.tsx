import { Skeleton } from "@/components/ui/Skeleton";

// Shown by Next.js App Router while any /projects/* page loads.
// Mirrors the hero + TOC-sidebar + content layout used by all project pages.
export default function ProjectLoading() {
  return (
    <div className="min-h-screen" style={{ background: "var(--surface)" }}>

      {/* ── Hero skeleton ── */}
      <div style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-5xl mx-auto px-6 py-16">
          {/* Tags row */}
          <div className="flex gap-3 mb-5">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
          {/* Title */}
          <Skeleton className="h-9 w-56 mb-4" />
          {/* Description lines */}
          <Skeleton className="h-4 w-full max-w-xl mb-2" />
          <Skeleton className="h-4 w-10/12 max-w-lg mb-2" />
          <Skeleton className="h-4 w-3/4 max-w-md" />
        </div>
      </div>

      {/* ── Body skeleton ── */}
      <div className="max-w-5xl mx-auto px-6 py-12 flex gap-12">

        {/* TOC sidebar */}
        <div className="hidden lg:flex flex-col w-52 shrink-0 gap-2">
          <Skeleton className="h-3 w-20 mb-2" />
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-8 w-full rounded-md"
              style={{ opacity: 1 - i * 0.09 }}
            />
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0 space-y-14">
          {[
            { titleW: "w-44", lines: 3, cards: 2 },
            { titleW: "w-52", lines: 4, cards: 3 },
            { titleW: "w-36", lines: 3, cards: 2 },
            { titleW: "w-48", lines: 2, cards: 0 },
          ].map((block, i) => (
            <div key={i}>
              {/* Step label */}
              <Skeleton className="h-3 w-12 mb-2" />
              {/* Section title */}
              <Skeleton className={`h-7 ${block.titleW} mb-5`} />
              {/* Body text lines */}
              <div className="space-y-2 mb-5">
                {Array.from({ length: block.lines }).map((_, j) => (
                  <Skeleton
                    key={j}
                    className="h-4"
                    style={{ width: j === block.lines - 1 ? "72%" : "100%" }}
                  />
                ))}
              </div>
              {/* Card grid */}
              {block.cards > 0 && (
                <div
                  className="grid gap-3"
                  style={{ gridTemplateColumns: `repeat(${block.cards}, 1fr)` }}
                >
                  {Array.from({ length: block.cards }).map((_, k) => (
                    <Skeleton key={k} className="h-28 rounded-xl" />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
