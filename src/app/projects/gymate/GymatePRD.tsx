"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ReadingProgressBar } from "@/components/ui/ReadingProgressBar";
import { Tag } from "@/components/ui/Tag";

const TOC = [
  { id: "overview",       label: "Overview"      },
  { id: "problem",        label: "Problem"        },
  { id: "users",          label: "Users"          },
  { id: "features",       label: "Features"       },
  { id: "monetisation",   label: "Monetisation"   },
  { id: "metrics",        label: "Metrics"        },
  { id: "roadmap",        label: "Roadmap"        },
  { id: "risks",          label: "Risks"          },
];

const PERSONAS = [
  {
    name: "Sarah",
    type: "Motivated Beginner",
    detail: "24 · Marketing associate · Urban area",
    goals: ["Build a consistent workout routine", "Lose 15 lbs in 6 months", "Feel less intimidated at the gym"],
    pains: ["Goes alone — no accountability", "Previous memberships gone unused", "Unsure about form, fears judgement"],
    quote: "I keep starting and stopping. If I had someone to go with, I'd actually stick to it.",
  },
  {
    name: "Mike",
    type: "Consistent Lifter",
    detail: "28 · Software engineer · Fitness enthusiast",
    goals: ["Find a spotter for heavy lifts", "Push past current plateaus", "Train toward powerlifting competition"],
    pains: ["Friends don't share fitness interest", "Schedules never align with acquaintances", "Needs competitive motivation"],
    quote: "I need someone who takes training as seriously as I do. Not someone I have to convince to show up.",
  },
  {
    name: "Emma",
    type: "Social Fitness Enthusiast",
    detail: "26 · Part-time yoga instructor · Wellness-focused",
    goals: ["Expand fitness circle beyond yoga", "Try CrossFit and HIIT", "Build community around wellness"],
    pains: ["Current circle only does yoga/Pilates", "Wants variety and group energy", "Seeks to network professionally in fitness"],
    quote: "I love working out but I want to diversify. I need people who are open to trying different things.",
  },
];

type FeatureStatus = "P0" | "P1" | "P2";

const FEATURES: { title: string; priority: FeatureStatus; description: string; userStory: string; acceptanceCriteria: string[] }[] = [
  {
    title: "Profile & Onboarding",
    priority: "P0",
    description: "Users complete a profile in under 3 minutes: name, age, fitness level, primary goals, preferred workout times, gym location, and one profile photo. Optional fields (bio, workout styles) are surfaced after first match to avoid drop-off.",
    userStory: "As a new user, I want to create my profile quickly so I can start finding partners immediately — not spend 10 minutes filling out forms.",
    acceptanceCriteria: [
      "Profile creation completes in < 3 minutes",
      "Required: name, age, fitness level, goals, workout times, location, photo",
      "Optional fields surfaced post-onboarding",
      "Location permission requested with clear value explanation",
    ],
  },
  {
    title: "Swipe Matching",
    priority: "P0",
    description: "Users swipe on cards showing potential partners' fitness level, goals, preferred days, and distance. A mutual right-swipe creates a match and unlocks chat. Algorithm weights: gym proximity first, then schedule overlap, fitness level compatibility, and shared interests.",
    userStory: "As a gym-goer, I want to find compatible partners through a familiar swipe interface so I don't have to scroll through endless profiles.",
    acceptanceCriteria: [
      "Algorithm weights: proximity > schedule > fitness level > interests",
      "Mutual match unlocks chat",
      "Filter by fitness level, workout style, schedule",
      "30% of swipes result in mutual matches (KPI target)",
    ],
  },
  {
    title: "In-App Chat",
    priority: "P0",
    description: "Matched partners message directly. Quick-reply templates reduce friction from match to first session: 'Tomorrow at 7am?', 'Let's do legs this week'. Chat is only available after a mutual match — no cold messaging.",
    userStory: "As a matched user, I want quick-reply templates so I can coordinate a session without typing a full message every time.",
    acceptanceCriteria: [
      "Chat unlocked only on mutual match",
      "Quick-reply templates for common coordination",
      "Chat history persists across sessions",
      "Read receipts (Pro tier only)",
    ],
  },
  {
    title: "Gym Check-in",
    priority: "P0",
    description: "Users check in at their gym when they arrive. Check-ins signal real-time availability to matched partners. If a match is checked in at the same gym, the user receives a push notification: 'Mike is at Iron Gym right now.' This closes the loop between digital match and physical meetup.",
    userStory: "As a user, I want to know when a match is at my gym so I can turn a digital connection into a real one.",
    acceptanceCriteria: [
      "GPS-verified check-in at registered gym",
      "Push notification when a match checks in at same gym",
      "Check-in visible on partner's profile for 2 hours",
    ],
  },
  {
    title: "Safety & Verification",
    priority: "P0",
    description: "Phone number verification on signup. Optional ID verification for a 'Verified' badge. In-app reporting with 24-hour response SLA. One-tap block removes user from all match queues and chats simultaneously. No contact details shared until both users opt in.",
    userStory: "As a user, I want to report or block someone instantly so I always feel safe using the platform.",
    acceptanceCriteria: [
      "Phone number verified on signup",
      "Optional ID verification → Verified badge",
      "One-tap block: removes from queues + chats simultaneously",
      "Report reviewed within 24 hours",
    ],
  },
];

