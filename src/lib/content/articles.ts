import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { ArticleSchema, type ArticleContent } from "./schema";

const CONTENT_DIR = path.join(process.cwd(), "content", "articles");

export function getAllArticles(): ArticleContent[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  const entries = files.map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
    const { data } = matter(raw);
    const parsed = ArticleSchema.safeParse(data);
    if (!parsed.success) {
      throw new Error(`Invalid frontmatter in content/articles/${file}: ${parsed.error.message}`);
    }
    return parsed.data;
  });
  return entries.sort((a, b) => a.order - b.order);
}
