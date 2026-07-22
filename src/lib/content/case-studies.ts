import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import matter from "gray-matter";
import { CaseStudySummarySchema, type CaseStudySummary } from "./schema";

const CONTENT_DIR = path.join(process.cwd(), "content", "case-studies");
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.anish.works";

export function getAllCaseStudySummaries(): CaseStudySummary[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  const entries = files.map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
    const { data } = matter(raw);
    const parsed = CaseStudySummarySchema.safeParse(data);
    if (!parsed.success) {
      throw new Error(`Invalid frontmatter in content/case-studies/${file}: ${parsed.error.message}`);
    }
    return parsed.data;
  });
  return entries.sort((a, b) => a.order - b.order);
}

export function getCaseStudySummary(slug: string): CaseStudySummary | undefined {
  return getAllCaseStudySummaries().find((c) => c.slug === slug);
}

/**
 * Builds the Next.js `Metadata` object for a case-study route from its
 * content-loader summary. Centralizes what every `src/app/projects/<slug>/page.tsx`
 * previously hand-copied from local `title`/`description`/`type` consts.
 */
export function buildCaseStudyMetadata(cs: CaseStudySummary): Metadata {
  const canonical = `${BASE_URL}/projects/${cs.slug}`;
  const ogImage = `${BASE_URL}/api/og?title=${encodeURIComponent(cs.title)}&type=${encodeURIComponent(cs.type)}`;
  return {
    title: `${cs.title} — B Anish`,
    description: cs.description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: `${cs.title} | B Anish`,
      description: cs.description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: cs.title }],
    },
  };
}

/**
 * Builds the `TechArticle` JSON-LD object for a case-study route from its
 * content-loader summary. Mirrors the shape hand-copied in every existing
 * `src/app/projects/<slug>/page.tsx` (see e.g. askorbit, pmorbbit, college-erp,
 * linkedin-rca, agridrone, cluely — all identical apart from the field values).
 */
export function buildCaseStudyArticleSchema(cs: CaseStudySummary) {
  const canonical = `${BASE_URL}/projects/${cs.slug}`;
  const ogImage = `${BASE_URL}/api/og?title=${encodeURIComponent(cs.title)}&type=${encodeURIComponent(cs.type)}`;
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: cs.title,
    description: cs.description,
    image: ogImage,
    author: {
      "@type": "Person",
      name: "Bonagiri Anish",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Bonagiri Anish",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/Favicon.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
  };
}
