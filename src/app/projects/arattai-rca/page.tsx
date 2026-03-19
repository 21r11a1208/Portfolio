import { Metadata } from "next";
import { ArattaiRCA } from "./ArattaiRCA";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anish.works";
const CANONICAL = `${BASE_URL}/projects/arattai-rca`;

export const metadata: Metadata = {
  title: "Arattai RCA — B Anish",
  description: "Root cause analysis of Zoho's Arattai — an Indian messaging app that hit #1 in downloads then lost 99% of its user base within 8 weeks.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "article",
    url: CANONICAL,
    title: "Arattai RCA | B Anish",
    description: "Root cause analysis of Zoho's Arattai — the Indian messaging app that hit #1 in downloads then lost 99% of users in 8 weeks.",
    images: [{ url: "/nen.png", width: 1200, height: 630, alt: "Arattai RCA — B Anish" }],
  },
};

export default function ArattaiRCAPage() {
  return <ArattaiRCA />;
}
