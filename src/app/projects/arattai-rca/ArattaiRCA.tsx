"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ReadingProgressBar } from "@/components/ui/ReadingProgressBar";
import { Tag } from "@/components/ui/Tag";

const TOC = [
  { id: "ar-clarify",    label: "1. Clarify"         },
  { id: "ar-context",    label: "2. Context"         },
  { id: "ar-sanity",     label: "3. Sanity Checks"   },
  { id: "ar-hypotheses", label: "4. Hypotheses"      },
  { id: "ar-prioritise", label: "5. Prioritise"      },
  { id: "ar-diagnosis",  label: "6. Diagnosis"       },
  { id: "ar-bet",        label: "7. My Bet"          },
  { id: "ar-recommend",  label: "8. Recommendations" },
];

// ── Fishbone categories ───────────────────────────────────────────────────────
// 4 top + 3 bottom bones, ViewBox 900×400, spine at y=200

const CATEGORIES = [
  {
    id: "timing",
    label: "Timing / Catalyst",
    tipX: 72, tipY: 65, spineX: 190, spineY: 200,
    color: "#f97316",
    colorDim: "rgba(249,115,22,0.1)",
    icon: "⏱️",
    causes: [
      "Download spike was 100% event-driven, not organic",
      "WhatsApp policy backlash was the sole acquisition driver",
      "WhatsApp reversed the policy — urgency to switch vanished",
      "No product quality or word-of-mouth to sustain post-event",
    ],
    detail: "This is a strong secondary hypothesis. The entire acquisition surge was borrowed from an external event. The moment the event resolved — WhatsApp delaying its policy — the urgency that drove installs evaporated entirely. A product with genuine value would have retained some fraction of those installs. Arattai retained almost none. I'd use this as a framing hypothesis: the surge was fake demand, not real demand.",
  },
  {
    id: "network",
    label: "Network Effect",
    tipX: 128, tipY: 335, spineX: 255, spineY: 200,
    color: "#a855f7",
    colorDim: "rgba(168,85,247,0.1)",
    icon: "🕸️",
    causes: [
      "Friends, family, and colleagues weren't on Arattai",
      "Cold start: messaging apps need critical mass to be useful",
      "No mechanism to invite or migrate existing contacts",
      "Single-player utility of a messaging app is near zero",
    ],
    detail: "This is my primary structural hypothesis. A messaging app's core utility is zero if the people you want to message aren't there. Arattai launched with no pre-existing network to activate, no contact import tool, and no group migration incentive. Unlike Signal (which had power-user communities) or Telegram (which had niche communities), Arattai had no seeding strategy. Users installed it, opened it, found no one to message, and never returned. The cold-start problem is fatal for a network-effect product when it isn't designed for.",
  },
  {
    id: "product",
    label: "Product",
    tipX: 255, tipY: 65, spineX: 350, spineY: 200,
    color: "#3b82f6",
    colorDim: "rgba(59,130,246,0.1)",
    icon: "📦",
    causes: [
      "Feature parity gap vs WhatsApp on launch",
      "No voice/video calls on initial release",
      "Early stability and UX issues in v1",
      "No unique value proposition beyond 'private'",
    ],
    detail: "Feature parity is a contributing factor but not the primary cause. Even if Arattai had matched WhatsApp feature-for-feature, it still would have had no one to message. The product gap made activation harder, but the network absence made activation impossible. I'd rank this secondary — a product with better features might have had marginally better word-of-mouth, but it wouldn't have solved cold-start.",
  },
  {
    id: "competition",
    label: "Competition",
    tipX: 378, tipY: 335, spineX: 465, spineY: 200,
    color: "#ef4444",
    colorDim: "rgba(239,68,68,0.1)",
    icon: "⚔️",
    causes: [
      "Signal won the 'privacy-first' positioning narrative",
      "Telegram appealed to power users and large groups",
      "WhatsApp's 500M Indian user base created switching inertia",
      "Both Signal and Telegram had global credibility",
    ],
    detail: "Competition is a factor but I'd frame it carefully. Arattai wasn't losing to Signal in a fair fight — Signal won because it had a globally recognisable brand and an Elon Musk endorsement at exactly the right moment. More importantly, WhatsApp's 500M Indian user base wasn't competition Arattai could overcome with a better product. It was structural inertia. I'd call this a compounding reason why the network effect couldn't be kick-started.",
  },
  {
    id: "govt",
    label: "Govt / Vocal for Local",
    tipX: 438, tipY: 65, spineX: 520, spineY: 200,
    color: "#10b981",
    colorDim: "rgba(16,185,129,0.1)",
    icon: "🇮🇳",
    causes: [
      "IT Ministry summoning WhatsApp gave Indian apps political cover",
      "Vocal for Local narrative drove civic installs, not product-need installs",
      "Tech media positioning Arattai as 'Indian WhatsApp' inflated downloads",
      "Govt tailwind created fake demand — disappeared with the news cycle",
    ],
    detail: "This is the most interesting hypothesis because it explains why the download peak was so extreme. The government amplification and Vocal for Local narrative created a civic obligation to install Arattai — independent of any product quality. But civic obligation drives one-time installs, not daily use. Once the news cycle moved on, the political reason to have the app disappeared. This hypothesis explains the extraordinary peak. The network effect hypothesis explains the collapse.",
  },
  {
    id: "brand",
    label: "Brand / Trust",
    tipX: 625, tipY: 335, spineX: 690, spineY: 200,
    color: "#eab308",
    colorDim: "rgba(234,179,8,0.1)",
    icon: "🏷️",
    causes: [
      "Zoho known for enterprise SaaS, not consumer apps",
      "No consumer brand awareness outside the Zoho ecosystem",
      "Privacy claims not independently verified or audited",
      "Indian brand in a moment dominated by global app trust",
    ],
    detail: "Brand is a secondary hypothesis. It explains why Arattai couldn't win against Signal in a head-to-head trust comparison. But brand alone doesn't explain a 99% download collapse — users were downloading despite not knowing the brand. The collapse came from not returning, not from never installing. Brand weakness reduced the ceiling; the network effect problem is what caused the floor to be zero.",
  },
  {
    id: "retention",
    label: "Retention",
    tipX: 605, tipY: 65, spineX: 665, spineY: 200,
    color: "#22c55e",
    colorDim: "rgba(34,197,94,0.1)",
    icon: "🔄",
    causes: [
      "No re-engagement or notification loop for inactive users",
      "No onboarding flow to demonstrate value quickly",
      "No business model to fund retention marketing",
      "Day-1 retention likely <10% without a message exchange",
    ],
    detail: "Retention failure is the measurable symptom of the network effect problem. Day-1 retention for a messaging app requires the user to send or receive a message. If no one else is on the platform, that can't happen. Arattai appears to have had no re-engagement strategy, no 'your contact joined' notifications, and no hook to bring idle users back. But I'd be careful not to treat retention mechanics as the root cause — fixing notifications wouldn't have helped if there was still no one to message.",
  },
];

