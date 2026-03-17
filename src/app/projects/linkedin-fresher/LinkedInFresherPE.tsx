"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ReadingProgressBar } from "@/components/ui/ReadingProgressBar";
import { Tag } from "@/components/ui/Tag";

const TOC = [
  { id: "lf-clarify",      label: "1. Clarify"        },
  { id: "lf-user",         label: "2. The User"       },
  { id: "lf-hypothesis",   label: "3. Hypothesis"     },
  { id: "lf-brainstorm",   label: "4. Brainstorm"     },
  { id: "lf-prioritise",   label: "5. Prioritise"     },
  { id: "lf-solution",     label: "6. What I'd Build" },
  { id: "lf-metric",       label: "7. The Metric"     },
  { id: "lf-tradeoffs",    label: "8. Left Out"       },
];

// ─── Brainstorm ideas ─────────────────────────────────────────────────────────

const IDEAS = [
  {
    id: "toggle",
    title: "Fresher Mode toggle",
    description: "A persistent filter toggle in job search that combines structured experience fields + NLP signals to surface only 0–1yr roles.",
    kept: true,
    why: "Highest impact per unit of effort. Directly addresses the core friction — filtering before the user opens anything. Doesn't require recruiter behaviour change to work.",
  },
  {
    id: "badge",
    title: "Fresher-Friendly badge on job cards",
    description: "ML-powered badge visible in search results before opening a posting, so users can scan without clicking.",
    kept: true,
    why: "Eliminates the per-posting read-to-qualify loop. Works even without Fresher Mode active. Builds trust in the filter system over time.",
  },
  {
    id: "hub",
    title: "Dedicated 'Fresh Start' job hub",
    description: "A separate tab or section for campus roles, new-grad programs, and alumni-referred entry-level openings.",
    kept: true,
    why: "Leverages LinkedIn's unique asset — the professional graph — for freshers. Alumni connections are a higher-quality signal than any keyword filter.",
  },
  {
    id: "mismatch",
    title: "Experience mismatch signal before applying",
    description: "A soft warning before submission: 'This role typically looks for X years. Similar profiles still apply — here's the data.'",
    kept: true,
    why: "Solves the confidence gap without gatekeeping. 72% of eligible freshers self-filter; honest data flips that.",
  },
  {
    id: "profile",
    title: "Fresher profile amplifier",
    description: "Guided setup flow to frame projects, coursework, and certifications as work-equivalent experience.",
    kept: false,
    why: "Important but it's a supply-side fix (making the fresher more visible to recruiters). The core problem is demand-side friction (freshers finding relevant roles). I'd build this in v2 after the search experience is fixed.",
  },
  {
    id: "alert",
    title: "Job alert with 'Fresher verified' pre-filter",
    description: "Email/push alerts that only fire when a new role passes the fresher-signal threshold.",
    kept: false,
    why: "Good retention feature but doesn't solve the in-session discovery problem. Also depends on having the NLP model first. Natural v1.5 addition.",
  },
  {
    id: "employer",
    title: "Employer 'Open to freshers' recruitment badge",
    description: "A company-level certification on the LinkedIn company page showing hiring history of freshers.",
    kept: false,
    why: "High-value signal but requires significant recruiter-side adoption work. Wrong bet for v1 — build demand-side trust first, then pull recruiters in.",
  },
  {
    id: "ai",
    title: "AI assistant that evaluates fit and drafts message",
    description: "'You're 70% fit for this role. Here's what to highlight in your application.' AI-drafted outreach message.",
    kept: false,
    why: "Scope creep. Solving for fit communication before solving for finding the right role is putting the cart before the horse. Also, LinkedIn already has AI features here.",
  },
];

// ─── Features to build ────────────────────────────────────────────────────────

