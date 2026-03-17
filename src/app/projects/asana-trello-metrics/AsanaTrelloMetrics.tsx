"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReadingProgressBar } from "@/components/ui/ReadingProgressBar";
import { Tag } from "@/components/ui/Tag";

// ─── Types ────────────────────────────────────────────────────────────────────
interface RejectedMetric {
  metric: string;
  reason: string;
}

interface L2Category {
  label: string;
  color: string;
  metrics: string[];
}

interface Guardrail {
  label: string;
  description: string;
}

interface Signal {
  label: string;
  value: string;
  note: string;
  sentiment: "neutral" | "negative" | "positive";
}

interface ProductData {
  id: string;
  name: string;
  accentColor: string;
  goal: string;
  northStar: {
    metric: string;
    definition: string;
    why: string;
    tension?: string;
  };
  rejected: RejectedMetric[];
  tree: L2Category[];
  guardrails: Guardrail[];
  signals: Signal[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const PRODUCTS: ProductData[] = [
  {
    id: "asana",
    name: "Asana",
    accentColor: "#f06a6a",
    goal:
      "Asana wants to be the operating layer for how work gets done across teams — not just a task list, but the coordination system that replaces the status-update meeting. The metric question is: are we measuring tasks, or actual team coordination?",
    northStar: {
      metric: "Weekly Active Teams (WAT)",
      definition:
        "Teams with ≥2 members that complete ≥5 coordinated tasks through Asana in a rolling 7-day window.",
      why:
        "Asana's core value is coordination, not individual productivity. A team of 10 running their weekly cycles in Asana is worth orders of magnitude more than 10 individual users tracking personal to-dos. Weekly captures the natural rhythm of work — teams coordinate in weekly sprints, not daily or monthly cycles. The task completion floor (≥5) filters out ghost teams who open Asana but don't actually run work through it.",
    },
    rejected: [
      {
        metric: "Monthly Active Users",
        reason:
          "Users can log in, check a task, and leave without coordinating anything. An individual checking off a personal to-do doesn't represent the coordination value Asana's pricing and positioning is built on.",
      },
      {
        metric: "Tasks Created",
        reason:
          "Creating tasks without completing or coordinating them is a pure vanity metric. It measures input, not outcome. A team can create 100 tasks and abandon every one of them.",
      },
      {
        metric: "NPS",
        reason:
          "Sentiment without behavior. A team that rates Asana 9/10 but only opens it twice a month is not the retained customer the business needs. NPS tells you how people feel, not how they work.",
      },
      {
        metric: "ARR",
        reason:
          "Revenue is a lagging indicator by 6–12 months. By the time ARR drops, the coordination behavior you needed to protect disappeared long ago. Don't manage a leading problem with a lagging metric.",
      },
    ],
    tree: [
      {
        label: "Setup & Adoption",
        color: "#3b82f6",
        metrics: [
          "Team onboarding completion rate",
          "Workflow template adoption rate",
          "Cross-functional project participation rate",
          "First coordinated task completed within 7 days of signup",
        ],
      },
      {
        label: "Engagement Depth",
        color: "#a855f7",
        metrics: [
          "Tasks completed per active team per week",
          "Automation and rules setup rate",
          "Timeline and dependency usage rate",
          "Integration connections per workspace",
        ],
      },
      {
        label: "Retention & Expansion",
        color: "#22c55e",
        metrics: [
          "Team weekly return rate",
          "Feature depth score (# of feature categories used)",
          "Seat expansion within existing accounts",
          "Net Revenue Retention (NRR)",
        ],
      },
    ],
    guardrails: [
      {
        label: "Team quality floor",
        description:
          "Don't count teams where only 1 member is genuinely active. WAT requires real multi-person coordination — not solo users on team licenses. Track single-active-member teams separately as a churn risk signal.",
      },
      {
        label: "Board abandonment rate",
        description:
          "Projects set up but never actively used after week 1. A spike in WAT alongside a spike in abandonment means teams are trying and leaving, not converting. These two metrics should be read together.",
      },
      {
        label: "Template dependency ratio",
        description:
          "Teams using only pre-built templates without ever building custom workflows haven't internalized Asana into how they actually work. This is shallow adoption — it looks like engagement but doesn't retain.",
      },
    ],
    signals: [
      { label: "ARR (FY2024)", value: "~$721M", note: "Publicly reported", sentiment: "positive" },
      { label: "Revenue growth", value: "~10% YoY", note: "Down from 35% in FY2022", sentiment: "negative" },
      { label: "NRR direction", value: "Compressing", note: "Was >115%, now under pressure", sentiment: "negative" },
      { label: "Fastest-growing segment", value: ">$50K deals", note: "Moving upmarket intentionally", sentiment: "neutral" },
    ],
  },
  {
    id: "trello",
    name: "Trello",
    accentColor: "#0052cc",
    goal:
      "Trello has a dual mandate that creates real PM tension: maximize collaborative board usage among individuals and SMBs, while also serving as an Atlassian ecosystem entry point. These goals can conflict — optimizing for one can hurt the other. I'd surface this before agreeing to any single north star.",
    northStar: {
      metric: "Weekly Active Collaborative Boards (WACB)",
      definition:
        "Boards with ≥2 members that have at least one card movement, comment, or new card in a 7-day window.",
      why:
        "Trello's value is the shared visual Kanban — not personal to-do lists. The ≥2 member requirement filters out solo use cases that don't represent Trello's core value prop. Card movement is the key signal: a Kanban board where nothing moves is a board that isn't working. Comments and new cards are secondary signals of live collaboration.",
      tension:
        "If Trello's real job-to-be-done for Atlassian is ecosystem entry, the north star should be 'Trello teams that adopt a second Atlassian product.' I'd surface this conflict explicitly and align with leadership before committing to either metric. Picking the wrong north star optimizes for the wrong outcome — even if both look healthy on a dashboard.",
    },
    rejected: [
      {
        metric: "Total Boards Created",
        reason:
          "Boards are almost never deleted. This number increases monotonically regardless of active usage. It's a counter, not a health metric. You can't manage what you can't act on.",
      },
      {
        metric: "Registered Users",
        reason:
          "Trello has 50M+ registered users. A fraction are genuinely active. This metric flatters the product while hiding the real engagement story — and it's the number most often cited in press releases for exactly that reason.",
      },
      {
        metric: "Power-Ups Installed",
        reason:
          "Installing a Power-Up takes two clicks. Using it requires behavioral change. Installed ≠ valuable. Tracking installs while ignoring active usage creates a false picture of feature success.",
      },
      {
        metric: "Free-to-Paid Conversion Rate",
        reason:
          "Optimizing this in isolation could push the team to degrade the free experience to force upgrades — killing the top of the funnel that makes Trello's ecosystem play work for Atlassian. Context matters: this is a supporting metric, not a north star.",
      },
    ],
    tree: [
      {
        label: "Collaboration Signal",
        color: "#3b82f6",
        metrics: [
          "Member invite rate per new board",
          "Multi-member board ratio (% of total boards)",
          "Board template adoption rate",
          "First invite sent within 24h of board creation",
        ],
      },
      {
        label: "Kanban Engagement",
        color: "#a855f7",
        metrics: [
          "Card move frequency per board per week",
          "Multi-list usage ratio (boards with ≥3 lists)",
          "Comment and attachment frequency",
          "Power-up active usage rate (not just installed)",
        ],
      },
      {
        label: "Retention & Ecosystem",
        color: "#22c55e",
        metrics: [
          "Board return rate (members returning weekly)",
          "Free-to-paid conversion rate",
          "Second Atlassian product adoption rate",
          "Jira–Trello integration usage rate",
        ],
      },
    ],
    guardrails: [
      {
        label: "Solo board ratio",
        description:
          "If >60% of 'active' boards have only 1 genuinely active member, WACB is inflated. Track solo-active boards separately — they represent personal use, not the collaborative value Trello's positioning and pricing depend on.",
      },
      {
        label: "Board stagnation rate",
        description:
          "Boards where no cards have moved in 14+ days but are still counted as 'active' due to recent logins. A stagnant board is a soon-to-be-abandoned board. Catching this early is how you trigger re-engagement campaigns before churn.",
      },
      {
        label: "Atlassian cross-sell at the cost of WACB",
        description:
          "If cross-sell rate increases while WACB falls, Trello is being hollowed out to serve Jira's funnel. Both should grow together — one declining for the other is a failure mode, not a success story.",
      },
    ],
    signals: [
      { label: "Registered users", value: "50M+", note: "Active base significantly smaller", sentiment: "neutral" },
      { label: "Product velocity", value: "Declining", note: "Fewer major releases post-acquisition", sentiment: "negative" },
      { label: "Atlassian treatment", value: "Bundled", note: "Metrics absorbed into 'team collab'", sentiment: "negative" },
      { label: "Competitive pressure", value: "High", note: "Notion, ClickUp, Linear taking share", sentiment: "negative" },
    ],
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export function AsanaTrelloMetrics() {
  const [activeTab, setActiveTab] = useState<"asana" | "trello">("asana");
  const product = PRODUCTS.find((p) => p.id === activeTab)!;

  const sentimentColor = (s: Signal["sentiment"]) => {
    if (s === "positive") return "#22c55e";
    if (s === "negative") return "#ef4444";
    return "var(--text-secondary)";
  };

  return (
    <>
      <ReadingProgressBar />
      <div className="min-h-screen" style={{ background: "var(--surface)", color: "var(--text-primary)" }}>

        {/* ── Hero ── */}
        <div style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--border)" }}>
          <div className="max-w-3xl mx-auto px-6 py-16">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <Tag variant="type">Metrics</Tag>
              <Tag variant="default">Conceptual</Tag>
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-3">Asana &amp; Trello — Metrics</h1>
            <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
              A focused PM metrics exercise: north star definition, supporting hierarchy, explicit
              rejections, and guardrails for two products solving collaborative work management in
              fundamentally different ways.
            </p>
            <p className="mt-4 text-sm italic" style={{ color: "var(--text-secondary)" }}>
              This is not an endorsement of how either company actually measures itself — it&apos;s how
              I&apos;d think through the metric question if asked in an interview or brought onto the team.
            </p>
          </div>
        </div>

        {/* ── Tab Bar ── */}
        <div
          className="sticky top-0 z-20"
          style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--border)" }}
        >
          <div className="max-w-3xl mx-auto px-6">
            <div className="flex gap-1 py-3">
              {PRODUCTS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActiveTab(p.id as "asana" | "trello")}
                  className="px-5 py-2 rounded-lg text-sm font-semibold transition-all"
                  style={{
                    background: activeTab === p.id ? "var(--accent-08)" : "transparent",
                    color: activeTab === p.id ? "var(--accent-text)" : "var(--text-secondary)",
                    border: activeTab === p.id ? "1px solid var(--accent)" : "1px solid transparent",
                  }}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="max-w-3xl mx-auto px-6 py-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.2 }}
              className="space-y-14"
            >

              {/* ── 1. The Goal ── */}
              <section>
                <p className="text-xs font-semibold uppercase tracking-widest mb-1"
                  style={{ color: "var(--accent-text)" }}>Step 1</p>
                <h2 className="text-2xl font-bold mb-4">The Goal</h2>
                <div className="rounded-xl p-5"
                  style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
                  <p style={{ color: "var(--text-secondary)" }}>{product.goal}</p>
                </div>
              </section>

              {/* ── 2. North Star Metric ── */}
              <section>
                <p className="text-xs font-semibold uppercase tracking-widest mb-1"
                  style={{ color: "var(--accent-text)" }}>Step 2</p>
                <h2 className="text-2xl font-bold mb-4">North Star Metric</h2>

                {/* NS Callout */}
                <div className="rounded-xl p-6 mb-4"
                  style={{ background: "var(--accent-08)", border: "1px solid var(--accent)" }}>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-2"
                    style={{ color: "var(--accent-text)" }}>North Star</p>
                  <p className="text-2xl font-bold mb-3">{product.northStar.metric}</p>
                  <div className="rounded-lg p-3 mb-4"
                    style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
                    <p className="text-xs uppercase tracking-wide mb-1"
                      style={{ color: "var(--text-secondary)" }}>Definition</p>
                    <p className="text-sm font-medium">{product.northStar.definition}</p>
                  </div>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    {product.northStar.why}
                  </p>
                </div>

                {/* Tension callout (Trello only) */}
                {product.northStar.tension && (
                  <div className="rounded-xl p-5"
                    style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.3)" }}>
                    <p className="text-xs font-semibold uppercase tracking-widest mb-2"
                      style={{ color: "#f59e0b" }}>Dual-Mandate Tension</p>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                      {product.northStar.tension}
                    </p>
                  </div>
                )}
              </section>

              {/* ── 3. Metrics Hierarchy ── */}
              <section>
                <p className="text-xs font-semibold uppercase tracking-widest mb-1"
                  style={{ color: "var(--accent-text)" }}>Step 3</p>
                <h2 className="text-2xl font-bold mb-2">Metrics Hierarchy</h2>
                <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
                  The metrics that feed into the north star, organized by what they measure and when
                  they signal a problem.
                </p>

                {/* NS box */}
                <div className="flex justify-center mb-0">
                  <div
                    className="rounded-lg px-6 py-3 text-sm font-semibold text-center"
                    style={{
                      background: "var(--accent-08)",
                      border: "1px solid var(--accent)",
                      color: "var(--accent-text)",
                      maxWidth: "320px",
                      width: "100%",
                    }}
                  >
                    {product.northStar.metric}
                  </div>
                </div>

                {/* Connector */}
                <div className="flex justify-center">
                  <div style={{ width: 1, height: 24, background: "var(--border)" }} />
                </div>
                <div className="flex justify-center mb-0">
                  <div
                    style={{
                      width: "66%",
                      height: 1,
                      background: "var(--border)",
                    }}
                  />
                </div>
                {/* Branch stubs */}
                <div className="flex justify-between px-[17%] mb-0">
                  {product.tree.map((col) => (
                    <div key={col.label} style={{ width: 1, height: 20, background: "var(--border)" }} />
                  ))}
                </div>

                {/* L2 columns */}
                <div className="grid grid-cols-3 gap-3">
                  {product.tree.map((col) => (
                    <div
                      key={col.label}
                      className="rounded-xl overflow-hidden"
                      style={{ border: "1px solid var(--border)" }}
                    >
                      <div
                        className="px-4 py-2.5"
                        style={{ background: `${col.color}18`, borderBottom: `2px solid ${col.color}40` }}
                      >
                        <p className="text-xs font-bold uppercase tracking-wide"
                          style={{ color: col.color }}>{col.label}</p>
                      </div>
                      <ul className="p-3 space-y-2" style={{ background: "var(--surface-2)" }}>
                        {col.metrics.map((m, i) => (
                          <li key={i} className="flex gap-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                            <span style={{ color: col.color, flexShrink: 0 }}>›</span>
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── 4. What I'd NOT Measure ── */}
              <section>
                <p className="text-xs font-semibold uppercase tracking-widest mb-1"
                  style={{ color: "var(--accent-text)" }}>Step 4</p>
                <h2 className="text-2xl font-bold mb-2">What I&apos;d NOT Measure</h2>
                <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
                  Explicit rejections matter as much as what you pick. A bad north star optimizes for
                  the wrong thing — often while looking great on a dashboard.
                </p>

                <div className="space-y-3">
                  {product.rejected.map((r, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07 }}
                      className="rounded-xl p-5 flex gap-4"
                      style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
                    >
                      <span
                        className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ background: "rgba(239,68,68,0.12)", color: "#ef4444" }}
                      >
                        ✕
                      </span>
                      <div>
                        <p className="font-semibold mb-1">{r.metric}</p>
                        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{r.reason}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* ── 5. Guardrails ── */}
              <section>
                <p className="text-xs font-semibold uppercase tracking-widest mb-1"
                  style={{ color: "var(--accent-text)" }}>Step 5</p>
                <h2 className="text-2xl font-bold mb-2">Guardrail Metrics</h2>
                <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
                  Counter-metrics that prevent gaming the north star. Every metric can be gamed —
                  guardrails are how you make gaming visible.
                </p>

                <div className="space-y-3">
                  {product.guardrails.map((g, i) => (
                    <div
                      key={i}
                      className="rounded-xl p-5"
                      style={{
                        background: "rgba(245,158,11,0.05)",
                        border: "1px solid rgba(245,158,11,0.2)",
                      }}
                    >
                      <p className="font-semibold mb-1" style={{ color: "#f59e0b" }}>⚠ {g.label}</p>
                      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{g.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── 6. Live Signals ── */}
              <section>
                <p className="text-xs font-semibold uppercase tracking-widest mb-1"
                  style={{ color: "var(--accent-text)" }}>Step 6</p>
                <h2 className="text-2xl font-bold mb-2">Live Signals</h2>
                <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
                  Public data points that inform how the north star is likely trending — and what
                  questions I&apos;d be asking if I were on the team.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {product.signals.map((s, i) => (
                    <div
                      key={i}
                      className="rounded-xl p-5"
                      style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
                    >
                      <p className="text-xs uppercase tracking-wide mb-1"
                        style={{ color: "var(--text-secondary)" }}>{s.label}</p>
                      <p className="text-xl font-bold mb-1"
                        style={{ color: sentimentColor(s.sentiment) }}>{s.value}</p>
                      <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{s.note}</p>
                    </div>
                  ))}
                </div>
              </section>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