const TIMELINE = [
  { date: "Jun–Dec 2020", event: "Vocal for Local narrative builds", severity: "Backdrop", detail: "India bans 59 Chinese apps including TikTok and WeChat. PM Modi's Atmanirbhar Bharat campaign gains momentum. Indian consumers are primed to favour homegrown digital products. This is the cultural precondition for Arattai's surge." },
  { date: "Jan 7, 2021", event: "WhatsApp announces ToS update", severity: "Catalyst", detail: "WhatsApp announces mandatory Facebook data sharing by Feb 8. The announcement triggers immediate backlash across Indian media, tech communities, and government circles. The event that creates the surge." },
  { date: "Jan 8–9, 2021", event: "IT Ministry summons WhatsApp", severity: "Govt action", detail: "India's Ministry of Electronics and IT formally summons WhatsApp. Government officials publicly criticise WhatsApp and encourage citizens to switch to Indian alternatives — providing Arattai direct political tailwind." },
  { date: "Jan 10–14, 2021", event: "Media positions Arattai as 'Indian WhatsApp'", severity: "Opportunity", detail: "National tech media profiles Arattai as the Vocal for Local answer. Government-adjacent Twitter handles share the app. The triple catalyst (controversy + nationalism + media) creates extraordinary acquisition." },
  { date: "Jan 15, 2021", event: "Arattai hits #1 in India App Store", severity: "Peak", detail: "Estimated 500K+ installs in the first week. The surge is real, but it's driven by sentiment, not product need. This is the number I'd want to interrogate: how many of those installs activated?" },
  { date: "Jan 16–24, 2021", event: "Signal dominates the narrative", severity: "Competition", detail: "Elon Musk tweets 'Use Signal'. Signal's daily downloads hit 7.5M globally. The privacy-exodus narrative consolidates around Signal. Arattai, without a comparable endorser or trust story, loses the positioning battle." },
  { date: "Feb 8, 2021", event: "WhatsApp delays new policy", severity: "Turning point", detail: "WhatsApp delays enforcement to May 2021. The urgency evaporates. Govt officials stop amplifying. The civic reason to have Arattai installed disappears. Downloads collapse within days." },
  { date: "Feb–Mar 2021", event: "Downloads drop 99% from peak", severity: "Collapse", detail: "Arattai effectively disappears from public consciousness. The product that was #1 in the App Store weeks earlier has near-zero daily download rate. Nothing changed in the product. The narrative changed." },
];

