"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ReadingProgressBar } from "@/components/ui/ReadingProgressBar";
import { Tag } from "@/components/ui/Tag";

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

const TOC = [
  { id: "overview",      label: "Overview"      },
  { id: "problem",       label: "Problem"        },
  { id: "users",         label: "Users"          },
  { id: "features",      label: "Features"       },
  { id: "architecture",  label: "Architecture"   },
  { id: "metrics",       label: "Metrics"        },
  { id: "roadmap",       label: "Roadmap"        },
  { id: "risks",         label: "Risks"          },
];

const PROBLEMS = [
  {
    title: "Multi-platform management chaos",
    impact: "20–30 hrs/week",
    impactLabel: "wasted on admin",
    body: "Property managers manually sync bookings across Airbnb, Vrbo, and direct channels. Spreadsheets, multiple logins, no single truth. Data inconsistency is the default state — not the exception.",
  },
  {
    title: "Double booking crisis",
    impact: "$500–2,000",
    impactLabel: "lost per incident",
    body: "Accidental double bookings trigger financial penalties from platforms (50–100% of first night), cancellations, and lasting reputation damage. Manual calendar checking is the current solution — which is no solution at all.",
  },
  {
    title: "Inefficient staff management",
    impact: "30%",
    impactLabel: "higher turnover",
    body: "Manual scheduling and task assignment leads to suboptimal resource allocation and overburdened staff. Managers have no visibility into availability or performance until something goes wrong.",
  },
  {
    title: "Guest communication bottleneck",
    impact: "5–10 hrs/week",
    impactLabel: "answering repeat questions",
    body: "Repetitive guest inquiries — check-in time, WiFi, parking — consume hours of manager time. During peak seasons, questions go unanswered, review scores drop, repeat bookings disappear.",
  },
  {
    title: "No business intelligence",
    impact: "15–25%",
    impactLabel: "revenue left on the table",
    body: "No real-time insight into property performance. No demand forecasting. Pricing is based on feel, not data. Owners can't identify optimisation opportunities until they show up as empty nights.",
  },
];

const PERSONAS = [
  {
    name: "Sarah",
    role: "Small Property Owner",
    scale: "2–3 properties",
    experience: "2–5 years",
    goals: ["Maximise booking rate and revenue", "Reduce time spent on management", "Avoid double bookings at all costs"],
    pains: ["Manually checking multiple platforms daily", "Dealing with guest questions at all hours", "No visibility into performance metrics"],
    quote: "I spend more time managing bookings than enjoying my properties. I need something that just works.",
  },
  {
    name: "Marcus",
    role: "Professional Property Manager",
    scale: "15–50 properties",
    experience: "10+ years",
    goals: ["Scale without proportional cost increase", "Optimise staff utilisation", "Increase margins by 10–15%"],
    pains: ["Manual booking sync causes costly errors", "Staff scheduling inefficiency", "No real-time performance visibility"],
    quote: "I need visibility into what's happening across all my properties in real-time. Manual processes are killing my margins.",
  },
  {
    name: "Elena",
    role: "Hospitality Company Ops Manager",
    scale: "100–500 properties",
    experience: "15+ years, 20–100 staff",
    goals: ["Standardise operations across all properties", "Ensure regulatory compliance", "Provide a growth platform for the team"],
    pains: ["Managing complex workflows at scale", "Staff training and performance management", "Integration with existing enterprise systems"],
    quote: "We need an enterprise solution that scales with our business and integrates with our existing infrastructure.",
  },
  {
    name: "David",
    role: "Tech-Focused Owner",
    scale: "5–20 properties",
    experience: "3–8 years, engineering background",
    goals: ["Leverage AI for competitive advantage", "Automate 90%+ of operational tasks", "Full API access for custom integrations"],
    pains: ["Existing tools lack AI capabilities", "No ML-based recommendations", "Wants detailed performance insights"],
    quote: "I want AI doing the work for me. Give me the tools and APIs, and I'll build amazing automations.",
  },
];

type FeatureStatus = "Complete" | "In Progress" | "Planned";

