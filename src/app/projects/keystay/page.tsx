import { Metadata } from "next";
import { KeyStayPRD } from "./KeyStayPRD";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anish.works";
const CANONICAL = `${BASE_URL}/projects/keystay`;

export const metadata: Metadata = {
  title: "KeyStay PRD — B Anish",
  description: "Product requirements document for an AI-powered vacation rental management platform that helps hosts manage bookings, pricing, and operations.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "article",
    url: CANONICAL,
    title: "KeyStay PRD | B Anish",
    description: "Product requirements document for an AI-powered vacation rental management platform.",
    images: [{ url: "/nen.png", width: 1200, height: 630, alt: "KeyStay PRD — B Anish" }],
  },
};

export default function KeyStayPage() {
  return <KeyStayPRD />;
}
