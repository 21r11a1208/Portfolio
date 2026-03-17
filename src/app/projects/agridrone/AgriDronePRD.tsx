"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ReadingProgressBar } from "@/components/ui/ReadingProgressBar";
import { Tag } from "@/components/ui/Tag";

const TOC = [
  { id: "overview",      label: "Overview"     },
  { id: "problem",       label: "Problem"       },
  { id: "users",         label: "Users"         },
  { id: "features",      label: "Features"      },
  { id: "architecture",  label: "Architecture"  },
  { id: "metrics",       label: "Metrics"       },
  { id: "roadmap",       label: "Roadmap"       },
  { id: "questions",     label: "Open Qs"       },
];

const PERSONAS = [
  {
    name: "Raju",
    role: "Farmer",
    detail: "42 · Rural Maharashtra · Basic smartphone user",
    goals: ["Book drone spraying for paddy field before monsoon", "Find trusted operators near his area", "Track job status without calling anyone"],
    pains: ["Expensive manual spraying", "Can't find or verify operators", "No pricing transparency — fears being overcharged"],
    quote: "I've heard of drone spraying but I don't know who to call. And how do I know they won't damage my crop?",
  },
  {
    name: "Vikram",
    role: "Drone Operator",
    detail: "29 · Semi-urban Karnataka · Comfortable with apps",
    goals: ["List services so farmers can find him", "Manage job queue digitally", "Build a reliable client base"],
    pains: ["Clients only through word-of-mouth", "Drives to remote areas for low-value jobs", "Books are managed in a notebook"],
    quote: "I want consistent booking volume. Right now it's one-off gigs and I'm driving two hours for a job that doesn't cover the fuel.",
  },
  {
    name: "Priya",
    role: "Platform Admin",
    detail: "35 · Bangalore · High technical literacy",
    goals: ["Single view of all platform activity", "Manage users and resolve disputes", "Track platform growth and health"],
    pains: ["No analytics or reporting", "User disputes handled manually", "No visibility into operator quality"],
    quote: "I need one screen that tells me what's happening on the platform today, not five spreadsheets.",
  },
];

type FeatureStatus = "Complete" | "In Progress" | "Planned";

const FEATURES: { title: string; status: FeatureStatus; userType: string; description: string; keyRequirements: string[] }[] = [
  {
    title: "Field Management",
    status: "Complete",
    userType: "Farmers",
    description: "Farmers create and manage fields with name, area (hectares), crop type, and GeoJSON polygon coordinates. Fields are private — only the owning farmer can view or edit. Field data attaches to service requests so operators know exactly what they're servicing before accepting.",
    keyRequirements: [
      "Create fields with name, area, crop type, GeoJSON coordinates",
      "Farmers can only access their own fields",
      "Edit and delete fields at any time",
    ],
  },
  {
    title: "Service Request Lifecycle",
    status: "Complete",
    userType: "Farmers + Operators",
    description: "Farmers submit requests by selecting a field, service type (pesticide or fertilizer), preferred date, and optional notes. Requests follow a strict state machine: pending → accepted → completed. Farmers can cancel pending requests; admins can cancel accepted ones.",
    keyRequirements: [
      "State machine: pending → accepted → completed / cancelled",
      "Farmers edit only while request is pending",
      "Operators complete requests with a timestamp",
      "Admins can reassign requests to different operators",
    ],
  },
  {
    title: "Operator Discovery",
    status: "Complete",
    userType: "Farmers",
    description: "Operators set their GPS location, service radius (km), hourly rate, and availability toggle. Farmers see a Leaflet map of operators near them. Operators browse available requests — no unsolicited outreach — so farmers feel in control of the engagement.",
    keyRequirements: [
      "Operators set location, radius, rate, and availability",
      "Farmers see map of nearby operators",
      "Operators toggle availability on/off",
      "Operators view field details before accepting",
    ],
  },
  {
    title: "Weather Widget",
    status: "Complete",
    userType: "Farmers",
    description: "Current conditions and 5-day forecast via OpenWeatherMap proxy. Displays temperature, conditions, humidity, wind speed, and icon. Helps farmers pick suitable spray dates. API key lives server-side — never exposed in frontend bundles.",
    keyRequirements: [
      "Current weather + 5-day forecast by lat/lon",
      "Temperature, condition, humidity, wind speed",
      "API key stored as server-side environment variable",
    ],
  },
  {
    title: "Admin Dashboard",
    status: "Complete",
    userType: "Admins",
    description: "Live counts for farmers, operators, fields, and service requests broken down by status. Full CRUD across all user roles. Ability to reassign or update any service request. Profile photo upload. Future: analytics charts for user growth and request volume.",
    keyRequirements: [
      "Total farmers, operators, fields, and requests by status",
      "Create, edit, delete users of any role",
      "Filter users by role, requests by status",
      "Reassign service requests to different operators",
    ],
  },
];

const METRICS = [
  { value: 80, suffix: "%",  label: "of pending requests accepted within 48 hrs" },
  { value: 10, suffix: " min", label: "registration to first request (target)" },
  { value: 70, suffix: "%",  label: "operator profile completion rate target" },
  { value: 99, suffix: ".5%", label: "platform uptime target" },
];

