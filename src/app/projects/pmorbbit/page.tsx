import { Metadata } from "next";
import { PMOrbitCaseStudy } from "./PMOrbitCaseStudy";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anish.works";
const CANONICAL = `${BASE_URL}/projects/pmorbbit`;

export const metadata: Metadata = {
  title: "PMOrbit Case Study — B Anish",
  description: "How I co-built a production PM platform from 0 to 1 at RealPage, reducing handoff friction by 40% for PMO leads and executive leadership.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "article",
    url: CANONICAL,
    title: "PMOrbit — 0-to-1 Product Case Study | B Anish",
    description: "How I co-built a production PM platform from 0 to 1 at RealPage, reducing handoff friction by 40%.",
    images: [{ url: "/nen.png", width: 1200, height: 630, alt: "PMOrbit Case Study — B Anish" }],
  },
};

export default function PMOrbitPage() {
  return <PMOrbitCaseStudy />;
}
