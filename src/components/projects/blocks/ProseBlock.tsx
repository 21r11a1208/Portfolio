import ReactMarkdown from "react-markdown";
import type { Block } from "@/lib/content/schema";

type ProseBlockData = Extract<Block, { type: "prose" }>;

// Same Tailwind Typography classes the pre-existing case-study layout
// component applies to its children — copied verbatim, not redesigned.
// This task is a structural change (sections/blocks), not a visual one.
export function ProseBlock({ data }: { data: ProseBlockData }) {
  return (
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
      <ReactMarkdown>{data.body}</ReactMarkdown>
    </div>
  );
}
