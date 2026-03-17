# Portfolio Website — B Anish
## Spec file for Claude Code 
---

## WHO THIS IS FOR

**Name:** Bonagiri Anish (B Anish)
**Role:** Engineer transitioning to Product Manager
**Location:** Hyderabad, India
**Email:** anibaaabuuu@gmail.com
**LinkedIn:** https://www.linkedin.com/in/b-anish-a963bb337/
**GitHub:** Ailur0
**Tagline:** "Engineer who thinks in products. Builder who starts with users."

---

## WHAT THIS SITE IS

A personal portfolio for a PM job seeker. The goal is to:
1. Tell Anish's story — from engineer to product thinker
2. Showcase real PM work: product breakdowns, PRDs, case studies, RCA, metrics analysis
3. Feel like a product itself — well-designed, interactive, thoughtful
4. Get hiring managers to reach out

---

## AESTHETIC DIRECTION

**Vibe:** Playful but credible. Think: a product manager who has taste. Not corporate. Not a boring resume website. Not over-designed either.

**Inspiration:** A mix of a product teardown blog, an interactive case study deck, and a personal journal. Feels like you're exploring someone's mind, not reading their CV.

**Visual direction:**
- Dark background (near black, not pure black — something like #0f0f14)
- Accent color: electric lime / yellow-green (#c8f060) — used sparingly for highlights, CTAs, hover states
- Secondary accent: a warm off-white (#f0ede6) for body text
- Typographic personality: pair a bold, slightly quirky display font (something like Syne, Space Grotesk, or Clash Display) with a clean readable body font (DM Sans or Plus Jakarta Sans)
- Generous whitespace with moments of density
- Cards that feel tactile — slight shadow, subtle border, hover lift effect
- Cursor: custom cursor (small dot that follows the mouse, expands on hover over interactive elements)
- Grain texture overlay on the background — very subtle, adds depth
- Smooth scroll throughout
- Section transitions that feel intentional

**Animations:**
- Hero text: staggered reveal on load (each word or line fades + slides up)
- Cards: fade in on scroll (Intersection Observer)
- Hover on project cards: subtle tilt effect (CSS 3D transform)
- Navigation: sticky, blurs background on scroll
- Page transitions if using a framework with routing

**DO NOT:**
- Use purple gradients
- Use stock photo hero images
- Use Inter or Roboto as the primary font
- Make it look like a template
- Use lorem ipsum anywhere — every word should be real

---

## SITE STRUCTURE

### 1. HERO SECTION
Full viewport height. Centered or left-aligned layout.

**Content:**
- Name: B Anish
- Title: "Aspiring Product Manager" or "Engineer. Builder. Product Thinker."
- One-liner: "I built a production platform for PMO leads and executives at RealPage. Now I'm looking for the next problem worth solving."
- Two CTAs: "See My Work" (scrolls to projects) and "Get In Touch" (scrolls to contact or opens email)
- Subtle background animation: floating geometric shapes, or a slow-moving mesh gradient, or particle dots — nothing distracting

### 2. ABOUT SECTION
Two-column layout. Left: text. Right: a fun visual element (could be a terminal-style card showing skills, or a stats block with animated counters).

**Content:**
- Short bio (2-3 paragraphs):
  > I'm a recent IT graduate from Hyderabad who spent a year at RealPage co-owning PMOrbit, a production project management platform built from 0 to 1 for PMO leads and executive leadership. I ran user interviews, managed the roadmap, defined requirements, and shipped features that reduced handoff friction by 40%.
  >
  > My background is full-stack — React, TypeScript, .NET Core, SQL — which means I can sit in a system design conversation and a user interview in the same day and add value in both. I don't need things explained twice.
  >
  > I'm currently looking for APM or PM roles where I can own a product area end to end. If you're building something real and need someone who moves fast, thinks in user problems, and writes specs developers can build from — let's talk.

- Stats block (animated counters):
  - 1 Production platform shipped from 0 to 1
  - 40% reduction in handoff friction
  - 95% faster dashboard load time
  - 100% delivery reliability restored
  - 12 months of sprint cycles owned

- Skills tags (pill-shaped, hover glow effect):
  Product: Requirements Gathering, Backlog Management, Roadmap Planning, User Interviews, Funnel Analysis, Sprint Planning, Stakeholder Management, PRD Writing, Metrics & RCA, Competitor Analysis
  Technical: React, TypeScript, .NET Core (C#), REST APIs, SQL, Python, Figma

### 3. EXPERIENCE SECTION
Timeline layout. Each entry expands on click to show more detail.

**RealPage, Inc.**
Role: Software Development Intern (Product & Delivery focus)
Duration: Nov 2024 - Nov 2025
Location: Hyderabad, On-site
Highlight: Co-owned PMOrbit from 0 to production
Key achievements:
- Conducted user interviews with PMO leads and executives, translated findings into requirements and user stories
- Co-owned product roadmap, maintained prioritised backlog across sprint cycles
- Delivered role-aware dashboards, automated RAID logs, portfolio overviews — reducing handoff friction by 40%
- Shipped AskOrbit (AI chatbot for querying project health in natural language)
- Re-engineered KPI widgets and risk heatmaps — 95% faster load time
- Built automated PDF executive report generation
- Restored 100% delivery reliability by migrating email/SMS orchestration into resilient config services
- Mapped login-to-dashboard funnel, uncovered two critical UX gaps resolved in next sprint

**1Stop.ai**
Role: Web Developer Intern
Duration: Jun 2023 - Sep 2023
Location: Remote
Key achievements:
- Built PHP and Laravel applications including a REST API-integrated task manager

### 4. PROJECTS / PORTFOLIO SECTION
This is the most important section. Grid of cards. Each card opens into a full case study modal or page.

**Card design:** Project name, type tag (PRD / Case Study / Product Breakdown / RCA), one-line description, "Read More" button. Hover: card tilts slightly, accent color border appears.

**Projects to include:**

#### A. PMOrbit — Full Case Study
Type: Case Study
Status: Real, shipped in production
Content to include:
- Problem: fragmented project data, manual reporting, no single source of truth
- Users: PMO leads, project managers, executive leadership
- Discovery: user interviews, pain cataloguing, funnel analysis
- Solution: role-aware dashboards, automated RAID logs, AI chatbot, PDF reports
- Metrics: 40% friction reduction, 95% load improvement, 100% notification reliability
- Learnings: what worked, what had to be rebuilt, what you'd do differently

#### B. AskOrbit — Product Breakdown
Type: Product Breakdown
Content:
- What it is: AI chatbot embedded in PMOrbit for natural language project health queries
- Problem it solved: navigating dashboards is slow when you just need one answer
- How it was scoped and built
- What good looked like (metrics, user feedback)
- Limitations and what would make it better

#### C. KeyStay — PRD (Conceptual)
Type: PRD
Content:
- Problem: vacation rental management is fragmented for property owners
- Target users: small-to-medium vacation rental hosts
- MVP feature set: bookings, AI-driven pricing, guest communication
- User stories
- Prioritisation rationale
- Success metrics

#### D. AgriDrone — Case Study (Conceptual)
Type: Case Study
Content:
- Problem: agricultural drone services are inaccessible to small farmers
- Discovery: user interviews surfacing trust and geographic matching as core barriers
- Solution: geospatial matching + verified drone operator profiles
- Team: led 3-member team
- Key decisions and trade-offs

#### E. College ERP — Product Teardown
Type: Product Teardown
Content:
- ERP analysed: CampX (used at Geethanjali College)
- Most painful workflow: CO attainment entry for NBA accreditation
- What the ERP does well
- What it does poorly
- Specific redesign recommendation: auto CO attainment calculation from marks module, one-click NBA report generation
- How success would be measured

#### F. Metrics & RCA Exercise — LinkedIn DAU Drop
Type: RCA
Content:
- Hypothetical: LinkedIn DAU drops 15% in India over 2 weeks
- Clarify: which users, which platform, which actions
- Internal checks: was there a deployment, a UI change?
- External checks: competitor activity, news cycle
- Funnel analysis: acquisition, activation, retention breakdown
- Top hypotheses ranked by likelihood
- Recommended validation steps

### 5. WRITING SECTION
Grid of Medium article cards. Each links to the Medium article.

Articles:
1. The PM Skills I Didn't Expect to Learn as a Developer
2. You Can't Out-Code a Machine. Here's What You Can Do.
3. Anthropic Just Released a Report on AI and Jobs. Here's What It Actually Means for Freshers.
4. That "Summarize with AI" Button Might Be Lying to You
5. I Applied to Several PM Roles in One Week. Here's What the Process Actually Looks Like.

Card design: Article title, subtitle, estimated read time, "Read on Medium" button.

### 6. CONTACT SECTION
Clean, minimal. Dark card with a form or just direct links.

**Content:**
- Heading: "Let's talk about products."
- Subtext: "I'm currently open to APM and PM roles. If you're building something interesting, I'd love to hear about it."
- Email button: anibaaabuuu@gmail.com
- LinkedIn button: linkedin.com/in/b-anish-a963bb337
- Optional: a small terminal-style Easter egg — typing "hire anish" triggers a confetti animation or a fun response

---

## TECHNICAL REQUIREMENTS

**Recommended stack:** Next.js (React) + Tailwind CSS + Framer Motion
- Next.js for routing between case study pages
- Tailwind for utility-first styling
- Framer Motion for animations (page transitions, scroll reveals, hover effects)

**Alternatively:** Plain HTML/CSS/JS if keeping it simple — but lose some of the animation capability.

**Hosting:** Vercel (free, easy deployment from GitHub)

**Domain suggestion:** banish.dev or anishb.in or getanish.com

**Performance:**
- Lazy load images
- Optimise fonts (use next/font or preload)
- No unnecessary dependencies
- Target Lighthouse score 90+

**Responsiveness:**
- Mobile first
- All case study modals should work on mobile
- Navigation collapses to hamburger on mobile

**Accessibility:**
- Semantic HTML
- Alt text on all images
- Keyboard navigable
- Sufficient colour contrast (especially lime on dark background — check contrast ratio)

---

## CONTENT PLACEHOLDERS TO FILL LATER

These sections exist in the spec but need Anish to write the full content:
- [ ] Full PRD for KeyStay (user stories, acceptance criteria, edge cases)
- [ ] Full case study writeup for AgriDrone
- [ ] Full RCA writeup for LinkedIn DAU drop
- [ ] Profile photo (used in About section and OG image)
- [ ] Medium article URLs (once published)
- [ ] Any wireframes or Figma mockups from PMOrbit (if shareable)

---

## TONE OF COPY THROUGHOUT

- First person, conversational
- Confident without being arrogant
- Specific over generic — every claim backed by a number or a story
- No buzzwords: do not use "passionate", "dynamic", "synergy", "leverage"
- Short sentences. Active voice.
- No em dashes

---

## EASTER EGGS AND PERSONALITY TOUCHES

These are optional but make the site memorable:

1. **Terminal Easter egg in contact section:** A fake terminal input that responds to commands like "hire anish", "show resume", "about", "skills"
2. **Konami code:** Entering the Konami code triggers a brief animation — confetti, or Anish's stats flying across the screen
3. **Cursor trail:** The custom cursor leaves a faint trail that fades out
4. **"Currently listening to" widget:** A small Spotify-style widget in the corner showing a placeholder track (since Spotify API requires auth, can be static or randomised from a playlist)
5. **Loading screen:** A brief 1-2 second loading screen with a typewriter animation: "Loading Anish's brain..." before the site reveals

---

## WHAT MAKES THIS SITE MEMORABLE

One thing a visitor should remember after leaving: Anish built a real product for real users at a real company, and he can show you exactly how he thinks. Not tell you. Show you.

Every design decision should serve that goal.