const METRICS = [
  { value: 100, suffix: "K",  label: "downloads target in first 6 months"  },
  { value: 30,  suffix: "%",  label: "of swipes result in mutual matches"   },
  { value: 40,  suffix: "%",  label: "DAU/MAU ratio target"                 },
  { value: 60,  suffix: "%",  label: "30-day retention target"              },
  { value: 8,   suffix: "%",  label: "free-to-Pro conversion target"        },
  { value: 5,   suffix: "$",  label: "ARPU target — year one"               },
];

const ROADMAP = [
  {
    version: "v1.0",
    title: "MVP",
    status: "Planned" as const,
    items: ["Profile & onboarding", "Swipe matching algorithm", "In-app chat with quick replies", "Gym check-in", "Safety & verification"],
  },
  {
    version: "v1.1",
    title: "Engagement Loop",
    status: "Planned" as const,
    items: ["Partner ratings post-session", "Post-session feedback loop", "Match quality improvement from rating signals", "Push notification tuning"],
  },
  {
    version: "v2.0",
    title: "Community",
    status: "Planned" as const,
    items: ["Group workout creation + RSVP", "Workout logging with partner visibility", "Gym partnership integrations", "Multi-language (India + SE Asia markets)"],
  },
];

const RISKS = [
  {
    title: "Platform misuse for dating / bad actors",
    probability: "Medium",
    body: "Safety features are MVP — but moderation at scale requires investment before user growth outpaces it. Mitigation: ID verification badge, rapid report resolution SLA, proactive pattern detection for misuse. Alternative interaction patterns prepared to differentiate from dating app UX.",
  },
  {
    title: "Cold start — not enough users at any single gym",
    probability: "High",
    body: "The matching graph is only useful when there are enough users at the same gym. Mitigation: geographic launch sequencing — one city, one gym cluster first. Target gyms with high membership density. Launch partnerships with 2–3 large gym chains for user seeding.",
  },
  {
    title: "Patent exposure on swipe gesture mechanics",
    probability: "Low–Medium",
    body: "Tinder holds patents on swipe gestures and double opt-in matching (US Patent 2013). Mitigation: legal review before launch. Our implementation uses fitness-specific matching criteria, different visual feedback, and unique gesture combinations for super-likes. Alternative interaction patterns prepared as backup.",
  },
  {
    title: "Free tier cannibalises Pro conversion",
    probability: "Medium",
    body: "If the free tier is too generous, there's no forcing function to upgrade. Mitigation: limit active conversations (not swipes) on free tier — users feel friction when they can't continue a promising conversation, not when finding matches. Balances value demonstration with conversion pressure.",
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

function SL({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-display uppercase tracking-[0.15em] text-[var(--accent-text)] mb-3 opacity-75">{children}</p>;
}
function ST({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl md:text-3xl font-display font-bold text-[var(--text)] mb-6 leading-tight">{children}</h2>;
}
function Hr() { return <div className="h-px bg-[var(--border)]" />; }

// ─── Main ─────────────────────────────────────────────────────────────────────

export function GymatePRD() {
  const [active, setActive] = useState("overview");
  const [activePersona, setActivePersona] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);
  const [openRisk, setOpenRisk] = useState<number | null>(null);

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
          <span className="text-[10px] font-body text-[var(--text-30)] uppercase tracking-wider">v1.0 · Mobile-first</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
          className="text-4xl md:text-5xl font-display font-bold text-[var(--text)] leading-tight mb-4">Gymate</motion.h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg font-body text-[var(--text-55)] leading-relaxed max-w-2xl">
          A location-based social fitness app connecting gym-goers with compatible workout partners through intelligent matching and a swipe-based interface.
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
              <strong className="text-[var(--text)]">70% of new gym members quit within 3 months.</strong> The two most cited reasons are lack of motivation and feeling intimidated — both social problems, not fitness problems. Gymate solves this with location-based partner matching using a swipe interface, in-app coordination tools, and gym check-ins that bridge digital matches to real-world sessions. Target: 100K downloads in 6 months, 40% DAU/MAU.
            </p>
            <div className="grid grid-cols-3 gap-3 mt-6 relative z-10">
              {[
                { label: "Market",  value: "$10.56B",  sub: "global fitness apps (2024)" },
                { label: "CAGR",    value: "14.1%",    sub: "market growth through 2034" },
                { label: "Gap",     value: "0",        sub: "apps solving gym partner matching well" },
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
            <p className="font-body text-[var(--text-65)] leading-relaxed mb-6">
              Existing fitness apps — Strava, MyFitnessPal, JEFIT — focus on tracking. None solve the core social problem: finding a compatible workout partner at the same gym, at the same time, with the same goals.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {[
                { label: "Direct competitors", items: ["Gymder — swipe-based, no advanced filtering", "Tag Team — 1K+ downloads, limited features", "Fitmate — logging focus, not social matching"] },
                { label: "Indirect competitors", items: ["Strava — 100M+ users, no partner matching", "MyFitnessPal — 200M+ users, minimal social", "JEFIT — community features, no location matching"] },
              ].map(col => (
                <div key={col.label} className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                  <p className="text-[10px] font-display uppercase tracking-wider text-[var(--text-35)] mb-3">{col.label}</p>
                  <ul className="space-y-2">
                    {col.items.map((item, j) => (
                      <li key={j} className="text-sm font-body text-[var(--text-65)] flex gap-2">
                        <span className="text-[var(--text-35)] shrink-0">·</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="p-5 rounded-xl border border-[var(--accent-25)] bg-[var(--surface)]">
              <p className="text-[10px] font-display uppercase tracking-wider text-[var(--accent-text)] mb-2 opacity-70">The gap</p>
              <p className="text-sm font-body text-[var(--text-65)] leading-relaxed">
                No app combines <strong className="text-[var(--text)]">proximity matching + schedule alignment + in-app coordination + gym check-in</strong> in a single product. The few that attempt matching have poor quality and no engagement loop to sustain the relationship after the initial match.
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
                  {p.name} — {p.type}
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
            <ST>MVP Feature Set</ST>
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
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-display font-bold border bg-[var(--accent-08)] text-[var(--accent-text)] border-[var(--accent-25)]">
                    {FEATURES[activeFeature].priority}
                  </span>
                </div>
                <p className="text-sm font-body text-[var(--text-65)] leading-relaxed mb-4">{FEATURES[activeFeature].description}</p>
                <div className="p-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] mb-4">
                  <p className="text-[10px] font-display uppercase tracking-wider text-[var(--text-35)] mb-1">User story</p>
                  <p className="text-xs font-body text-[var(--text-55)] leading-relaxed italic">{FEATURES[activeFeature].userStory}</p>
                </div>
                <div className="pt-4 border-t border-[var(--border)]">
                  <p className="text-[10px] font-display uppercase tracking-[0.12em] text-[var(--accent-text)] mb-3 opacity-70">Acceptance criteria</p>
                  <ul className="space-y-2">
                    {FEATURES[activeFeature].acceptanceCriteria.map((a, j) => (
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

        {/* MONETISATION */}
        <section id="monetisation">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6 }}>
            <SL>Business model</SL>
            <ST>Monetisation</ST>
            <p className="font-body text-[var(--text-65)] leading-relaxed mb-6">
              Freemium. The free tier demonstrates value and builds the match graph. Pro removes friction at the point of highest intent — when a user wants to continue a conversation.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  tier: "Free",
                  price: "$0",
                  features: ["Unlimited swipes", "1 active conversation at a time", "Basic filters (location, fitness level)", "Gym check-in", "Safety & reporting"],
                  note: "Designed to show value before asking for payment.",
                },
                {
                  tier: "Gymate Pro",
                  price: "$9.99/mo",
                  features: ["Unlimited active conversations", "Advanced filters (body type, experience, equipment)", "Read receipts", "Profile boosts", "See who swiped right on you"],
                  note: "Target: 8% free-to-paid conversion within 6 months.",
                },
              ].map((tier, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`p-6 rounded-2xl border ${i === 1 ? "border-[var(--accent-25)] bg-[var(--surface)]" : "border-[var(--border)] bg-[var(--surface)]"}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-display font-semibold text-[var(--text)]">{tier.tier}</h3>
                    <span className={`text-lg font-display font-bold ${i === 1 ? "text-[var(--accent-text)]" : "text-[var(--text-50)]"}`}>{tier.price}</span>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {tier.features.map((f, j) => (
                      <li key={j} className="flex gap-2 text-sm font-body text-[var(--text-65)]">
                        <span className={`shrink-0 ${i === 1 ? "text-[var(--accent-text)]" : "text-[var(--text-35)]"}`}>→</span>{f}
                      </li>
                    ))}
                  </ul>
                  <p className="text-[11px] font-body text-[var(--text-35)] italic">{tier.note}</p>
                </motion.div>
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
                    <span className="text-[10px] font-display font-bold text-[var(--accent-text)] opacity-60">{r.version}</span>
                    <h3 className="text-base font-display font-semibold text-[var(--text)]">{r.title}</h3>
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

        {/* RISKS */}
        <section id="risks">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6 }}>
            <SL>What could go wrong</SL>
            <ST>Risks & Open Questions</ST>
            <div className="space-y-3">
              {RISKS.map((r, i) => {
                const open = openRisk === i;
                return (
                  <motion.div key={i} layout className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
                    <button onClick={() => setOpenRisk(open ? null : i)} data-cursor="hover" className="w-full flex items-center justify-between px-5 py-4 text-left group">
                      <div>
                        <p className="text-sm font-display font-semibold text-[var(--text)] group-hover:text-[var(--accent-text)] transition-colors duration-200">{r.title}</p>
                        <p className="text-[11px] font-body text-[var(--text-35)] mt-0.5">Probability: {r.probability}</p>
                      </div>
                      <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }}
                        className="text-[var(--text-40)] text-xl font-light ml-4 shrink-0 leading-none">+</motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div key="body" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
                          <div className="px-5 pb-5 pt-1 border-t border-[var(--border)]">
                            <p className="text-sm font-body text-[var(--text-65)] leading-relaxed mt-3">{r.body}</p>
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
