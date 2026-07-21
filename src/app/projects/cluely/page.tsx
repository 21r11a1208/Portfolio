import { Metadata } from "next";
import { CluelyTeardown } from "./CluelyTeardown";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.anish.works";
const CANONICAL = `${BASE_URL}/projects/cluely`;

const title = "Cluely Teardown";
const description = "Product teardown and competitive analysis of Cluely — the AI overlay that turned ";

export const metadata: Metadata = {
  title: `${title} — B Anish`,
  description,
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "article",
    url: CANONICAL,
    title: `${title} | B Anish`,
    description,
    images: [{ url: `${BASE_URL}/api/og?title=${encodeURIComponent(title)}&type=Product%20Teardown`, width: 1200, height: 630, alt: title }],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: title,
  description: description,
  image: `${BASE_URL}/api/og?title=${encodeURIComponent(title)}&type=Product%20Teardown`,
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

export default function CluelyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <CluelyTeardown />;
    </>
  );
}
