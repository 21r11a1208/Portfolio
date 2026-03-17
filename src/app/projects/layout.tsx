import Link from "next/link";

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen pt-24 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-display text-[var(--text-40)] hover:text-[var(--accent-text)] transition-colors mb-10 group"
          data-cursor="hover"
        >
          <span className="group-hover:-translate-x-1 transition-transform inline-block">←</span>
          Back to projects
        </Link>
        {children}
      </div>
    </div>
  );
}
