import { Metadata } from "next";
import { StackOverflowRCA } from "./StackOverflowRCA";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anish.works";
const CANONICAL = `${BASE_URL}/projects/stackoverflow-rca`;

export const metadata: Metadata = {
  title: "Stack Overflow RCA — B Anish",
  description: "Root cause analysis of Stack Overflow's 50%+ traffic decline — how AI tools, community decay, and product stagnation converged to displace a market leader.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "article",
    url: CANONICAL,
    title: "Stack Overflow RCA | B Anish",
    description: "Root cause analysis of Stack Overflow's 50%+ traffic decline — how AI tools, community decay, and product stagnation converged to displace a market leader.",
    images: [{ url: "/nen.png", width: 1200, height: 630, alt: "Stack Overflow RCA — B Anish" }],
  },
};

export default function StackOverflowRCAPage() {
  return <StackOverflowRCA />;
}
