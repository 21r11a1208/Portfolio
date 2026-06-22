import { Metadata } from "next";
import { AsanaTrelloMetrics } from "./AsanaTrelloMetrics";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anish.works";
const CANONICAL = `${BASE_URL}/projects/asana-trello-metrics`;

const title = "Asana & Trello — Metrics";
const description = "A PM metrics deep-dive into Asana and Trello — north star definition, supporting hierarchy, rejection rationale, and guardrails for two divergent approaches to collaborative work management.";

export const metadata: import("next").Metadata = {
  title: `${title} — B Anish`,
  description,
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "article",
    url: CANONICAL,
    title: `${title} | B Anish`,
    description,
    images: [{ url: `${BASE_URL}/api/og?title=${encodeURIComponent(title)}&type=Metrics`, width: 1200, height: 630, alt: title }],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: title,
  description: description,
  image: `${BASE_URL}/api/og?title=${encodeURIComponent(title)}&type=Metrics`,
  author: {
    "@type": "Person",
    name: "Bonagiri Anish",
    url: BASE_URL
  },
  publisher: {
    "@type": "Organization",
    name: "Bonagiri Anish",
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/Favicon.png`
    }
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": CANONICAL
  }
};

export default function AsanaTrelloMetricsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <AsanaTrelloMetrics />
    </>
  );
}
