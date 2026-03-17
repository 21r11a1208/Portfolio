import { Metadata } from "next";
import { KeyStayPRD } from "./KeyStayPRD";

export const metadata: Metadata = {
  title: "KeyStay PRD — B Anish",
  description: "Product requirements document for an AI-powered vacation rental management platform.",
};

export default function KeyStayPage() {
  return <KeyStayPRD />;
}
