import { Metadata } from "next";
import { LinkedInFresherPE } from "./LinkedInFresherPE";

export const metadata: Metadata = {
  title: "LinkedIn for Freshers — B Anish",
  description: "A product enhancement proposal for LinkedIn — reducing the job-search friction freshers face when no explicit 0-experience filter exists.",
};

export default function LinkedInFresherPage() {
  return <LinkedInFresherPE />;
}
