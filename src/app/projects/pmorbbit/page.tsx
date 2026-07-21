import { Metadata } from "next";
import { PMOrbitCaseStudy } from "./PMOrbitCaseStudy";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.anish.works";
const CANONICAL = `${BASE_URL}/projects/pmorbbit`;

const title = "PMOrbit Case Study";
const description = "How I co-built a production PM platform from 0 to 1 at RealPage, reducing handoff friction by 40% for PMO leads and executive leadership.";

export const metadata: Metadata = {
  title: `${title} — B Anish`,
  description,
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "article",
    url: CANONICAL,
    title: `${title} | B Anish`,
    description,
    images: [{ url: `${BASE_URL}/api/og?title=${encodeURIComponent(title)}&type=Case%20Study`, width: 1200, height: 630, alt: title }],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: title,
  description: description,
  image: `${BASE_URL}/api/og?title=${encodeURIComponent(title)}&type=Case%20Study`,
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

export default function PMOrbitPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <PMOrbitCaseStudy />;
    </>
  );
}
