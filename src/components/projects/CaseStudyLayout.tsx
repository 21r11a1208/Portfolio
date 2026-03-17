import { Tag } from "@/components/ui/Tag";
import { ReadingProgressBar } from "@/components/ui/ReadingProgressBar";
import { Project } from "@/types";

interface CaseStudyLayoutProps {
  project: Pick<Project, "title" | "type" | "status" | "description">;
  readTime?: string;
  children: React.ReactNode;
}

export function CaseStudyLayout({ project, readTime = "5 min read", children }: CaseStudyLayoutProps) {
  return (
    <article>
      <ReadingProgressBar />

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
        <p className="text-lg font-body text-[var(--text-55)] leading-relaxed">
          {project.description}
        </p>
      </header>

      {/* Body */}
      <div className="prose prose-sm md:prose-base max-w-none
        prose-headings:font-display prose-headings:text-[var(--text)]
        prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
        prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
        prose-p:text-[var(--text-65)] prose-p:leading-relaxed prose-p:font-body
        prose-li:text-[var(--text-65)] prose-li:font-body
        prose-strong:text-[var(--text)]
        prose-blockquote:border-l-[var(--accent)] prose-blockquote:text-[var(--text-50)]
        prose-a:text-[var(--accent-text)] prose-a:no-underline hover:prose-a:underline
        dark:prose-invert
      ">
        {children}
      </div>
    </article>
  );
}
