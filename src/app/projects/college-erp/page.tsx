import { Metadata } from "next";
import { CaseStudyLayout } from "@/components/projects/CaseStudyLayout";

export const metadata: Metadata = {
  title: "College ERP Teardown — B Anish",
  description: "A product teardown of CampX ERP used at Geethanjali College.",
};

const project = {
  title: "College ERP Teardown",
  type: "Product Teardown" as const,
  status: "Conceptual" as const,
  description: "A detailed teardown of CampX ERP — the most painful workflow, what it does wrong, and a concrete redesign recommendation.",
};

export default function CollegeERPPage() {
  return (
    <CaseStudyLayout project={project} readTime="6 min read">
      <h2>The Product</h2>
      <p>
        CampX is the ERP used at Geethanjali College of Engineering and Technology. It handles student records, attendance, marks, timetables, and NBA accreditation compliance. On paper, it does a lot. In practice, it makes several of those things unnecessarily hard.
      </p>

      <h2>What It Does Well</h2>
      <ul>
        <li>Centralised student records accessible to faculty and administration</li>
        <li>Attendance tracking with reasonable coverage across the college&apos;s departments</li>
        <li>Timetable management that integrates with faculty allocation</li>
        <li>The marks module correctly stores internal assessment data and can produce reports</li>
      </ul>

      <h2>The Most Painful Workflow: CO Attainment Entry</h2>
      <p>
        The worst experience in the system is CO (Course Outcome) attainment entry for NBA accreditation.
      </p>
      <p>
        Every semester, faculty must calculate CO attainment for each course: the percentage of students who achieved each Course Outcome based on their marks. NBA accreditation requires this data be documented and available for audit.
      </p>
      <p>
        <strong>What the current flow looks like:</strong>
      </p>
      <ul>
        <li>Faculty export marks from the marks module as an Excel file</li>
        <li>Faculty manually calculate CO attainment in their own spreadsheets using the exported data</li>
        <li>Faculty manually re-enter the calculated attainment values back into CampX</li>
        <li>This process happens separately for direct and indirect attainment</li>
        <li>A department coordinator then assembles these into a department-level report, again manually</li>
      </ul>
      <p>
        The marks already exist in the system. The CO mapping already exists in the system. The calculation logic is deterministic and standardised across the college. <strong>None of this should be manual.</strong>
      </p>

      <h2>Why This Happens</h2>
      <p>
        The marks module and the CO attainment module are built as separate silos with no automated connection. The ERP was built by a vendor who treated NBA compliance as a documentation requirement, not as a computation problem. The result: faculty spend an average of three to five hours per course per semester on work the system could do in seconds.
      </p>

      <h2>The Redesign Recommendation</h2>
      <h3>1. Auto-calculate CO attainment from the marks module</h3>
      <p>
        The system already has marks, CO mappings, and threshold definitions. Add an automated attainment calculation engine that runs when marks are finalised. Faculty review the output and override individual values if needed — they don&apos;t generate them from scratch.
      </p>
      <h3>2. One-click NBA report generation</h3>
      <p>
        Once CO attainment is confirmed, generate the NBA-compliant PDF report automatically at both the course level and the department level. The format is standardised — there is no reason this should require any manual assembly.
      </p>

      <h2>How I&apos;d Measure Success</h2>
      <ul>
        <li>Time per faculty member spent on CO attainment per semester (target: under 20 minutes from current 3+ hours)</li>
        <li>Data entry errors in submitted NBA reports (target: near zero)</li>
        <li>Faculty satisfaction score for the NBA compliance workflow</li>
        <li>Report submission lead time before NBA deadlines</li>
      </ul>
    </CaseStudyLayout>
  );
}
