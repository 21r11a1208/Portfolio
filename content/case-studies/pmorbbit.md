---
slug: "pmorbbit"
title: "PMOrbit"
type: "Case Study"
status: "Production"
description: "Built a production project management platform from 0 to 1 for PMO leads and executive leadership at RealPage."
problemStatement: "Fragmented project data across Jira, Asana, and Monday.com created silos, manual reporting overhead, and no single source of truth for executive leadership."
businessImpact: "Reduced handoff friction by 40%, restored 100% notification reliability, and reduced executive dashboard load times from 30s to 800ms."
readTime: "10 min read"
order: 1
lastModified: "2024-12-01"
priority: 1.0
sections:
  - id: "overview"
    toc_label: "Overview"
    blocks:
      - type: "callout"
        title: "TL;DR"
        body: |
          RealPage's PMO team was managing a growing portfolio of enterprise projects across spreadsheets, email threads, and five disconnected tools. I designed and co-built PMOrbit — a role-aware portfolio management platform — from zero to production. It eliminated **5+ hours of weekly reporting per PM**, cut PDF report generation from **2 hours to one click**, and is actively used in production today.
  - id: "context"
    toc_label: "Context"
    kicker: "Background"
    heading: "Context"
    blocks:
      - type: "prose"
        body: |
          RealPage is an enterprise software company serving the real estate industry. Its internal PMO oversees a portfolio of concurrent technology projects spanning multiple business units — each with its own stakeholders, dependencies, and delivery timelines.

          When I joined, the team had no dedicated tooling. Project health lived in spreadsheets. Status updates travelled by email. RAID logs were maintained manually in shared documents that quickly fell out of date. Executive reporting required a PMO lead to spend a full afternoon each week assembling slides from multiple sources — every single week.
      - type: "card-list"
        cards:
          - title: "✕ Spreadsheets"
            body: "Project health & RAID logs"
          - title: "✕ Email threads"
            body: "Status updates & escalations"
          - title: "✕ 5 disconnected tools"
            body: "No single source of truth"
  - id: "role"
    toc_label: "My Role"
    kicker: "Contribution"
    heading: "My Role"
    blocks:
      - type: "prose"
        body: |
          I was the solo PM and a contributing builder on this project. I ran all product discovery, defined requirements, made prioritisation calls, and worked directly in the codebase alongside the engineering team throughout the build.

          This gave me an unusually tight feedback loop: I could validate assumptions by shipping a change and observing behaviour the same day, rather than waiting for sprint reviews.

          **Product Discovery** · **Requirements** · **Prioritisation** · **Roadmapping** · **Frontend (React / TypeScript)** · **Backend (.NET Core)**
  - id: "discovery"
    toc_label: "Discovery"
    kicker: "Research"
    heading: "Discovery"
    blocks:
      - type: "prose"
        body: |
          Before writing a single requirement, I ran four weeks of structured discovery across four methods. Expand each to see what we found.
      - type: "accordion"
        items:
          - title: "User Interviews"
            meta:
              - "4 weeks · PMO leads, PMs, and 2 executive stakeholders"
            body: |
              → Every stakeholder spent significant time weekly collecting information that should have been automatic — PMO leads described themselves as "a human API between five tools."

              → Stakeholders had stopped trusting spreadsheet data. Before any status meeting, someone spent 30 minutes verifying numbers.

              → Existing tools had already been tried and abandoned: Jira was too engineering-centric, Monday too lightweight for RAID complexity. Neither served executives.
          - title: "Funnel & Usage Analysis"
            meta:
              - "End-to-end audit from new initiative to executive report"
            body: |
              → RAID logs required manual entry for risks and issues that already existed as email threads — logs were always 2–3 days behind reality.

              → Executive PDF reports were assembled manually each week across 4 sources, formatted in PowerPoint, then exported. ~2 hours per report, every Friday.
          - title: "Stakeholder Workshops"
            meta:
              - "Group sessions to surface priorities and alignment gaps"
            body: |
              → Different roles had fundamentally different definitions of "project health" — aligning on shared language was itself a product challenge.

              → There was no agreed process for RAID escalation. Each PM handled it differently. Any tooling would need to enforce a workflow, not just record data.
          - title: "Competitive Analysis"
            meta:
              - "Jira, Monday.com, Smartsheet, Microsoft Project, enterprise PMO tools"
            body: |
              → No tool in the market served all four user types (PMO leads, PMs, Scrum Masters, executives) from a single interface.

              → Most tools optimised for one persona and left others underserved — creating the translation-layer problem users were already experiencing.
  - id: "insights"
    toc_label: "Insights"
    kicker: "Synthesis"
    heading: "Key Insights"
    blocks:
      - type: "prose"
        body: |
          Three insights from discovery shaped every major product decision that followed.
      - type: "card-list"
        numbered: true
        cards:
          - title: "The real cost is the translation layer"
            body: |
              PMs weren't struggling because existing tools were bad. They were struggling because no tool spoke to all their stakeholders, so humans became the translation layer between tools. The product needed to eliminate that layer, not replace one tool with another.
          - title: "Role-aware defaults beat feature completeness"
            body: |
              What a PMO lead needs on their screen at 9am is completely different from what an executive needs before a board call. A generic dashboard serves no one well. The product had to know who you were and surface the right things first.
          - title: "Automation earns trust only when it's auditable"
            body: |
              Stakeholders had stopped trusting spreadsheet data precisely because anyone could edit it without a trace. Any automation we built needed to be transparent about what it did and when — otherwise we'd replace one trust problem with another.
  - id: "solution"
    toc_label: "Solution"
    kicker: "The Product"
    heading: "Solution"
    blocks:
      - type: "prose"
        body: |
          PMOrbit is a web-based portfolio management platform built on a .NET Core API with a React + TypeScript frontend. It serves four distinct user roles from a single application, each with a role-aware default view.
      - type: "tabs"
        panels:
          - label: "Role-Aware Dashboards"
            title: "Role-Aware Dashboards"
            badge: "Core"
            description: |
              On login, each user lands on a dashboard configured for their role. PMO leads see portfolio health and delivery velocity. PMs see active projects, RAID items, and milestones. Executives get a clean summary — no noise, just signal. No configuration required.
            quote: "The initial instinct was a single universal dashboard. After two rounds of feedback, it was clear that a PMO lead's 9am view has nothing in common with what an exec needs before a board call."
          - label: "Automated RAID Logs"
            title: "Automated RAID Logs"
            badge: "Core"
            description: |
              RAID entries are structured, timestamped, and tied to specific projects with assigned owners. The log shows what changed, when, and who changed it — auditable by design. This directly addressed the trust problem: stakeholders could see the history of every entry, not just its current state.
            quote: "Stakeholders had stopped trusting spreadsheet data because anyone could edit it without a trace. Every automated action in PMOrbit is logged with a timestamp and actor."
          - label: "PDF Reporting"
            title: "PDF Reporting"
            badge: "Reporting"
            description: |
              Every Friday, the system automatically snapshots project health across the portfolio. Snapshots are stored for historical comparison. Executives generate a formatted, multi-page PDF with one click — replacing a 2-hour weekly ritual with a 2-minute task.
            quote: "The Friday afternoon reporting ritual was the clearest quantifiable pain point from discovery. Eliminating it was the single strongest adoption driver — execs saw immediate, concrete value on day one."
          - label: "AskOrbit — AI Assistant"
            title: "AskOrbit — AI Assistant"
            badge: "AI"
            description: |
              An embedded AI chatbot that answers project health questions in natural language. "What's the status of Project X?" returns an immediate answer instead of requiring navigation through multiple screens. Connects to TFS and ECR datasets to surface rollback steps and post-implementation validations.
            quote: "The most common PMO support request was \"What's the status of X?\" Shipping a constrained version — status queries only — eliminated an entire category of interruptions from sprint one."
  - id: "decision"
    toc_label: "Hard Call"
    kicker: "Trade-offs"
    heading: "The Hardest Call: Scoping the MVP"
    blocks:
      - type: "prose"
        body: |
          The first version of the backlog had 34 features. Every stakeholder had something they wanted at launch. Scoping the MVP was the hardest product decision I made, and the one I spent the most time defending.
      - type: "accordion"
        items:
          - title: "My prioritisation framework"
            meta:
              - "The criteria I used to cut 34 features to an MVP"
            body: |
              I mapped each requested feature against two axes. Features that scored high on both made the cut. Everything else got a dated roadmap entry so stakeholders knew it wasn't forgotten.

              **Axis 1**
              How directly does it eliminate the assembly problem — the root cause?

              **Axis 2**
              How many of the four user types does it serve?
      - type: "prose"
        body: |
          The hardest cut was the **document hub**. PMO leads wanted it badly — a centralised repository for project artefacts and sign-offs. But it didn't address the core trust or assembly problem, and building it well would have delayed the dashboard and RAID log by two sprints. We shipped it in v1.1. The dashboard adoption created the forcing function for document hub adoption later.

          I also decided to ship **AskOrbit as a constrained feature** rather than scope it out entirely. The interview data was unambiguous: the most common PMO support request was "What's the status of X?" We launched with status queries only and expanded from there.
  - id: "results"
    toc_label: "Results"
    kicker: "Impact"
    heading: "Results"
    blocks:
      - type: "card-grid"
        variant: "counter"
        columns: 2
        cards:
          - label: "hours saved per PM per week"
            value: 5
            suffix: "+"
            sub: "on status assembly and reporting"
          - label: "faster dashboard load times"
            value: 95
            suffix: "%"
            sub: "from 8s+ to under 500ms"
          - label: "reduction in handoff friction"
            value: 40
            suffix: "%"
            sub: "across sprint cycles, measured via survey"
          - label: "delivery reliability restored"
            value: 100
            suffix: "%"
            sub: "on notification workflows"
      - type: "card-grid"
        variant: "info"
        columns: 2
        cards:
          - label: "Executive PDF report generation"
            value: "2 hrs → ~2 min"
      - type: "callout"
        title: "Live in production today"
        body: |
          Actively used by PMO leads, project managers, and executive stakeholders at RealPage.
  - id: "learnings"
    toc_label: "Learnings"
    kicker: "Retrospective"
    heading: "What I'd Do Differently"
    blocks:
      - type: "card-list"
        numbered: true
        cards:
          - title: "Instrument earlier"
            body: |
              We had good qualitative signal from interviews but almost no quantitative data in the first three months of production. That made prioritisation harder than it needed to be — I was making calls based on stakeholder feedback alone, without usage data to validate or challenge it. I'd ship telemetry alongside the first feature, not as an afterthought in month four.
          - title: "Build the change management plan before the product"
            body: |
              The hardest part of this project wasn't building the features — it was getting the team to trust a new system over the spreadsheets they knew. Every release required a short demo and a clear answer to "what's in it for me?" A structured rollout plan from the start — champions in each team, guided onboarding, an explicit deprecation timeline for old spreadsheets — would have accelerated adoption significantly.
          - title: "Scope AskOrbit as a product from the start"
            body: |
              We built AskOrbit as a feature and it quickly grew to feel like its own product — with its own user needs, failure modes, and feedback loop. It warranted its own discovery sprint. I'd treat it as a product-within-a-product from day one, with a dedicated scope and a clearer definition of what it should and shouldn't answer.
---
