import { Metadata } from "next";
import { CaseStudyLayout } from "@/components/projects/CaseStudyLayout";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anish.works";
const CANONICAL = `${BASE_URL}/projects/linkedin-rca`;

const title = "LinkedIn DAU Drop RCA";
const description = "A structured root cause analysis for a hypothetical 15% LinkedIn DAU drop in India.";

export const metadata: import("next").Metadata = {
  title: `${title} — B Anish`,
  description,
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "article",
    url: CANONICAL,
    title: `${title} | B Anish`,
    description,
    images: [{ url: `${BASE_URL}/api/og?title=${encodeURIComponent(title)}&type=RCA`, width: 1200, height: 630, alt: title }],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: title,
  description: description,
  image: `${BASE_URL}/api/og?title=${encodeURIComponent(title)}&type=RCA`,
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

export default function LinkedInRCAPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      (
    <CaseStudyLayout project={project} readTime="6 min read">
      <h2>The Scenario</h2>
      <p>
        LinkedIn&apos
    </>
  );
}