const FIVE_WHYS = [
  {
    symptom: "Downloads dropped 99% within 8 weeks of peak",
    chain: [
      "The acquisition trigger (WhatsApp controversy + govt amplification) resolved itself",
      "Arattai had no organic growth engine — no network, no word of mouth",
      "There was no utility for users to return to — no one else was there",
      "The product had no unique value proposition beyond the moment's urgency",
    ],
    root: "Arattai was built to ride a wave, not to create one. When the wave ended, there was nothing underneath.",
    color: "#f97316",
  },
  {
    symptom: "Users installed but didn't activate (couldn't message anyone)",
    chain: [
      "Friends and family weren't on Arattai",
      "There was no 'invite contacts' or 'see who's on Arattai' feature at launch",
      "A messaging app without a mutual network has zero utility for the average user",
      "No cold-start strategy was designed into the product launch plan at all",
    ],
    root: "The product shipped into a cold-start problem with no solution to the cold-start problem. This is a product strategy failure, not an execution failure.",
    color: "#a855f7",
  },
  {
    symptom: "Signal and Telegram won the privacy exodus, not Arattai",
    chain: [
      "Users downloaded Signal in addition to or instead of Arattai",
      "Signal had a global trust reputation and a celebrity endorsement",
      "Arattai had no differentiated privacy story or audited security claims",
      "No positioning strategy to own 'Indian WhatsApp alternative' before Signal took 'privacy champion'",
    ],
    root: "Arattai entered a positioning battle it wasn't equipped to win — trust in consumer privacy is earned over years, not launched in a week.",
    color: "#ef4444",
  },
];

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

