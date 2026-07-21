import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { CaseStudySummarySchema, type CaseStudySummary } from "./schema";

const CONTENT_DIR = path.join(process.cwd(), "content", "case-studies");

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
