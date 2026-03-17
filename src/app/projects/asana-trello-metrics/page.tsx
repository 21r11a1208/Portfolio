import { Metadata } from "next";
import { AsanaTrelloMetrics } from "./AsanaTrelloMetrics";

export const metadata: Metadata = {
  title: "Asana & Trello — Metrics | B Anish",
  description:
    "A PM metrics deep-dive into Asana and Trello — north star definition, supporting hierarchy, rejection rationale, and guardrails for two divergent approaches to collaborative work management.",
};

export default function AsanaTrelloMetricsPage() {
  return <AsanaTrelloMetrics />;
}
