import { Metadata } from "next";
import { CaseStudyLayout } from "@/components/projects/CaseStudyLayout";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anish.works";
const CANONICAL = `${BASE_URL}/projects/college-erp`;

const title = "College ERP Teardown";
const description = "A product teardown of CampX ERP used at Geethanjali College.";

export const metadata: import("next").Metadata = {
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

export default function CollegeERPPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      (
    <CaseStudyLayout project={project} readTime="6 min read">
      <h2>The Product</h2>
      <p>
        CampX is the ERP used at Geethanjali College of Engineering and Technology. It handles student records, attendance, marks, timetables, and NBA accreditation compliance. On paper, it does a lot. In practice, it makes several of those things unnecessarily hard.
      </p>

      <h2>What It Does Well</h2>
      <ul>
        <li>Centralised student records accessible to faculty and administration</li>
        <li>Attendance tracking with reasonable coverage across the college&apos
    </>
  );
}