const FEATURES = [
  {
    title: "Fresher Mode Toggle",
    priority: "P0",
    description: "A persistent toggle in the Jobs search bar that activates an ML-powered filter: experience_years ≤ 1 in the structured field + NLP detection of fresher-signal phrases in JD text + recruiter-set opt-in flag. Non-qualifying jobs are dimmed (not hidden) when active — transparency over suppression. Persists across sessions in user settings.",
    userStory: "As a fresher, I want one toggle that filters to jobs genuinely open to me, so I stop manually reading 40 job descriptions to find 4 relevant ones.",
    acceptanceCriteria: [
      "Toggle visible in Jobs search bar, persists in user settings",
      "Combines 3 signals: structured experience field + NLP + recruiter opt-in",
      "Non-qualifying jobs dimmed (not hidden) — user retains full visibility",
      "Precision target: ≥85% of surfaced jobs require ≤1yr experience",
      "Recall target: ≥90% of genuinely entry-level jobs are surfaced",
    ],
  },
  {
    title: "Fresher-Friendly Badge",
    priority: "P0",
    description: "A visible badge on job cards in search results — before the user opens the posting. Awarded by LinkedIn's NLP system when the JD contains verified fresher-signal language, or when the recruiter explicitly opts in. The badge eliminates the need to open a posting just to determine eligibility. Confidence threshold: ≥80% before the badge fires.",
    userStory: "As a fresher browsing search results, I want a visual signal on each card that tells me whether the role is accessible before I invest time reading the full JD.",
    acceptanceCriteria: [
      "Badge shown on job card in search results, not only inside the posting",
      "ML confidence threshold ≥80% required to display badge",
      "Recruiter opt-in available in posting creation flow",
      "Badge links to 'why this qualified' breakdown when clicked",
      "Badge click-through rate tracked as model quality signal",
    ],
  },
  {
    title: "Fresh Start Hub",
    priority: "P1",
    description: "A dedicated tab in LinkedIn Jobs surfacing: campus recruitment postings, new-grad programs (Google APM, Microsoft Explore, etc.), internship-to-hire pipelines, and alumni-referred entry-level roles. Personalised by degree, field, graduation year, and location. The key differentiator: uses the alumni graph — 'Companies where graduates from your college got their first job.'",
    userStory: "As a recent graduate, I want a dedicated space for graduate-level opportunities so I'm not searching in the same pool as candidates with 5+ years of experience.",
    acceptanceCriteria: [
      "Dedicated 'Fresh Start' tab in Jobs navigation",
      "Feed personalised by: degree field, graduation year, location, skills",
      "Alumni filter: 'Companies where alumni from your college work'",
      "Known new-grad programs pinned by company",
      "Campus recruitment postings tagged and surfaced here first",
    ],
  },
  {
    title: "Experience Mismatch Signal",
    priority: "P1",
    description: "Before a fresher applies to a role requiring 2+ years, LinkedIn surfaces a soft prompt: 'This role typically looks for X years. You have Y. Many applicants with similar profiles still apply — you can too.' Crucially, this never blocks the application. It replaces ambiguity with honest data, reducing both self-filtering (eligible freshers who don't apply) and misfires (clearly unsuitable applications).",
    userStory: "As a fresher, I want honest feedback about my fit before applying, so I can make an informed decision rather than guessing or anxiety-filtering myself out.",
    acceptanceCriteria: [
      "Prompt shown only when structured experience gap ≥2 years",
      "Tone is encouraging, not gatekeeping — never blocks the application",
      "Shows similar-profile apply rate: 'X% of applicants with 0–1yr exp applied'",
      "User can dismiss permanently per-role",
      "A/B test: measure downstream application and interview rate with/without prompt",
    ],
  },
];

// ─── Shared micro-components ─────────────────────────────────────────────────

function Counter({ target, suffix = "", duration = 1500 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const step = target / (duration / 16);
    const id = setInterval(() => {
      current += step;
      if (current >= target) { setCount(target); clearInterval(id); }
      else setCount(Math.floor(current));
    }, 16);
    return () => clearInterval(id);
  }, [inView, target, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--accent)" }}>{children}</p>;
}
function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary, #fff)" }}>{children}</h2>;
}
function Divider() {
  return <div className="border-t my-12" style={{ borderColor: "var(--border)" }} />;
}