function FishboneDiagram() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = CATEGORIES.find(c => c.id === activeId) ?? null;
  return (
    <div>
      <div className="overflow-x-auto rounded-xl border p-4"
        style={{ borderColor: "var(--border)", background: "var(--surface, #111)" }}>
        <svg viewBox="0 0 900 400" className="w-full" style={{ minWidth: 600, maxHeight: 440 }}>
          <line x1="70" y1="200" x2="758" y2="200" stroke="var(--border)" strokeWidth="2.5" />
          <polygon points="758,193 774,200 758,207" fill="var(--border)" />
          <rect x="774" y="165" width="58" height="70" rx="6"
            fill="var(--surface-2, #1a1a1a)" stroke="var(--border)" strokeWidth="1.5" />
          <text x="803" y="188" textAnchor="middle" fill="var(--accent)" fontSize="7" fontFamily="monospace" fontWeight="bold">EFFECT</text>
          <text x="803" y="200" textAnchor="middle" fill="var(--text-primary, #fff)" fontSize="7" fontFamily="sans-serif" fontWeight="bold">99%</text>
          <text x="803" y="211" textAnchor="middle" fill="var(--text-primary, #fff)" fontSize="7" fontFamily="sans-serif" fontWeight="bold">Download</text>
          <text x="803" y="222" textAnchor="middle" fill="var(--text-primary, #fff)" fontSize="7" fontFamily="sans-serif" fontWeight="bold">Collapse</text>
          {CATEGORIES.map((cat) => {
            const isActive = activeId === cat.id;
            const strokeColor = isActive ? cat.color : "var(--text-secondary, #555)";
            const labelY = cat.tipY < cat.spineY ? cat.tipY - 20 : cat.tipY + 14;
            const ticks = [0.28, 0.52, 0.76].map((t) => ({
              x: cat.tipX + (cat.spineX - cat.tipX) * t,
              y: cat.tipY + (cat.spineY - cat.tipY) * t,
              dx: cat.tipY < cat.spineY ? -9 : 9,
            }));
            return (
              <g key={cat.id} style={{ cursor: "pointer" }} onClick={() => setActiveId(isActive ? null : cat.id)}>
                <line x1={cat.tipX} y1={cat.tipY} x2={cat.spineX} y2={cat.spineY}
                  stroke={strokeColor} strokeWidth={isActive ? 2.5 : 1.5} style={{ transition: "all 0.25s" }} />
                {ticks.map((t, i) => (
                  <line key={i} x1={t.x} y1={t.y} x2={t.x + t.dx} y2={t.y}
                    stroke={strokeColor} strokeWidth={1} style={{ transition: "all 0.25s" }} />
                ))}
                <circle cx={cat.spineX} cy={cat.spineY} r={isActive ? 5 : 3.5}
                  fill={isActive ? cat.color : "var(--surface, #111)"}
                  stroke={strokeColor} strokeWidth={1.5} style={{ transition: "all 0.25s" }} />
                <rect x={cat.tipX - 54} y={labelY - 13} width={108} height={22} rx={5}
                  fill={isActive ? cat.colorDim : "var(--surface-2, #1a1a1a)"}
                  stroke={isActive ? cat.color : "var(--border)"}
                  strokeWidth={isActive ? 1.5 : 1} style={{ transition: "all 0.25s" }} />
                <text x={cat.tipX} y={labelY + 2} textAnchor="middle"
                  fill={isActive ? cat.color : "var(--text-secondary, #888)"}
                  fontSize="8.5" fontFamily="sans-serif" fontWeight={isActive ? "bold" : "normal"}
                  style={{ transition: "all 0.25s" }}>{cat.label}</text>
                <rect x={cat.tipX - 54} y={labelY - 13} width={108} height={22} rx={5} fill="transparent" />
              </g>
            );
          })}
        </svg>
      </div>
      <AnimatePresence mode="wait">
        {active ? (
          <motion.div key={active.id}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mt-4 rounded-xl border p-5"
            style={{ borderColor: active.color + "55", background: active.colorDim }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{active.icon}</span>
              <h3 className="font-bold" style={{ color: active.color }}>{active.label}</h3>
            </div>
            <ul className="space-y-1.5 mb-4">
              {active.causes.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-secondary, #aaa)" }}>
                  <span style={{ color: active.color, marginTop: 3, flexShrink: 0 }}>→</span>{c}
                </li>
              ))}
            </ul>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary, #aaa)" }}>{active.detail}</p>
          </motion.div>
        ) : (
          <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="mt-4 text-center text-xs py-3" style={{ color: "var(--text-secondary, #555)" }}>
            Click any hypothesis category to see my read on it
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function DiagnosisAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {FIVE_WHYS.map(({ symptom, chain, root, color }, idx) => (
        <div key={idx} className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
          <button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4"
            style={{ background: "var(--surface, #111)" }}
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}>
            <div>
              <span className="text-xs font-mono uppercase tracking-wide" style={{ color }}>Observation</span>
              <p className="font-semibold text-sm mt-0.5" style={{ color: "var(--text-primary, #fff)" }}>{symptom}</p>
            </div>
            <motion.span animate={{ rotate: openIdx === idx ? 180 : 0 }} transition={{ duration: 0.2 }}
              style={{ color: "var(--text-secondary, #888)", flexShrink: 0 }}>▼</motion.span>
          </button>
          <AnimatePresence>
            {openIdx === idx && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}>
                <div className="px-5 pb-5 pt-3 border-t space-y-2.5"
                  style={{ borderColor: "var(--border)", background: "var(--surface-2, #0d0d0d)" }}>
                  <p className="text-xs font-mono uppercase tracking-wide mb-1" style={{ color }}>Tracing back — why?</p>
                  {chain.map((step, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <span className="text-xs font-mono shrink-0 mt-0.5" style={{ color, opacity: 1 - i * 0.15 }}>Why?</span>
                      <p className="text-sm" style={{ color: "var(--text-secondary, #aaa)" }}>{step}</p>
                    </div>
                  ))}
                  <div className="mt-3 pt-3 border-t" style={{ borderColor: color + "44" }}>
                    <p className="text-xs font-mono uppercase tracking-wide mb-1" style={{ color }}>Where it bottoms out</p>
                    <p className="text-sm font-medium italic" style={{ color: "var(--text-primary, #fff)" }}>{root}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

const SEVERITY_COLORS: Record<string, string> = {
  "Backdrop":      "#6b7280",
  "Catalyst":      "#f97316",
  "Govt action":   "#10b981",
  "Opportunity":   "#22c55e",
  "Peak":          "#3b82f6",
  "Competition":   "#ef4444",
  "Turning point": "#eab308",
  "Collapse":      "#ef4444",
};

export function ArattaiRCA() {
  const [activeSection, setActiveSection] = useState("ar-clarify");
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
          <Tag variant="type">RCA</Tag>
          <h1 className="text-4xl font-bold mt-4 mb-2" style={{ color: "var(--text-primary, #fff)" }}>
            Arattai: The One-Week Wonder
          </h1>
          <p className="text-lg mb-6" style={{ color: "var(--text-secondary, #aaa)" }}>
            How I&apos;d diagnose a 99% download collapse for an app that hit #1 in India in 8 weeks
          </p>
          <div className="rounded-xl border p-5"
            style={{ borderColor: "var(--accent)44", background: "var(--accent-08, rgba(255,140,0,0.05))" }}>
            <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--accent)" }}>
              How I&apos;m approaching this
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary, #aaa)" }}>
              I&apos;m treating this as an RCA interview question: a product went from #1 to irrelevant in 8 weeks. My job is to figure out why — not just list all the bad things that happened, but identify the primary cause, separate it from the compounding factors, and explain what I&apos;d have done differently. I&apos;ll show every step of my reasoning, including the hypotheses I considered and rejected.
            </p>
          </div>
        </div>

        {/* ── Step 1: Clarify ─────────────────────────────────────────────── */}
        <section id="ar-clarify">
          <SectionLabel>Step 1 of 8</SectionLabel>
          <SectionTitle>Clarify what I&apos;m diagnosing</SectionTitle>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary, #aaa)" }}>
            My first instinct when I hear &ldquo;downloads dropped 99%&rdquo; is: what exactly does that mean? Download count and active user count are very different metrics, and they have different root causes.
          </p>

          <div className="space-y-3">
            {[
              {
                q: "Downloads dropped — but what did the activation curve look like?",
                a: "This is the question I'd ask before anything else. Downloads dropping 99% could mean: (a) people stopped installing, or (b) people installed but never used it. If it's (b), the root cause is in the product experience, not the marketing. My hypothesis going in: it's both, but the activation failure is more diagnostic.",
              },
              {
                q: "Is this a consumer metric or a business metric problem?",
                a: "Consumer. Arattai is a B2C messaging product and the failure is at the user level — people installing and not returning. This isn't a monetisation or revenue RCA. I'm diagnosing: why did users not stay?",
              },
              {
                q: "What's the baseline I'm comparing against?",
                a: "The peak download rate during the WhatsApp controversy window in January 2021. That peak was itself extraordinary — I'd want to know if the question is 'why did it collapse' or 'why didn't the peak sustain'. My read: both. The peak was artificial, and the collapse was the inevitable consequence of an artificial peak with no retention foundation under it.",
              },
            ].map(({ q, a }, i) => (
              <motion.div key={i}
                whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 10 }} viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-xl border p-5"
                style={{ borderColor: "var(--border)", background: "var(--surface, #111)" }}>
                <p className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary, #fff)" }}>Q: {q}</p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary, #aaa)" }}>
                  <span style={{ color: "var(--accent)" }}>→ </span>{a}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="grid sm:grid-cols-4 gap-3 mt-6">
            {[
              { label: "App Store rank (peak)", value: 1,    suffix: "st",  note: "India App Store, Jan 2021" },
              { label: "Download collapse",     value: 99,   suffix: "%",   note: "Within 8 weeks of peak" },
              { label: "WhatsApp India users",  value: 500,  suffix: "M",   note: "The switching barrier" },
              { label: "Est. D30 retention",    value: 5,    suffix: "%",   note: "No network = no return" },
            ].map(({ label, value, suffix, note }) => (
              <div key={label} className="rounded-lg p-4 text-center border"
                style={{ borderColor: "var(--border)", background: "var(--surface, #111)" }}>
                <div className="text-3xl font-bold mb-1" style={{ color: "var(--accent)" }}>
                  <Counter target={value} suffix={suffix} />
                </div>
                <div className="text-xs font-medium mb-0.5" style={{ color: "var(--text-primary, #fff)" }}>{label}</div>
                <div className="text-xs" style={{ color: "var(--text-secondary, #888)" }}>{note}</div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── Step 2: Context ─────────────────────────────────────────────── */}
        <section id="ar-context">
          <SectionLabel>Step 2 of 8</SectionLabel>
          <SectionTitle>Understand the context before forming hypotheses</SectionTitle>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary, #aaa)" }}>
            I&apos;d spend time understanding the product and market before I hypothesize. An RCA on a product I don&apos;t understand is just guessing.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {[
              { label: "The product", value: "Arattai", note: "Consumer messaging app by Zoho Corp. Tamil: 'to chat'. Positioned as privacy-first WhatsApp alternative for India." },
              { label: "The market", value: "India B2C messaging", note: "WhatsApp is the de facto communication standard — 500M+ users, embedded in daily life for everything from family groups to business transactions." },
              { label: "The moment", value: "Jan 2021", note: "WhatsApp announces mandatory Facebook data sharing. IT Ministry summons WhatsApp. Vocal for Local sentiment is at peak post-China app bans." },
            ].map(({ label, value, note }) => (
              <div key={label} className="rounded-xl border p-4"
                style={{ borderColor: "var(--border)", background: "var(--surface, #111)" }}>
                <p className="text-xs font-mono uppercase tracking-wide mb-1" style={{ color: "var(--accent)" }}>{label}</p>
                <p className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary, #fff)" }}>{value}</p>
                <p className="text-xs" style={{ color: "var(--text-secondary, #888)" }}>{note}</p>
              </div>
            ))}
          </div>

          {/* Vocal for Local callout */}
          <div className="rounded-xl border p-5 mb-4"
            style={{ borderColor: "#10b98144", background: "rgba(16,185,129,0.07)" }}>
            <div className="flex items-center gap-2 mb-2">
              <span>🇮🇳</span>
              <p className="text-xs font-mono uppercase tracking-wide font-semibold" style={{ color: "#10b981" }}>
                The Vocal for Local Context — Why I Can&apos;t Ignore It
              </p>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary, #aaa)" }}>
              India had spent six months in 2020 banning Chinese apps under Atmanirbhar Bharat. When the WhatsApp controversy arrived in January 2021, the IT Ministry publicly summoned WhatsApp and government officials encouraged the switch to Indian alternatives. Arattai was the right nationality at the right moment. I&apos;d flag this early in my RCA because it means the download peak was inflated by two independent forces — the WhatsApp controversy AND a government-amplified nationalist sentiment — neither of which was product-driven demand. Any product with an Indian flag and a privacy story would have seen similar numbers. That&apos;s important context for what the peak actually means.
            </p>
          </div>

          {/* Timeline */}
          <p className="text-xs font-mono uppercase tracking-wide mb-4" style={{ color: "var(--accent)" }}>
            How the 8 weeks unfolded
          </p>
          <div className="relative pl-7 border-l space-y-6" style={{ borderColor: "var(--border)" }}>
            {TIMELINE.map(({ date, event, severity, detail }) => (
              <div key={date} className="relative">
                <div className="absolute -left-9 top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center"
                  style={{ borderColor: SEVERITY_COLORS[severity] ?? "var(--accent)", background: "var(--surface, #111)" }}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: SEVERITY_COLORS[severity] ?? "var(--accent)" }} />
                </div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-xs font-mono" style={{ color: "var(--accent)" }}>{date}</span>
                  <span className="font-semibold text-sm" style={{ color: "var(--text-primary, #fff)" }}>{event}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: (SEVERITY_COLORS[severity] ?? "#888") + "22", color: SEVERITY_COLORS[severity] ?? "#888" }}>
                    {severity}
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary, #aaa)" }}>{detail}</p>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── Step 3: Sanity Checks ────────────────────────────────────────── */}
        <section id="ar-sanity">
          <SectionLabel>Step 3 of 8</SectionLabel>
          <SectionTitle>Rule out the boring explanations</SectionTitle>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary, #aaa)" }}>
            Before I hypothesize interesting causes, I&apos;d rule out the obvious ones.
          </p>
          <div className="space-y-3">
            {[
              { check: "Is this a measurement artifact?", verdict: "No", detail: "App store download rankings and SimilarWeb traffic estimates both show the same curve. The peak and collapse are corroborated across multiple independent data sources." },
              { check: "Did Arattai make a product change that caused the drop?", verdict: "No", detail: "The collapse correlates precisely with WhatsApp's policy delay announcement on Feb 8. No product change at Arattai explains the timing. This tells me the cause is external, not internal." },
              { check: "Is this seasonal — do all apps drop after January?", verdict: "No", detail: "Other apps that surged in the same window (Signal, Telegram) maintained meaningfully higher user bases after the peak. Arattai's collapse is specific, not seasonal." },
              { check: "Did a competitor specifically attack Arattai?", verdict: "Not directly", detail: "Signal and Telegram benefited from the same window, but they didn't specifically target Arattai. Arattai lost users to WhatsApp inertia and to inactivity, not to a competitor's direct action." },
            ].map(({ check, verdict, detail }) => {
              const vc = verdict === "No" ? "#22c55e" : verdict.startsWith("Not") ? "#eab308" : "#ef4444";
              return (
                <div key={check} className="rounded-xl border p-5"
                  style={{ borderColor: "var(--border)", background: "var(--surface, #111)" }}>
                  <div className="flex items-start gap-3">
                    <span className="text-xs px-2 py-0.5 rounded-full font-semibold shrink-0 mt-0.5"
                      style={{ background: vc + "22", color: vc }}>{verdict}</span>
                    <div>
                      <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary, #fff)" }}>{check}</p>
                      <p className="text-sm" style={{ color: "var(--text-secondary, #aaa)" }}>{detail}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 rounded-xl border-l-4 p-4"
            style={{ borderColor: "var(--accent)", background: "var(--surface, #111)" }}>
            <p className="text-sm" style={{ color: "var(--text-secondary, #aaa)" }}>
              <strong style={{ color: "var(--text-primary, #fff)" }}>Conclusion: </strong>
              The collapse is real and external event-driven. The cause is not a product failure in the traditional sense — Arattai didn&apos;t break. It was never used. I&apos;m now diagnosing: why did downloads collapse when the external catalyst disappeared, and why was there no organic floor?
            </p>
          </div>
        </section>

        <Divider />

        {/* ── Step 4: Hypothesis Map ───────────────────────────────────────── */}
        <section id="ar-hypotheses">
          <SectionLabel>Step 4 of 8</SectionLabel>
          <SectionTitle>Map all the hypotheses</SectionTitle>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary, #aaa)" }}>
            Before I pick a primary cause, I&apos;d generate all plausible hypotheses. Click each bone to see my assessment — whether I think it&apos;s primary, secondary, or a compounding factor.
          </p>
          <FishboneDiagram />
        </section>

        <Divider />

        {/* ── Step 5: Prioritise & Test ────────────────────────────────────── */}
        <section id="ar-prioritise">
          <SectionLabel>Step 5 of 8</SectionLabel>
          <SectionTitle>How I&apos;d rank and test each hypothesis</SectionTitle>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary, #aaa)" }}>
            I have 7 hypotheses. I&apos;d rank them by explanatory power — which one, if true, best explains the full shape of the collapse including the timing.
          </p>

          <div className="space-y-3">
            {[
              {
                rank: "01",
                hypothesis: "Network effect cold-start — no one to message",
                test: "Look at Day 1 and Day 7 retention rates. Specifically: what % of users who installed ever sent a message? If that number is <10%, the product never activated. Cross-reference: did Arattai have a 'contacts on Arattai' feature at launch? If not, the cold-start was designed in.",
                verdict: "Primary — explains the floor being zero",
                color: "#a855f7",
              },
              {
                rank: "02",
                hypothesis: "Event-driven peak with no organic baseline",
                test: "Look at the download curve before Jan 2021. Was there any organic growth before the controversy? If organic growth was near zero, the peak was 100% borrowed. The collapse is inevitable — you can't sustain borrowed demand.",
                verdict: "Primary — explains why the collapse was total, not partial",
                color: "#f97316",
              },
              {
                rank: "03",
                hypothesis: "Govt / Vocal for Local created civic installs not product installs",
                test: "Compare download geography. If downloads spiked uniformly across India (not tech-hub concentrated), it suggests the driver was broad media/political amplification, not organic tech adoption. Civic installers have near-zero product intent.",
                verdict: "Strong contributing — explains the peak's magnitude",
                color: "#10b981",
              },
              {
                rank: "04",
                hypothesis: "Signal won the privacy narrative",
                test: "Look at cross-install rates — did users who installed Arattai also install Signal? If yes, Arattai was a backup choice, not a primary one. Also look at: did Arattai's rank drop immediately after the Elon Musk 'Use Signal' tweet?",
                verdict: "Secondary — explains why stickiness was near zero even for motivated switchers",
                color: "#ef4444",
              },
              {
                rank: "05",
                hypothesis: "Product feature gap (no calls etc.)",
                test: "If the product gap were primary, I'd expect activation rates to drop after the first session as users discovered what was missing. But the retention problem likely appears before first session completion — users open it, find no one there, close it. Feature gap is downstream of the network problem.",
                verdict: "Contributing but not primary",
                color: "#3b82f6",
              },
            ].map(({ rank, hypothesis, test, verdict, color }) => (
              <div key={rank} className="rounded-xl border p-5"
                style={{ borderColor: "var(--border)", background: "var(--surface, #111)" }}>
                <div className="flex items-start gap-4 mb-3">
                  <span className="text-2xl font-bold shrink-0" style={{ color: "var(--accent)", opacity: 0.4 }}>{rank}</span>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <p className="font-semibold text-sm" style={{ color: "var(--text-primary, #fff)" }}>{hypothesis}</p>
                      <span className="text-xs px-2 py-0.5 rounded-full shrink-0 font-medium"
                        style={{ background: color + "22", color }}>{verdict.split(" — ")[0]}</span>
                    </div>
                    <p className="text-xs" style={{ color: color }}>{verdict.includes("—") ? "→ " + verdict.split(" — ")[1] : ""}</p>
                  </div>
                </div>
                <div className="ml-10">
                  <p className="text-xs font-mono uppercase tracking-wide mb-1" style={{ color: "var(--accent)" }}>How I&apos;d test it</p>
                  <p className="text-sm" style={{ color: "var(--text-secondary, #aaa)" }}>{test}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── Step 6: Diagnosis ────────────────────────────────────────────── */}
        <section id="ar-diagnosis">
          <SectionLabel>Step 6 of 8</SectionLabel>
          <SectionTitle>Trace each observation to its root</SectionTitle>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary, #aaa)" }}>
            For each significant observable symptom, I&apos;d walk the causal chain backward until I hit something structural. Click each to see the chain.
          </p>
          <DiagnosisAccordion />
        </section>

        <Divider />

        {/* ── Step 7: My Bet ───────────────────────────────────────────────── */}
        <section id="ar-bet">
          <SectionLabel>Step 7 of 8</SectionLabel>
          <SectionTitle>What I&apos;d stake on as the root cause</SectionTitle>

          <div className="rounded-xl border p-6 mb-6"
            style={{ borderColor: "var(--accent)55", background: "var(--accent-08, rgba(255,140,0,0.05))" }}>
            <p className="text-xs font-mono uppercase tracking-wide mb-2" style={{ color: "var(--accent)" }}>Primary hypothesis</p>
            <p className="text-lg font-bold mb-3" style={{ color: "var(--text-primary, #fff)" }}>
              Arattai launched a network-effect product into a cold-start problem with no cold-start strategy. The download peak was borrowed from an external event. When the event ended, there was no organic floor because the product had never activated.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary, #aaa)" }}>
              The Vocal for Local sentiment and the WhatsApp controversy explain the extraordinary peak. The network effect failure explains why the floor was zero. These two hypotheses together account for the entire shape of the curve — the spike and the cliff — without needing any other cause.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="rounded-xl border p-4" style={{ borderColor: "#22c55e44", background: "rgba(34,197,94,0.05)" }}>
              <p className="text-xs font-mono uppercase tracking-wide mb-2" style={{ color: "#22c55e" }}>Evidence that supports it</p>
              <ul className="space-y-1.5">
                {[
                  "Download collapse correlates exactly with WhatsApp policy delay, not with any Arattai product change",
                  "No evidence Arattai had a contact import or 'find friends' feature at launch",
                  "Signal maintained meaningfully higher users post-peak — it had a pre-existing tech community to seed from",
                  "No organic baseline before the Jan 2021 surge — 100% borrowed demand",
                ].map((e, i) => (
                  <li key={i} className="text-sm flex items-start gap-2" style={{ color: "var(--text-secondary, #aaa)" }}>
                    <span style={{ color: "#22c55e", flexShrink: 0 }}>✓</span>{e}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border p-4" style={{ borderColor: "#ef444444", background: "rgba(239,68,68,0.05)" }}>
              <p className="text-xs font-mono uppercase tracking-wide mb-2" style={{ color: "#ef4444" }}>Strongest counter-argument</p>
              <ul className="space-y-1.5">
                {[
                  "Even with a cold-start strategy, WhatsApp's inertia (500M users) may have been insurmountable",
                  "Signal also had a cold-start problem in India — why did it fare better?",
                  "Product quality (no calls etc.) may have been the real activation killer, not network absence",
                ].map((e, i) => (
                  <li key={i} className="text-sm flex items-start gap-2" style={{ color: "var(--text-secondary, #aaa)" }}>
                    <span style={{ color: "#ef4444", flexShrink: 0 }}>✗</span>{e}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-xl border p-4" style={{ borderColor: "var(--border)", background: "var(--surface, #111)" }}>
            <p className="text-xs font-mono uppercase tracking-wide mb-2" style={{ color: "var(--accent)" }}>
              How I&apos;d address the counter-arguments
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary, #aaa)" }}>
              WhatsApp&apos;s inertia is real but not deterministic — Signal and Telegram both built viable user bases in India. The difference is both had seeding strategies: Signal seeded through tech/privacy communities, Telegram through large-group enthusiasts. Arattai had neither. On Signal&apos;s cold-start: Signal&apos;s endorsement by Musk created a concentrated seeding event in a tech-savvy community that could afford to install en masse simultaneously. That&apos;s the rarest cold-start solution. Arattai would have needed a different one. On product quality: the product gap is real but secondary — even a WhatsApp-feature-complete Arattai would have found no one to message.
            </p>
          </div>

          <div className="mt-6 grid sm:grid-cols-3 gap-3">
            {[
              { value: 500,  suffix: "K+", label: "Estimated week-1 installs", note: "Based on #1 App Store rank" },
              { value: 7500, suffix: "%",  label: "Signal global download surge", note: "Same window — won the narrative" },
              { value: 99,   suffix: "%",  label: "Arattai download collapse", note: "Within 8 weeks of peak" },
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

        {/* ── Step 8: Recommendations ──────────────────────────────────────── */}
        <section id="ar-recommend">
          <SectionLabel>Step 8 of 8</SectionLabel>
          <SectionTitle>What I would have done differently</SectionTitle>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary, #aaa)" }}>
            If I had been PM on Arattai and knew a controversy-driven surge was coming, here&apos;s what I&apos;d have built — and what I&apos;d explicitly not have done.
          </p>

          <div className="space-y-4">
            {[
              {
                n: "01",
                action: "Design the cold-start strategy before writing the first line of product code",
                rationale: "The question 'how does the first user exchange their first message?' should have been answered before launch. Options: seed through existing Zoho Workplace (enterprise) users who could create family groups, a 'bring 5 contacts' referral unlock, or a geo-concentrated launch in one city to build critical mass locally. Any of these would have been better than nothing.",
              },
              {
                n: "02",
                action: "Treat the controversy window as a retention sprint, not a marketing sprint",
                rationale: "When the WhatsApp controversy created the surge, the product team should have gone into all-hands retention mode: build contact import in 72 hours, push 'your contact just joined' notifications, run group migration features. Every engineering hour during the controversy window should have been spent on activation and retention, not new features.",
              },
              {
                n: "03",
                action: "Own the 'Indian messaging' positioning explicitly before Signal took 'privacy'",
                rationale: "Signal won the global privacy narrative. Arattai couldn't compete on that. The differentiated position was 'built for India, by Indians' — local language support, India-specific features (UPI integration, regional language keyboards), Zoho's existing trust in Indian business. That's a position Signal can't occupy. Arattai never claimed it explicitly.",
              },
              {
                n: "04",
                action: "What I would NOT have done: scaled marketing during the controversy peak",
                rationale: "The worst possible use of the controversy window was pouring marketing spend into downloads. Every additional install without a working activation experience is a future uninstall. Marketing spend during the peak would have accelerated the vanity number and made the collapse look even worse in retrospect. The constraint was activation capacity, not download volume.",
              },
            ].map(({ n, action, rationale }) => (
              <motion.div key={n}
                whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -16 }} viewport={{ once: true }}
                className="flex gap-4 items-start">
                <span className="text-2xl font-bold shrink-0 mt-0.5" style={{ color: "var(--accent)", opacity: 0.35 }}>{n}</span>
                <div className="rounded-xl border p-4 flex-1"
                  style={{ borderColor: n === "04" ? "#ef444433" : "var(--border)", background: "var(--surface, #111)" }}>
                  <h3 className="font-semibold text-sm mb-2"
                    style={{ color: n === "04" ? "#ef4444" : "var(--text-primary, #fff)" }}>{action}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary, #aaa)" }}>{rationale}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
