---
slug: "askorbit"
title: "AskOrbit"
type: "Product Breakdown"
status: "Production"
description: "An AI chatbot embedded inside PMOrbit that answers project health questions in natural language instead of requiring dashboard navigation."
problemStatement: "Dashboard navigation was slow when PMO leads and executives just needed one data point — most sessions were information retrieval, not exploration."
businessImpact: "Replaced multi-click dashboard navigation with direct natural-language answers, reducing session time for retrieval-only queries."
readTime: "5 min read"
order: 10
lastModified: "2024-12-01"
priority: 0.9
sections:
  - id: "overview"
    blocks:
      - type: "prose"
        body: |
          ## What It Is

          AskOrbit is an AI chatbot embedded inside PMOrbit that answers questions about project health in natural language. Instead of navigating multiple dashboard views to find a status, a user types: _“What are the open risks on Project Atlas?”_ and gets an immediate, structured answer.

          ## The Problem It Solved

          Dashboard navigation is slow when you only need one data point. PMO leads and executives were repeatedly clicking through views to answer simple questions before meetings. The time cost added up fast — and the cognitive load of navigating a complex platform just to confirm a status was a real friction point.

          The insight: **most dashboard interactions were information retrieval, not exploration.** If we could serve that use case directly, we could reduce friction for a large class of sessions.

          ## How It Was Scoped

          I started by auditing the most common support questions raised through internal channels: 80% were status checks or RAID queries that already had answers in the system. This gave clear scope — AskOrbit didn't need to be general-purpose. It needed to answer a defined set of questions well.

          MVP scope:

          - Project status queries (“What is the current status of X?”)
          - RAID queries (“What are the open risks on X?”)
          - Timeline queries (“When is X expected to complete?”)
          - Team queries (“Who owns X?”)

          Out of scope for MVP: cross-project analysis, trend queries, write operations.

          ## What Good Looked Like

          The metric I cared about most was answer accuracy — specifically, whether users trusted the response enough to act on it without verifying in the dashboard. In informal testing, users stopped double-checking for straightforward status and RAID queries after the first few sessions.

          Secondary metric: session length reduction for retrieval-only sessions. Users who used AskOrbit spent significantly less time in the platform for information-retrieval sessions while reporting equivalent satisfaction.

          ## Limitations

          AskOrbit performed well on structured queries but struggled with ambiguous intent. “How is Project X doing?” is harder to answer than “What is the risk count on Project X?” — the former requires judgment about what “doing” means to that user.

          What would make it better: a clarification flow for ambiguous queries, user feedback on each response to improve the model, and expansion into cross-project queries once the structured retrieval layer is stable.
---
