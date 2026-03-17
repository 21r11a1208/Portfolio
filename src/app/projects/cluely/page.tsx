import { Metadata } from "next";
import { CluelyTeardown } from "./CluelyTeardown";

export const metadata: Metadata = {
  title: "Cluely Teardown — B Anish",
  description:
    "Product teardown and competitive analysis of Cluely — the AI overlay that turned 'cheating on interviews' into a venture-backed company, and what it reveals about real-time AI as a product category.",
};

export default function CluelyPage() {
  return <CluelyTeardown />;
}
