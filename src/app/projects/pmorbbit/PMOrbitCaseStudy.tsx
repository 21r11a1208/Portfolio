"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ReadingProgressBar } from "@/components/ui/ReadingProgressBar";
import { Tag } from "@/components/ui/Tag";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type ResultItem =
  | { type: "counter"; value: number; suffix?: string; label: string; sub?: string }
  | { type: "before-after"; before: string; after: string; label: string };

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

const TOC_ITEMS = [
  { id: "overview",  label: "Overview"   },
  { id: "context",   label: "Context"    },
  { id: "role",      label: "My Role"    },
  { id: "discovery", label: "Discovery"  },
  { id: "insights",  label: "Insights"   },
  { id: "solution",  label: "Solution"   },
  { id: "decision",  label: "Hard Call"  },
  { id: "results",   label: "Results"    },
  { id: "learnings", label: "Learnings"  },
];

const DISCOVERY_ITEMS = [
  {
    method: "User Interviews",
    summary: "4 weeks · PMO leads, PMs, and 2 executive stakeholders",
    findings: [
      `Every stakeholder spent significant time weekly collecting information that should have been automatic — PMO leads described themselves as "a human API between five tools."`,
      "Stakeholders had stopped trusting spreadsheet data. Before any status meeting, someone spent 30 minutes verifying numbers.",
      "Existing tools had already been tried and abandoned: Jira was too engineering-centric, Monday too lightweight for RAID complexity. Neither served executives.",
    ],
  },
  {
    method: "Funnel & Usage Analysis",
    summary: "End-to-end audit from new initiative to executive report",
    findings: [
      "RAID logs required manual entry for risks and issues that already existed as email threads — logs were always 2–3 days behind reality.",
      "Executive PDF reports were assembled manually each week across 4 sources, formatted in PowerPoint, then exported. ~2 hours per report, every Friday.",
    ],
  },
  {
    method: "Stakeholder Workshops",
    summary: "Group sessions to surface priorities and alignment gaps",
    findings: [
      `Different roles had fundamentally different definitions of "project health" — aligning on shared language was itself a product challenge.`,
      "There was no agreed process for RAID escalation. Each PM handled it differently. Any tooling would need to enforce a workflow, not just record data.",
    ],
  },
  {
    method: "Competitive Analysis",
    summary: "Jira, Monday.com, Smartsheet, Microsoft Project, enterprise PMO tools",
    findings: [
      "No tool in the market served all four user types (PMO leads, PMs, Scrum Masters, executives) from a single interface.",
      "Most tools optimised for one persona and left others underserved — creating the translation-layer problem users were already experiencing.",
    ],
  },
];

const FEATURES = [
  {
    title: "Role-Aware Dashboards",
    tag: "Core",
    description:
      "On login, each user lands on a dashboard configured for their role. PMO leads see portfolio health and delivery velocity. PMs see active projects, RAID items, and milestones. Executives get a clean summary — no noise, just signal. No configuration required.",
    insight:
      "The initial instinct was a single universal dashboard. After two rounds of feedback, it was clear that a PMO lead's 9am view has nothing in common with what an exec needs before a board call.",
  },
  {
    title: "Automated RAID Logs",
    tag: "Core",
    description:
      "RAID entries are structured, timestamped, and tied to specific projects with assigned owners. The log shows what changed, when, and who changed it — auditable by design. This directly addressed the trust problem: stakeholders could see the history of every entry, not just its current state.",
    insight:
      "Stakeholders had stopped trusting spreadsheet data because anyone could edit it without a trace. Every automated action in PMOrbit is logged with a timestamp and actor.",
  },
  {
    title: "PDF Reporting",
    tag: "Reporting",
    description:
      "Every Friday, the system automatically snapshots project health across the portfolio. Snapshots are stored for historical comparison. Executives generate a formatted, multi-page PDF with one click — replacing a 2-hour weekly ritual with a 2-minute task.",
    insight:
      "The Friday afternoon reporting ritual was the clearest quantifiable pain point from discovery. Eliminating it was the single strongest adoption driver — execs saw immediate, concrete value on day one.",
  },
  {
    title: "AskOrbit — AI Assistant",
    tag: "AI",
    description:
      `An embedded AI chatbot that answers project health questions in natural language. "What's the status of Project X?" returns an immediate answer instead of requiring navigation through multiple screens. Connects to TFS and ECR datasets to surface rollback steps and post-implementation validations.`,
    insight:
      `The most common PMO support request was "What's the status of X?" Shipping a constrained version — status queries only — eliminated an entire category of interruptions from sprint one.`,
  },
];

