import { Metadata } from "next";
import { StackOverflowRCA } from "./StackOverflowRCA";

export const metadata: Metadata = {
  title: "Stack Overflow RCA — B Anish",
  description: "Root cause analysis of Stack Overflow's 50%+ traffic decline — how AI tools, community decay, and product stagnation converged to displace a market leader.",
};

export default function StackOverflowRCAPage() {
  return <StackOverflowRCA />;
}