const PRIORITY_STYLES: Record<string, { label: string; color: string; bg: string }> = {
  P0: { label: "P0 — Must Have",   color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
  P1: { label: "P1 — Should Have", color: "#f97316", bg: "rgba(249,115,22,0.1)" },
};

// ─── Feature tabs ─────────────────────────────────────────────────────────────

function FeatureTabs() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = FEATURES[activeIdx];
  const ps = PRIORITY_STYLES[active.priority];
  return (
    <div>
      <div className="flex gap-2 flex-wrap mb-6">
        {FEATURES.map((f, i) => (
          <button key={i} onClick={() => setActiveIdx(i)}
            className="px-3 py-2 rounded-lg text-xs transition-all duration-200"
            style={{
              background: activeIdx === i ? "var(--accent-25, rgba(255,140,0,0.2))" : "var(--surface, #111)",
              color: activeIdx === i ? "var(--accent)" : "var(--text-secondary, #888)",
              border: `1px solid ${activeIdx === i ? "var(--accent)" : "var(--border)"}`,
              fontWeight: activeIdx === i ? 600 : 400,
            }}>
            {f.title}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={activeIdx}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="rounded-xl border p-5"
          style={{ borderColor: "var(--border)", background: "var(--surface, #111)" }}>
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div>
              <h3 className="font-bold" style={{ color: "var(--text-primary, #fff)" }}>{active.title}</h3>
            </div>
            <span className="text-xs px-2 py-1 rounded-full shrink-0 font-semibold"
              style={{ background: ps.bg, color: ps.color }}>{ps.label}</span>
          </div>
          <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-secondary, #aaa)" }}>
            {active.description}
          </p>
          <div className="mb-4 rounded-lg p-3 border-l-2"
            style={{ borderColor: "var(--accent)", background: "var(--surface-2, #0d0d0d)" }}>
            <p className="text-xs font-mono uppercase tracking-wide mb-1" style={{ color: "var(--accent)" }}>User Story</p>
            <p className="text-sm italic" style={{ color: "var(--text-secondary, #aaa)" }}>{active.userStory}</p>
          </div>
          <div>
            <p className="text-xs font-mono uppercase tracking-wide mb-2" style={{ color: "var(--accent)" }}>Acceptance Criteria</p>
            <ul className="space-y-1.5">
              {active.acceptanceCriteria.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary, #aaa)" }}>
                  <span style={{ color: "var(--accent)", marginTop: 3, flexShrink: 0 }}>✓</span>{c}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function LinkedInFresherPE() {
  const [activeSection, setActiveSection] = useState("lf-clarify");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }); },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    TOC.forEach(({ id }) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <ReadingProgressBar />

      {/* Sticky TOC */}
      <nav className="hidden xl:flex fixed top-32 flex-col gap-1.5 text-xs"
        style={{ right: "max(1rem, calc(50vw - 680px))", width: 148 }}>
        {TOC.map(({ id, label }) => (
          <a key={id} href={`#${id}`} className="transition-all duration-200"
            style={{ color: activeSection === id ? "var(--accent)" : "var(--text-secondary, #888)", fontWeight: activeSection === id ? 600 : 400 }}>
            {label}
          </a>
        ))}
      </nav>

      <div className="space-y-0">

        {/* Header */}
        <div className="mb-10">
          <Tag variant="type">Product Enhancement</Tag>
          <h1 className="text-4xl font-bold mt-4 mb-2" style={{ color: "var(--text-primary, #fff)" }}>
            LinkedIn for Freshers
          </h1>
          <p className="text-lg mb-6" style={{ color: "var(--text-secondary, #aaa)" }}>
            How I&apos;d think through reducing job-search friction for India&apos;s 10M annual graduates
          </p>
          <div className="rounded-xl border p-5"
            style={{ borderColor: "var(--accent)44", background: "var(--accent-08, rgba(255,140,0,0.05))" }}>
            <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--accent)" }}>
              How I&apos;m approaching this
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary, #aaa)" }}>
              I&apos;m walking through this the way I would in a product design interview — out loud, showing my reasoning at each step. I&apos;ll start by scoping the problem, pick the user I&apos;m solving for and why, generate a wide brainstorm before cutting it down, pick one north-star metric and defend it, and then explicitly call out what I&apos;m leaving on the table. The goal isn&apos;t a perfect answer — it&apos;s a clear reasoning chain.
            </p>
          </div>
        </div>

        {/* ── Step 1: Clarify ──────────────────────────────────────────────── */}
        <section id="lf-clarify">
          <SectionLabel>Step 1 of 8</SectionLabel>
          <SectionTitle>Clarify the problem</SectionTitle>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary, #aaa)" }}>
            Before I jump in, I&apos;d ask a few clarifying questions to make sure I&apos;m solving the right problem.
          </p>

          <div className="space-y-3">
            {[
              {
                q: "Is this an acquisition problem or an engagement problem?",
                a: "Engagement. Freshers know LinkedIn exists. The friction isn't getting them onto the platform — it's what happens once they're searching for jobs. I'm scoping to the job-search experience specifically, not profile discovery or recruiter reach.",
              },
              {
                q: "Are we optimising for freshers finding jobs faster, or for LinkedIn's business?",
                a: "Both, and they're aligned. A fresher who gets a job through LinkedIn becomes an employed professional — LinkedIn's core power user. The acquisition cost of a life-long user is effectively zero if the platform earns trust at the first-job stage. This is a long-term LTV play, not just a UX fix.",
              },
              {
                q: "Which market am I designing for primarily?",
                a: "India, but the pattern is global. India has the highest density of this problem — 10M graduates/year, WhatsApp-native job search culture, high LinkedIn penetration among students, and the Naukri benchmark showing there's a clear market for fresher-specific job experiences. I'll design for India with global generalisability in mind.",
              },
              {
                q: "What's in scope?",
                a: "Job discovery and filtering experience for users with 0–1 year of experience. Out of scope: profile optimisation features, recruiter-side products, LinkedIn Learning tie-ins. I may reference them as future v2 work.",
              },
            ].map(({ q, a }, i) => (
              <motion.div key={i}
                whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 10 }} viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-xl border p-5"
                style={{ borderColor: "var(--border)", background: "var(--surface, #111)" }}>
                <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary, #fff)" }}>
                  Q: {q}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary, #aaa)" }}>
                  <span style={{ color: "var(--accent)" }}>→ </span>{a}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── Step 2: The User ─────────────────────────────────────────────── */}
        <section id="lf-user">
          <SectionLabel>Step 2 of 8</SectionLabel>
          <SectionTitle>Who am I solving for?</SectionTitle>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary, #aaa)" }}>
            I wouldn&apos;t just say &ldquo;freshers.&rdquo; I&apos;d segment first, then pick one segment to anchor the solution on.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {[
              {
                segment: "Tier 1 CS grad",
                example: "IIT/NIT graduate, strong projects, high network",
                friction: "Low",
                note: "Already gets recruiter inbound. LinkedIn works reasonably well for them.",
                chosen: false,
              },
              {
                segment: "Tier 2/3 grad",
                example: "B.Tech from state university, solid skills, no network",
                friction: "Very High",
                note: "Has to find every opportunity outbound. The filter problem hits them hardest.",
                chosen: true,
              },
              {
                segment: "Non-tech fresher",
                example: "Commerce/arts grad looking for marketing, ops, analyst roles",
                friction: "High",
                note: "Even fewer fresher-friendly filters in their domain. But a harder design problem — I'd address after tech freshers.",
                chosen: false,
              },
            ].map(({ segment, example, friction, note, chosen }) => (
              <div key={segment} className="rounded-xl border p-4"
                style={{
                  borderColor: chosen ? "var(--accent)" : "var(--border)",
                  background: chosen ? "var(--accent-08, rgba(255,140,0,0.05))" : "var(--surface, #111)",
                }}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="font-semibold text-sm" style={{ color: chosen ? "var(--accent)" : "var(--text-primary, #fff)" }}>
                    {segment}
                  </p>
                  {chosen && (
                    <span className="text-xs px-2 py-0.5 rounded-full shrink-0 font-semibold"
                      style={{ background: "var(--accent-25)", color: "var(--accent)" }}>Primary</span>
                  )}
                </div>
                <p className="text-xs mb-2" style={{ color: "var(--text-secondary, #888)" }}>{example}</p>
                <p className="text-xs mb-2 font-medium" style={{ color: friction === "Very High" ? "#ef4444" : friction === "High" ? "#f97316" : "#22c55e" }}>
                  Friction: {friction}
                </p>
                <p className="text-xs" style={{ color: "var(--text-secondary, #aaa)" }}>{note}</p>
              </div>
            ))}
          </div>

          {/* Persona */}
          <div className="rounded-xl border p-5" style={{ borderColor: "var(--border)", background: "var(--surface, #111)" }}>
            <p className="text-xs font-mono uppercase tracking-wide mb-3" style={{ color: "var(--accent)" }}>
              The user I&apos;m designing for
            </p>
            <p className="font-bold mb-0.5" style={{ color: "var(--text-primary, #fff)" }}>Priya — B.Tech CSE 2024, Tier-2 college, Hyderabad</p>
            <p className="text-sm mb-4" style={{ color: "var(--text-secondary, #888)" }}>
              Opens LinkedIn every morning. Spends 2–3 hours searching. Applies to 5–8 jobs. Gets called back by 0–1.
            </p>
            <blockquote className="border-l-2 pl-4 italic text-sm"
              style={{ borderColor: "var(--accent)", color: "var(--text-secondary, #aaa)" }}>
              &ldquo;I spend more time figuring out if I can apply than actually applying. Most of what I see isn&apos;t for me — but I don&apos;t know that until I&apos;m halfway through the job description.&rdquo;
            </blockquote>
          </div>

          {/* Journey */}
          <p className="text-xs font-mono uppercase tracking-wide mt-6 mb-3" style={{ color: "var(--accent)" }}>
            Her current job-search journey
          </p>
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-2" style={{ minWidth: 640 }}>
              {[
                { step: "Search 'Software Engineer'", emotion: "Hopeful",    note: "2,000+ results" },
                { step: "Filter: Entry Level",         emotion: "Optimistic", note: "Still 800+ — filter is broken" },
                { step: "Open posting #1",             emotion: "Neutral",    note: "'2 years required'" },
                { step: "Open postings #2–#8",         emotion: "Frustrated", note: "Same pattern, every time" },
                { step: "Find one relevant posting",   emotion: "Relieved",   note: "1 in 9. Applies." },
                { step: "Repeat tomorrow",             emotion: "Resigned",   note: "No system improvement" },
              ].map(({ step, emotion, note }, i) => {
                const ec: Record<string, string> = { Hopeful: "#22c55e", Optimistic: "#3b82f6", Neutral: "#6b7280", Frustrated: "#f97316", Relieved: "#22c55e", Resigned: "#ef4444" };
                return (
                  <motion.div key={i}
                    whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 12 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="flex-1 rounded-xl border p-3 flex flex-col gap-2"
                    style={{ borderColor: "var(--border)", background: "var(--surface, #111)", minWidth: 130 }}>
                    <div className="text-xs px-2 py-0.5 rounded-full self-start font-medium"
                      style={{ background: (ec[emotion] ?? "#888") + "22", color: ec[emotion] ?? "#888" }}>{emotion}</div>
                    <p className="text-xs font-semibold" style={{ color: "var(--text-primary, #fff)" }}>{step}</p>
                    <p className="text-xs" style={{ color: "var(--text-secondary, #888)" }}>{note}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <Divider />

        {/* ── Step 3: Hypothesis ───────────────────────────────────────────── */}
        <section id="lf-hypothesis">
          <SectionLabel>Step 3 of 8</SectionLabel>
          <SectionTitle>What do I think is actually happening?</SectionTitle>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary, #aaa)" }}>
            I wouldn&apos;t jump to solutions yet. I&apos;d form a hypothesis about the root problem first — because the solution shape is very different depending on which one is true.
          </p>

          <div className="space-y-3">
            {[
              {
                hypothesis: "H1: The 'Entry Level' filter is a false signal",
                evidence: "35–40% of jobs tagged 'Entry Level' on LinkedIn require 2+ years of experience. Recruiters aren't lying — they just use the field inconsistently. The filter gives freshers false confidence and wastes more time than no filter at all.",
                verdict: "Primary",
                color: "#f97316",
              },
              {
                hypothesis: "H2: Freshers lack confidence, not information",
                evidence: "~72% of freshers self-filter out of roles they're actually eligible for. The JD language ('preferred: 2 years') reads as a hard requirement even when it isn't. This is a signal design problem — the product doesn't tell users what's a requirement vs what's a preference.",
                verdict: "Secondary",
                color: "#3b82f6",
              },
              {
                hypothesis: "H3: LinkedIn's graph isn't being used for freshers",
                evidence: "LinkedIn's unique advantage is the professional graph — alumni data, company hiring patterns, career paths. None of this is surfaced for freshers. Naukri doesn't have this data. This is an opportunity, not just a problem.",
                verdict: "Opportunity",
                color: "#22c55e",
              },
              {
                hypothesis: "H4: This is a recruiter behaviour problem, not a product problem",
                evidence: "If recruiters filled in the experience field correctly, the existing filter would work. But I'm not betting on changing recruiter behaviour without a product forcing function — they have no incentive to tag carefully. The product has to compensate.",
                verdict: "Rejected",
                color: "#6b7280",
              },
            ].map(({ hypothesis, evidence, verdict, color }) => (
              <div key={hypothesis} className="rounded-xl border p-5"
                style={{ borderColor: verdict === "Rejected" ? "var(--border)" : color + "44", background: "var(--surface, #111)" }}>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <p className="font-semibold text-sm" style={{ color: "var(--text-primary, #fff)" }}>{hypothesis}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full shrink-0 font-semibold"
                    style={{ background: color + "22", color }}>
                    {verdict}
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary, #aaa)" }}>{evidence}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border-l-4 p-4"
            style={{ borderColor: "var(--accent)", background: "var(--surface, #111)" }}>
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary, #fff)" }}>
              What I&apos;d test before building
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary, #aaa)" }}>
              I&apos;d pull a sample of 500 &ldquo;Entry Level&rdquo; LinkedIn jobs in India and manually score them against experience requirements. If H1 is confirmed at &gt;30% false-positives, the fix is a product-layer signal, not recruiter education. I&apos;d also run 10 user interviews specifically probing for whether the confidence gap (H2) is real or rationalised.
            </p>
          </div>
        </section>

        <Divider />

        {/* ── Step 4: Brainstorm ───────────────────────────────────────────── */}
        <section id="lf-brainstorm">
          <SectionLabel>Step 4 of 8</SectionLabel>
          <SectionTitle>Everything I could build</SectionTitle>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary, #aaa)" }}>
            Before I cut, I&apos;d generate broadly. Here are 8 ideas — ranging from obvious to unconventional. I&apos;m not filtering yet.
          </p>

          <div className="space-y-3">
            {IDEAS.map((idea) => (
              <div key={idea.id} className="rounded-xl border overflow-hidden"
                style={{ borderColor: idea.kept ? "var(--border)" : "var(--border)", opacity: idea.kept ? 1 : 0.6 }}>
                <div className="px-5 py-4 flex items-start gap-4"
                  style={{ background: "var(--surface, #111)" }}>
                  <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5"
                    style={{
                      borderColor: idea.kept ? "#22c55e" : "#6b7280",
                      background: idea.kept ? "rgba(34,197,94,0.1)" : "transparent",
                    }}>
                    {idea.kept
                      ? <span style={{ color: "#22c55e", fontSize: 10 }}>✓</span>
                      : <span style={{ color: "#6b7280", fontSize: 10 }}>✗</span>}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm mb-0.5" style={{ color: "var(--text-primary, #fff)" }}>{idea.title}</p>
                    <p className="text-sm mb-2" style={{ color: "var(--text-secondary, #888)" }}>{idea.description}</p>
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-mono shrink-0" style={{ color: idea.kept ? "#22c55e" : "#6b7280" }}>
                        {idea.kept ? "Keeping:" : "Cutting:"}
                      </span>
                      <p className="text-xs" style={{ color: "var(--text-secondary, #aaa)" }}>{idea.why}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid sm:grid-cols-2 gap-3">
            <div className="rounded-lg border p-4" style={{ borderColor: "#22c55e44", background: "rgba(34,197,94,0.05)" }}>
              <p className="text-xs font-mono uppercase tracking-wide mb-2" style={{ color: "#22c55e" }}>Moving forward with</p>
              <ul className="space-y-1">
                {IDEAS.filter(i => i.kept).map(i => (
                  <li key={i.id} className="text-sm" style={{ color: "var(--text-secondary, #aaa)" }}>→ {i.title}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border p-4" style={{ borderColor: "#6b728044", background: "rgba(107,114,128,0.05)" }}>
              <p className="text-xs font-mono uppercase tracking-wide mb-2" style={{ color: "#6b7280" }}>Parked for later</p>
              <ul className="space-y-1">
                {IDEAS.filter(i => !i.kept).map(i => (
                  <li key={i.id} className="text-sm" style={{ color: "var(--text-secondary, #aaa)" }}>→ {i.title}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <Divider />

        {/* ── Step 5: Prioritise ───────────────────────────────────────────── */}
        <section id="lf-prioritise">
          <SectionLabel>Step 5 of 8</SectionLabel>
          <SectionTitle>How I&apos;d sequence the 4 ideas I kept</SectionTitle>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary, #aaa)" }}>
            I have 4 ideas I want to build. I still need to decide what&apos;s P0 (launch together), P1 (sprint 2), and what waits for validation.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ borderCollapse: "separate", borderSpacing: "0 8px" }}>
              <thead>
                <tr>
                  {["Feature", "Impact on north star", "Effort", "Dependencies", "Priority"].map(h => (
                    <th key={h} className="text-left px-4 py-2 text-xs font-mono uppercase tracking-wide"
                      style={{ color: "var(--text-secondary, #888)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Fresher Mode Toggle",      impact: "High — directly filters irrelevant results",       effort: "Medium",    dep: "NLP model",              priority: "P0", pc: "#ef4444" },
                  { feature: "Fresher-Friendly Badge",   impact: "High — eliminates per-card manual read",            effort: "Medium",    dep: "Same NLP model as above", priority: "P0", pc: "#ef4444" },
                  { feature: "Experience Mismatch Signal", impact: "Medium — confidence gap fix",                    effort: "Low",       dep: "None — structured field only", priority: "P0", pc: "#ef4444" },
                  { feature: "Fresh Start Hub",          impact: "Medium-High — LinkedIn graph leverage",            effort: "High",      dep: "Alumni data pipeline",   priority: "P1", pc: "#f97316" },
                ].map(({ feature, impact, effort, dep, priority, pc }) => (
                  <tr key={feature} className="rounded-xl"
                    style={{ background: "var(--surface, #111)" }}>
                    <td className="px-4 py-3 rounded-l-lg font-medium" style={{ color: "var(--text-primary, #fff)" }}>{feature}</td>
                    <td className="px-4 py-3" style={{ color: "var(--text-secondary, #aaa)" }}>{impact}</td>
                    <td className="px-4 py-3" style={{ color: "var(--text-secondary, #aaa)" }}>{effort}</td>
                    <td className="px-4 py-3" style={{ color: "var(--text-secondary, #aaa)" }}>{dep}</td>
                    <td className="px-4 py-3 rounded-r-lg">
                      <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                        style={{ background: pc + "22", color: pc }}>{priority}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 rounded-xl border p-5" style={{ borderColor: "var(--border)", background: "var(--surface, #111)" }}>
            <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary, #fff)" }}>Why Toggle + Badge ship together</p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary, #aaa)" }}>
              The Toggle and Badge share the same NLP model — the infrastructure cost is incurred once. If I ship the Toggle without the Badge, the filter works but search results still look identical. If I ship the Badge without the Toggle, users get signal on individual cards but still have to scroll past irrelevant ones. Together, they solve the problem end-to-end. Shipping separately would halve the impact without halving the effort.
            </p>
          </div>
        </section>

        <Divider />

        {/* ── Step 6: What I'd Build ───────────────────────────────────────── */}
        <section id="lf-solution">
          <SectionLabel>Step 6 of 8</SectionLabel>
          <SectionTitle>What I&apos;d actually build</SectionTitle>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary, #aaa)" }}>
            Spec for the 4 features I&apos;d ship, in priority order. Click each to see the design decisions.
          </p>
          <FeatureTabs />
        </section>

        <Divider />

        {/* ── Step 7: The Metric ───────────────────────────────────────────── */}
        <section id="lf-metric">
          <SectionLabel>Step 7 of 8</SectionLabel>
          <SectionTitle>The one number I&apos;d track</SectionTitle>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary, #aaa)" }}>
            I&apos;d resist reporting a dashboard of 6 metrics. The discipline is picking ONE that best captures whether the problem is solved — and being honest about the trade-off.
          </p>

          <div className="rounded-xl border p-6 mb-6"
            style={{ borderColor: "var(--accent)55", background: "var(--accent-08, rgba(255,140,0,0.05))" }}>
            <p className="text-xs font-mono uppercase tracking-wide mb-1" style={{ color: "var(--accent)" }}>North Star Metric</p>
            <p className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary, #fff)" }}>
              Qualified applications per search session — fresher cohort
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary, #aaa)" }}>
              A &ldquo;qualified application&rdquo; = applied to a role where experience requirement ≤ 1yr. This directly measures whether the fresher found relevant roles and had the confidence to act. Target: move from the current estimated 1–2 per session to 3–4.
            </p>
          </div>

          <p className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary, #fff)" }}>
            Why I rejected the obvious alternatives:
          </p>
          <div className="space-y-3">
            {[
              { metric: "Total applications submitted", problem: "Can go up while match quality drops. A fresher applying to 20 clearly wrong roles looks like a win in this metric. It measures volume, not signal quality." },
              { metric: "DAU among 0–2yr experience users", problem: "Freshers with high job-search intent already have high DAU — frustration and all. Improving DAU without improving outcomes would be a hollow metric win." },
              { metric: "Job-to-hire conversion rate", problem: "I don't control post-application outcome. Recruiter quality, market conditions, and interview performance are all out of scope. Don't measure things you can't influence." },
              { metric: "Time spent in Jobs section", problem: "Engagement time going down is actually success if I reduce the time wasted on irrelevant postings. A 'reduce time' improvement would look bad in an engagement metric." },
            ].map(({ metric, problem }) => (
              <div key={metric} className="rounded-lg border p-4 flex gap-4"
                style={{ borderColor: "var(--border)", background: "var(--surface, #111)" }}>
                <span className="text-lg shrink-0" style={{ color: "#ef4444" }}>✗</span>
                <div>
                  <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--text-primary, #fff)" }}>{metric}</p>
                  <p className="text-sm" style={{ color: "var(--text-secondary, #aaa)" }}>{problem}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid sm:grid-cols-3 gap-3">
            {[
              { value: 50, suffix: "%", label: "Target reduction in time-to-first-apply", note: "Primary UX outcome" },
              { value: 22, suffix: "M", label: "Addressable fresher users on LinkedIn India", note: "~22% of 100M India users" },
              { value: 85, suffix: "%", label: "NLP precision target for Fresher-Friendly badge", note: "Below this = broken trust" },
            ].map(({ value, suffix, label, note }) => (
              <motion.div key={label}
                whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 16 }} viewport={{ once: true }}
                className="rounded-lg p-4 border text-center"
                style={{ borderColor: "var(--border)", background: "var(--surface, #111)" }}>
                <div className="text-2xl font-bold" style={{ color: "var(--accent)" }}>
                  <Counter target={value} suffix={suffix} />
                </div>
                <div className="text-xs font-medium mt-1" style={{ color: "var(--text-primary, #fff)" }}>{label}</div>
                <div className="text-xs mt-0.5" style={{ color: "var(--text-secondary, #888)" }}>{note}</div>
              </motion.div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── Step 8: Left Out ─────────────────────────────────────────────── */}
        <section id="lf-tradeoffs">
          <SectionLabel>Step 8 of 8</SectionLabel>
          <SectionTitle>What I&apos;m consciously leaving out — and why</SectionTitle>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary, #aaa)" }}>
            Good PM thinking isn&apos;t just about what you build — it&apos;s about what you decide NOT to build and why. Here are my four explicit trade-offs.
          </p>

          <div className="space-y-4">
            {[
              {
                title: "I'm not hiding non-fresher jobs",
                reasoning: "Fresher Mode dims irrelevant results, it doesn't remove them. If I hide them, I create a two-tier job market where freshers lose access to stretch opportunities and recruiters eventually have a 'fresher-only' posting strategy that ghettoises entry-level roles. The toggle is a signal layer, not a fence.",
                tension: "This means the mode feels less 'clean' than a full filter. That's a deliberate trade-off for long-term equity.",
                color: "#ef4444",
              },
              {
                title: "I'm not launching the Fresher Profile Amplifier in v1",
                reasoning: "Profile visibility is a supply-side fix — it helps recruiters find freshers. But the core problem is demand-side: freshers can't find relevant roles. Fixing supply without fixing demand means a better-seen candidate who still hits the same search-friction wall. Sequence matters.",
                tension: "Freshers often ask for profile help. This will feel like a gap in v1. I'd communicate the roadmap clearly.",
                color: "#f97316",
              },
              {
                title: "I'm not changing recruiter posting behaviour in v1",
                reasoning: "Recruiters don't fill in experience fields accurately. I could build a 'suggest experience level' nudge into the posting flow — but recruiter adoption is slow and I don't control that surface in this initiative. The NLP model compensates for recruiter inconsistency without requiring behaviour change.",
                tension: "Long-term, recruiter data quality is the right fix. But I'd rather ship a working product in 6 weeks than a perfect product in 18.",
                color: "#3b82f6",
              },
              {
                title: "I'm not A/B testing the Badge at launch",
                reasoning: "I'd launch the Badge only to NLP confidence ≥80% predictions from day one — so there's no 'without badge' control group in production. The risk of shipping a low-precision badge (and destroying trust) outweighs the experimental rigour of a clean A/B. I'd measure badge click-through and downstream apply rate as a proxy for model quality.",
                tension: "This means I can't cleanly attribute apply-rate lift to the Badge vs the Toggle. I'd use holdout cohorts by college cohort rather than individual randomisation.",
                color: "#eab308",
              },
            ].map(({ title, reasoning, tension, color }, i) => (
              <motion.div key={i}
                whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -16 }} viewport={{ once: true }}
                className="rounded-xl border p-5"
                style={{ borderColor: "var(--border)", background: "var(--surface, #111)" }}>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                    style={{ background: color + "22", color }}>
                    {i + 1}
                  </div>
                  <h3 className="font-semibold text-sm" style={{ color: "var(--text-primary, #fff)" }}>{title}</h3>
                </div>
                <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-secondary, #aaa)" }}>{reasoning}</p>
                <div className="rounded-lg px-4 py-2.5" style={{ background: color + "12", borderLeft: `3px solid ${color}` }}>
                  <p className="text-xs font-mono uppercase tracking-wide mb-1" style={{ color }}>The tension I&apos;m accepting</p>
                  <p className="text-sm" style={{ color: "var(--text-secondary, #aaa)" }}>{tension}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