const INSIGHTS = [
  {
    number: "01",
    title: "The real cost is the translation layer",
    body: "PMs weren't struggling because existing tools were bad. They were struggling because no tool spoke to all their stakeholders, so humans became the translation layer between tools. The product needed to eliminate that layer, not replace one tool with another.",
  },
  {
    number: "02",
    title: "Role-aware defaults beat feature completeness",
    body: "What a PMO lead needs on their screen at 9am is completely different from what an executive needs before a board call. A generic dashboard serves no one well. The product had to know who you were and surface the right things first.",
  },
  {
    number: "03",
    title: "Automation earns trust only when it's auditable",
    body: "Stakeholders had stopped trusting spreadsheet data precisely because anyone could edit it without a trace. Any automation we built needed to be transparent about what it did and when — otherwise we'd replace one trust problem with another.",
  },
];

const RESULTS: ResultItem[] = [
  { type: "counter",      value: 5,   suffix: "+", label: "hours saved per PM per week",      sub: "on status assembly and reporting"             },
  { type: "before-after", before: "2 hrs", after: "~2 min", label: "Executive PDF report generation" },
  { type: "counter",      value: 95,  suffix: "%", label: "faster dashboard load times",       sub: "from 8s+ to under 500ms"                      },
  { type: "counter",      value: 40,  suffix: "%", label: "reduction in handoff friction",     sub: "across sprint cycles, measured via survey"     },
  { type: "counter",      value: 100, suffix: "%", label: "delivery reliability restored",     sub: "on notification workflows"                     },
];

const LEARNINGS = [
  {
    title: "Instrument earlier",
    body: "We had good qualitative signal from interviews but almost no quantitative data in the first three months of production. That made prioritisation harder than it needed to be — I was making calls based on stakeholder feedback alone, without usage data to validate or challenge it. I'd ship telemetry alongside the first feature, not as an afterthought in month four.",
  },
  {
    title: "Build the change management plan before the product",
    body: `The hardest part of this project wasn't building the features — it was getting the team to trust a new system over the spreadsheets they knew. Every release required a short demo and a clear answer to "what's in it for me?" A structured rollout plan from the start — champions in each team, guided onboarding, an explicit deprecation timeline for old spreadsheets — would have accelerated adoption significantly.`,
  },
  {
    title: "Scope AskOrbit as a product from the start",
    body: "We built AskOrbit as a feature and it quickly grew to feel like its own product — with its own user needs, failure modes, and feedback loop. It warranted its own discovery sprint. I'd treat it as a product-within-a-product from day one, with a dedicated scope and a clearer definition of what it should and shouldn't answer.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Micro-components
// ─────────────────────────────────────────────────────────────────────────────

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const steps = 50;
    const duration = 1400;
    const step = to / steps;
    const intervalMs = duration / steps;
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, to);
      setCount(Math.round(current));
      if (current >= to) clearInterval(timer);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [isInView, to]);

  return <span ref={ref} className="tabular-nums">{count}{suffix}</span>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-display uppercase tracking-[0.15em] text-[var(--accent-text)] mb-3 opacity-75">
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl md:text-3xl font-display font-bold text-[var(--text)] mb-6 leading-tight">
      {children}
    </h2>
  );
}

