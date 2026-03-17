import { Metadata } from "next";
import { GymatePRD } from "./GymatePRD";

export const metadata: Metadata = {
  title: "Gymate PRD — B Anish",
  description: "Product requirements document for a location-based gym partner matching app.",
};

export default function GymatePage() {
  return <GymatePRD />;
}