const ROADMAP = [
  {
    version: "v1.0",
    title: "Current (Complete)",
    status: "Complete" as FeatureStatus,
    items: ["Field management", "Service request lifecycle", "Operator discovery & map", "Weather widget", "Admin dashboard", "JWT auth + RBAC"],
  },
  {
    version: "v1.1",
    title: "Near-term",
    status: "Planned" as FeatureStatus,
    items: ["Admin analytics charts", "Geospatial operator filtering (Haversine/PostGIS)", "Operator availability calendar (date-range)", "PostgreSQL migration from SQLite"],
  },
  {
    version: "v1.2",
    title: "Medium-term",
    status: "Planned" as FeatureStatus,
    items: ["Email/in-app notifications", "Service request history", "Farmer ratings for operators", "Advanced search by crop type and service type"],
  },
  {
    version: "v2.0",
    title: "Long-term",
    status: "Planned" as FeatureStatus,
    items: ["Stripe/Razorpay payment integration", "Premium operator tiers", "React Native mobile app", "Multi-language (Hindi, Kannada, Marathi)", "Live drone telemetry"],
  },
];

const OPEN_QUESTIONS = [
  {
    q: "Dispute resolution",
    body: "How should disputes be handled if an operator marks a job complete but the farmer disagrees? A rating system helps long-term but doesn't resolve individual incidents.",
  },
  {
    q: "Database for limited-scale launch",
    body: "Is SQLite acceptable for a limited-scale production launch, or is PostgreSQL migration a v1.0 blocker? SQLite has concurrency limitations that matter once multiple operators are accessing the platform simultaneously.",
  },
  {
    q: "Notification channels",
    body: "What notification channels suit key markets — SMS via Twilio, email, or WhatsApp? SMS has the highest reach in rural India but adds cost. WhatsApp is widely used but requires business API approval.",
  },
  {
    q: "Regulatory requirements",
    body: "Are there DGCA (India) regulatory requirements for drone spraying that the platform must display or enforce? Platform liability if unlicensed operators use it is a real risk.",
  },
];

// ─── Shared micro-components ──────────────────────────────────────────────────

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
  return <span className={`px-2 py-0.5 rounded-full text-[10px] font-display font-bold border ${styles[status]}`}>{status}</span>;
}