function Divider() {
  return <div className="h-px bg-[var(--border)] w-full" />;
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────

export function PMOrbitCaseStudy() {
  const [activeSection, setActiveSection] = useState("overview");
  const [openDiscovery, setOpenDiscovery] = useState<number | null>(null);
  const [activeFeature, setActiveFeature]  = useState(0);
  const [decisionOpen, setDecisionOpen]    = useState(false);

  // Scroll-spy for TOC
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    TOC_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-25% 0px -65% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <>
      <ReadingProgressBar />

      {/* ── Fixed TOC — right side, xl+ screens ───────────────────────── */}
      <nav
        aria-label="Page sections"
        className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-1"
      >
        {TOC_ITEMS.map(({ id, label }) => {
          const active = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              data-cursor="hover"
              className={`flex items-center gap-2.5 py-0.5 transition-all duration-200 ${active ? "opacity-100" : "opacity-25 hover:opacity-55"}`}
            >
              <span className={`text-[11px] font-body transition-colors duration-200 ${active ? "text-[var(--text)]" : "text-[var(--text-40)]"}`}>
                {label}
              </span>
              <span className={`h-px shrink-0 transition-all duration-300 ${active ? "w-5 bg-[var(--accent)]" : "w-2 bg-[var(--text-30)]"}`} />
            </button>
          );
        })}
      </nav>

      {/* ── Page header ───────────────────────────────────────────────── */}
      <header className="mb-16 pb-12 border-b border-[var(--border)]">
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-3 mb-6"
        >
          <Tag variant="type">Case Study</Tag>
          <span className="text-[10px] font-body uppercase tracking-wider text-[var(--accent-text)]">Production</span>
          <span className="text-[10px] font-body text-[var(--text-30)] uppercase tracking-wider">10 min read</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-4xl md:text-5xl font-display font-bold text-[var(--text)] leading-tight mb-4"
        >
          PMOrbit
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg font-body text-[var(--text-55)] leading-relaxed max-w-2xl"
        >
          Built a production project management platform from 0 to 1 for PMO leads and executive leadership at RealPage.
        </motion.p>
      </header>

      <div className="space-y-24">

        {/* ── OVERVIEW ──────────────────────────────────────────────────── */}
        <section id="overview">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="relative p-6 md:p-8 rounded-2xl border border-[var(--accent-25)] bg-[var(--surface)] overflow-hidden"
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(circle at 10% 50%, rgba(200,240,96,0.05) 0%, transparent 60%)" }}
            />
            <p className="text-[11px] font-display uppercase tracking-[0.15em] text-[var(--accent-text)] mb-4 opacity-75">
              TL;DR
            </p>
            <p className="font-body text-[var(--text-65)] leading-relaxed relative z-10">
              RealPage&apos;s PMO team was managing a growing portfolio of enterprise projects
              across spreadsheets, email threads, and five disconnected tools. I designed
              and co-built PMOrbit — a role-aware portfolio management platform — from zero
              to production. It eliminated{" "}
              <strong className="text-[var(--text)]">5+ hours of weekly reporting per PM</strong>,
              cut PDF report generation from{" "}
              <strong className="text-[var(--text)]">2 hours to one click</strong>, and is
              actively used in production today.
            </p>
          </motion.div>
        </section>

        <Divider />

        {/* ── CONTEXT ───────────────────────────────────────────────────── */}
        <section id="context">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>Background</SectionLabel>
            <SectionTitle>Context</SectionTitle>

            <p className="font-body text-[var(--text-65)] leading-relaxed mb-4">
              RealPage is an enterprise software company serving the real estate industry.
              Its internal PMO oversees a portfolio of concurrent technology projects spanning
              multiple business units — each with its own stakeholders, dependencies, and
              delivery timelines.
            </p>
            <p className="font-body text-[var(--text-65)] leading-relaxed mb-8">
              When I joined, the team had no dedicated tooling. Project health lived in
              spreadsheets. Status updates travelled by email. RAID logs were maintained
              manually in shared documents that quickly fell out of date. Executive reporting
              required a PMO lead to spend a full afternoon each week assembling slides
              from multiple sources — every single week.
            </p>

            {/* Before-state cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: "Spreadsheets",        sub: "Project health & RAID logs"     },
                { label: "Email threads",        sub: "Status updates & escalations"   },
                { label: "5 disconnected tools", sub: "No single source of truth"      },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4 }}
                  className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex flex-col gap-1.5"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-red-400 text-xs leading-none">✕</span>
                    <span className="text-sm font-display font-semibold text-[var(--text-65)]">{item.label}</span>
                  </div>
                  <p className="text-[11px] font-body text-[var(--text-35)] leading-snug">{item.sub}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <Divider />

        {/* ── MY ROLE ───────────────────────────────────────────────────── */}
        <section id="role">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>Contribution</SectionLabel>
            <SectionTitle>My Role</SectionTitle>

            <p className="font-body text-[var(--text-65)] leading-relaxed mb-4">
              I was the solo PM and a contributing builder on this project. I ran all
              product discovery, defined requirements, made prioritisation calls, and
              worked directly in the codebase alongside the engineering team throughout
              the build.
            </p>
            <p className="font-body text-[var(--text-65)] leading-relaxed mb-8">
              This gave me an unusually tight feedback loop: I could validate assumptions
              by shipping a change and observing behaviour the same day, rather than
              waiting for sprint reviews.
            </p>

            <div className="flex flex-wrap gap-2">
              {[
                "Product Discovery",
                "Requirements",
                "Prioritisation",
                "Roadmapping",
                "Frontend (React / TypeScript)",
                "Backend (.NET Core)",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-full text-[12px] font-body bg-[var(--surface)] border border-[var(--border)] text-[var(--text-55)]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </section>

        <Divider />

        {/* ── DISCOVERY ─────────────────────────────────────────────────── */}
        <section id="discovery">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>Research</SectionLabel>
            <SectionTitle>Discovery</SectionTitle>

            <p className="font-body text-[var(--text-65)] leading-relaxed mb-8">
              Before writing a single requirement, I ran four weeks of structured
              discovery across four methods. Expand each to see what we found.
            </p>

            <div className="space-y-3">
              {DISCOVERY_ITEMS.map((item, i) => {
                const isOpen = openDiscovery === i;
                return (
                  <motion.div
                    key={i}
                    layout
                    className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenDiscovery(isOpen ? null : i)}
                      data-cursor="hover"
                      className="w-full flex items-center justify-between px-5 py-4 text-left group"
                    >
                      <div>
                        <p className="text-sm font-display font-semibold text-[var(--text)] group-hover:text-[var(--accent-text)] transition-colors duration-200">
                          {item.method}
                        </p>
                        <p className="text-[11px] font-body text-[var(--text-35)] mt-0.5">{item.summary}</p>
                      </div>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-[var(--text-40)] text-xl font-light ml-4 shrink-0 leading-none"
                      >
                        +
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="body"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <div className="px-5 pb-5 pt-1 border-t border-[var(--border)]">
                            <ul className="space-y-3 mt-3">
                              {item.findings.map((f, j) => (
                                <li key={j} className="flex gap-3">
                                  <span className="text-[var(--accent-text)] shrink-0 text-sm mt-0.5">→</span>
                                  <p className="text-sm font-body text-[var(--text-65)] leading-relaxed">{f}</p>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>

        <Divider />

        {/* ── KEY INSIGHTS ──────────────────────────────────────────────── */}
        <section id="insights">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>Synthesis</SectionLabel>
            <SectionTitle>Key Insights</SectionTitle>
            <p className="font-body text-[var(--text-65)] leading-relaxed mb-8">
              Three insights from discovery shaped every major product decision that followed.
            </p>

            <div className="space-y-4">
              {INSIGHTS.map((insight, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.09 }}
                  className="group flex gap-5 p-5 md:p-6 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent-25)] transition-colors duration-300"
                >
                  <span className="text-2xl font-display font-bold text-[var(--accent-text)] opacity-30 shrink-0 leading-none mt-0.5 group-hover:opacity-60 transition-opacity duration-300">
                    {insight.number}
                  </span>
                  <div>
                    <h3 className="text-base font-display font-semibold text-[var(--text)] mb-2 group-hover:text-[var(--accent-text)] transition-colors duration-300">
                      {insight.title}
                    </h3>
                    <p className="text-sm font-body text-[var(--text-55)] leading-relaxed">{insight.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <Divider />

        {/* ── SOLUTION ──────────────────────────────────────────────────── */}
        <section id="solution">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>The Product</SectionLabel>
            <SectionTitle>Solution</SectionTitle>

            <p className="font-body text-[var(--text-65)] leading-relaxed mb-8">
              PMOrbit is a web-based portfolio management platform built on a .NET Core
              API with a React + TypeScript frontend. It serves four distinct user roles
              from a single application, each with a role-aware default view.
            </p>

            {/* Feature tab bar */}
            <div className="flex flex-wrap gap-2 mb-5">
              {FEATURES.map((f, i) => (
                <button
                  key={i}
                  onClick={() => setActiveFeature(i)}
                  data-cursor="hover"
                  className={`px-4 py-2 rounded-full text-[12px] font-display font-semibold border transition-all duration-200 ${
                    activeFeature === i
                      ? "bg-[var(--accent)] text-[var(--text-on-accent)] border-[var(--accent)]"
                      : "bg-transparent text-[var(--text-50)] border-[var(--border)] hover:border-[var(--accent-25)] hover:text-[var(--text)]"
                  }`}
                >
                  {f.title}
                </button>
              ))}
            </div>

            {/* Feature panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
                className="p-6 md:p-8 rounded-2xl bg-[var(--surface)] border border-[var(--border)]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-lg font-display font-semibold text-[var(--text)]">
                    {FEATURES[activeFeature].title}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-display font-bold bg-[var(--surface-2)] text-[var(--accent-text)] border border-[var(--accent-25)]">
                    {FEATURES[activeFeature].tag}
                  </span>
                </div>

                <p className="text-sm font-body text-[var(--text-65)] leading-relaxed mb-5">
                  {FEATURES[activeFeature].description}
                </p>

                <div className="pt-4 border-t border-[var(--border)]">
                  <p className="text-[10px] font-display uppercase tracking-[0.12em] text-[var(--accent-text)] mb-2 opacity-70">
                    Why this decision
                  </p>
                  <p className="text-sm font-body text-[var(--text-50)] leading-relaxed italic">
                    &ldquo;{FEATURES[activeFeature].insight}&rdquo;
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </section>

        <Divider />

        {/* ── HARDEST DECISION ──────────────────────────────────────────── */}
        <section id="decision">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>Trade-offs</SectionLabel>
            <SectionTitle>The Hardest Call: Scoping the MVP</SectionTitle>

            <p className="font-body text-[var(--text-65)] leading-relaxed mb-5">
              The first version of the backlog had 34 features. Every stakeholder had
              something they wanted at launch. Scoping the MVP was the hardest product
              decision I made, and the one I spent the most time defending.
            </p>

            {/* Expandable decision framework */}
            <motion.div
              layout
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden mb-6"
            >
              <button
                onClick={() => setDecisionOpen(!decisionOpen)}
                data-cursor="hover"
                className="w-full flex items-center justify-between px-5 py-4 text-left group"
              >
                <div>
                  <p className="text-sm font-display font-semibold text-[var(--text)] group-hover:text-[var(--accent-text)] transition-colors duration-200">
                    My prioritisation framework
                  </p>
                  <p className="text-[11px] font-body text-[var(--text-35)] mt-0.5">
                    The criteria I used to cut 34 features to an MVP
                  </p>
                </div>
                <motion.span
                  animate={{ rotate: decisionOpen ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-[var(--accent-text)] text-xl font-light ml-4 shrink-0 leading-none"
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {decisionOpen && (
                  <motion.div
                    key="framework"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="px-5 pb-5 pt-1 border-t border-[var(--border)]">
                      <p className="text-sm font-body text-[var(--text-65)] leading-relaxed mt-3 mb-4">
                        I mapped each requested feature against two axes. Features that scored
                        high on both made the cut. Everything else got a dated roadmap entry
                        so stakeholders knew it wasn&apos;t forgotten.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { label: "Axis 1", body: "How directly does it eliminate the assembly problem — the root cause?" },
                          { label: "Axis 2", body: "How many of the four user types does it serve?" },
                        ].map((ax) => (
                          <div key={ax.label} className="p-4 rounded-lg bg-[var(--surface-2)] border border-[var(--border)]">
                            <p className="text-[11px] font-display font-bold text-[var(--accent-text)] mb-1.5">{ax.label}</p>
                            <p className="text-xs font-body text-[var(--text-55)] leading-relaxed">{ax.body}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <p className="font-body text-[var(--text-65)] leading-relaxed mb-5">
              The hardest cut was the{" "}
              <strong className="text-[var(--text)]">document hub</strong>. PMO leads wanted
              it badly — a centralised repository for project artefacts and sign-offs. But
              it didn&apos;t address the core trust or assembly problem, and building it well
              would have delayed the dashboard and RAID log by two sprints. We shipped it
              in v1.1. The dashboard adoption created the forcing function for document hub
              adoption later.
            </p>
            <p className="font-body text-[var(--text-65)] leading-relaxed">
              I also decided to ship{" "}
              <strong className="text-[var(--text)]">AskOrbit as a constrained feature</strong>{" "}
              rather than scope it out entirely. The interview data was unambiguous: the
              most common PMO support request was &ldquo;What&apos;s the status of X?&rdquo; We launched
              with status queries only and expanded from there.
            </p>
          </motion.div>
        </section>

        <Divider />

        {/* ── RESULTS ───────────────────────────────────────────────────── */}
        <section id="results">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>Impact</SectionLabel>
            <SectionTitle>Results</SectionTitle>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {RESULTS.map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="p-5 md:p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent-25)] transition-colors duration-300"
                >
                  {r.type === "before-after" ? (
                    <>
                      <div className="flex items-baseline gap-3 mb-2">
                        <span className="text-2xl font-display font-bold text-[var(--text-35)] line-through decoration-red-400/60">
                          {r.before}
                        </span>
                        <span className="text-[var(--accent-text)]">→</span>
                        <span className="text-2xl font-display font-bold text-[var(--accent-text)]">
                          {r.after}
                        </span>
                      </div>
                      <p className="text-sm font-body text-[var(--text-55)]">{r.label}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-3xl md:text-4xl font-display font-bold text-[var(--accent-text)] mb-1">
                        <Counter to={r.value} suffix={r.suffix} />
                      </p>
                      <p className="text-sm font-body text-[var(--text-55)] leading-snug">{r.label}</p>
                      {r.sub && (
                        <p className="text-[11px] font-body text-[var(--text-35)] mt-1">{r.sub}</p>
                      )}
                    </>
                  )}
                </motion.div>
              ))}

              {/* Live in production badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: RESULTS.length * 0.07 }}
                className="sm:col-span-2 p-5 rounded-2xl border border-[var(--accent-25)] bg-[var(--surface)] flex items-center gap-4"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] shrink-0 animate-pulse" />
                <div>
                  <p className="text-sm font-display font-semibold text-[var(--text)]">
                    Live in production today
                  </p>
                  <p className="text-[11px] font-body text-[var(--text-40)] mt-0.5">
                    Actively used by PMO leads, project managers, and executive stakeholders at RealPage
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <Divider />

        {/* ── LEARNINGS ─────────────────────────────────────────────────── */}
        <section id="learnings">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>Retrospective</SectionLabel>
            <SectionTitle>What I&apos;d Do Differently</SectionTitle>

            <div className="space-y-8">
              {LEARNINGS.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.09 }}
                  className="flex gap-5"
                >
                  <span className="text-sm font-display font-bold text-[var(--accent-text)] opacity-50 shrink-0 mt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-base font-display font-semibold text-[var(--text)] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm font-body text-[var(--text-55)] leading-relaxed">{item.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

      </div>
    </>
  );
}
