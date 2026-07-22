---
slug: "linkedin-rca"
title: "LinkedIn DAU Drop"
type: "RCA"
status: "Self-initiated"
description: "A structured root cause analysis for a hypothetical 15% LinkedIn DAU drop in India over two weeks, from signal clarification to ranked hypotheses."
problemStatement: "LinkedIn's daily active users in India drop 15% over two weeks with no obvious single cause, across internal, external, and funnel signals."
businessImpact: "Ranked five hypotheses by likelihood and defined concrete validation steps — a structured path from symptom to root cause."
readTime: "6 min read"
order: 12
lastModified: "2025-03-25"
priority: 0.8
sections:
  - id: "overview"
    blocks:
      - type: "prose"
        body: |
          ## The Scenario

          LinkedIn's DAU in India drops 15% over a two-week period. You are the PM responsible for engagement. What do you do?

          ## Step 1: Clarify the Signal

          Before investigating, get precise about what the metric is telling you:

          - **Which users?** Is the drop uniform across segments or concentrated? (New vs. retained, mobile vs. desktop, specific city or demographic)
          - **Which actions?** Is it total logins that dropped, or is it specific actions — posting, commenting, job applications?
          - **Which platform?** Is the drop specific to Android, iOS, or web?
          - **When exactly?** Is it a gradual decline or a step-change at a specific date?

          A 15% DAU drop that is uniform, gradual, and cross-platform tells a different story than one that appeared overnight on Android only.

          ## Step 2: Internal Checks

          - Was there a product deployment or infrastructure change in the two weeks prior? Check the deployment log.
          - Did any A/B test go live that could have affected retention or notification flows for a subset of Indian users?
          - Were there any changes to the feed algorithm or content ranking?
          - Are there any error rate spikes, latency increases, or crash reports from India that correlate with the drop window?
          - Did any notification type (job alert, connection request, content recommendation) change in frequency or format?

          ## Step 3: External Checks

          - Did a competitor (Naukri, Unstop, Internshala, Discord) launch something significant or go viral in India during this period?
          - Was there news coverage, controversy, or a public incident that could have affected perception of LinkedIn in India? (e.g., data privacy, layoffs, recruiter behaviour backlash)
          - Are there internet connectivity issues in a specific region during this window?
          - Is this a seasonal effect? (semester end, exam season, holiday period — does the same pattern appear in previous years?)

          ## Step 4: Funnel Analysis

          Break the DAU decline into acquisition, activation, and retention:

          - **Acquisition:** Are new user signups down? Is organic discovery via search or social reduced?
          - **Activation:** Are newly signed-up users completing profile setup or making their first connection?
          - **Retention:** Are previously active users returning less frequently? Is the drop concentrated in users who were active 1-7 days ago or users who were active 30+ days ago?
          - **Resurrection:** Are dormant users being re-engaged less effectively?

          ## Top Hypotheses, Ranked by Likelihood

          1. **Algorithm or notification change reduced re-engagement triggers** — notification-driven DAU is high; a reduction in job alert volume or relevance directly reduces daily return rates
          2. **Seasonal effect** — exam season or a major holiday reduces professional activity across the board; historical data should confirm or eliminate this quickly
          3. **Competitor activity** — a viral moment or feature launch by a competing platform pulled attention
          4. **Technical regression** — a performance degradation or bug on the Android app (dominant in India) that reduced session completion
          5. **Perception/trust issue** — negative press or social media backlash reduced brand affinity temporarily

          ## Recommended Validation Steps

          - Pull DAU by platform (Android/iOS/web) for India — isolate if device-specific
          - Check notification delivery and open rates in India for the two-week window
          - Cross-reference deployment log with the start date of the decline
          - Compare this year's two-week window to the same window in the previous two years — rule out seasonality
          - Run a sentiment analysis on LinkedIn-related social content in India from the period
          - If internal checks come up clean, run a survey to a random sample of India users who were active and then lapsed — ask directly what changed
---
