import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "type";
  className?: string;
}

export function Tag({ children, variant = "default", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-body font-medium transition-all duration-200",
        variant === "default" &&
          "bg-[var(--border)] text-[var(--text)] border border-[var(--border-8)] hover:border-[var(--accent-text)] hover:text-[var(--accent-text)] hover:shadow-[0_0_12px_var(--accent-15)]",
        variant === "accent" &&
          "bg-[var(--accent-10)] text-[var(--accent-text)] border border-[var(--accent-20)]",
        variant === "type" &&
          "bg-[var(--accent-08)] text-[var(--accent-text)] border border-[var(--accent-15)] text-[11px] tracking-wider uppercase font-semibold",
        className
      )}
    >
      {children}
    </span>
  );
}