const FEATURES: { title: string; status: FeatureStatus; priority: string; description: string; acceptance: string[] }[] = [
  {
    title: "Unified Booking Calendar",
    status: "Complete",
    priority: "P0",
    description: "Single calendar syncing Airbnb, Vrbo, and direct bookings with real-time conflict detection. Bidirectional sync with <5 minute frequency and 99% accuracy. Manual override with full audit trail.",
    acceptance: [
      "Zero overlapping bookings for same property",
      "Conflict detection and rejection with manager notification",
      "Preview of conflicts before booking acceptance",
      "Cross-platform sync < 5 minutes, 99% accuracy",
    ],
  },
  {
    title: "AI Guest Chatbot",
    status: "Complete",
    priority: "P0",
    description: "24/7 AI chatbot that handles 80% of guest inquiries automatically using natural language understanding. Context-aware responses using booking history. Escalates complex issues to staff. Multi-language: EN, ES, FR.",
    acceptance: [
      "80% of common inquiries handled without staff involvement",
      "Escalation path for complex or sensitive issues",
      "Conversation history and analytics",
      "Human staff override at any point",
    ],
  },
  {
    title: "Staff & Task Management",
    status: "Complete",
    priority: "P0",
    description: "Complete staff management with AI-powered task assignment. Cleaning tasks auto-created on booking confirmation. Assignment based on availability, skills, and proximity. Full performance tracking.",
    acceptance: [
      "Automatic cleaning task creation on booking confirmation",
      "AI-optimised assignment based on skills and availability",
      "Task status tracking: assigned → in-progress → completed",
      "Staff performance metrics and ratings",
    ],
  },
  {
    title: "Access Code Management",
    status: "In Progress",
    priority: "P0",
    description: "Smart lock access code generation and distribution. Unique codes per booking, auto-generated on confirmation. SMS/email delivery to guests. Codes expire at check-out. Emergency override codes for staff.",
    acceptance: [
      "Unique code generated per booking automatically",
      "SMS and email delivery to guest on confirmation",
      "Code expiry aligned to check-out timestamp",
      "Audit trail of all code accesses",
    ],
  },
  {
    title: "Analytics Dashboard",
    status: "In Progress",
    priority: "P1",
    description: "Real-time occupancy rates, revenue tracking, ADR calculation, and booking funnel analytics. Predictive ML models for demand forecasting (7/30/90-day). Price optimisation recommendations. Target model accuracy: 85%+.",
    acceptance: [
      "Live occupancy and revenue dashboard",
      "Revenue forecasting with 85%+ model accuracy",
      "Price optimisation recommendations",
      "Export to PDF and CSV",
    ],
  },
];

const METRICS = [
  { type: "counter" as const, value: 80,  suffix: "%",  label: "guest inquiries automated by AI chatbot"     },
  { type: "counter" as const, value: 20,  suffix: "+",  label: "hours saved per manager per week"            },
  { type: "counter" as const, value: 0,   suffix: "",   label: "double bookings — 100% prevention target"    },
  { type: "counter" as const, value: 99,  suffix: ".9%",label: "platform uptime SLA"                         },
  { type: "counter" as const, value: 45,  suffix: "+",  label: "Net Promoter Score target"                   },
  { type: "counter" as const, value: 5,   suffix: "K+", label: "active users target by Q4 2026"              },
];

const ROADMAP = [
  {
    phase: "Phase 1",
    title: "MVP",
    period: "Q2 2026",
    status: "Complete" as FeatureStatus,
    progress: 90,
    items: ["Multi-platform booking sync", "Double booking prevention", "AI guest chatbot", "Staff & task management", "Real-time via Socket.io"],
  },
  {
    phase: "Phase 2",
    title: "Expansion",
    period: "Q2–Q3 2026",
    status: "Planned" as FeatureStatus,
    progress: 0,
    items: ["AI-powered staff assignment", "Predictive revenue forecasting", "Mobile app (iOS/Android)", "Payment processing", "SSO + white-labelling"],
  },
  {
    phase: "Phase 3",
    title: "Optimisation",
    period: "Q3–Q4 2026",
    status: "Planned" as FeatureStatus,
    progress: 0,
    items: ["ML price optimisation", "Demand forecasting 90%+ accuracy", "Multi-language (5+ languages)", "Accounting software integrations"],
  },
  {
    phase: "Phase 4",
    title: "Scale",
    period: "2027",
    status: "Planned" as FeatureStatus,
    progress: 0,
    items: ["Enterprise features + white-label", "Corporate housing management", "Custom workflow builder", "10,000+ users target"],
  },
];

