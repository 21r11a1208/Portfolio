import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Terminal } from "@/components/easter-eggs/Terminal";

export function TerminalSection() {
  return (
    <section id="terminal" className="py-24 md:py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <span className="text-xs font-display font-semibold tracking-[0.2em] uppercase text-[var(--accent-text)] mb-4 block">
            Easter egg
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--text)] mb-3 leading-tight">
            Try the terminal.
          </h2>
          <p className="text-[var(--text-55)] font-body text-[15px] mb-8 max-w-lg">
            Type <code className="text-[var(--accent-text)] font-mono text-[13px]">help</code> to see what it can do.
          </p>
          <Terminal />
        </ScrollReveal>
      </div>
    </section>
  );
}
