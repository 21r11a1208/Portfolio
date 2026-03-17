import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label: string;
  title: string;
  className?: string;
}

export function SectionHeading({ label, title, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12", className)}>
      <span className="text-xs font-display font-semibold tracking-[0.2em] uppercase text-[var(--accent-text)] mb-3 block">
        {label}
      </span>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[var(--text)] leading-tight">
        {title}
      </h2>
    </div>
  );
}
