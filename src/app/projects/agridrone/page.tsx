import { Metadata } from "next";
import { AgriDronePRD } from "./AgriDronePRD";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anish.works";
const CANONICAL = `${BASE_URL}/projects/agridrone`;

export const metadata: Metadata = {
  title: "AgriDrone PRD — B Anish",
  description: "Product requirements document for a drone services marketplace connecting Indian farmers with licensed drone operators for precision agriculture.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "article",
    url: CANONICAL,
    title: "AgriDrone PRD | B Anish",
    description: "Product requirements document for a drone services marketplace connecting farmers with licensed operators.",
    images: [{ url: "/nen.png", width: 1200, height: 630, alt: "AgriDrone PRD — B Anish" }],
  },
};

export default function AgriDronePage() {
  return <AgriDronePRD />;
}
