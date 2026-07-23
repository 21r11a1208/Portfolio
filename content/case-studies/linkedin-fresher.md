---
slug: "linkedin-fresher"
title: "LinkedIn for Freshers"
type: "Product Enhancement"
status: "Self-initiated"
description: "A product enhancement proposal for LinkedIn — reducing the job-search friction freshers face when no explicit 0-experience filter exists and every posting requires manual inspection."
problemStatement: "Fresh graduates face high job-search friction on LinkedIn due to the lack of explicit zero-experience filters, forcing manual inspection of every entry-level posting."
businessImpact: "Proposed UX changes projected to increase entry-level job application completion rates and reduce user drop-off in the zero-experience segment."
readTime: "5 min read"
order: 7
lastModified: "2025-03-01"
priority: 0.8
sections:
  - id: "intro"
    blocks:
      - type: "callout"
        title: "How I'm approaching this"
        body: |
          I'm walking through this the way I would in a product design interview — out loud, showing my reasoning at each step. I'll start by scoping the problem, pick the user I'm solving for and why, generate a wide brainstorm before cutting it down, pick one north-star metric and defend it, and then explicitly call out what I'm leaving on the table. The goal isn't a perfect answer — it's a clear reasoning chain.
  - id: "clarify"
    toc_label: "1. Clarify"
    kicker: "Step 1 of 8"
    heading: "Clarify the problem"
    blocks:
      - type: "prose"
        body: |
          Before I jump in, I'd ask a few clarifying questions to make sure I'm solving the right problem.
      - type: "card-list"
        cards:
          - title: "Is this an acquisition problem or an engagement problem?"
            body: |
              Engagement. Freshers know LinkedIn exists. The friction isn't getting them onto the platform — it's what happens once they're searching for jobs. I'm scoping to the job-search experience specifically, not profile discovery or recruiter reach.
          - title: "Are we optimising for freshers finding jobs faster, or for LinkedIn's business?"
            body: |
              Both, and they're aligned. A fresher who gets a job through LinkedIn becomes an employed professional — LinkedIn's core power user. The acquisition cost of a life-long user is effectively zero if the platform earns trust at the first-job stage. This is a long-term LTV play, not just a UX fix.
          - title: "Which market am I designing for primarily?"
            body: |
              India, but the pattern is global. India has the highest density of this problem — 10M graduates/year, WhatsApp-native job search culture, high LinkedIn penetration among students, and the Naukri benchmark showing there's a clear market for fresher-specific job experiences. I'll design for India with global generalisability in mind.
          - title: "What's in scope?"
            body: |
              Job discovery and filtering experience for users with 0–1 year of experience. Out of scope: profile optimisation features, recruiter-side products, LinkedIn Learning tie-ins. I may reference them as future v2 work.
  - id: "user"
    toc_label: "2. The User"
    kicker: "Step 2 of 8"
    heading: "Who am I solving for?"
    blocks:
      - type: "prose"
        body: |
          I wouldn't just say "freshers." I'd segment first, then pick one segment to anchor the solution on.
      - type: "card-list"
        cards:
          - title: "Tier 1 CS grad"
            note: "IIT/NIT graduate, strong projects, high network"
            body: |
              **Friction: Low**

              Already gets recruiter inbound. LinkedIn works reasonably well for them.
          - title: "Tier 2/3 grad"
            note: "B.Tech from state university, solid skills, no network"
            highlight: true
            body: |
              **Friction: Very High**

              Has to find every opportunity outbound. The filter problem hits them hardest.
          - title: "Non-tech fresher"
            note: "Commerce/arts grad looking for marketing, ops, analyst roles"
            body: |
              **Friction: High**

              Even fewer fresher-friendly filters in their domain. But a harder design problem — I'd address after tech freshers.
      - type: "callout"
        title: "The user I'm designing for"
        body: |
          **Priya — B.Tech CSE 2024, Tier-2 college, Hyderabad**

          Opens LinkedIn every morning. Spends 2–3 hours searching. Applies to 5–8 jobs. Gets called back by 0–1.

          > "I spend more time figuring out if I can apply than actually applying. Most of what I see isn't for me — but I don't know that until I'm halfway through the job description."
      - type: "prose"
        body: |
          **Her current job-search journey**
      - type: "card-list"
        cards:
          - title: "Search 'Software Engineer'"
            note: "Hopeful"
            body: "2,000+ results"
          - title: "Filter: Entry Level"
            note: "Optimistic"
            body: "Still 800+ — filter is broken"
          - title: "Open posting #1"
            note: "Neutral"
            body: "'2 years required'"
          - title: "Open postings #2–#8"
            note: "Frustrated"
            body: "Same pattern, every time"
          - title: "Find one relevant posting"
            note: "Relieved"
            body: "1 in 9. Applies."
          - title: "Repeat tomorrow"
            note: "Resigned"
            body: "No system improvement"
  - id: "hypothesis"
    toc_label: "3. Hypothesis"
    kicker: "Step 3 of 8"
    heading: "What do I think is actually happening?"
    blocks:
      - type: "prose"
        body: |
          I wouldn't jump to solutions yet. I'd form a hypothesis about the root problem first — because the solution shape is very different depending on which one is true.
      - type: "card-list"
        cards:
          - title: "H1: The 'Entry Level' filter is a false signal"
            note: "Verdict: Primary"
            body: |
              35–40% of jobs tagged 'Entry Level' on LinkedIn require 2+ years of experience. Recruiters aren't lying — they just use the field inconsistently. The filter gives freshers false confidence and wastes more time than no filter at all.
          - title: "H2: Freshers lack confidence, not information"
            note: "Verdict: Secondary"
            body: |
              ~72% of freshers self-filter out of roles they're actually eligible for. The JD language ('preferred: 2 years') reads as a hard requirement even when it isn't. This is a signal design problem — the product doesn't tell users what's a requirement vs what's a preference.
          - title: "H3: LinkedIn's graph isn't being used for freshers"
            note: "Verdict: Opportunity"
            body: |
              LinkedIn's unique advantage is the professional graph — alumni data, company hiring patterns, career paths. None of this is surfaced for freshers. Naukri doesn't have this data. This is an opportunity, not just a problem.
          - title: "H4: This is a recruiter behaviour problem, not a product problem"
            note: "Verdict: Rejected"
            body: |
              If recruiters filled in the experience field correctly, the existing filter would work. But I'm not betting on changing recruiter behaviour without a product forcing function — they have no incentive to tag carefully. The product has to compensate.
      - type: "callout"
        title: "What I'd test before building"
        body: |
          I'd pull a sample of 500 "Entry Level" LinkedIn jobs in India and manually score them against experience requirements. If H1 is confirmed at >30% false-positives, the fix is a product-layer signal, not recruiter education. I'd also run 10 user interviews specifically probing for whether the confidence gap (H2) is real or rationalised.
  - id: "brainstorm"
    toc_label: "4. Brainstorm"
    kicker: "Step 4 of 8"
    heading: "Everything I could build"
    blocks:
      - type: "prose"
        body: |
          Before I cut, I'd generate broadly. Here are 8 ideas — ranging from obvious to unconventional. I'm not filtering yet.
      - type: "card-list"
        cards:
          - title: "Fresher Mode toggle"
            highlight: true
            body: |
              A persistent filter toggle in job search that combines structured experience fields + NLP signals to surface only 0–1yr roles.

              **Keeping:** Highest impact per unit of effort. Directly addresses the core friction — filtering before the user opens anything. Doesn't require recruiter behaviour change to work.
          - title: "Fresher-Friendly badge on job cards"
            highlight: true
            body: |
              ML-powered badge visible in search results before opening a posting, so users can scan without clicking.

              **Keeping:** Eliminates the per-posting read-to-qualify loop. Works even without Fresher Mode active. Builds trust in the filter system over time.
          - title: "Dedicated 'Fresh Start' job hub"
            highlight: true
            body: |
              A separate tab or section for campus roles, new-grad programs, and alumni-referred entry-level openings.

              **Keeping:** Leverages LinkedIn's unique asset — the professional graph — for freshers. Alumni connections are a higher-quality signal than any keyword filter.
          - title: "Experience mismatch signal before applying"
            highlight: true
            body: |
              A soft warning before submission: 'This role typically looks for X years. Similar profiles still apply — here's the data.'

              **Keeping:** Solves the confidence gap without gatekeeping. 72% of eligible freshers self-filter; honest data flips that.
          - title: "Fresher profile amplifier"
            body: |
              Guided setup flow to frame projects, coursework, and certifications as work-equivalent experience.

              **Cutting:** Important but it's a supply-side fix (making the fresher more visible to recruiters). The core problem is demand-side friction (freshers finding relevant roles). I'd build this in v2 after the search experience is fixed.
          - title: "Job alert with 'Fresher verified' pre-filter"
            body: |
              Email/push alerts that only fire when a new role passes the fresher-signal threshold.

              **Cutting:** Good retention feature but doesn't solve the in-session discovery problem. Also depends on having the NLP model first. Natural v1.5 addition.
          - title: "Employer 'Open to freshers' recruitment badge"
            body: |
              A company-level certification on the LinkedIn company page showing hiring history of freshers.

              **Cutting:** High-value signal but requires significant recruiter-side adoption work. Wrong bet for v1 — build demand-side trust first, then pull recruiters in.
          - title: "AI assistant that evaluates fit and drafts message"
            body: |
              'You're 70% fit for this role. Here's what to highlight in your application.' AI-drafted outreach message.

              **Cutting:** Scope creep. Solving for fit communication before solving for finding the right role is putting the cart before the horse. Also, LinkedIn already has AI features here.
      - type: "card-list"
        cards:
          - title: "Moving forward with"
            items:
              - "Fresher Mode toggle"
              - "Fresher-Friendly badge on job cards"
              - "Dedicated 'Fresh Start' job hub"
              - "Experience mismatch signal before applying"
          - title: "Parked for later"
            items:
              - "Fresher profile amplifier"
              - "Job alert with 'Fresher verified' pre-filter"
              - "Employer 'Open to freshers' recruitment badge"
              - "AI assistant that evaluates fit and drafts message"
  - id: "prioritise"
    toc_label: "5. Prioritise"
    kicker: "Step 5 of 8"
    heading: "How I'd sequence the 4 ideas I kept"
    blocks:
      - type: "prose"
        body: |
          I have 4 ideas I want to build. I still need to decide what's P0 (launch together), P1 (sprint 2), and what waits for validation.
      - type: "comparison-table"
        columns:
          - "Impact on north star"
          - "Effort"
          - "Dependencies"
          - "Priority"
        rows:
          - label: "Fresher Mode Toggle"
            values: ["High — directly filters irrelevant results", "Medium", "NLP model", "P0"]
          - label: "Fresher-Friendly Badge"
            values: ["High — eliminates per-card manual read", "Medium", "Same NLP model as above", "P0"]
          - label: "Experience Mismatch Signal"
            values: ["Medium — confidence gap fix", "Low", "None — structured field only", "P0"]
          - label: "Fresh Start Hub"
            values: ["Medium-High — LinkedIn graph leverage", "High", "Alumni data pipeline", "P1"]
      - type: "callout"
        title: "Why Toggle + Badge ship together"
        body: |
          The Toggle and Badge share the same NLP model — the infrastructure cost is incurred once. If I ship the Toggle without the Badge, the filter works but search results still look identical. If I ship the Badge without the Toggle, users get signal on individual cards but still have to scroll past irrelevant ones. Together, they solve the problem end-to-end. Shipping separately would halve the impact without halving the effort.
  - id: "solution"
    toc_label: "6. What I'd Build"
    kicker: "Step 6 of 8"
    heading: "What I'd actually build"
    blocks:
      - type: "prose"
        body: |
          Spec for the 4 features I'd ship, in priority order. Click each to see the design decisions.
      - type: "tabs"
        panels:
          - label: "Fresher Mode Toggle"
            title: "Fresher Mode Toggle"
            badge: "P0"
            description: |
              A persistent toggle in the Jobs search bar that activates an ML-powered filter: experience_years ≤ 1 in the structured field + NLP detection of fresher-signal phrases in JD text + recruiter-set opt-in flag. Non-qualifying jobs are dimmed (not hidden) when active — transparency over suppression. Persists across sessions in user settings.
            userStory: "As a fresher, I want one toggle that filters to jobs genuinely open to me, so I stop manually reading 40 job descriptions to find 4 relevant ones."
            acceptanceCriteria:
              - "Toggle visible in Jobs search bar, persists in user settings"
              - "Combines 3 signals: structured experience field + NLP + recruiter opt-in"
              - "Non-qualifying jobs dimmed (not hidden) — user retains full visibility"
              - "Precision target: ≥85% of surfaced jobs require ≤1yr experience"
              - "Recall target: ≥90% of genuinely entry-level jobs are surfaced"
          - label: "Fresher-Friendly Badge"
            title: "Fresher-Friendly Badge"
            badge: "P0"
            description: |
              A visible badge on job cards in search results — before the user opens the posting. Awarded by LinkedIn's NLP system when the JD contains verified fresher-signal language, or when the recruiter explicitly opts in. The badge eliminates the need to open a posting just to determine eligibility. Confidence threshold: ≥80% before the badge fires.
            userStory: "As a fresher browsing search results, I want a visual signal on each card that tells me whether the role is accessible before I invest time reading the full JD."
            acceptanceCriteria:
              - "Badge shown on job card in search results, not only inside the posting"
              - "ML confidence threshold ≥80% required to display badge"
              - "Recruiter opt-in available in posting creation flow"
              - "Badge links to 'why this qualified' breakdown when clicked"
              - "Badge click-through rate tracked as model quality signal"
          - label: "Fresh Start Hub"
            title: "Fresh Start Hub"
            badge: "P1"
            description: |
              A dedicated tab in LinkedIn Jobs surfacing: campus recruitment postings, new-grad programs (Google APM, Microsoft Explore, etc.), internship-to-hire pipelines, and alumni-referred entry-level roles. Personalised by degree, field, graduation year, and location. The key differentiator: uses the alumni graph — 'Companies where graduates from your college got their first job.'
            userStory: "As a recent graduate, I want a dedicated space for graduate-level opportunities so I'm not searching in the same pool as candidates with 5+ years of experience."
            acceptanceCriteria:
              - "Dedicated 'Fresh Start' tab in Jobs navigation"
              - "Feed personalised by: degree field, graduation year, location, skills"
              - "Alumni filter: 'Companies where alumni from your college work'"
              - "Known new-grad programs pinned by company"
              - "Campus recruitment postings tagged and surfaced here first"
          - label: "Experience Mismatch Signal"
            title: "Experience Mismatch Signal"
            badge: "P0"
            description: |
              Before a fresher applies to a role requiring 2+ years, LinkedIn surfaces a soft prompt: 'This role typically looks for X years. You have Y. Many applicants with similar profiles still apply — you can too.' Crucially, this never blocks the application. It replaces ambiguity with honest data, reducing both self-filtering (eligible freshers who don't apply) and misfires (clearly unsuitable applications).
            userStory: "As a fresher, I want honest feedback about my fit before applying, so I can make an informed decision rather than guessing or anxiety-filtering myself out."
            acceptanceCriteria:
              - "Prompt shown only when structured experience gap ≥2 years"
              - "Tone is encouraging, not gatekeeping — never blocks the application"
              - "Shows similar-profile apply rate: 'X% of applicants with 0–1yr exp applied'"
              - "User can dismiss permanently per-role"
              - "A/B test: measure downstream application and interview rate with/without prompt"
  - id: "metric"
    toc_label: "7. The Metric"
    kicker: "Step 7 of 8"
    heading: "The one number I'd track"
    blocks:
      - type: "prose"
        body: |
          I'd resist reporting a dashboard of 6 metrics. The discipline is picking ONE that best captures whether the problem is solved — and being honest about the trade-off.
      - type: "callout"
        title: "North Star Metric"
        body: |
          **Qualified applications per search session — fresher cohort**

          A "qualified application" = applied to a role where experience requirement ≤ 1yr. This directly measures whether the fresher found relevant roles and had the confidence to act. Target: move from the current estimated 1–2 per session to 3–4.
      - type: "prose"
        body: |
          **Why I rejected the obvious alternatives:**
      - type: "card-list"
        cards:
          - title: "✗ Total applications submitted"
            body: |
              Can go up while match quality drops. A fresher applying to 20 clearly wrong roles looks like a win in this metric. It measures volume, not signal quality.
          - title: "✗ DAU among 0–2yr experience users"
            body: |
              Freshers with high job-search intent already have high DAU — frustration and all. Improving DAU without improving outcomes would be a hollow metric win.
          - title: "✗ Job-to-hire conversion rate"
            body: |
              I don't control post-application outcome. Recruiter quality, market conditions, and interview performance are all out of scope. Don't measure things you can't influence.
          - title: "✗ Time spent in Jobs section"
            body: |
              Engagement time going down is actually success if I reduce the time wasted on irrelevant postings. A 'reduce time' improvement would look bad in an engagement metric.
      - type: "card-grid"
        variant: "counter"
        columns: 3
        cards:
          - label: "Target reduction in time-to-first-apply"
            value: 50
            suffix: "%"
            sub: "Primary UX outcome"
          - label: "Addressable fresher users on LinkedIn India"
            value: 22
            suffix: "M"
            sub: "~22% of 100M India users"
          - label: "NLP precision target for Fresher-Friendly badge"
            value: 85
            suffix: "%"
            sub: "Below this = broken trust"
  - id: "tradeoffs"
    toc_label: "8. Left Out"
    kicker: "Step 8 of 8"
    heading: "What I'm consciously leaving out — and why"
    blocks:
      - type: "prose"
        body: |
          Good PM thinking isn't just about what you build — it's about what you decide NOT to build and why. Here are my four explicit trade-offs.
      - type: "card-list"
        numbered: true
        cards:
          - title: "I'm not hiding non-fresher jobs"
            body: |
              Fresher Mode dims irrelevant results, it doesn't remove them. If I hide them, I create a two-tier job market where freshers lose access to stretch opportunities and recruiters eventually have a 'fresher-only' posting strategy that ghettoises entry-level roles. The toggle is a signal layer, not a fence.

              > **The tension I'm accepting:** This means the mode feels less 'clean' than a full filter. That's a deliberate trade-off for long-term equity.
          - title: "I'm not launching the Fresher Profile Amplifier in v1"
            body: |
              Profile visibility is a supply-side fix — it helps recruiters find freshers. But the core problem is demand-side: freshers can't find relevant roles. Fixing supply without fixing demand means a better-seen candidate who still hits the same search-friction wall. Sequence matters.

              > **The tension I'm accepting:** Freshers often ask for profile help. This will feel like a gap in v1. I'd communicate the roadmap clearly.
          - title: "I'm not changing recruiter posting behaviour in v1"
            body: |
              Recruiters don't fill in experience fields accurately. I could build a 'suggest experience level' nudge into the posting flow — but recruiter adoption is slow and I don't control that surface in this initiative. The NLP model compensates for recruiter inconsistency without requiring behaviour change.

              > **The tension I'm accepting:** Long-term, recruiter data quality is the right fix. But I'd rather ship a working product in 6 weeks than a perfect product in 18.
          - title: "I'm not A/B testing the Badge at launch"
            body: |
              I'd launch the Badge only to NLP confidence ≥80% predictions from day one — so there's no 'without badge' control group in production. The risk of shipping a low-precision badge (and destroying trust) outweighs the experimental rigour of a clean A/B. I'd measure badge click-through and downstream apply rate as a proxy for model quality.

              > **The tension I'm accepting:** This means I can't cleanly attribute apply-rate lift to the Badge vs the Toggle. I'd use holdout cohorts by college cohort rather than individual randomisation.
---
