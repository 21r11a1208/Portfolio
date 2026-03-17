import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <p className="text-[11px] font-display font-semibold tracking-[0.25em] uppercase text-[var(--accent-text)] mb-6">
          404 — Not Found
        </p>
        <h1 className="text-6xl md:text-8xl font-display font-bold text-[var(--text)] leading-none mb-6">
          Wrong turn.
        </h1>
        <p className="text-[var(--text-55)] font-body text-[15px] leading-relaxed mb-10">
          This page doesn&apos;t exist. Maybe it was moved, deleted, or never built — which, as a PM, I should have caught in the PRD.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-7 py-3.5 bg-[var(--accent)] text-[#0f0f14] rounded-full font-display font-semibold text-sm hover:bg-[var(--accent-hover)] transition-all duration-200 hover:scale-105 active:scale-95"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
