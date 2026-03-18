"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ReadingProgressBar } from "@/components/ui/ReadingProgressBar";
import { Tag } from "@/components/ui/Tag";

// ─── TOC ──────────────────────────────────────────────────────────────────────
const TOC = [
  { id: "cl-frame",       label: "1. Frame It"          },
  { id: "cl-user",        label: "2. The User"          },
  { id: "cl-anatomy",     label: "3. Product Anatomy"   },
  { id: "cl-bizmodel",    label: "4. Business Model"    },
  { id: "cl-growth",      label: "5. Growth Loop"       },
  { id: "cl-competitive", label: "6. Competitive Map"   },
  { id: "cl-risks",       label: "7. Moat & Risks"      },
  { id: "cl-take",        label: "8. My Take"           },
];

// ─── Data ─────────────────────────────────────────────────────────────────────
interface Competitor {
  id: string;
  name: string;
  cx: number;   // pixel x within SVG plot area
  cy: number;   // pixel y within SVG plot area
  color: string;
  category: string;
  description: string;
}

// SVG viewBox: 0 0 640 400, plot area x:60–620, y:20–360
// X-axis: 60=Before, 340=During, 620=After
// Y-axis: 20=Individual, 360=Team
const COMPETITORS: Competitor[] = [
  {
    id: "cluely",
    name: "Cluely",
    cx: 340, cy: 78,
    color: "#a855f7",
    category: "Primary Subject",
    description: "Real-time AI overlay during conversations — invisible to screen share detection.",
  },
  {
    id: "gemini",
    name: "Gemini Live",
    cx: 355, cy: 118,
    color: "#ec4899",
    category: "Emerging Threat",
    description: "Google's real-time conversational AI — same temporal slot, broader scope, OS-level distribution.",
  },
  {
    id: "leetcode",
    name: "LeetCode",
    cx: 127, cy: 72,
    color: "#6b7280",
    category: "Prep Tool",
    description: "Interview prep platform. Helps you get ready before — no in-session assistance.",
  },
  {
    id: "pramp",
    name: "Pramp",
    cx: 161, cy: 105,
    color: "#6b7280",
    category: "Prep Tool",
    description: "Mock interview practice. Prepares you before — not during.",
  },
  {
    id: "otter",
    name: "Otter.ai",
    cx: 519, cy: 149,
    color: "#3b82f6",
    category: "Meeting Assistant",
    description: "Live transcription + post-meeting notes. Starts During but the value is After.",
  },
  {
    id: "fireflies",
    name: "Fireflies",
    cx: 542, cy: 197,
    color: "#3b82f6",
    category: "Meeting Assistant",
    description: "AI meeting recorder and transcriber. Post-hoc analysis is the core use case.",
  },
  {
    id: "gong",
    name: "Gong",
    cx: 564, cy: 275,
    color: "#f59e0b",
    category: "Sales Intelligence",
    description: "Revenue intelligence platform. Deep post-call coaching and deal analytics for sales teams.",
  },
  {
    id: "chorus",
    name: "Chorus",
    cx: 542, cy: 305,
    color: "#f59e0b",
    category: "Sales Intelligence",
    description: "Conversation intelligence for sales teams. Competes with Gong in the After + Team quadrant.",
  },
];

const FEATURES = [
  {
    id: "overlay",
    icon: "👁️‍🗨️",
    title: "Invisible Overlay",
    description:
      "A transparent overlay that doesn't show up in screen share tools like Zoom, Google Meet, or OBS. This is the core technical differentiator.",
    pmRead:
      "Why invisible? Because visible makes it useless. The entire value proposition collapses if the interviewer can see it. This wasn't a feature decision — it was a product survival constraint.",
  },
  {
    id: "audio",
    icon: "🎙️",
    title: "Real-time Audio Capture",
    description:
      "Captures both sides of the conversation live. Transcribes and routes to the AI model with minimal latency, surfacing responses before the user has to stall.",
    pmRead:
      "Why audio AND screen? Screen gives code context. Audio gives question context. Together they enable accurate, contextual responses — not just generic completions. Removing either degrades the output significantly.",
  },
  {
    id: "context",
    icon: "📄",
    title: "Context Injection",
    description:
      "Upload your resume, job description, and talking points before a session. The AI grounds all responses in your specific context rather than producing generic answers.",
    pmRead:
      "This is the feature that separates Cluely from 'just open ChatGPT on your phone.' Context injection makes the output 10x more relevant and significantly harder to replicate with off-the-shelf AI.",
  },
  {
    id: "modes",
    icon: "⚡",
    title: "Conversation Modes",
    description:
      "Interview Mode (coding + behavioral), Sales Mode, Meeting Mode. Same AI engine underneath — different context templates and prompt tuning per mode.",
    pmRead:
      "This is the expansion playbook in the product itself. Interview was the wedge. Sales and Meetings are the monetization path. Building modes signals where the company is going — and what segments they're betting on for retention.",
  },
];

