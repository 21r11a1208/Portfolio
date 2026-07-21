import { MetadataRoute } from "next";
import { getAllCaseStudySummaries } from "@/lib/content/case-studies";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.anish.works";

export default function sitemap(): MetadataRoute.Sitemap {
  // Only real crawlable pages — hash anchors are not separate indexable URLs
  const projectPages: MetadataRoute.Sitemap = getAllCaseStudySummaries().map(({ slug, lastModified, priority }) => ({
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
