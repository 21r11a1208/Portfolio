import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/layout/Nav";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://banish.me";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Anish.B | Portfolio",
    template: "%s | Anish.B",
  },
  description:
    "B Anish is an engineer-turned-product-manager based in Hyderabad. Built PMOrbit at RealPage from 0 to production — reducing handoff friction by 40%. Actively seeking APM and PM roles. Full-stack background in React, TypeScript, and .NET Core.",
  keywords: [
    "B Anish",
    "Product Manager",
    "APM",
    "Associate Product Manager",
    "PM portfolio",
    "Product Manager Hyderabad",
    "APM roles Hyderabad",
    "engineer turned PM",
    "PMOrbit",
    "RealPage",
    "product management portfolio",
    "aspiring PM India",
    "junior product manager",
    "B Anish PM",
    "B Anish product manager",
    "hire product manager Hyderabad",
    "PRD writing",
    "user research",
    "roadmap planning",
    "React TypeScript product manager",
  ],
  authors: [{ name: "B Anish", url: BASE_URL }],
  creator: "B Anish",
  publisher: "B Anish",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "profile",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "B Anish — Product Manager Portfolio",
    title: "B Anish — APM & PM | Engineer who builds, thinks, and ships products",
    description:
      "Built PMOrbit at RealPage from 0 to production. Reduced handoff friction by 40%. Full-stack PM with React, TypeScript, and .NET Core background. Actively looking for APM/PM roles in Hyderabad.",
    images: [
      {
        url: "/nen.png",
        width: 1200,
        height: 630,
        alt: "B Anish — Product Manager",
      },
    ],
    firstName: "Anish",
    lastName: "B",
    gender: "male",
  },
  twitter: {
    card: "summary_large_image",
    title: "B Anish — APM & PM | Engineer-turned-Product-Thinker",
    description:
      "Built a production platform for PMO leads at RealPage. Full-stack PM. Actively looking for APM/PM roles in Hyderabad.",
    images: ["/nen.png"],
    creator: "@banish",
  },
  category: "portfolio",
};

// ── JSON-LD structured data ────────────────────────────────────────────────

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${BASE_URL}/#person`,
  name: "B Anish",
  alternateName: ["Anish B", "B. Anish"],
  url: BASE_URL,
  image: {
    "@type": "ImageObject",
    url: `${BASE_URL}/nen.png`,
    width: 800,
    height: 800,
  },
  jobTitle: "Product Manager",
  description:
    "B Anish is an engineer-turned-product-manager who built PMOrbit at RealPage from 0 to production. With a full-stack background in React, TypeScript, and .NET Core, he bridges the gap between engineering and product. Currently seeking APM and PM roles in Hyderabad, India.",
  email: "anibaaabuuu@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.linkedin.com/in/b-anish-a963bb337/",
    "https://github.com/Ailur0",
    "https://medium.com/@b.anish",
  ],
  knowsAbout: [
    "Product Management",
    "Associate Product Management",
    "Product Requirements Documents",
    "User Research",
    "Roadmap Planning",
    "Stakeholder Management",
    "Funnel Analysis",
    "Root Cause Analysis",
    "React",
    "TypeScript",
    "Next.js",
    ".NET Core",
    "SQL",
    "Python",
    "Figma",
    "System Design",
    "Agile",
    "Scrum",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Product Manager",
    occupationLocation: {
      "@type": "City",
      name: "Hyderabad",
    },
    skills:
      "Product Management, Requirements Gathering, PRD Writing, Roadmap Planning, User Interviews, Funnel Analysis, Metrics & RCA, React, TypeScript, .NET Core, SQL, Python, Figma",
  },
  worksFor: {
    "@type": "Organization",
    name: "RealPage",
    url: "https://www.realpage.com",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "IT Graduate, Hyderabad",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  name: "B Anish — Product Manager Portfolio",
  url: BASE_URL,
  description:
    "Portfolio of B Anish, an engineer-turned-product-manager based in Hyderabad, actively seeking APM and PM roles.",
  author: { "@id": `${BASE_URL}/#person` },
  inLanguage: "en-IN",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Who is B Anish?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "B Anish is an engineer-turned-product-manager based in Hyderabad, India. He built PMOrbit — a production project management platform — at RealPage from 0 to production for PMO leads and executive leadership. He has a full-stack engineering background in React, TypeScript, and .NET Core, which allows him to work effectively across product and engineering teams.",
      },
    },
    {
      "@type": "Question",
      name: "Is B Anish available for Product Manager or APM roles?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. B Anish is actively seeking Associate Product Manager (APM) and Product Manager roles, primarily in Hyderabad, India. He is open to companies building impactful products where he can own a product area end-to-end.",
      },
    },
    {
      "@type": "Question",
      name: "What has B Anish built?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "B Anish co-owned PMOrbit at RealPage — a 0-to-1 project management platform for PMO leads and executives. He ran user interviews, managed the product roadmap, defined requirements, and shipped features that reduced handoff friction by 40%. He also has technical experience building full-stack applications.",
      },
    },
    {
      "@type": "Question",
      name: "What are B Anish's product management skills?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "B Anish's PM skills include: Requirements Gathering, PRD Writing, Roadmap Planning, User Interviews, Funnel Analysis, Metrics & Root Cause Analysis, Stakeholder Management, and Agile/Scrum. His technical skills include React, TypeScript, .NET Core, SQL, Python, and Figma.",
      },
    },
    {
      "@type": "Question",
      name: "How can I contact B Anish for a PM role?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can reach B Anish by leaving your email or LinkedIn URL on his portfolio contact form at banish.me, or by connecting with him directly on LinkedIn at linkedin.com/in/b-anish-a963bb337.",
      },
    },
    {
      "@type": "Question",
      name: "Why is B Anish a strong APM candidate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "B Anish combines rare strengths: real production ownership (PMOrbit, 0-to-1 at RealPage), full-stack engineering depth (React, TypeScript, .NET Core), and strong PM fundamentals (user research, PRD writing, roadmap planning). He bridges engineering and product naturally — no translation needed. He shipped features that reduced handoff friction by 40% and has direct experience with executive stakeholders.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <a
            href="#hero"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99999] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#c8f060] focus:text-[var(--text-on-accent)] focus:text-sm focus:font-semibold focus:font-display"
          >
            Skip to main content
          </a>
          <LoadingScreen />
          <CustomCursor />
          <Nav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
