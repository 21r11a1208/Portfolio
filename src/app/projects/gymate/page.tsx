import { Metadata } from "next";
import { GymatePRD } from "./GymatePRD";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anish.works";
const CANONICAL = `${BASE_URL}/projects/gymate`;

export const metadata: Metadata = {
  title: "Gymate PRD — B Anish",
  description: "Product requirements document for a location-based gym partner matching app — connecting fitness enthusiasts nearby for accountability and motivation.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "article",
    url: CANONICAL,
    title: "Gymate PRD | B Anish",
    description: "Product requirements document for a location-based gym partner matching app.",
    images: [{ url: "/nen.png", width: 1200, height: 630, alt: "Gymate PRD — B Anish" }],
  },
};

export default function GymatePage() {
  return <GymatePRD />;
}
