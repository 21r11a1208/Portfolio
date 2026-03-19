import { Metadata } from "next";
import { LinkedInFresherPE } from "./LinkedInFresherPE";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anish.works";
const CANONICAL = `${BASE_URL}/projects/linkedin-fresher`;

export const metadata: Metadata = {
  title: "LinkedIn for Freshers — B Anish",
  description: "A product enhancement proposal for LinkedIn — reducing the job-search friction freshers face when no explicit 0-experience filter exists.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "article",
    url: CANONICAL,
    title: "LinkedIn for Freshers — Product Enhancement | B Anish",
    description: "A product enhancement proposal for LinkedIn — reducing the job-search friction freshers face when no explicit 0-experience filter exists.",
    images: [{ url: "/nen.png", width: 1200, height: 630, alt: "LinkedIn for Freshers PE — B Anish" }],
  },
};

export default function LinkedInFresherPage() {
  return <LinkedInFresherPE />;
}
