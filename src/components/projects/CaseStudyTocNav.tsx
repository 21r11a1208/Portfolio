"use client";

import { useEffect, useState } from "react";

interface TocEntry {
  id: string;
  label: string;
}

// The one generic version of the fixed, scroll-spy TOC nav that currently
// exists as 3 near-identical copies inside KeyStayPRD.tsx/AgriDronePRD.tsx/
// GymatePRD.tsx (all byte-for-byte identical: same positioning classes,
// same `rootMargin: "-25% 0px -65% 0px"` IntersectionObserver tuning, same
// active/inactive opacity + underline treatment). Extracted verbatim as a
// client component so `CaseStudyShell.tsx` (a Server Component — it calls
// the fs-backed `getCaseStudySummary` directly) can render it without
// itself becoming a Client Component.
//
// Pulled out into its own file rather than inlined in CaseStudyShell.tsx:
// "use client" is file-scoped in the App Router, and CaseStudyShell's own
// data fetch needs to stay server-side, so the interactive slice has to be
// a separate component regardless of where it's called from.
export function CaseStudyTocNav({ toc }: { toc: TocEntry[] }) {
  const [active, setActive] = useState<string | null>(toc[0]?.id ?? null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    toc.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-25% 0px -65% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [toc]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  // Nothing to navigate to — e.g. every section omitted `toc_label`, or
  // `sections` was empty. Render nothing rather than an empty landmark.
  if (toc.length === 0) return null;

  return (
    <nav aria-label="Page sections" className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-1">
      {toc.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          data-cursor="hover"
          className={`flex items-center gap-2.5 py-0.5 transition-all duration-200 ${active === id ? "opacity-100" : "opacity-25 hover:opacity-55"}`}
        >
          <span className={`text-[11px] font-body transition-colors duration-200 ${active === id ? "text-[var(--text)]" : "text-[var(--text-40)]"}`}>
            {label}
          </span>
          <span className={`h-px shrink-0 transition-all duration-300 ${active === id ? "w-5 bg-[var(--accent)]" : "w-2 bg-[var(--text-30)]"}`} />
        </button>
      ))}
    </nav>
  );
}