function SL({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-display uppercase tracking-[0.15em] text-[var(--accent-text)] mb-3 opacity-75">{children}</p>;
}
function ST({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl md:text-3xl font-display font-bold text-[var(--text)] mb-6 leading-tight">{children}</h2>;
}
function Hr() { return <div className="h-px bg-[var(--border)]" />; }

// ─── Main ─────────────────────────────────────────────────────────────────────

export function AgriDronePRD() {
  const [active, setActive] = useState("overview");
  const [activePersona, setActivePersona] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);
  const [openQ, setOpenQ] = useState<number | null>(null);

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
          <span className="text-[10px] font-body text-[var(--text-30)] uppercase tracking-wider">v1.0 · Flask + React</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
          className="text-4xl md:text-5xl font-display font-bold text-[var(--text)] leading-tight mb-4">AgriDrone</motion.h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg font-body text-[var(--text-55)] leading-relaxed max-w-2xl">
          A SaaS marketplace connecting farmers with licensed drone operators for on-demand aerial pesticide and fertilizer application.
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
              Agricultural drone services are commercially viable — the operators exist, the technology works. But small farmers in India can&apos;t access them because there&apos;s no discoverable marketplace. AgriDrone closes this gap: farmers submit service requests from their phone, operators accept jobs within their efficient radius, and admins ensure platform quality. The core insight: farmer trust and operator geographic inefficiency are the <strong className="text-[var(--text)]">same problem — information asymmetry</strong>.
            </p>
            <div className="grid grid-cols-2 gap-3 mt-6 relative z-10">
              {[
                { label: "Booking time target", value: "< 5 min", sub: "registration to first request" },
                { label: "Fulfillment target",  value: "≥ 80%",   sub: "requests accepted within 48 hrs" },
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
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {[
                { who: "For Farmers", points: ["No way to discover local drone operators", "Can't verify credentials or compare pricing", "No job tracking — have to call to find out status"] },
                { who: "For Operators", points: ["Clients only through word-of-mouth referrals", "Waste time driving to inefficient jobs outside their range", "Manage bookings manually — no digital pipeline"] },
              ].map(side => (
                <div key={side.who} className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                  <p className="text-sm font-display font-semibold text-[var(--text)] mb-3">{side.who}</p>
                  <ul className="space-y-2">
                    {side.points.map((pt, j) => (
                      <li key={j} className="flex gap-2.5 text-sm font-body text-[var(--text-65)]">
                        <span className="text-red-400/60 shrink-0">✕</span>{pt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="p-5 rounded-xl border border-[var(--accent-25)] bg-[var(--surface)]">
              <p className="text-[10px] font-display uppercase tracking-wider text-[var(--accent-text)] mb-2 opacity-70">Core insight</p>
              <p className="text-sm font-body text-[var(--text-65)] leading-relaxed">
                The two biggest barriers — farmer trust and operator geographic inefficiency — are the same problem: <strong className="text-[var(--text)]">information asymmetry about location and credibility</strong>. Solve that and the market connects itself.
              </p>
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
                  {p.name} — {p.role}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={activePersona} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }}
                className="p-6 md:p-8 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
                <div className="mb-5">
                  <h3 className="text-xl font-display font-bold text-[var(--text)]">{PERSONAS[activePersona].name}</h3>
                  <p className="text-sm font-body text-[var(--text-50)]">{PERSONAS[activePersona].detail}</p>
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
                    <p className="text-[10px] font-display uppercase tracking-wider text-[var(--text-35)] mb-2">Pain Points</p>
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
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <h3 className="text-lg font-display font-semibold text-[var(--text)]">{FEATURES[activeFeature].title}</h3>
                  <StatusBadge status={FEATURES[activeFeature].status} />
                  <span className="text-[10px] font-body text-[var(--text-35)] ml-auto">For: {FEATURES[activeFeature].userType}</span>
                </div>
                <p className="text-sm font-body text-[var(--text-65)] leading-relaxed mb-5">{FEATURES[activeFeature].description}</p>
                <div className="pt-4 border-t border-[var(--border)]">
                  <p className="text-[10px] font-display uppercase tracking-[0.12em] text-[var(--accent-text)] mb-3 opacity-70">Key requirements</p>
                  <ul className="space-y-2">
                    {FEATURES[activeFeature].keyRequirements.map((r, j) => (
                      <li key={j} className="flex gap-2.5 text-sm font-body text-[var(--text-55)]">
                        <span className="text-[var(--accent-text)] shrink-0 text-xs mt-0.5">✓</span>{r}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Booking state machine */}
            <div className="mt-5 p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
              <p className="text-[10px] font-display uppercase tracking-wider text-[var(--accent-text)] mb-3 opacity-70">Booking status state machine</p>
              <div className="flex flex-wrap items-center gap-2 text-sm font-body">
                {["pending", "→", "accepted", "→", "completed"].map((s, i) => (
                  <span key={i} className={i % 2 === 0 ? "px-3 py-1 rounded-full bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text-65)] text-xs font-display" : "text-[var(--text-35)]"}>{s}</span>
                ))}
                <span className="text-[var(--text-35)] ml-2 text-xs">· pending → cancelled · accepted → cancelled (admin only)</span>
              </div>
            </div>
          </motion.div>
        </section>

        <Hr />

        {/* ARCHITECTURE */}
        <section id="architecture">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6 }}>
            <SL>Tech</SL>
            <ST>Architecture</ST>
            <p className="font-body text-[var(--text-65)] leading-relaxed mb-6">
              React SPA communicates exclusively with a Flask backend via REST. Flask proxies weather requests and enforces JWT auth and role checks on all protected endpoints. SQLAlchemy ORM abstracts the database layer.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { layer: "Frontend", stack: "React (TypeScript) via Vite · Leaflet for operator maps · Axios for API calls" },
                { layer: "Backend", stack: "Python Flask · SQLAlchemy ORM · Werkzeug/bcrypt password hashing · JWT Bearer tokens" },
                { layer: "Database", stack: "SQLite (dev) → PostgreSQL (production) · FK constraints and cascading deletes" },
                { layer: "Security", stack: "RBAC on all endpoints · CORS locked to frontend origin · API keys server-side only · Server-side input validation" },
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
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {METRICS.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent-25)] transition-colors duration-300">
                  <p className="text-2xl md:text-3xl font-display font-bold text-[var(--accent-text)] mb-1">
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
                    <span className="text-[10px] font-display font-bold text-[var(--accent-text)] opacity-60">{r.version}</span>
                    <h3 className="text-base font-display font-semibold text-[var(--text)]">{r.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-display font-bold border ${r.status === "Complete" ? "bg-[var(--accent-08)] text-[var(--accent-text)] border-[var(--accent-25)]" : "bg-[var(--surface-2)] text-[var(--text-35)] border-[var(--border)]"}`}>{r.status}</span>
                  </div>
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

        {/* OPEN QUESTIONS */}
        <section id="questions">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6 }}>
            <SL>Still to resolve</SL>
            <ST>Open Questions</ST>
            <div className="space-y-3">
              {OPEN_QUESTIONS.map((q, i) => {
                const open = openQ === i;
                return (
                  <motion.div key={i} layout className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
                    <button onClick={() => setOpenQ(open ? null : i)} data-cursor="hover"
                      className="w-full flex items-center justify-between px-5 py-4 text-left group">
                      <p className="text-sm font-display font-semibold text-[var(--text)] group-hover:text-[var(--accent-text)] transition-colors duration-200">{q.q}</p>
                      <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }}
                        className="text-[var(--text-40)] text-xl font-light ml-4 shrink-0 leading-none">+</motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div key="body" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
                          <div className="px-5 pb-5 pt-1 border-t border-[var(--border)]">
                            <p className="text-sm font-body text-[var(--text-65)] leading-relaxed mt-3">{q.body}</p>
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
