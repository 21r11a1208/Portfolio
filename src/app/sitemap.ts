import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anish.works";

// Only real crawlable pages — hash anchors are not separate indexable URLs
const projectSlugs: { slug: string; lastModified: string; priority: number }[] = [
  { slug: "pmorbbit",              lastModified: "2024-12-01", priority: 1.0 },
  { slug: "askorbit",              lastModified: "2024-12-01", priority: 0.9 },
  { slug: "keystay",               lastModified: "2025-01-01", priority: 0.9 },
  { slug: "agridrone",             lastModified: "2025-01-01", priority: 0.9 },
  { slug: "gymate",                lastModified: "2025-02-01", priority: 0.9 },
  { slug: "stackoverflow-rca",     lastModified: "2025-03-01", priority: 0.8 },
  { slug: "arattai-rca",           lastModified: "2025-03-01", priority: 0.8 },
  { slug: "linkedin-fresher",      lastModified: "2025-03-01", priority: 0.8 },
  { slug: "cluely",                lastModified: "2025-03-15", priority: 0.8 },
  { slug: "asana-trello-metrics",  lastModified: "2025-03-19", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPages: MetadataRoute.Sitemap = projectSlugs.map(({ slug, lastModified, priority }) => ({
    url: `${BASE_URL}/projects/${slug}`,
    lastModified: new Date(lastModified),
    changeFrequency: "monthly" as const,
    priority,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date("2025-03-19"),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    ...projectPages,
  ];
}
