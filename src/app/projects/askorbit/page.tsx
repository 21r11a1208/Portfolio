import { Metadata } from "next";
import { CaseStudyLayout } from "@/components/projects/CaseStudyLayout";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anish.works";
const CANONICAL = `${BASE_URL}/projects/askorbit`;

export const metadata: Metadata = {
  title: "AskOrbit Product Breakdown — B Anish",
  description: "Breaking down AskOrbit: the AI chatbot I scoped and shipped inside PMOrbit to answer project health queries in natural language.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "article",
    url: CANONICAL,
    title: "AskOrbit Product Breakdown | B Anish",
    description: "Breaking down AskOrbit: the AI chatbot I scoped and shipped inside PMOrbit.",
    images: [{ url: "/nen.png", width: 1200, height: 630, alt: "AskOrbit Product Breakdown — B Anish" }],
  },
};

const project = {
  title: "AskOrbit",
  type: "Product Breakdown" as const,
  status: "Production" as const,
  description: "An AI chatbot embedded in PMOrbit that lets you query project health in plain English, replacing slow dashboard navigation.",
};

export default function AskOrbitPage() {
  return (
    <CaseStudyLayout project={project} readTime="5 min read">
      <h2>What It Is</h2>
      <p>
        AskOrbit is an AI chatbot embedded inside PMOrbit that answers questions about project health in natural language. Instead of navigating multiple dashboard views to find a status, a user types: <em>&ldquo;What are the open risks on Project Atlas?&rdquo;</em> and gets an immediate, structured answer.
      </p>

      <h2>The Problem It Solved</h2>
      <p>
        Dashboard navigation is slow when you only need one data point. PMO leads and executives were repeatedly clicking through views to answer simple questions before meetings. The time cost added up fast — and the cognitive load of navigating a complex platform just to confirm a status was a real friction point.
      </p>
      <p>
        The insight: <strong>most dashboard interactions were information retrieval, not exploration.</strong> If we could serve that use case directly, we could reduce friction for a large class of sessions.
      </p>

      <h2>How It Was Scoped</h2>
      <p>
        I started by auditing the most common support questions raised through internal channels: 80% were status checks or RAID queries that already had answers in the system. This gave clear scope — AskOrbit didn&apos;t need to be general-purpose. It needed to answer a defined set of questions well.
      </p>
      <p>
        MVP scope:
      </p>
      <ul>
        <li>Project status queries (&ldquo;What is the current status of X?&rdquo;)</li>
        <li>RAID queries (&ldquo;What are the open risks on X?&rdquo;)</li>
        <li>Timeline queries (&ldquo;When is X expected to complete?&rdquo;)</li>
        <li>Team queries (&ldquo;Who owns X?&rdquo;)</li>
      </ul>
      <p>
        Out of scope for MVP: cross-project analysis, trend queries, write operations.
      </p>

      <h2>What Good Looked Like</h2>
      <p>
        The metric I cared about most was answer accuracy — specifically, whether users trusted the response enough to act on it without verifying in the dashboard. In informal testing, users stopped double-checking for straightforward status and RAID queries after the first few sessions.
      </p>
      <p>
        Secondary metric: session length reduction for retrieval-only sessions. Users who used AskOrbit spent significantly less time in the platform for information-retrieval sessions while reporting equivalent satisfaction.
      </p>

      <h2>Limitations</h2>
      <p>
        AskOrbit performed well on structured queries but struggled with ambiguous intent. &ldquo;How is Project X doing?&rdquo; is harder to answer than &ldquo;What is the risk count on Project X?&rdquo; — the former requires judgment about what &ldquo;doing&rdquo; means to that user.
      </p>
      <p>
        What would make it better: a clarification flow for ambiguous queries, user feedback on each response to improve the model, and expansion into cross-project queries once the structured retrieval layer is stable.
      </p>
    </CaseStudyLayout>
  );
}
