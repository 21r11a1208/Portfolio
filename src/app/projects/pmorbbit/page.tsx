import { Metadata } from "next";
import { PMOrbitCaseStudy } from "./PMOrbitCaseStudy";

export const metadata: Metadata = {
  title: "PMOrbit Case Study — B Anish",
  description: "How I co-built a production PM platform from 0 to 1 at RealPage.",
};

export default function PMOrbitPage() {
  return <PMOrbitCaseStudy />;
}