const GROWTH_STEPS = [
  {
    step: "01",
    label: "Provocative Launch",
    description:
      "\"I cheated my way through 30 interviews\" — a single headline that made every engineer feel something strong. Anger, envy, or recognition.",
  },
  {
    step: "02",
    label: "Media Amplification",
    description:
      "Haters wrote think-pieces. Fans shared clips. Ethics boards issued statements. Every article drove organic reach to people who had blanked in an interview last month.",
  },
  {
    step: "03",
    label: "Organic Search Capture",
    description:
      "Searches for \"how to cheat coding interviews\" and \"AI interview tool\" spiked. Cluely owned the top of that high-intent funnel with near-zero ad spend.",
  },
  {
    step: "04",
    label: "High-Intent Signups",
    description:
      "People who find the product through controversy already have a real, acute pain. Conversion is high because the problem is visceral — not aspirational.",
  },
  {
    step: "05",
    label: "Viral Success Stories",
    description:
      "Users share \"I passed FAANG with Cluely\" stories. Each success story is a new loop trigger — more media, more searches, more signups.",
  },
];

const RISKS = [
  {
    id: "detection",
    label: "Detection Arms Race",
    severity: "High" as const,
    color: "#ef4444",
    description:
      "Zoom, Google Meet, and interview platforms actively develop detection for invisible overlays. A single platform update can neutralize the core technical differentiator.",
    counter:
      "Short-term: current detection methods are screen-share based, and Cluely sidesteps that. But this is a cat-and-mouse game — it's a time-bounded advantage, not a structural moat.",
  },
  {
    id: "brand",
    label: "Brand Ceiling",
    severity: "High" as const,
    color: "#ef4444",
    description:
      "The 'cheat tool' brand is a CAC engine for B2C. It's a deal-killer for B2B. Enterprise HR and procurement teams will reject a tool with that founding story on sight.",
    counter:
      "The pivot to 'AI meeting assistant' language is the right move, but rebrands are hard when the founding story is the most memorable thing about you. They need to out-narrate the origin story, not erase it.",
  },
  {
    id: "commoditization",
    label: "Commoditization",
    severity: "Medium" as const,
    color: "#f59e0b",
    description:
      "As on-device AI matures (Apple Intelligence, Copilot+, Gemini), every OS will offer ambient AI natively. The overlay advantage becomes table stakes — or irrelevant.",
    counter:
      "The moat needs to shift from the delivery mechanism (overlay) to the context model quality and specialized prompt tuning. That's defensible. An OS-level overlay is not.",
  },
  {
    id: "ethics",
    label: "Ethical Normalization Risk",
    severity: "Medium" as const,
    color: "#f59e0b",
    description:
      "If AI-assisted interviews become normalized, Cluely's differentiation fades. If the stigma hardens, their TAM caps. They're betting on the cultural curve going the right way.",
    counter:
      "The GPS analogy is instructive: we stopped calling GPS 'cheating at navigation'. If interviews go the same way, this risk inverts into a tailwind. The bet is on cultural shift.",
  },
  {
    id: "ltv",
    label: "Narrow Initial Cohort",
    severity: "Low" as const,
    color: "#22c55e",
    description:
      "Job seekers are high-churn by definition — they stop using once hired. LTV from the interview segment alone doesn't build a sustainable business.",
    counter:
      "This is why the expansion to sales/meetings is existential, not optional. The interview use case builds brand and distribution. Sales teams provide the recurring revenue.",
  },
];

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const duration = 1400;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function CluelyTeardown() {
  const [activeSection, setActiveSection] = useState(0);
  const [activeCompetitor, setActiveCompetitor] = useState<string>("cluely");
  const [openRisk, setOpenRisk] = useState<string | null>(null);

  // Scroll spy
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    TOC.forEach(({ id }, idx) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(idx); },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const activeComp = COMPETITORS.find((c) => c.id === activeCompetitor);

  return (
    <>
      <ReadingProgressBar />
      <div className="min-h-screen" style={{ background: "var(--surface)", color: "var(--text-primary)" }}>

        {/* ── Hero ── */}
        <div style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--border)" }}>
          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <Tag variant="type">Product Teardown</Tag>
              <Tag variant="default">Self-initiated</Tag>
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-3">Cluely</h1>
            <p className="text-lg max-w-2xl" style={{ color: "var(--text-secondary)" }}>
              Product teardown &amp; competitive analysis of the AI overlay that turned
              &ldquo;cheating on interviews&rdquo; into a venture-backed company — and what it
              actually reveals about real-time AI as a product category.
            </p>
            <p className="mt-5 text-sm italic" style={{ color: "var(--text-secondary)" }}>
              No insider access. Based entirely on public information, product testing, and PM
              reasoning. The goal is the thinking, not a verdict on the company.
            </p>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="max-w-5xl mx-auto px-6 py-12 flex gap-12">

          {/* TOC */}
          <nav className="hidden lg:block w-52 shrink-0">
            <div className="sticky top-8">
              <p className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "var(--text-secondary)" }}>Structure</p>
              <ul className="space-y-1">
                {TOC.map(({ id, label }, idx) => (
                  <li key={id}>
                    <button
                      onClick={() =>
                        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
                      }
                      className="text-sm text-left w-full px-3 py-1.5 rounded-md transition-all"
                      style={{
                        color: activeSection === idx ? "var(--accent-text)" : "var(--text-secondary)",
                        background: activeSection === idx ? "var(--accent-08)" : "transparent",
                        fontWeight: activeSection === idx ? 600 : 400,
                      }}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Content */}
          <main className="flex-1 min-w-0 space-y-20">

            {/* ── 1. Frame It ── */}
            <section id="cl-frame">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <p className="text-xs font-semibold uppercase tracking-widest mb-1"
                  style={{ color: "var(--accent-text)" }}>Step 1</p>
                <h2 className="text-2xl font-bold mb-6">Frame It</h2>

                <div className="rounded-xl p-6 mb-6"
                  style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
                  <p className="text-xs uppercase tracking-widest mb-2"
                    style={{ color: "var(--text-secondary)" }}>One-liner</p>
                  <p className="text-xl font-semibold leading-snug">
                    Cluely is a real-time AI copilot that surfaces contextual answers during live
                    conversations — invisible to the other side.
                  </p>
                </div>

                <p className="mb-5" style={{ color: "var(--text-secondary)" }}>
                  Before I look at segments or features, I want to anchor on the structural insight
                  that makes Cluely interesting as a product:
                </p>

                {/* Before / During / After */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    {
                      phase: "Before",
                      tools: "LeetCode, Pramp, Notion",
                      insight: "Prep decays under pressure. Memory ≠ performance.",
                      highlight: false,
                    },
                    {
                      phase: "During",
                      tools: "Nothing — until Cluely",
                      insight: "The gap. High-stakes moments have zero real-time tool support.",
                      highlight: true,
                    },
                    {
                      phase: "After",
                      tools: "Otter.ai, Fireflies, Gong",
                      insight: "Post-mortems don't help you when you're blanking mid-answer.",
                      highlight: false,
                    },
                  ].map((col) => (
                    <div
                      key={col.phase}
                      className="rounded-xl p-4 text-center"
                      style={{
                        background: col.highlight ? "var(--accent-08)" : "var(--surface-2)",
                        border: `1px solid ${col.highlight ? "var(--accent)" : "var(--border)"}`,
                      }}
                    >
                      <p className="font-bold mb-1 text-sm"
                        style={{ color: col.highlight ? "var(--accent-text)" : "var(--text-primary)" }}>
                        {col.phase}
                      </p>
                      <p className="text-xs mb-2" style={{ color: "var(--text-secondary)" }}>{col.tools}</p>
                      <p className="text-xs italic" style={{ color: "var(--text-secondary)" }}>{col.insight}</p>
                    </div>
                  ))}
                </div>

                <p style={{ color: "var(--text-secondary)" }}>
                  Every competitor either helps you prepare or helps you review. Cluely is the only
                  product that helps you{" "}
                  <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>perform</span>
                  {" "}— in the moment. That is the whitespace they claimed.
                </p>
              </motion.div>
            </section>

            {/* ── 2. The User ── */}
            <section id="cl-user">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <p className="text-xs font-semibold uppercase tracking-widest mb-1"
                  style={{ color: "var(--accent-text)" }}>Step 2</p>
                <h2 className="text-2xl font-bold mb-6">The User</h2>

                <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
                  Cluely launched targeting one segment sharply and expanded. The three segments are
                  distinct — different JTBD, different economics, different churn profiles.
                </p>

                <div className="space-y-3 mb-6">
                  {[
                    {
                      segment: "Job Seekers — SWE interviews",
                      tag: "Launch Wedge",
                      jtbd: "Pass technical interviews despite DSA gaps or performance anxiety",
                      pain: "LeetCode prep doesn't hold under pressure. Every question feels like a blank.",
                      wtp: "High — already spending on LeetCode Premium, prep courses",
                      churn: "High — they stop using once hired",
                      primary: true,
                    },
                    {
                      segment: "Sales Reps — discovery and demo calls",
                      tag: "Expansion Target",
                      jtbd: "Surface objection responses, competitor comparisons, and pricing in real-time",
                      pain: "Can't memorize every SKU, case study, and competitor differentiator. Gets caught flat-footed.",
                      wtp: "High — if it closes one extra deal, the tool pays for itself in minutes",
                      churn: "Low — becomes part of daily workflow",
                      primary: false,
                    },
                    {
                      segment: "Professionals — high-stakes meetings",
                      tag: "Secondary",
                      jtbd: "Appear prepared, surface context, capture key decisions in real-time",
                      pain: "Meetings move faster than preparation. Key decisions happen when you haven't read the brief.",
                      wtp: "Medium — value is less acute than interview or sales use cases",
                      churn: "Low — recurring weekly use case",
                      primary: false,
                    },
                  ].map((seg) => (
                    <div
                      key={seg.segment}
                      className="rounded-xl p-5"
                      style={{
                        background: "var(--surface-2)",
                        border: `1px solid ${seg.primary ? "var(--accent)" : "var(--border)"}`,
                      }}
                    >
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="font-semibold">{seg.segment}</span>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-semibold"
                          style={{
                            background: seg.primary ? "var(--accent-25)" : "var(--border)",
                            color: seg.primary ? "var(--accent-text)" : "var(--text-secondary)",
                          }}
                        >
                          {seg.tag}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                        {[
                          { label: "Job to be Done", value: seg.jtbd },
                          { label: "Core Pain", value: seg.pain },
                          { label: "Willingness to Pay", value: seg.wtp },
                          { label: "Churn Risk", value: seg.churn },
                        ].map(({ label, value }) => (
                          <div key={label}>
                            <p className="text-xs uppercase tracking-wide mb-1"
                              style={{ color: "var(--text-secondary)" }}>{label}</p>
                            <p style={{ color: "var(--text-primary)" }}>{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-lg p-4"
                  style={{ background: "var(--accent-08)", border: "1px solid var(--accent)" }}>
                  <p className="text-sm font-semibold mb-1" style={{ color: "var(--accent-text)" }}>
                    The Tension
                  </p>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    The launch wedge (job seekers) has the highest conversion and the worst LTV. The
                    sales rep segment has lower conversion but 10x better retention. This is why the
                    expansion strategy isn&apos;t optional — the interview use case builds brand and
                    distribution, but it cannot sustain the business alone.
                  </p>
                </div>
              </motion.div>
            </section>

            {/* ── 3. Product Anatomy ── */}
            <section id="cl-anatomy">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <p className="text-xs font-semibold uppercase tracking-widest mb-1"
                  style={{ color: "var(--accent-text)" }}>Step 3</p>
                <h2 className="text-2xl font-bold mb-6">Product Anatomy</h2>

                <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
                  Breaking down the product surface — what each piece does and, more importantly,
                  the PM reasoning behind each decision.
                </p>

                <div className="space-y-4">
                  {FEATURES.map((feat) => (
                    <div key={feat.id} className="rounded-xl p-5"
                      style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{feat.icon}</span>
                        <span className="font-semibold text-lg">{feat.title}</span>
                      </div>
                      <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>
                        {feat.description}
                      </p>
                      <div className="rounded-md p-3"
                        style={{ background: "var(--accent-08)", borderLeft: "3px solid var(--accent)" }}>
                        <p className="text-xs font-semibold uppercase tracking-wide mb-1"
                          style={{ color: "var(--accent-text)" }}>PM Read</p>
                        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{feat.pmRead}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </section>

            {/* ── 4. Business Model ── */}
            <section id="cl-bizmodel">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <p className="text-xs font-semibold uppercase tracking-widest mb-1"
                  style={{ color: "var(--accent-text)" }}>Step 4</p>
                <h2 className="text-2xl font-bold mb-6">Business Model</h2>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { label: "Model", value: "B2C Subscription", note: "Individual users — monthly and annual plans" },
                    { label: "Wedge", value: "Job Seekers", note: "High intent, low CAC via organic controversy" },
                    { label: "Expansion", value: "B2B Sales Teams", note: "Higher ACV, better retention, procurement path" },
                    { label: "Revenue Driver", value: "Seat-based pricing", note: "Per-user as they move to team plans" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-xl p-5"
                      style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
                      <p className="text-xs uppercase tracking-wide mb-1"
                        style={{ color: "var(--text-secondary)" }}>{item.label}</p>
                      <p className="font-semibold text-lg mb-1">{item.value}</p>
                      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{item.note}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl p-5"
                  style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
                  <p className="font-semibold mb-3">The Unit Economics Problem</p>
                  <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>
                    If the average job seeker finds a role in 3 months and pays ~$30/month, that is
                    $90 LTV. Even with low CAC from organic virality, this is not a scalable business
                    on its own. The job seeker segment builds the user base and funds early growth — it
                    is not the end state.
                  </p>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    A sales rep using Cluely to close deals will use it indefinitely. A $30/month
                    subscription from an AE who attributes one closed deal per month to the tool is
                    renewal-certain. That is the real business. The interview use case is the
                    acquisition channel.
                  </p>
                </div>
              </motion.div>
            </section>

            {/* ── 5. Growth Loop ── */}
            <section id="cl-growth">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <p className="text-xs font-semibold uppercase tracking-widest mb-1"
                  style={{ color: "var(--accent-text)" }}>Step 5</p>
                <h2 className="text-2xl font-bold mb-6">Growth Loop</h2>

                <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
                  Cluely didn&apos;t grow despite the controversy — it grew because of it. The launch
                  was a growth hack disguised as a brand statement.
                </p>

                <div className="space-y-3 mb-8">
                  {GROWTH_STEPS.map((step, i) => (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="flex gap-4 items-start rounded-xl p-4"
                      style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
                    >
                      <span
                        className="text-xs font-bold shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ background: "var(--accent-25)", color: "var(--accent-text)" }}
                      >
                        {step.step}
                      </span>
                      <div>
                        <p className="font-semibold mb-1">{step.label}</p>
                        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="rounded-lg p-4"
                  style={{ background: "var(--accent-08)", border: "1px solid var(--accent)" }}>
                  <p className="text-sm font-semibold mb-1" style={{ color: "var(--accent-text)" }}>
                    The Key Insight
                  </p>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    Most founders try to avoid controversy. Roy Lee weaponized it. Every think-piece
                    calling Cluely unethical was free advertising to someone who had blanked on a
                    coding round under pressure. The positioning was implicitly: &ldquo;if you&apos;re angry
                    about this, you&apos;ve never bombed a technical interview.&rdquo; That reframe turns critics
                    into amplifiers.
                  </p>
                </div>
              </motion.div>
            </section>

            {/* ── 6. Competitive Map ── */}
            <section id="cl-competitive">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <p className="text-xs font-semibold uppercase tracking-widest mb-1"
                  style={{ color: "var(--accent-text)" }}>Step 6</p>
                <h2 className="text-2xl font-bold mb-6">Competitive Map</h2>

                <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
                  Mapped on the two axes that matter most for this category: when in the conversation
                  workflow does the tool operate, and who is the primary buyer — individual or team.
                  Click a dot to read more.
                </p>

                {/* SVG Positioning Map */}
                <div className="rounded-xl overflow-hidden mb-6"
                  style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
                  <div className="relative w-full" style={{ paddingBottom: "62.5%" }}>
                    <svg
                      viewBox="0 0 640 400"
                      className="absolute inset-0 w-full h-full"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      {/* Quadrant fills */}
                      <rect x="60" y="20" width="280" height="170" fill="var(--surface)" opacity="0.4" />
                      <rect x="340" y="20" width="280" height="170" fill="var(--surface)" opacity="0.4" />
                      <rect x="60" y="190" width="280" height="170" fill="var(--surface)" opacity="0.4" />
                      <rect x="340" y="190" width="280" height="170" fill="var(--surface)" opacity="0.4" />

                      {/* Whitespace highlight — During + Individual */}
                      <rect x="275" y="22" width="132" height="148" rx="8"
                        fill="rgba(168,85,247,0.07)" stroke="rgba(168,85,247,0.25)" strokeWidth="1" />
                      <text x="341" y="43" fill="#a855f7" fontSize="9.5" textAnchor="middle"
                        fontWeight="600" opacity="0.8">Whitespace claimed</text>

                      {/* Grid lines */}
                      <line x1="60" y1="20" x2="60" y2="368" stroke="var(--border)" strokeWidth="1.5" />
                      <line x1="60" y1="368" x2="620" y2="368" stroke="var(--border)" strokeWidth="1.5" />
                      <line x1="340" y1="20" x2="340" y2="368"
                        stroke="var(--border)" strokeWidth="1" strokeDasharray="5,4" opacity="0.5" />
                      <line x1="60" y1="194" x2="620" y2="194"
                        stroke="var(--border)" strokeWidth="1" strokeDasharray="5,4" opacity="0.5" />

                      {/* X-axis labels */}
                      <text x="150" y="388" fill="var(--text-secondary)" fontSize="11" textAnchor="middle">Before</text>
                      <text x="340" y="388" fill="var(--text-secondary)" fontSize="11" textAnchor="middle">During</text>
                      <text x="530" y="388" fill="var(--text-secondary)" fontSize="11" textAnchor="middle">After</text>

                      {/* Y-axis labels */}
                      <text x="38" y="100" fill="var(--text-secondary)" fontSize="11" textAnchor="middle"
                        transform="rotate(-90, 38, 100)">Individual</text>
                      <text x="38" y="290" fill="var(--text-secondary)" fontSize="11" textAnchor="middle"
                        transform="rotate(-90, 38, 290)">Team</text>

                      {/* Competitor dots */}
                      {COMPETITORS.map((comp) => {
                        const isActive = activeCompetitor === comp.id;
                        return (
                          <g key={comp.id} onClick={() => setActiveCompetitor(comp.id)}
                            style={{ cursor: "pointer" }}>
                            {isActive && (
                              <circle cx={comp.cx} cy={comp.cy} r={18}
                                fill={comp.color} opacity={0.12} />
                            )}
                            <circle
                              cx={comp.cx} cy={comp.cy}
                              r={isActive ? 8 : 6}
                              fill={comp.color}
                              opacity={isActive ? 1 : 0.55}
                            />
                            <text
                              x={comp.cx + 13}
                              y={comp.cy + 4}
                              fill={isActive ? comp.color : "var(--text-secondary)"}
                              fontSize="11"
                              fontWeight={isActive ? "600" : "400"}
                            >
                              {comp.name}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  {/* Active competitor detail */}
                  <AnimatePresence mode="wait">
                    {activeComp && (
                      <motion.div
                        key={activeComp.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.15 }}
                        className="px-5 py-4"
                        style={{ borderTop: "1px solid var(--border)" }}
                      >
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ background: activeComp.color }} />
                          <span className="font-semibold">{activeComp.name}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full"
                            style={{
                              background: "var(--surface)",
                              color: "var(--text-secondary)",
                              border: "1px solid var(--border)",
                            }}>
                            {activeComp.category}
                          </span>
                        </div>
                        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                          {activeComp.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Feature comparison table */}
                <p className="font-semibold mb-3">Feature Comparison</p>
                <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid var(--border)" }}>
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--border)" }}>
                        <th className="text-left px-4 py-3 font-semibold">Capability</th>
                        {["Cluely", "Otter.ai", "Gong", "LeetCode"].map((name) => (
                          <th key={name} className="px-4 py-3 font-semibold text-center"
                            style={{ color: name === "Cluely" ? "var(--accent-text)" : "var(--text-primary)" }}>
                            {name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { cap: "Real-time AI suggestions", vals: ["✓", "—", "—", "—"] },
                        { cap: "Invisible to screen share", vals: ["✓", "—", "—", "—"] },
                        { cap: "Live transcription", vals: ["✓", "✓", "✓", "—"] },
                        { cap: "Post-meeting analysis", vals: ["—", "✓", "✓", "—"] },
                        { cap: "Interview / prep context", vals: ["✓", "—", "—", "✓"] },
                        { cap: "Sales intelligence", vals: ["✓", "—", "✓", "—"] },
                        { cap: "Team-level analytics", vals: ["—", "Partial", "✓", "—"] },
                      ].map((row, i) => (
                        <tr key={i} style={{
                          borderBottom: "1px solid var(--border)",
                          background: i % 2 === 0 ? "var(--surface)" : "var(--surface-2)",
                        }}>
                          <td className="px-4 py-3">{row.cap}</td>
                          {row.vals.map((val, j) => (
                            <td key={j} className="px-4 py-3 text-center"
                              style={{
                                color: val === "✓" ? "#22c55e"
                                  : val === "—" ? "var(--text-secondary)"
                                  : "var(--text-primary)",
                              }}>
                              {val}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </section>

            {/* ── 7. Moat & Risks ── */}
            <section id="cl-risks">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <p className="text-xs font-semibold uppercase tracking-widest mb-1"
                  style={{ color: "var(--accent-text)" }}>Step 7</p>
                <h2 className="text-2xl font-bold mb-6">Moat &amp; Risks</h2>

                <p className="font-semibold mb-3">What protects them</p>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {[
                    {
                      label: "First-mover brand",
                      note: "In a new category, the pioneer brand is the moat. 'Invisible AI copilot' maps to Cluely in most engineers' minds right now.",
                    },
                    {
                      label: "Context model depth",
                      note: "After millions of real interview and sales conversations, their prompt tuning and context extraction is battle-tested in a way competitors can't shortcut.",
                    },
                    {
                      label: "Latency optimization",
                      note: "Real-time requires near-instant response. Getting this right across different devices, network conditions, and conversation types takes serious engineering time.",
                    },
                    {
                      label: "Controversy flywheel",
                      note: "Organic viral CAC driven by strong brand reactions. Hard to replicate because it requires both a real product and a willingness to make people uncomfortable.",
                    },
                  ].map((m) => (
                    <div key={m.label} className="rounded-xl p-4"
                      style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
                      <p className="font-semibold text-sm mb-1">{m.label}</p>
                      <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{m.note}</p>
                    </div>
                  ))}
                </div>

                <p className="font-semibold mb-3">Risks — click to expand</p>
                <div className="space-y-2">
                  {RISKS.map((risk) => (
                    <div key={risk.id} className="rounded-xl overflow-hidden"
                      style={{ border: "1px solid var(--border)" }}>
                      <button
                        className="w-full flex items-center justify-between px-5 py-4 text-left"
                        style={{ background: "var(--surface-2)" }}
                        onClick={() => setOpenRisk(openRisk === risk.id ? null : risk.id)}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                            style={{ background: `${risk.color}20`, color: risk.color }}>
                            {risk.severity}
                          </span>
                          <span className="font-semibold">{risk.label}</span>
                        </div>
                        <span style={{
                          color: "var(--text-secondary)",
                          display: "inline-block",
                          transform: openRisk === risk.id ? "rotate(180deg)" : "none",
                          transition: "transform 0.2s",
                        }}>▾</span>
                      </button>
                      <AnimatePresence>
                        {openRisk === risk.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 pt-3" style={{ background: "var(--surface)" }}>
                              <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>
                                {risk.description}
                              </p>
                              <div className="rounded-md p-3"
                                style={{ background: "var(--surface-2)", borderLeft: "3px solid var(--accent)" }}>
                                <p className="text-xs font-semibold uppercase tracking-wide mb-1"
                                  style={{ color: "var(--accent-text)" }}>Counter-read</p>
                                <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                                  {risk.counter}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </motion.div>
            </section>

            {/* ── 8. My Take ── */}
            <section id="cl-take">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <p className="text-xs font-semibold uppercase tracking-widest mb-1"
                  style={{ color: "var(--accent-text)" }}>Step 8</p>
                <h2 className="text-2xl font-bold mb-6">My Take</h2>

                <p className="font-semibold mb-3">What they got right</p>
                <div className="space-y-3 mb-8">
                  {[
                    {
                      point: "They found genuine whitespace",
                      body: "Before and After are crowded. During was empty. That's not luck — identifying a structural gap in the workflow and betting on it before anyone else is sharp product thinking.",
                    },
                    {
                      point: "Controversy as a CAC strategy",
                      body: "Organic controversy is the highest-leverage growth mechanism if your product actually solves a real problem. They earned the right to be controversial because the pain they address is real and widely felt.",
                    },
                    {
                      point: "The pivot timing",
                      body: "Moving from 'cheat tool' to 'AI meeting assistant' language before the interview use case became their ceiling shows self-awareness. The window to do this cleanly is short — they seem to be moving at the right time.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="rounded-xl p-5"
                      style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
                      <p className="font-semibold mb-2">{item.point}</p>
                      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{item.body}</p>
                    </div>
                  ))}
                </div>

                <p className="font-semibold mb-3">What I&apos;d do differently</p>
                <div className="space-y-3 mb-8">
                  {[
                    {
                      point: "Kill the 'cheat' framing faster",
                      body: "The viral moment was built on cheating. But enterprise doesn't buy from brands associated with misconduct. I'd have a hard brand cutover to 'ambient AI assistant' within 6 months of launch and let the founding story become lore, not positioning.",
                    },
                    {
                      point: "Build the retention loop in the product",
                      body: "Job seekers churn once hired. I'd build a 'career mode' that transitions users from 'use during interviews' to 'use during onboarding, performance reviews, and 1:1s' — extending the relationship past the job search.",
                    },
                    {
                      point: "Invest in the context layer as the moat",
                      body: "The invisibility tech is copyable. The context model — fine-tuned on millions of real interview and sales conversations — is not. I'd orient roadmap investment toward deepening context quality over adding new feature modes.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="rounded-xl p-5"
                      style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
                      <p className="font-semibold mb-2">{item.point}</p>
                      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{item.body}</p>
                    </div>
                  ))}
                </div>

                {/* The Big Bet */}
                <div className="rounded-xl p-6 mb-8"
                  style={{ background: "var(--accent-08)", border: "1px solid var(--accent)" }}>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-2"
                    style={{ color: "var(--accent-text)" }}>The Big Bet</p>
                  <p className="font-semibold text-lg mb-3">
                    Ambient AI becomes cognitively normalized — like GPS.
                  </p>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    We don&apos;t say we&apos;re &ldquo;cheating at navigation&rdquo; when we use Google Maps. If ambient
                    AI during conversations follows the same normalization curve, Cluely&apos;s entire
                    risk profile changes. The brand stops being a liability and becomes the pioneer
                    story. That bet depends more on culture than on product — and that makes it either
                    the biggest risk or the biggest tailwind, depending on which way the decade goes.
                  </p>
                </div>

                {/* Stat counters */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    {
                      target: 1,
                      suffix: " gap",
                      label: "Workflow timing gap",
                      note: "Only real-time in-conversation AI at launch",
                    },
                    {
                      target: 3,
                      suffix: "",
                      label: "User segments targeted",
                      note: "Interview → Sales → Meetings",
                    },
                    {
                      target: 5,
                      suffix: "",
                      label: "Growth loop steps",
                      note: "From provocation to viral success stories",
                    },
                  ].map((stat, i) => (
                    <div key={i} className="rounded-xl p-5 text-center"
                      style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
                      <p className="text-3xl font-bold mb-1" style={{ color: "var(--accent-text)" }}>
                        <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                      </p>
                      <p className="text-xs font-semibold mb-1">{stat.label}</p>
                      <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{stat.note}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </section>

          </main>
        </div>
      </div>
    </>
  );
}
