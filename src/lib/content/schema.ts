import { z } from "zod";

export const CaseStudyTypeSchema = z.enum([
  "Case Study", "Product Breakdown", "PRD", "Product Teardown",
  "RCA", "Product Enhancement", "Metrics",
]);

export const ProseBlockSchema = z.object({
  type: z.literal("prose"),
  body: z.string(), // markdown
});

export const CalloutBlockSchema = z.object({
  type: z.literal("callout"),
  tone: z.enum(["accent", "neutral"]).default("accent"),
  title: z.string().optional(),
  body: z.string(), // markdown
});

export const CardGridBlockSchema = z.object({
  type: z.literal("card-grid"),
  variant: z.enum(["counter", "info"]), // "counter": value is a number, animates on scroll-into-view. "info": value is display text, static.
  columns: z.union([z.literal(2), z.literal(3), z.literal(4)]).default(3),
  cards: z.array(z.object({
    label: z.string(),
    value: z.union([z.number(), z.string()]), // number when variant === "counter", string when "info"
    prefix: z.string().optional(),
    suffix: z.string().optional(),
    sub: z.string().optional(), // small caption line, e.g. "property managers globally"
  })),
});

export const IconListBlockSchema = z.object({
  type: z.literal("icon-list"),
  icon: z.enum(["check", "cross", "arrow", "dot"]).default("dot"),
  columns: z.union([z.literal(1), z.literal(2)]).default(1),
  groups: z.array(z.object({
    label: z.string().optional(), // e.g. "For Farmers" — omit for a single unlabeled list
    items: z.array(z.string()),
  })),
});

export const CardListBlockSchema = z.object({
  type: z.literal("card-list"),
  numbered: z.boolean().default(false),
  cards: z.array(z.object({
    title: z.string(),
    body: z.string().optional(),
    price: z.string().optional(),
    highlight: z.boolean().default(false), // visually distinguishes one card, e.g. a recommended pricing tier
    items: z.array(z.string()).optional(), // bullet list under the card, e.g. plan features
    note: z.string().optional(), // small caption below the items
  })),
});

export const ChipFlowBlockSchema = z.object({
  type: z.literal("chip-flow"),
  label: z.string().optional(),
  steps: z.array(z.string()), // rendered as chips with an arrow "→" between each — do NOT include "→" in the data itself
  note: z.string().optional(), // small trailing caption, e.g. exception paths not shown as steps
});

export const RoadmapBlockSchema = z.object({
  type: z.literal("roadmap"),
  phases: z.array(z.object({
    label: z.string(), // e.g. "Phase 1" or "v1.0" — both conventions exist in real content, this field holds either
    title: z.string().optional(),
    period: z.string().optional(),
    status: z.string().optional(), // free text, e.g. "Complete", "Planned", "P0" — renders as a small badge if present
    progress: z.number().min(0).max(100).optional(), // renders an animated progress bar ONLY if present and > 0
    items: z.array(z.string()),
  })),
});

export const TabsBlockSchema = z.object({
  type: z.literal("tabs"),
  panels: z.array(z.object({
    label: z.string(), // the pill/tab button text
    title: z.string(),
    subtitle: z.string().optional(), // e.g. a role or category, shown under the title
    meta: z.array(z.string()).optional(), // small badges, e.g. ["15-50 properties", "10+ years"]
    badge: z.string().optional(), // status/priority text, e.g. "Complete", "P0" — render as a small pill if present
    description: z.string().optional(), // markdown
    userStory: z.string().optional(), // shown in its own highlighted sub-box if present
    goals: z.array(z.string()).optional(),
    pains: z.array(z.string()).optional(),
    acceptanceCriteria: z.array(z.string()).optional(),
    quote: z.string().optional(), // shown as an italic blockquote-style line if present
  })),
});

export const AccordionBlockSchema = z.object({
  type: z.literal("accordion"),
  singleOpen: z.boolean().default(true), // if true, opening one item closes any other open item
  items: z.array(z.object({
    title: z.string(),
    meta: z.array(z.string()).optional(), // small caption fragments shown in the collapsed header, e.g. ["Probability: Low", "Impact: Critical"]
    body: z.string(), // markdown, revealed on expand
  })),
});

// A real discriminated union of 9 members as of Task 3a.2 (7 as of 3a.1,
// plus tabs/accordion here — the last 2 block types sub-stage 3a needs).
export const BlockSchema = z.discriminatedUnion("type", [
  ProseBlockSchema,
  CalloutBlockSchema,
  CardGridBlockSchema,
  IconListBlockSchema,
  CardListBlockSchema,
  ChipFlowBlockSchema,
  RoadmapBlockSchema,
  TabsBlockSchema,
  AccordionBlockSchema,
]);
export type Block = z.infer<typeof BlockSchema>;

export const SectionSchema = z.object({
  id: z.string(),
  toc_label: z.string().optional(),
  kicker: z.string().optional(),
  heading: z.string().optional(),
  blocks: z.array(BlockSchema),
});
export type Section = z.infer<typeof SectionSchema>;

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
  sections: z.array(SectionSchema).optional(),
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