const RISKS = [
  {
    title: "Double booking prevention failure",
    probability: "Low (3–5%)",
    impact: "Critical",
    mitigation: "100+ edge-case test scenarios before launch. Real-time monitoring and alerts for any conflicts. Manual override with full audit trail. Rollback procedure within 5 minutes of any incident.",
  },
  {
    title: "Real-time system crash during peak operations",
    probability: "Low (5%)",
    impact: "High",
    mitigation: "Load-tested to 10,000+ concurrent users. Circuit breaker pattern for graceful degradation. Fallback to HTTP polling if WebSocket fails. Redis caching and auto-scaling infrastructure.",
  },
  {
    title: "API changes from Airbnb or Vrbo",
    probability: "Low–Medium (10–15%)",
    impact: "High",
    mitigation: "Abstraction layer isolating platform-specific API logic. Multiple integration paths for critical sync features. Rapid response team on standby for API deprecations. Alternative data source research underway.",
  },
  {
    title: "Slow adoption among target users",
    probability: "Medium (20–30%)",
    impact: "High",
    mitigation: "50+ user interviews conducted before launch. 14–30 day free trial with money-back guarantee. Dedicated onboarding specialist. Referral incentive programme. ROI benchmarking case studies from early adopters.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Shared micro-components
// ─────────────────────────────────────────────────────────────────────────────

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let cur = 0;
    const steps = 50, dur = 1400;
    const timer = setInterval(() => {
      cur = Math.min(cur + to / steps, to);
      setN(Math.round(cur));
      if (cur >= to) clearInterval(timer);
    }, dur / steps);
    return () => clearInterval(timer);
  }, [inView, to]);
  return <span ref={ref} className="tabular-nums">{n}{suffix}</span>;
}

