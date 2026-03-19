import { Metadata } from "next";
import { AsanaTrelloMetrics } from "./AsanaTrelloMetrics";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anish.works";
const CANONICAL = `${BASE_URL}/projects/asana-trello-metrics`;

export const metadata: Metadata = {
  title: "Asana & Trello — Metrics | B Anish",
  description:
    "A PM metrics deep-dive into Asana and Trello — north star definition, supporting hierarchy, rejection rationale, and guardrails for two divergent approaches to collaborative work management.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "article",
    url: CANONICAL,
    title: "PM Metrics: Asana & Trello | B Anish",
    description: "North star metrics, supporting hierarchy, rejected metrics and guardrails for Asana and Trello — a PM deep-dive.",
    images: [{ url: "/nen.png", width: 1200, height: 630, alt: "Asana & Trello Metrics — B Anish" }],
  },
};

export default function AsanaTrelloMetricsPage() {
  return <AsanaTrelloMetrics />;
}
