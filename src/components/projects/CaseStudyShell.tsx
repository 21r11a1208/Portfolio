import type { ComponentType } from "react";
import { Tag } from "@/components/ui/Tag";
import { ReadingProgressBar } from "@/components/ui/ReadingProgressBar";
import { CaseStudyTocNav } from "@/components/projects/CaseStudyTocNav";
import { getCaseStudySummary } from "@/lib/content/case-studies";
import type { CaseStudySummary, Section } from "@/lib/content/schema";
import { BLOCK_REGISTRY } from "@/components/projects/blocks/registry";

interface CaseStudyShellProps {
  project: Pick<CaseStudySummary, "slug" | "title" | "type" | "status" | "description">;
  readTime?: string;
  sections: Section[];
}

export function CaseStudyShell({ project, readTime = "5 min read", sections }: CaseStudyShellProps) {
  const fullProject = getCaseStudySummary(project.slug);

  // Generated from `sections`, not hardcoded (contrast the reference PRDs'
  // own module-level `TOC` constants). A section with no `toc_label` is
  // skipped entirely rather than rendered with a blank label — this is what
  // makes an untitled/unlisted section possible later, and what keeps the
  // 3 currently-live case studies (askorbit/college-erp/linkedin-rca, whose
  // Task-2.2-era content never set `toc_label`) rendering no TOC nav at all,
  // exactly as before this task.
  const toc = sections.flatMap((s) => (s.toc_label ? [{ id: s.id, label: s.toc_label }] : []));

  return (
    <article>
      <ReadingProgressBar />
      <CaseStudyTocNav toc={toc} />

      {/* Header */}
      <header className="mb-12 pb-10 border-b border-[var(--border)]">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Tag variant="type">{project.type}</Tag>
          {project.status && (
            <span className={`text-[10px] font-body uppercase tracking-wider ${project.status === "Production" ? "text-[var(--accent-text)]" : "text-[var(--text-35)]"}`}>
              {project.status}
            </span>
          )}
          <span className="text-[10px] font-body text-[var(--text-30)] uppercase tracking-wider">
            {readTime}
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-[var(--text)] leading-tight mb-4">
          {project.title}
        </h1>
        <p className="text-lg font-body text-[var(--text-55)] leading-relaxed mb-8">
          {project.description}
        </p>

        {(fullProject?.problemStatement || fullProject?.businessImpact) && (
          <div className="grid md:grid-cols-2 gap-6 p-6 rounded-2xl bg-[var(--surface-2)] border border-[var(--border)]">
            {fullProject.problemStatement && (
              <div>
                <h3 className="text-sm font-display font-bold text-[var(--text)] uppercase tracking-wider mb-2">The Problem</h3>
                <p className="text-sm font-body text-[var(--text-65)] leading-relaxed">{fullProject.problemStatement}</p>
              </div>
            )}
            {fullProject.businessImpact && (
              <div>
                <h3 className="text-sm font-display font-bold text-[var(--accent-text)] uppercase tracking-wider mb-2">Business Outcome</h3>
                <p className="text-sm font-body text-[var(--text-65)] leading-relaxed">{fullProject.businessImpact}</p>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Body: sections rendered generically through the block registry */}
      <div className="space-y-16">
        {sections.map((section) => (
          <section key={section.id} id={section.id}>
            {(section.kicker || section.heading) && (
              <div className="mb-6">
                {section.kicker && (
                  <p className="text-[11px] font-display font-bold text-[var(--accent-text)] uppercase tracking-wider mb-2">
                    {section.kicker}
                  </p>
                )}
                {section.heading && (
                  <h2 className="text-2xl font-display font-bold text-[var(--text)]">
                    {section.heading}
                  </h2>
                )}
              </div>
            )}
            {section.blocks.map((block, index) => {
              // BLOCK_REGISTRY is correctly keyed by construction (registry.ts's
              // mapped type enforces it per-entry), but TS can't verify a
              // runtime-widened `block.type` lookup against a union of
              // component call signatures — the cast below just tells it what's
              // already true at runtime. See registry.ts's comment for detail.
              const BlockComponent = BLOCK_REGISTRY[block.type] as ComponentType<{ data: typeof block }>;
              return <BlockComponent key={index} data={block} />;
            })}
          </section>
        ))}
      </div>
    </article>
  );
}
