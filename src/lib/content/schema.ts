import { z } from "zod";

export const CaseStudyTypeSchema = z.enum([
  "Case Study", "Product Breakdown", "PRD", "Product Teardown",
  "RCA", "Product Enhancement", "Metrics",
]);

export const CaseStudySummarySchema = z.object({
  slug: z.string(),
  title: z.string(),
  type: CaseStudyTypeSchema,
  status: z.enum(["Production", "Self-initiated"]).optional(),
  description: z.string(),
  problemStatement: z.string(),
  businessImpact: z.string().optional(),
  readTime: z.string().default("5 min read"),
  order: z.number(),
  lastModified: z.string(), // ISO date string, e.g. "2025-03-19"
  priority: z.number().min(0).max(1),
});
export type CaseStudySummary = z.infer<typeof CaseStudySummarySchema>;

export const ExperienceEntrySchema = z.object({
  company: z.string(),
  role: z.string(),
  duration: z.string(),
  location: z.string(),
  problemStatement: z.string().optional(),
  businessImpact: z.string().optional(),
  highlight: z.string().optional(),
  achievements: z.array(z.string()),
  link: z.string().optional(),
  order: z.number(),
});
export type ExperienceEntryContent = z.infer<typeof ExperienceEntrySchema>;

export const ArticleSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  readTime: z.string(),
  url: z.string().url(),
  order: z.number(),
});
export type ArticleContent = z.infer<typeof ArticleSchema>;

export const AboutSchema = z.object({
  paragraph1: z.string(),
  paragraph2: z.string(),
  paragraph3: z.string(),
  personalLine: z.string(),
});
export type AboutContent = z.infer<typeof AboutSchema>;

export const StatSchema = z.object({
  value: z.number(),
  suffix: z.string().optional(),
  prefix: z.string().optional(),
  label: z.string(),
});
export type StatContent = z.infer<typeof StatSchema>;

export const SkillGroupSchema = z.object({
  category: z.string(),
  skills: z.array(z.string()),
});
export type SkillGroupContent = z.infer<typeof SkillGroupSchema>;
