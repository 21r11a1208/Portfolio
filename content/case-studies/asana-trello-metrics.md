---
slug: "asana-trello-metrics"
title: "Asana & Trello"
type: "Metrics"
status: "Self-initiated"
description: "A PM metrics deep-dive into Asana and Trello — north star definition, supporting hierarchy, rejection rationale, and guardrails for two divergent takes on collaborative work management."
problemStatement: "PMs often struggle to define clear north star metrics and supporting hierarchies for divergent collaborative work management platforms, leading to misaligned product guardrails."
businessImpact: "Provided actionable guardrails for product teams to align on north star metrics and prevent feature bloat."
readTime: "5 min read"
order: 5
lastModified: "2025-03-19"
priority: 0.8
sections:
  - id: "intro"
    blocks:
      - type: "callout"
        tone: "neutral"
        body: |
          This is not an endorsement of how either company actually measures itself — it's how I'd think through the metric question if asked in an interview or brought onto the team. The same 6-step exercise is run twice below: once for Asana, once for Trello — two products solving collaborative work management in fundamentally different ways.
  - id: "asana-goal"
    toc_label: "Asana · Goal"
    kicker: "Asana · Step 1 of 6"
    heading: "The Goal"
    blocks:
      - type: "prose"
        body: |
          Asana wants to be the operating layer for how work gets done across teams — not just a task list, but the coordination system that replaces the status-update meeting. The metric question is: are we measuring tasks, or actual team coordination?
  - id: "asana-northstar"
    toc_label: "Asana · North Star"
    kicker: "Asana · Step 2 of 6"
    heading: "North Star Metric"
    blocks:
      - type: "callout"
        title: "North Star"
        body: |
          **Weekly Active Teams (WAT)**

          > **Definition:** Teams with ≥2 members that complete ≥5 coordinated tasks through Asana in a rolling 7-day window.

          Asana's core value is coordination, not individual productivity. A team of 10 running their weekly cycles in Asana is worth orders of magnitude more than 10 individual users tracking personal to-dos. Weekly captures the natural rhythm of work — teams coordinate in weekly sprints, not daily or monthly cycles. The task completion floor (≥5) filters out ghost teams who open Asana but don't actually run work through it.
  - id: "asana-hierarchy"
    toc_label: "Asana · Hierarchy"
    kicker: "Asana · Step 3 of 6"
    heading: "Metrics Hierarchy"
    blocks:
      - type: "prose"
        body: |
          The metrics that feed into **Weekly Active Teams (WAT)**, organized by what they measure and when they signal a problem.
      - type: "icon-list"
        icon: "arrow"
        columns: 3
        groups:
          - label: "Setup & Adoption"
            color: "#3b82f6"
            items:
              - "Team onboarding completion rate"
              - "Workflow template adoption rate"
              - "Cross-functional project participation rate"
              - "First coordinated task completed within 7 days of signup"
          - label: "Engagement Depth"
            color: "#a855f7"
            items:
              - "Tasks completed per active team per week"
              - "Automation and rules setup rate"
              - "Timeline and dependency usage rate"
              - "Integration connections per workspace"
          - label: "Retention & Expansion"
            color: "#22c55e"
            items:
              - "Team weekly return rate"
              - "Feature depth score (# of feature categories used)"
              - "Seat expansion within existing accounts"
              - "Net Revenue Retention (NRR)"
  - id: "asana-rejected"
    toc_label: "Asana · Not Measure"
    kicker: "Asana · Step 4 of 6"
    heading: "What I'd NOT Measure"
    blocks:
      - type: "prose"
        body: |
          Explicit rejections matter as much as what you pick. A bad north star optimizes for the wrong thing — often while looking great on a dashboard.
      - type: "card-list"
        cards:
          - title: "✕ Monthly Active Users"
            body: |
              Users can log in, check a task, and leave without coordinating anything. An individual checking off a personal to-do doesn't represent the coordination value Asana's pricing and positioning is built on.
          - title: "✕ Tasks Created"
            body: |
              Creating tasks without completing or coordinating them is a pure vanity metric. It measures input, not outcome. A team can create 100 tasks and abandon every one of them.
          - title: "✕ NPS"
            body: |
              Sentiment without behavior. A team that rates Asana 9/10 but only opens it twice a month is not the retained customer the business needs. NPS tells you how people feel, not how they work.
          - title: "✕ ARR"
            body: |
              Revenue is a lagging indicator by 6–12 months. By the time ARR drops, the coordination behavior you needed to protect disappeared long ago. Don't manage a leading problem with a lagging metric.
  - id: "asana-guardrails"
    toc_label: "Asana · Guardrails"
    kicker: "Asana · Step 5 of 6"
    heading: "Guardrail Metrics"
    blocks:
      - type: "prose"
        body: |
          Counter-metrics that prevent gaming the north star. Every metric can be gamed — guardrails are how you make gaming visible.
      - type: "card-list"
        cards:
          - title: "⚠ Team quality floor"
            body: |
              Don't count teams where only 1 member is genuinely active. WAT requires real multi-person coordination — not solo users on team licenses. Track single-active-member teams separately as a churn risk signal.
          - title: "⚠ Board abandonment rate"
            body: |
              Projects set up but never actively used after week 1. A spike in WAT alongside a spike in abandonment means teams are trying and leaving, not converting. These two metrics should be read together.
          - title: "⚠ Template dependency ratio"
            body: |
              Teams using only pre-built templates without ever building custom workflows haven't internalized Asana into how they actually work. This is shallow adoption — it looks like engagement but doesn't retain.
  - id: "asana-signals"
    toc_label: "Asana · Signals"
    kicker: "Asana · Step 6 of 6"
    heading: "Live Signals"
    blocks:
      - type: "prose"
        body: |
          Public data points that inform how the north star is likely trending — and what questions I'd be asking if I were on the team.
      - type: "card-grid"
        variant: "info"
        columns: 2
        cards:
          - label: "ARR (FY2024)"
            value: "~$721M"
            sub: "Publicly reported"
          - label: "Revenue growth"
            value: "~10% YoY"
            sub: "Down from 35% in FY2022"
          - label: "NRR direction"
            value: "Compressing"
            sub: "Was >115%, now under pressure"
          - label: "Fastest-growing segment"
            value: ">$50K deals"
            sub: "Moving upmarket intentionally"
  - id: "trello-goal"
    toc_label: "Trello · Goal"
    kicker: "Trello · Step 1 of 6"
    heading: "The Goal"
    blocks:
      - type: "prose"
        body: |
          Trello has a dual mandate that creates real PM tension: maximize collaborative board usage among individuals and SMBs, while also serving as an Atlassian ecosystem entry point. These goals can conflict — optimizing for one can hurt the other. I'd surface this before agreeing to any single north star.
  - id: "trello-northstar"
    toc_label: "Trello · North Star"
    kicker: "Trello · Step 2 of 6"
    heading: "North Star Metric"
    blocks:
      - type: "callout"
        title: "North Star"
        body: |
          **Weekly Active Collaborative Boards (WACB)**

          > **Definition:** Boards with ≥2 members that have at least one card movement, comment, or new card in a 7-day window.

          Trello's value is the shared visual Kanban — not personal to-do lists. The ≥2 member requirement filters out solo use cases that don't represent Trello's core value prop. Card movement is the key signal: a Kanban board where nothing moves is a board that isn't working. Comments and new cards are secondary signals of live collaboration.
      - type: "callout"
        title: "Dual-Mandate Tension"
        body: |
          If Trello's real job-to-be-done for Atlassian is ecosystem entry, the north star should be 'Trello teams that adopt a second Atlassian product.' I'd surface this conflict explicitly and align with leadership before committing to either metric. Picking the wrong north star optimizes for the wrong outcome — even if both look healthy on a dashboard.
  - id: "trello-hierarchy"
    toc_label: "Trello · Hierarchy"
    kicker: "Trello · Step 3 of 6"
    heading: "Metrics Hierarchy"
    blocks:
      - type: "prose"
        body: |
          The metrics that feed into **Weekly Active Collaborative Boards (WACB)**, organized by what they measure and when they signal a problem.
      - type: "icon-list"
        icon: "arrow"
        columns: 3
        groups:
          - label: "Collaboration Signal"
            color: "#3b82f6"
            items:
              - "Member invite rate per new board"
              - "Multi-member board ratio (% of total boards)"
              - "Board template adoption rate"
              - "First invite sent within 24h of board creation"
          - label: "Kanban Engagement"
            color: "#a855f7"
            items:
              - "Card move frequency per board per week"
              - "Multi-list usage ratio (boards with ≥3 lists)"
              - "Comment and attachment frequency"
              - "Power-up active usage rate (not just installed)"
          - label: "Retention & Ecosystem"
            color: "#22c55e"
            items:
              - "Board return rate (members returning weekly)"
              - "Free-to-paid conversion rate"
              - "Second Atlassian product adoption rate"
              - "Jira–Trello integration usage rate"
  - id: "trello-rejected"
    toc_label: "Trello · Not Measure"
    kicker: "Trello · Step 4 of 6"
    heading: "What I'd NOT Measure"
    blocks:
      - type: "prose"
        body: |
          Explicit rejections matter as much as what you pick. A bad north star optimizes for the wrong thing — often while looking great on a dashboard.
      - type: "card-list"
        cards:
          - title: "✕ Total Boards Created"
            body: |
              Boards are almost never deleted. This number increases monotonically regardless of active usage. It's a counter, not a health metric. You can't manage what you can't act on.
          - title: "✕ Registered Users"
            body: |
              Trello has 50M+ registered users. A fraction are genuinely active. This metric flatters the product while hiding the real engagement story — and it's the number most often cited in press releases for exactly that reason.
          - title: "✕ Power-Ups Installed"
            body: |
              Installing a Power-Up takes two clicks. Using it requires behavioral change. Installed ≠ valuable. Tracking installs while ignoring active usage creates a false picture of feature success.
          - title: "✕ Free-to-Paid Conversion Rate"
            body: |
              Optimizing this in isolation could push the team to degrade the free experience to force upgrades — killing the top of the funnel that makes Trello's ecosystem play work for Atlassian. Context matters: this is a supporting metric, not a north star.
  - id: "trello-guardrails"
    toc_label: "Trello · Guardrails"
    kicker: "Trello · Step 5 of 6"
    heading: "Guardrail Metrics"
    blocks:
      - type: "prose"
        body: |
          Counter-metrics that prevent gaming the north star. Every metric can be gamed — guardrails are how you make gaming visible.
      - type: "card-list"
        cards:
          - title: "⚠ Solo board ratio"
            body: |
              If >60% of 'active' boards have only 1 genuinely active member, WACB is inflated. Track solo-active boards separately — they represent personal use, not the collaborative value Trello's positioning and pricing depend on.
          - title: "⚠ Board stagnation rate"
            body: |
              Boards where no cards have moved in 14+ days but are still counted as 'active' due to recent logins. A stagnant board is a soon-to-be-abandoned board. Catching this early is how you trigger re-engagement campaigns before churn.
          - title: "⚠ Atlassian cross-sell at the cost of WACB"
            body: |
              If cross-sell rate increases while WACB falls, Trello is being hollowed out to serve Jira's funnel. Both should grow together — one declining for the other is a failure mode, not a success story.
  - id: "trello-signals"
    toc_label: "Trello · Signals"
    kicker: "Trello · Step 6 of 6"
    heading: "Live Signals"
    blocks:
      - type: "prose"
        body: |
          Public data points that inform how the north star is likely trending — and what questions I'd be asking if I were on the team.
      - type: "card-grid"
        variant: "info"
        columns: 2
        cards:
          - label: "Registered users"
            value: "50M+"
            sub: "Active base significantly smaller"
          - label: "Product velocity"
            value: "Declining"
            sub: "Fewer major releases post-acquisition"
          - label: "Atlassian treatment"
            value: "Bundled"
            sub: "Metrics absorbed into 'team collab'"
          - label: "Competitive pressure"
            value: "High"
            sub: "Notion, ClickUp, Linear taking share"
---
