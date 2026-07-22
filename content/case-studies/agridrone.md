---
slug: "agridrone"
title: "AgriDrone"
type: "PRD"
status: "Self-initiated"
description: "A SaaS marketplace connecting farmers with licensed drone operators for on-demand aerial pesticide and fertilizer application."
problemStatement: "Agricultural drone services are inaccessible to small-to-medium farmers due to fragmented operator discovery, lack of trust, and geographic mismatch."
businessImpact: "Designed to unlock a new revenue channel for drone operators while reducing crop loss for farmers by enabling timely aerial interventions."
readTime: "5 min read"
order: 3
lastModified: "2025-01-01"
priority: 0.9
sections:
  - id: "overview"
    toc_label: "Overview"
    blocks:
      - type: "callout"
        title: "TL;DR"
        body: |
          Agricultural drone services are commercially viable — the operators exist, the technology works. But small farmers in India can't access them because there's no discoverable marketplace. AgriDrone closes this gap: farmers submit service requests from their phone, operators accept jobs within their efficient radius, and admins ensure platform quality. The core insight: farmer trust and operator geographic inefficiency are the **same problem — information asymmetry**.
      - type: "card-grid"
        variant: "info"
        columns: 2
        cards:
          - label: "Booking time target"
            value: "< 5 min"
            sub: "registration to first request"
          - label: "Fulfillment target"
            value: "≥ 80%"
            sub: "requests accepted within 48 hrs"
  - id: "problem"
    toc_label: "Problem"
    kicker: "Why it exists"
    heading: "Problem Statement"
    blocks:
      - type: "icon-list"
        icon: "cross"
        columns: 2
        groups:
          - label: "For Farmers"
            items:
              - "No way to discover local drone operators"
              - "Can't verify credentials or compare pricing"
              - "No job tracking — have to call to find out status"
          - label: "For Operators"
            items:
              - "Clients only through word-of-mouth referrals"
              - "Waste time driving to inefficient jobs outside their range"
              - "Manage bookings manually — no digital pipeline"
      - type: "callout"
        title: "Core insight"
        body: |
          The two biggest barriers — farmer trust and operator geographic inefficiency — are the same problem: **information asymmetry about location and credibility**. Solve that and the market connects itself.
  - id: "users"
    toc_label: "Users"
    kicker: "Who we serve"
    heading: "User Personas"
    blocks:
      - type: "tabs"
        panels:
          - label: "Raju — Farmer"
            title: "Raju"
            meta:
              - "42 · Rural Maharashtra · Basic smartphone user"
            goals:
              - "Book drone spraying for paddy field before monsoon"
              - "Find trusted operators near his area"
              - "Track job status without calling anyone"
            pains:
              - "Expensive manual spraying"
              - "Can't find or verify operators"
              - "No pricing transparency — fears being overcharged"
            quote: "I've heard of drone spraying but I don't know who to call. And how do I know they won't damage my crop?"
          - label: "Vikram — Drone Operator"
            title: "Vikram"
            meta:
              - "29 · Semi-urban Karnataka · Comfortable with apps"
            goals:
              - "List services so farmers can find him"
              - "Manage job queue digitally"
              - "Build a reliable client base"
            pains:
              - "Clients only through word-of-mouth"
              - "Drives to remote areas for low-value jobs"
              - "Books are managed in a notebook"
            quote: "I want consistent booking volume. Right now it's one-off gigs and I'm driving two hours for a job that doesn't cover the fuel."
          - label: "Priya — Platform Admin"
            title: "Priya"
            meta:
              - "35 · Bangalore · High technical literacy"
            goals:
              - "Single view of all platform activity"
              - "Manage users and resolve disputes"
              - "Track platform growth and health"
            pains:
              - "No analytics or reporting"
              - "User disputes handled manually"
              - "No visibility into operator quality"
            quote: "I need one screen that tells me what's happening on the platform today, not five spreadsheets."
  - id: "features"
    toc_label: "Features"
    kicker: "What we're building"
    heading: "Feature Requirements"
    blocks:
      - type: "tabs"
        panels:
          - label: "Field Management"
            title: "Field Management"
            badge: "Complete"
            meta:
              - "For: Farmers"
            description: |
              Farmers create and manage fields with name, area (hectares), crop type, and GeoJSON polygon coordinates. Fields are private — only the owning farmer can view or edit. Field data attaches to service requests so operators know exactly what they're servicing before accepting.
            acceptanceCriteria:
              - "Create fields with name, area, crop type, GeoJSON coordinates"
              - "Farmers can only access their own fields"
              - "Edit and delete fields at any time"
          - label: "Service Request Lifecycle"
            title: "Service Request Lifecycle"
            badge: "Complete"
            meta:
              - "For: Farmers + Operators"
            description: |
              Farmers submit requests by selecting a field, service type (pesticide or fertilizer), preferred date, and optional notes. Requests follow a strict state machine: pending → accepted → completed. Farmers can cancel pending requests; admins can cancel accepted ones.
            acceptanceCriteria:
              - "State machine: pending → accepted → completed / cancelled"
              - "Farmers edit only while request is pending"
              - "Operators complete requests with a timestamp"
              - "Admins can reassign requests to different operators"
          - label: "Operator Discovery"
            title: "Operator Discovery"
            badge: "Complete"
            meta:
              - "For: Farmers"
            description: |
              Operators set their GPS location, service radius (km), hourly rate, and availability toggle. Farmers see a Leaflet map of operators near them. Operators browse available requests — no unsolicited outreach — so farmers feel in control of the engagement.
            acceptanceCriteria:
              - "Operators set location, radius, rate, and availability"
              - "Farmers see map of nearby operators"
              - "Operators toggle availability on/off"
              - "Operators view field details before accepting"
          - label: "Weather Widget"
            title: "Weather Widget"
            badge: "Complete"
            meta:
              - "For: Farmers"
            description: |
              Current conditions and 5-day forecast via OpenWeatherMap proxy. Displays temperature, conditions, humidity, wind speed, and icon. Helps farmers pick suitable spray dates. API key lives server-side — never exposed in frontend bundles.
            acceptanceCriteria:
              - "Current weather + 5-day forecast by lat/lon"
              - "Temperature, condition, humidity, wind speed"
              - "API key stored as server-side environment variable"
          - label: "Admin Dashboard"
            title: "Admin Dashboard"
            badge: "Complete"
            meta:
              - "For: Admins"
            description: |
              Live counts for farmers, operators, fields, and service requests broken down by status. Full CRUD across all user roles. Ability to reassign or update any service request. Profile photo upload. Future: analytics charts for user growth and request volume.
            acceptanceCriteria:
              - "Total farmers, operators, fields, and requests by status"
              - "Create, edit, delete users of any role"
              - "Filter users by role, requests by status"
              - "Reassign service requests to different operators"
      - type: "chip-flow"
        label: "Booking status state machine"
        steps:
          - "pending"
          - "accepted"
          - "completed"
        note: "· pending → cancelled · accepted → cancelled (admin only)"
  - id: "architecture"
    toc_label: "Architecture"
    kicker: "Tech"
    heading: "Architecture"
    blocks:
      - type: "prose"
        body: |
          React SPA communicates exclusively with a Flask backend via REST. Flask proxies weather requests and enforces JWT auth and role checks on all protected endpoints. SQLAlchemy ORM abstracts the database layer.
      - type: "card-grid"
        variant: "info"
        columns: 2
        cards:
          - label: "Frontend"
            value: "React (TypeScript) via Vite · Leaflet for operator maps · Axios for API calls"
          - label: "Backend"
            value: "Python Flask · SQLAlchemy ORM · Werkzeug/bcrypt password hashing · JWT Bearer tokens"
          - label: "Database"
            value: "SQLite (dev) → PostgreSQL (production) · FK constraints and cascading deletes"
          - label: "Security"
            value: "RBAC on all endpoints · CORS locked to frontend origin · API keys server-side only · Server-side input validation"
  - id: "metrics"
    toc_label: "Metrics"
    kicker: "How we measure success"
    heading: "Success Metrics"
    blocks:
      - type: "card-grid"
        variant: "counter"
        columns: 4
        cards:
          - label: "of pending requests accepted within 48 hrs"
            value: 80
            suffix: "%"
          - label: "registration to first request (target)"
            value: 10
            suffix: " min"
          - label: "operator profile completion rate target"
            value: 70
            suffix: "%"
          - label: "platform uptime target"
            value: 99
            suffix: ".5%"
  - id: "roadmap"
    toc_label: "Roadmap"
    kicker: "Delivery plan"
    heading: "Roadmap"
    blocks:
      - type: "roadmap"
        phases:
          - label: "v1.0"
            title: "Current (Complete)"
            status: "Complete"
            items:
              - "Field management"
              - "Service request lifecycle"
              - "Operator discovery & map"
              - "Weather widget"
              - "Admin dashboard"
              - "JWT auth + RBAC"
          - label: "v1.1"
            title: "Near-term"
            status: "Planned"
            items:
              - "Admin analytics charts"
              - "Geospatial operator filtering (Haversine/PostGIS)"
              - "Operator availability calendar (date-range)"
              - "PostgreSQL migration from SQLite"
          - label: "v1.2"
            title: "Medium-term"
            status: "Planned"
            items:
              - "Email/in-app notifications"
              - "Service request history"
              - "Farmer ratings for operators"
              - "Advanced search by crop type and service type"
          - label: "v2.0"
            title: "Long-term"
            status: "Planned"
            items:
              - "Stripe/Razorpay payment integration"
              - "Premium operator tiers"
              - "React Native mobile app"
              - "Multi-language (Hindi, Kannada, Marathi)"
              - "Live drone telemetry"
  - id: "questions"
    toc_label: "Open Qs"
    kicker: "Still to resolve"
    heading: "Open Questions"
    blocks:
      - type: "accordion"
        items:
          - title: "Dispute resolution"
            body: |
              How should disputes be handled if an operator marks a job complete but the farmer disagrees? A rating system helps long-term but doesn't resolve individual incidents.
          - title: "Database for limited-scale launch"
            body: |
              Is SQLite acceptable for a limited-scale production launch, or is PostgreSQL migration a v1.0 blocker? SQLite has concurrency limitations that matter once multiple operators are accessing the platform simultaneously.
          - title: "Notification channels"
            body: |
              What notification channels suit key markets — SMS via Twilio, email, or WhatsApp? SMS has the highest reach in rural India but adds cost. WhatsApp is widely used but requires business API approval.
          - title: "Regulatory requirements"
            body: |
              Are there DGCA (India) regulatory requirements for drone spraying that the platform must display or enforce? Platform liability if unlicensed operators use it is a real risk.
---
