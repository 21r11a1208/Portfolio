import { Metadata } from "next";
import { CluelyTeardown } from "./CluelyTeardown";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anish.works";
const CANONICAL = `${BASE_URL}/projects/cluely`;

export const metadata: Metadata = {
  title: "Cluely Teardown — B Anish",
  description:
    "Product teardown and competitive analysis of Cluely — the AI overlay that turned 'cheating on interviews' into a venture-backed company, and what it reveals about real-time AI as a product category.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "article",
    url: CANONICAL,
    title: "Cluely Product Teardown & Competitive Analysis | B Anish",
    description: "How Cluely found genuine whitespace in real-time AI, weaponised controversy as a growth strategy, and what their B2B pivot means for the category.",
    images: [{ url: "/nen.png", width: 1200, height: 630, alt: "Cluely Teardown — B Anish" }],
  },
};

export default function CluelyPage() {
  return <CluelyTeardown />;
}
