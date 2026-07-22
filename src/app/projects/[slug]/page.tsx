import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllCaseStudySummaries, getCaseStudySummary, buildCaseStudyMetadata, buildCaseStudyArticleSchema } from "@/lib/content/case-studies";
import { CaseStudyShell } from "@/components/projects/CaseStudyShell";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllCaseStudySummaries()
    .filter((cs) => cs.sections && cs.sections.length > 0)
    .map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudySummary(slug);
  if (!cs) return {};
  return buildCaseStudyMetadata(cs);
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudySummary(slug);
  if (!cs || !cs.sections) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildCaseStudyArticleSchema(cs)) }}
      />
      <CaseStudyShell project={cs} sections={cs.sections} readTime={cs.readTime} />
    </>
  );
}
