import { Metadata } from "next";
import { AgriDronePRD } from "./AgriDronePRD";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.anish.works";
const CANONICAL = `${BASE_URL}/projects/agridrone`;

const title = "AgriDrone PRD";
const description = "Product requirements document for a drone services marketplace connecting Indian farmers with licensed drone operators for precision agriculture.";

export const metadata: Metadata = {
  title: `${title} — B Anish`,
  description,
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "article",
    url: CANONICAL,
    title: `${title} | B Anish`,
    description,
    images: [{ url: `${BASE_URL}/api/og?title=${encodeURIComponent(title)}&type=PRD`, width: 1200, height: 630, alt: title }],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: title,
  description: description,
  image: `${BASE_URL}/api/og?title=${encodeURIComponent(title)}&type=PRD`,
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

export default function AgriDronePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <AgriDronePRD />;
    </>
  );
}