function StatusBadge({ status }: { status: FeatureStatus }) {
  const styles: Record<FeatureStatus, string> = {
    "Complete":    "bg-[var(--accent-08)] text-[var(--accent-text)] border-[var(--accent-25)]",
    "In Progress": "bg-amber-500/10 text-amber-400 border-amber-500/25",
    "Planned":     "bg-[var(--surface-2)] text-[var(--text-35)] border-[var(--border)]",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-display font-bold border ${styles[status]}`}>
      {status}
    </span>
  );
}

function SL({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-display uppercase tracking-[0.15em] text-[var(--accent-text)] mb-3 opacity-75">{children}</p>;
}

function ST({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl md:text-3xl font-display font-bold text-[var(--text)] mb-6 leading-tight">{children}</h2>;
}

function Hr() { return <div className="h-px bg-[var(--border)]" />; }

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────

export function KeyStayPRD() {
  const [active, setActive]             = useState("overview");
  const [openProblem, setOpenProblem]   = useState<number | null>(null);
  const [activePersona, setActivePersona] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);
  const [openRisk, setOpenRisk]         = useState<number | null>(null);

  useEffect(() => {
    const obs: IntersectionObserver[] = [];
    TOC.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id); },
        { rootMargin: "-25% 0px -65% 0px" }
      );
      o.observe(el); obs.push(o);
    });
    return () => obs.forEach(o => o.disconnect());
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <>
      <ReadingProgressBar />

      {/* Fixed TOC */}
      <nav aria-label="Page sections" className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-1">
        {TOC.map(({ id, label }) => (
          <button key={id} onClick={() => scrollTo(id)} data-cursor="hover"
            className={`flex items-center gap-2.5 py-0.5 transition-all duration-200 ${active === id ? "opacity-100" : "opacity-25 hover:opacity-55"}`}>
            <span className={`text-[11px] font-body transition-colors duration-200 ${active === id ? "text-[var(--text)]" : "text-[var(--text-40)]"}`}>{label}</span>
            <span className={`h-px shrink-0 transition-all duration-300 ${active === id ? "w-5 bg-[var(--accent)]" : "w-2 bg-[var(--text-30)]"}`} />
          </button>
        ))}
      </nav>

      {/* Header */}
      <header className="mb-16 pb-12 border-b border-[var(--border)]">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-3 mb-6">
          <Tag variant="type">PRD</Tag>
          <span className="text-[10px] font-body uppercase tracking-wider text-[var(--text-35)]">Conceptual</span>
          <span className="text-[10px] font-body text-[var(--text-30)] uppercase tracking-wider">v1.0 · Target Q2 2026</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
          className="text-4xl md:text-5xl font-display font-bold text-[var(--text)] leading-tight mb-4">KeyStay</motion.h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg font-body text-[var(--text-55)] leading-relaxed max-w-2xl">
          An advanced vacation rental management platform combining AI automation, real-time multi-platform sync, and intelligent staff management.
        </motion.p>
      </header>

      <div className="space-y-24">

        {/* OVERVIEW */}
        <section id="overview">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6 }}
            className="relative p-6 md:p-8 rounded-2xl border border-[var(--accent-25)] bg-[var(--surface)] overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 10% 50%, rgba(200,240,96,0.05) 0%, transparent 60%)" }} />
            <p className="text-[11px] font-display uppercase tracking-[0.15em] text-[var(--accent-text)] mb-4 opacity-75">TL;DR</p>
            <p className="font-body text-[var(--text-65)] leading-relaxed relative z-10">
              Property managers lose <strong className="text-[var(--text)]">20–30 hours a week</strong> to manual cross-platform admin, and average <strong className="text-[var(--text)]">$500–2,000 per double booking incident</strong>. KeyStay unifies booking management across Airbnb and Vrbo, automates 80% of guest communication via AI chatbot, and eliminates double bookings through proprietary real-time conflict detection — all from a single platform.
            </p>
            {/* Market snapshot */}
            <div className="grid grid-cols-3 gap-3 mt-6 relative z-10">
              {[
                { label: "TAM", value: "5.4M", sub: "property managers globally" },
                { label: "SAM", value: "200K+", sub: "English-speaking markets" },
                { label: "SOM (Y1)", value: "5K", sub: "active users target" },
              ].map(m => (
                <div key={m.label} className="p-3 rounded-xl bg-[var(--surface-2)] border border-[var(--border)]">
                  <p className="text-[10px] font-display uppercase tracking-wider text-[var(--accent-text)] mb-1 opacity-70">{m.label}</p>
                  <p className="text-lg font-display font-bold text-[var(--text)]">{m.value}</p>
                  <p className="text-[10px] font-body text-[var(--text-35)] leading-snug mt-0.5">{m.sub}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <Hr />

        {/* PROBLEM */}
        <section id="problem">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6 }}>
            <SL>Why it exists</SL>
            <ST>Problem Statement</ST>
            <p className="font-body text-[var(--text-65)] leading-relaxed mb-8">
              Five distinct pain points compound each other. A manager dealing with double bookings also has no staff visibility and no data to forecast demand. These aren&apos;t independent problems — they&apos;re a system.
            </p>
            <div className="space-y-3">
              {PROBLEMS.map((p, i) => {
                const open = openProblem === i;
                return (
                  <motion.div key={i} layout className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
                    <button onClick={() => setOpenProblem(open ? null : i)} data-cursor="hover"
                      className="w-full flex items-center justify-between px-5 py-4 text-left group">
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="shrink-0">
                          <p className="text-xs font-display font-bold text-[var(--accent-text)]">{p.impact}</p>
                          <p className="text-[10px] font-body text-[var(--text-35)] leading-none">{p.impactLabel}</p>
                        </div>
                        <p className="text-sm font-display font-semibold text-[var(--text)] group-hover:text-[var(--accent-text)] transition-colors duration-200 truncate">{p.title}</p>
                      </div>
                      <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }}
                        className="text-[var(--text-40)] text-xl font-light ml-4 shrink-0 leading-none">+</motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div key="body" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
                          <div className="px-5 pb-5 pt-1 border-t border-[var(--border)]">
                            <p className="text-sm font-body text-[var(--text-65)] leading-relaxed mt-3">{p.body}</p>
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

        <Hr />

        {/* USERS */}
        <section id="users">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6 }}>
            <SL>Who we serve</SL>
            <ST>User Personas</ST>
            <div className="flex flex-wrap gap-2 mb-5">
              {PERSONAS.map((p, i) => (
                <button key={i} onClick={() => setActivePersona(i)} data-cursor="hover"
                  className={`px-4 py-2 rounded-full text-[12px] font-display font-semibold border transition-all duration-200 ${activePersona === i ? "bg-[var(--accent)] text-[#0f0f14] border-[var(--accent)]" : "bg-transparent text-[var(--text-50)] border-[var(--border)] hover:border-[var(--accent-25)] hover:text-[var(--text)]"}`}>
                  {p.name}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={activePersona} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }}
                className="p-6 md:p-8 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
                <div className="flex flex-wrap items-start gap-4 mb-5">
                  <div>
                    <h3 className="text-xl font-display font-bold text-[var(--text)]">{PERSONAS[activePersona].name}</h3>
                    <p className="text-sm font-body text-[var(--text-50)]">{PERSONAS[activePersona].role}</p>
                  </div>
                  <div className="flex gap-2 flex-wrap ml-auto">
                    <span className="px-3 py-1 rounded-full text-[11px] font-body bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text-50)]">{PERSONAS[activePersona].scale}</span>
                    <span className="px-3 py-1 rounded-full text-[11px] font-body bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text-50)]">{PERSONAS[activePersona].experience}</span>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <p className="text-[10px] font-display uppercase tracking-wider text-[var(--accent-text)] mb-2 opacity-70">Goals</p>
                    <ul className="space-y-1.5">
                      {PERSONAS[activePersona].goals.map((g, j) => (
                        <li key={j} className="flex gap-2 text-sm font-body text-[var(--text-65)]">
                          <span className="text-[var(--accent-text)] shrink-0">→</span>{g}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[10px] font-display uppercase tracking-wider text-[var(--text-35)] mb-2 uppercase">Pain Points</p>
                    <ul className="space-y-1.5">
                      {PERSONAS[activePersona].pains.map((p, j) => (
                        <li key={j} className="flex gap-2 text-sm font-body text-[var(--text-65)]">
                          <span className="text-red-400/60 shrink-0">✕</span>{p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="pt-4 border-t border-[var(--border)]">
                  <p className="text-sm font-body text-[var(--text-50)] italic">&ldquo;{PERSONAS[activePersona].quote}&rdquo;</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </section>

        <Hr />

        {/* FEATURES */}
        <section id="features">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6 }}>
            <SL>What we&apos;re building</SL>
            <ST>Feature Requirements</ST>
            <div className="flex flex-wrap gap-2 mb-5">
              {FEATURES.map((f, i) => (
                <button key={i} onClick={() => setActiveFeature(i)} data-cursor="hover"
                  className={`px-4 py-2 rounded-full text-[12px] font-display font-semibold border transition-all duration-200 ${activeFeature === i ? "bg-[var(--accent)] text-[#0f0f14] border-[var(--accent)]" : "bg-transparent text-[var(--text-50)] border-[var(--border)] hover:border-[var(--accent-25)] hover:text-[var(--text)]"}`}>
                  {f.title}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={activeFeature} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }}
                className="p-6 md:p-8 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-lg font-display font-semibold text-[var(--text)]">{FEATURES[activeFeature].title}</h3>
                  <StatusBadge status={FEATURES[activeFeature].status} />
                  <span className="text-[10px] font-display font-bold text-[var(--text-35)] ml-auto">{FEATURES[activeFeature].priority}</span>
                </div>
                <p className="text-sm font-body text-[var(--text-65)] leading-relaxed mb-5">{FEATURES[activeFeature].description}</p>
                <div className="pt-4 border-t border-[var(--border)]">
                  <p className="text-[10px] font-display uppercase tracking-[0.12em] text-[var(--accent-text)] mb-3 opacity-70">Acceptance criteria</p>
                  <ul className="space-y-2">
                    {FEATURES[activeFeature].acceptance.map((a, j) => (
                      <li key={j} className="flex gap-2.5 text-sm font-body text-[var(--text-55)]">
                        <span className="text-[var(--accent-text)] shrink-0 text-xs mt-0.5">✓</span>{a}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </section>

        <Hr />

        {/* ARCHITECTURE */}
        <section id="architecture">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6 }}>
            <SL>Tech</SL>
            <ST>Architecture</ST>
            <p className="font-body text-[var(--text-65)] leading-relaxed mb-6">
              A five-module architecture: core API, main dashboard, mock Airbnb UI, mock Vrbo UI, and API mock platform. All connected via WebSocket for real-time event propagation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { layer: "Backend", stack: "Node.js 18 + Express · MongoDB + Mongoose · Socket.io · JWT auth · Redis cache · Ollama (local LLM)" },
                { layer: "Frontend", stack: "React 19 + Vite 7 · Tailwind CSS 4 · Radix UI · Recharts · Framer Motion · Socket.io client" },
                { layer: "Real-time", stack: "Socket.io WebSocket · <100ms event latency · Fallback to HTTP polling · 10,000+ concurrent connections" },
                { layer: "Performance targets", stack: "API p95 < 200ms · Dashboard load < 2s · Booking creation < 1s · 99.9% uptime SLA" },
              ].map(item => (
                <div key={item.layer} className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                  <p className="text-[10px] font-display uppercase tracking-wider text-[var(--accent-text)] mb-2 opacity-70">{item.layer}</p>
                  <p className="text-xs font-body text-[var(--text-55)] leading-relaxed">{item.stack}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <Hr />

        {/* METRICS */}
        <section id="metrics">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6 }}>
            <SL>How we measure success</SL>
            <ST>Success Metrics</ST>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {METRICS.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent-25)] transition-colors duration-300">
                  <p className="text-3xl font-display font-bold text-[var(--accent-text)] mb-1">
                    <Counter to={m.value} suffix={m.suffix} />
                  </p>
                  <p className="text-xs font-body text-[var(--text-50)] leading-snug">{m.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <Hr />

        {/* ROADMAP */}
        <section id="roadmap">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6 }}>
            <SL>Delivery plan</SL>
            <ST>Roadmap</ST>
            <div className="space-y-4">
              {ROADMAP.map((r, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="p-5 md:p-6 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent-25)] transition-colors duration-300">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className="text-[10px] font-display font-bold text-[var(--accent-text)] opacity-60">{r.phase}</span>
                    <h3 className="text-base font-display font-semibold text-[var(--text)]">{r.title}</h3>
                    <StatusBadge status={r.status} />
                    <span className="text-[11px] font-body text-[var(--text-35)] ml-auto">{r.period}</span>
                  </div>
                  {r.progress > 0 && (
                    <div className="mb-3">
                      <div className="h-1 rounded-full bg-[var(--surface-2)] overflow-hidden">
                        <motion.div className="h-full bg-[var(--accent)] rounded-full" initial={{ width: 0 }}
                          whileInView={{ width: `${r.progress}%` }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} />
                      </div>
                      <p className="text-[10px] font-body text-[var(--text-35)] mt-1">{r.progress}% complete</p>
                    </div>
                  )}
                  <ul className="flex flex-wrap gap-2">
                    {r.items.map((item, j) => (
                      <li key={j} className="px-2.5 py-1 rounded-lg text-[11px] font-body bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text-50)]">{item}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <Hr />

        {/* RISKS */}
        <section id="risks">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6 }}>
            <SL>What could go wrong</SL>
            <ST>Risks & Mitigation</ST>
            <div className="space-y-3">
              {RISKS.map((r, i) => {
                const open = openRisk === i;
                return (
                  <motion.div key={i} layout className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
                    <button onClick={() => setOpenRisk(open ? null : i)} data-cursor="hover" className="w-full flex items-center justify-between px-5 py-4 text-left group">
                      <div>
                        <p className="text-sm font-display font-semibold text-[var(--text)] group-hover:text-[var(--accent-text)] transition-colors duration-200">{r.title}</p>
                        <div className="flex gap-3 mt-0.5">
                          <span className="text-[11px] font-body text-[var(--text-35)]">Probability: {r.probability}</span>
                          <span className={`text-[11px] font-body ${r.impact === "Critical" ? "text-red-400/70" : r.impact === "High" ? "text-amber-400/70" : "text-[var(--text-35)]"}`}>Impact: {r.impact}</span>
                        </div>
                      </div>
                      <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }}
                        className="text-[var(--text-40)] text-xl font-light ml-4 shrink-0 leading-none">+</motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div key="body" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
                          <div className="px-5 pb-5 pt-1 border-t border-[var(--border)]">
                            <p className="text-[10px] font-display uppercase tracking-wider text-[var(--accent-text)] mt-3 mb-2 opacity-70">Mitigation</p>
                            <p className="text-sm font-body text-[var(--text-65)] leading-relaxed">{r.mitigation}</p>
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

      </div>
    </>
  );
}
