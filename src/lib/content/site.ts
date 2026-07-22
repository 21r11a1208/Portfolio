import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import {
  AboutSchema,
  StatSchema,
  SkillGroupSchema,
  type AboutContent,
  type StatContent,
  type SkillGroupContent,
} from "./schema";

const SITE_DIR = path.join(process.cwd(), "content", "site");

export function getAbout(): AboutContent {
  const raw = fs.readFileSync(path.join(SITE_DIR, "about.yml"), "utf-8");
  const parsed = AboutSchema.safeParse(matter(raw).data);
  if (!parsed.success) throw new Error(`Invalid content/site/about.yml: ${parsed.error.message}`);
  return parsed.data;
}

export function getStats(): StatContent[] {
  const raw = fs.readFileSync(path.join(SITE_DIR, "stats.yml"), "utf-8");
  const data = matter(raw).data;
  const parsed = z.array(StatSchema).safeParse(data.stats);
  if (!parsed.success) throw new Error(`Invalid content/site/stats.yml: ${parsed.error.message}`);
  return parsed.data;
}

export function getSkills(): SkillGroupContent[] {
  const raw = fs.readFileSync(path.join(SITE_DIR, "skills.yml"), "utf-8");
  const data = matter(raw).data;
  const parsed = z.array(SkillGroupSchema).safeParse(data.groups);
  if (!parsed.success) throw new Error(`Invalid content/site/skills.yml: ${parsed.error.message}`);
  return parsed.data;
}
