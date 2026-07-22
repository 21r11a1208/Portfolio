---
slug: "college-erp"
title: "College ERP"
type: "Product Teardown"
status: "Self-initiated"
description: "A product teardown of CampX, the ERP used at Geethanjali College — the most painful workflow, why it happens, and a concrete redesign recommendation."
problemStatement: "CO attainment entry for NBA accreditation is entirely manual even though the marks and CO mapping already exist in the system — faculty spend 3-5 hours per course per semester on it."
businessImpact: "Proposed an automated attainment engine and one-click NBA report generation, targeting under 20 minutes of manual work per faculty member per semester."
readTime: "6 min read"
order: 11
lastModified: "2025-03-25"
priority: 0.8
sections:
  - id: "overview"
    blocks:
      - type: "prose"
        body: |
          ## The Product

          CampX is the ERP used at Geethanjali College of Engineering and Technology. It handles student records, attendance, marks, timetables, and NBA accreditation compliance. On paper, it does a lot. In practice, it makes several of those things unnecessarily hard.

          ## What It Does Well

          - Centralised student records accessible to faculty and administration
          - Attendance tracking with reasonable coverage across the college's departments
          - Timetable management that integrates with faculty allocation
          - The marks module correctly stores internal assessment data and can produce reports

          ## The Most Painful Workflow: CO Attainment Entry

          The worst experience in the system is CO (Course Outcome) attainment entry for NBA accreditation.

          Every semester, faculty must calculate CO attainment for each course: the percentage of students who achieved each Course Outcome based on their marks. NBA accreditation requires this data be documented and available for audit.

          **What the current flow looks like:**

          - Faculty export marks from the marks module as an Excel file
          - Faculty manually calculate CO attainment in their own spreadsheets using the exported data
          - Faculty manually re-enter the calculated attainment values back into CampX
          - This process happens separately for direct and indirect attainment
          - A department coordinator then assembles these into a department-level report, again manually

          The marks already exist in the system. The CO mapping already exists in the system. The calculation logic is deterministic and standardised across the college. **None of this should be manual.**

          ## Why This Happens

          The marks module and the CO attainment module are built as separate silos with no automated connection. The ERP was built by a vendor who treated NBA compliance as a documentation requirement, not as a computation problem. The result: faculty spend an average of three to five hours per course per semester on work the system could do in seconds.

          ## The Redesign Recommendation

          ### 1. Auto-calculate CO attainment from the marks module

          The system already has marks, CO mappings, and threshold definitions. Add an automated attainment calculation engine that runs when marks are finalised. Faculty review the output and override individual values if needed — they don't generate them from scratch.

          ### 2. One-click NBA report generation

          Once CO attainment is confirmed, generate the NBA-compliant PDF report automatically at both the course level and the department level. The format is standardised — there is no reason this should require any manual assembly.

          ## How I'd Measure Success

          - Time per faculty member spent on CO attainment per semester (target: under 20 minutes from current 3+ hours)
          - Data entry errors in submitted NBA reports (target: near zero)
          - Faculty satisfaction score for the NBA compliance workflow
          - Report submission lead time before NBA deadlines
---
