import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { ExperienceEntrySchema, type ExperienceEntryContent } from "./schema";

const CONTENT_DIR = path.join(process.cwd(), "content", "experience");

export function getAllExperience(): ExperienceEntryContent[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  const entries = files.map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
    const { data } = matter(raw);
    const parsed = ExperienceEntrySchema.safeParse(data);
    if (!parsed.success) {
      throw new Error(`Invalid frontmatter in content/experience/${file}: ${parsed.error.message}`);
    }
    return parsed.data;
  });
  return entries.sort((a, b) => a.order - b.order);
}
