# Product Requirements Document (PRD): PMOrbit

## 1. Product Overview
**PMOrbit** is a comprehensive, enterprise-grade Portfolio and Project Management web application designed to centralize and streamline all aspects of project lifecycle management. Built with a robust backend (.NET Core API) and a highly dynamic, modern frontend (React + TypeScript), PMOrbit provides project managers, PMO staff, and executive stakeholders with unparalleled visibility, control, and automation capabilities.

### 1.1 Purpose
To provide a single source of truth for portfolio tracking, RAID log management, Program Increment (PI) planning, document storage, and automated reporting, thereby replacing fragmented tracking methods and increasing organizational delivery efficiency.

---

## 2. Target Audience & User Personas
1. **Project / Program Managers (PMs)**: Need to track daily tasks, milestones, RACI, and submit weekly project health updates (Weekly Catalogue).
2. **Scrum Masters / Agile Leads**: Need to coordinate PI Planning, manage Agile trains, and map dependencies.
3. **Executive Stakeholders / Sponsors**: Require high-level visibility into portfolio health, delivery speeds, and automated PDF reporting.
4. **PMO Administrators**: Need compliance dashboards to ensure data hygiene, systemic adoption rates, and to administer global deadlines.

---

## 3. Core Features & Functional Requirements

### 3.1 Unified Dashboard & Navigation
* **Liquid Glass Navigation**: A sleek, modern, dynamically adapting navigation system.
* **Portfolio Metrics**: Synchronized stat bubbles providing at-a-glance health metrics tied to Weekly Catalogue data.
* **Global Enterprise Search**: Advanced cross-entity search to locate portfolios, individual projects, and documents instantaneously.

### 3.2 Project Management Center
* **Project Metadata**: Track objectives, executive summaries, target completion dates, and sponsors.
* **Phases & Milestones**: Granular tracking mapping the critical path for project delivery.
* **Deliverables**: Detailed tracking aligned to specific phases.
* **RACI Management**: Strict assignment of Responsible, Accountable, Consulted, and Informed roles per initiative.

### 3.3 Integrated RAID Log Management
Proactive risk management to ensure delivery continuity.
* **Risks**: Log potential risks, calculate impact, assign owners, and track mitigation.
* **Assumptions**: Track validation plans and confidence levels.
* **Issues**: Incident tracking, resolution plans, and target resolution dates.
* **Dependencies**: Detail internal/external dependencies and their business/technical impacts.

### 3.4 Advanced Portfolio Reporting (Weekly Catalogue)
* **Weekly Snapshots**: Automated save functionality to capture historical "Weekly Catalogue" data (Name, Scope, Success Criteria, Status) every Friday. 
* **Historical Restoration**: View and restore historical data from any previously saved date.
* **PDF Report Generation**: Automated generation of formatted, multi-page project/portfolio PDF reports.
* **Health Dashboards**: Visual metrics (Recharts) monitoring Delivery speeds and Cancellation rates.

### 3.5 PI Planning (Program Increment) Suite
* **PI Forms & Dashboards**: Dynamic intake forms for PI mapping, capturing trains, products, and vision.
* **Global Deadlines Engine**: Centralized locks preventing submissions past sync deadlines.
* **Bulk Upload**: Functionality to upload and sync historical PI plans.

### 3.6 Document & Knowledge Repository
* **Document Hub**: Secure storage for project artifacts, schematics, and sign-offs directly within a project's namespace.
* **Resource Links**: Embedded directives to specific change management/process documents.

### 3.7 AI-Powered Assistant (AskOrbit)
* **Natural Language Processing**: Chat interface capable of answering project parameter questions and explaining health statuses.
* **External Integration**: Connects to TFS (Team Foundation Server) and ECR datasets to pull hidden metadata (e.g., rollback steps, post-implementation validations).

### 3.8 Archival & Historical Analysis
* **Archives Repository**: Complete isolation of closed, inactive, or historical projects with robust year/manager filtering.
* **Post-Mortem Analytics**: Global status distributions and status percentage tracking for archived cycles.

### 3.9 Calendar & Task Management
* **Global Timeline**: Interactive layout displaying major phases, deliverables, maintenance windows, and milestones.
* **Reminders & Notifications**: Push alerts and email synchronizations for project stakeholders.

---

## 4. Technical Non-Functional Requirements (NFRs)

### 4.1 Technology Stack
* **Frontend**: React (TypeScript) via Vite, TailwindCSS for styling, Recharts for visual analytics, Framer Motion for micro-animations.
* **Backend**: .NET Core C# API.
* **Data Access**: Entity Framework Core, relying on SQL Server (implied by table structure in migrations). Auth integration.
* **API Documentation**: Swagger UI.

### 4.2 Performance & Reliability
* **Data Integrity**: strict Foreign Key constraints and cascading deletes in DB mapping.
* **High Availability**: Application must reliably support daily auto-saving loops (e.g., Weekly Catalogue auto-triggering client/server side on Fridays).

### 4.3 Security & Compliance
* **Authentication**: Token-based authentication (Bearer tokens).
* **Authorization**: strict Role-Based Access Control (RBAC). For example, only Project Owners or Admins can manipulate historical history or PI configurations.
* **Auditability**: All major transactions must capture `CreatedAt` and `CreatedBy` fields.

---

## 5. Future Enhancements (Roadmap)
* Manual snapshot saving for Weekly Catalogues.
* Side-by-side version comparison (Diff View) for historical reporting.
* Enhanced Data Retention Policies for automated archival of outdated history.
* Export capabilities of historical data direct to Excel/PDF.
