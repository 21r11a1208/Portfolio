# Product Requirements Document (PRD)
## Agridrone — Drone Services Marketplace for Agriculture

**Version:** 1.0  
**Date:** March 16, 2026  
**Status:** Draft

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Goals & Success Metrics](#3-goals--success-metrics)
4. [User Personas](#4-user-personas)
5. [User Stories](#5-user-stories)
6. [Feature Requirements](#6-feature-requirements)
7. [Non-Functional Requirements](#7-non-functional-requirements)
8. [System Architecture](#8-system-architecture)
9. [Data Models](#9-data-models)
10. [API Contract Summary](#10-api-contract-summary)
11. [Feature Status & Roadmap](#11-feature-status--roadmap)
12. [Out of Scope](#12-out-of-scope)
13. [Open Questions & Risks](#13-open-questions--risks)

---

## 1. Executive Summary

Agridrone is a web-based SaaS marketplace connecting **farmers** with **licensed drone operators** for on-demand aerial application of pesticides and fertilizers. The platform operates on a freemium model, providing self-service tools for farmers to manage their fields and service requests, operators to manage their availability and job pipeline, and admins to oversee all platform activity.

The platform is designed to reduce the labor cost and time associated with traditional ground-based spraying, improve application precision via drones, and create a new income stream for drone operators serving rural and semi-urban agricultural areas.

---

## 2. Problem Statement

### For Farmers
Traditional pesticide and fertilizer application is slow, labor-intensive, and costly. Farmers in many regions lack access to modern drone spraying services because there is no easy way to discover, book, or trust local drone operators.

### For Drone Operators
Drone operators with spraying-equipped UAVs lack a structured channel to market their services, manage bookings, and build a client base. They rely on word-of-mouth and informal networks, leaving service capacity underutilized.

### The Gap
No single platform currently:
- Lets farmers define their fields, specify service needs, and track job progress end-to-end.
- Lets operators publish their availability, radius, and pricing in a discoverable way.
- Provides an admin layer to ensure platform quality and trust.

---

## 3. Goals & Success Metrics

### Product Goals
| Goal | Description |
|------|-------------|
| G1 | Enable farmers to request drone services in under 5 minutes |
| G2 | Enable operators to accept and complete jobs through a single interface |
| G3 | Give admins full visibility and control over platform users and activity |
| G4 | Provide a reliable, secure, and mobile-friendly experience |
| G5 | Lay the groundwork for monetization via premium features |

### Success Metrics (KPIs)
| Metric | Target |
|--------|--------|
| Service request fulfillment rate | ≥ 80% of pending requests accepted within 48 hours |
| Farmer registration-to-first-request time | ≤ 10 minutes |
| Operator profile completion rate | ≥ 70% of registered operators set location and rate |
| Platform uptime | ≥ 99.5% |
| Mobile usability score (Lighthouse) | ≥ 80 |

---

## 4. User Personas

### Persona 1 — Raju (Farmer)
- **Age:** 42 | **Location:** Rural Maharashtra, India
- **Tech literacy:** Basic smartphone user
- **Pain points:** Expensive manual spraying, hard to find trusted drone operators, can't track job progress
- **Goal:** Book a reliable drone operator for his 5-acre paddy field before monsoon season
- **Device:** Mobile phone (primary), desktop (occasional)

### Persona 2 — Vikram (Drone Operator)
- **Age:** 29 | **Location:** Semi-urban Karnataka, India
- **Tech literacy:** Comfortable with apps and websites
- **Pain points:** Finds clients only through referrals, no way to show pricing/availability upfront, manages jobs manually in a notebook
- **Goal:** List his services, see incoming requests by area, and manage his job queue digitally
- **Device:** Mobile phone (primary)

### Persona 3 — Priya (Platform Admin)
- **Age:** 35 | **Location:** Bangalore (office)
- **Tech literacy:** High
- **Pain points:** No single view of platform activity, manually handling disputes, no analytics
- **Goal:** Monitor platform health, manage users, resolve issues, and track growth
- **Device:** Desktop (primary)

---

## 5. User Stories

### Farmer
| ID | Story | Priority |
|----|-------|----------|
| F1 | As a farmer, I want to register with my name, email, and phone so I can access the platform. | P0 |
| F2 | As a farmer, I want to create fields by providing name, area, crop type, and location coordinates so operators know what they're servicing. | P0 |
| F3 | As a farmer, I want to submit a service request for a specific field, choosing service type (pesticide/fertilizer) and preferred date. | P0 |
| F4 | As a farmer, I want to view the real-time status of my service requests (pending → accepted → completed). | P0 |
| F5 | As a farmer, I want to see a map of nearby drone operators to understand who is available in my area. | P1 |
| F6 | As a farmer, I want to cancel a pending service request if my plans change. | P1 |
| F7 | As a farmer, I want to view current weather and a 5-day forecast so I can plan spraying activities. | P1 |
| F8 | As a farmer, I want to update my profile (name, phone, password) at any time. | P2 |

### Drone Operator
| ID | Story | Priority |
|----|-------|----------|
| O1 | As an operator, I want to register and set up my profile with location, service radius, and hourly rate so farmers can discover me. | P0 |
| O2 | As an operator, I want to browse all available (pending) service requests to find jobs near me. | P0 |
| O3 | As an operator, I want to accept a service request so the farmer knows their job is confirmed. | P0 |
| O4 | As an operator, I want to mark a service request as completed when the job is done. | P0 |
| O5 | As an operator, I want to see all my assigned requests in one place. | P0 |
| O6 | As an operator, I want to toggle my availability on/off so I don't receive requests when I'm busy. | P1 |
| O7 | As an operator, I want to update my GPS location and service radius so my profile stays accurate. | P1 |
| O8 | As an operator, I want to view field details (size, crop type, location) before accepting a request. | P1 |

### Admin
| ID | Story | Priority |
|----|-------|----------|
| A1 | As an admin, I want to see a dashboard with total users, operators, farmers, service requests, and fields at a glance. | P0 |
| A2 | As an admin, I want to view, create, edit, and delete any user account regardless of role. | P0 |
| A3 | As an admin, I want to filter users by role (farmer/operator/admin). | P1 |
| A4 | As an admin, I want to view all service requests and filter by status. | P1 |
| A5 | As an admin, I want to manually update a service request's status or reassign it to a different operator. | P1 |
| A6 | As an admin, I want to update my own profile photo and personal details. | P2 |
| A7 | As an admin, I want to view analytics and reports on platform usage (request volume, completion rates, user growth). | P2 |

---

## 6. Feature Requirements

### 6.1 Authentication & Authorization

**FR-AUTH-01:** Users must register with email, password, first name, last name, phone, and role.  
**FR-AUTH-02:** Passwords must be securely hashed (bcrypt/Werkzeug) before storage.  
**FR-AUTH-03:** Login must return a JWT token valid for 1 hour.  
**FR-AUTH-04:** All protected endpoints must validate the JWT token.  
**FR-AUTH-05:** Admin endpoints must additionally validate that the authenticated user has `role = 'admin'`.  
**FR-AUTH-06:** On token expiry or invalidity, the frontend must clear session data and redirect to login.  
**FR-AUTH-07:** Users must be able to update their own profile (name, phone, password). Operators may additionally update location, service radius, hourly rate, and availability.

---

### 6.2 Field Management (Farmers)

**FR-FIELD-01:** Farmers must be able to create a field with: name, description, area (hectares), crop type, and GeoJSON polygon coordinates.  
**FR-FIELD-02:** Farmers must be able to view a list of all their fields.  
**FR-FIELD-03:** Farmers must be able to edit any field they own.  
**FR-FIELD-04:** Farmers must be able to delete a field (soft or hard delete).  
**FR-FIELD-05:** A farmer may only access their own fields; cross-user field access must be denied.

---

### 6.3 Service Request Management

**FR-SR-01:** Farmers must be able to create a service request by selecting a field, service type (pesticide or fertilizer), scheduled date, and optional notes.  
**FR-SR-02:** Newly created service requests start with status `pending`.  
**FR-SR-03:** Farmers must be able to view all their service requests with status indicators.  
**FR-SR-04:** Farmers must be able to edit a service request only while it is in `pending` status.  
**FR-SR-05:** Farmers must be able to cancel (delete) a service request.  
**FR-SR-06:** Operators must see all `pending` service requests on an available-requests page.  
**FR-SR-07:** An operator accepting a request changes its status to `accepted` and assigns their ID to it.  
**FR-SR-08:** An operator completing a request changes its status to `completed` and records a `completed_at` timestamp.  
**FR-SR-09:** Admins must be able to view, filter (by status), and update any service request.  
**FR-SR-10:** Admins must be able to reassign a service request to a different operator.  

**Status State Machine:**
```
pending → accepted → completed
pending → cancelled (by farmer or admin)
accepted → cancelled (by admin only)
```

---

### 6.4 Operator Profile & Discovery

**FR-OP-01:** Operators must be able to set/update latitude, longitude, service radius (km), hourly rate, and is_available flag.  
**FR-OP-02:** Operators must be able to toggle their availability status.  
**FR-OP-03:** The Nearby Operators map (farmer-facing) must display all operators with coordinates.  
**FR-OP-04 (Future):** The availability filter should limit shown operators to those with `is_available = true` within a configurable radius of the farmer's location.

---

### 6.5 Weather

**FR-WX-01:** The platform must expose current weather and a 5-day forecast by latitude/longitude via the backend weather proxy endpoints.  
**FR-WX-02:** The frontend weather component must display temperature, condition description, humidity, wind speed, and weather icon.  
**FR-WX-03:** The API key must be stored as a server-side environment variable; it must not be exposed in frontend bundles.

---

### 6.6 Admin Dashboard & Management

**FR-ADM-01:** The admin dashboard must show: total farmers, total operators, total service requests, total fields, and request counts by status.  
**FR-ADM-02:** Admins must be able to list, create, edit, and delete users of any role.  
**FR-ADM-03:** Admins must be able to filter users by role.  
**FR-ADM-04:** Admins must be able to view and update service requests (status, operator assignment, notes).  
**FR-ADM-05:** Admin profile settings must support photo upload and personal info updates.  
**FR-ADM-06 (Future):** Admin reports must include charts for: new user registrations over time, service requests created/completed per week, and operator utilization rate.

---

### 6.7 Notifications (Future — P2)

**FR-NOTIF-01:** Farmers must receive a notification (email or in-app) when their service request is accepted or completed.  
**FR-NOTIF-02:** Operators must receive a notification (email or in-app) when a new service request is available in their area.

---

### 6.8 Payments / Freemium (Future — P3)

**FR-PAY-01:** Free tier: unlimited service requests, basic profile.  
**FR-PAY-02:** Premium tier: priority request listing, analytics, custom branding.  
**FR-PAY-03:** Payment integration via Stripe or Razorpay (region-appropriate).

---

## 7. Non-Functional Requirements

### 7.1 Performance
- API response time for all endpoints must be **< 500ms** under normal load.
- Frontend initial page load must be **< 3 seconds** on a 4G connection.
- Map rendering (Leaflet) must load within **2 seconds** of page open.

### 7.2 Security
- All passwords hashed using Werkzeug PBKDF2/bcrypt; plaintext passwords never stored.
- JWT tokens signed with a strong secret key sourced from environment variables.
- All admin and role-specific endpoints must enforce both JWT validity and role checks on the backend.
- CORS configured to allow only the frontend origin; wildcard `*` is not acceptable in production.
- File uploads (profile photos) must be validated for type and size; stored outside the web root or in object storage.
- No API keys, secrets, or credentials may be committed to source control or exposed in frontend bundles.
- All user input must be validated server-side to prevent SQL injection and XSS.

### 7.3 Reliability & Availability
- Platform uptime target: **≥ 99.5%**.
- Database must be backed up daily in production.
- SQLite is acceptable for development; **PostgreSQL** is required for production.

### 7.4 Scalability
- Backend must be stateless (JWT-based) to support horizontal scaling behind a load balancer.
- Static assets (uploads, images) must be served from a CDN or object storage (e.g., S3) in production.

### 7.5 Usability & Accessibility
- UI must be fully responsive across mobile (≥ 375px), tablet, and desktop viewports.
- Color contrast must meet WCAG AA standards.
- All interactive form elements must have visible labels and accessible keyboard navigation.

### 7.6 Maintainability
- Backend routes must remain modular (one Blueprint per domain: auth, farmers, operators, admin, weather).
- Frontend API calls must be centralized in the `/services/` layer; pages must not call `axios` directly.
- Environment-specific configuration (DB URI, JWT key, API keys) must be set via environment variables, never hardcoded.

---

## 8. System Architecture

```
┌─────────────────────────────────────────────┐
│                  Browser (React SPA)         │
│  Port 3002   Axios → /api/*  (proxy)         │
└────────────────────┬────────────────────────┘
                     │ HTTP / REST
┌────────────────────▼────────────────────────┐
│              Flask Backend (Python)          │
│  Port 8000                                   │
│  Blueprints: auth, farmers, operators,       │
│              admin, weather                  │
│  JWT Auth | CORS | Werkzeug                  │
└─────────┬──────────────────────┬────────────┘
          │                      │
┌─────────▼──────┐    ┌──────────▼──────────┐
│  SQLite / PG   │    │   OpenWeatherMap API │
│  (SQLAlchemy)  │    │   (external HTTP)    │
└────────────────┘    └─────────────────────┘
```

**Key Design Decisions:**
- The React frontend communicates exclusively with the Flask backend via REST API.
- The Flask backend proxies weather requests to avoid exposing the OpenWeatherMap API key client-side.
- JWT is stateless; no server-side session store is required.
- SQLAlchemy ORM abstracts the database layer, enabling a clean migration from SQLite (dev) to PostgreSQL (production).

---

## 9. Data Models

### User
| Field | Type | Notes |
|-------|------|-------|
| id | Integer | PK, auto-increment |
| email | String(120) | Unique, not null |
| password_hash | String(256) | Werkzeug-hashed |
| first_name | String(50) | Not null |
| last_name | String(50) | Not null |
| phone | String(20) | Optional |
| role | String(20) | `farmer`, `operator`, `admin` |
| is_premium | Boolean | Default false |
| latitude | Float | Operator location |
| longitude | Float | Operator location |
| is_available | Boolean | Operator availability flag |
| service_radius | Float | km, operators only |
| hourly_rate | Float | Operators only |
| service_details | Text | Operator description |
| photo_url | String | Profile photo path |
| created_at | DateTime | Auto-set |
| updated_at | DateTime | Auto-updated |

### Field
| Field | Type | Notes |
|-------|------|-------|
| id | Integer | PK |
| name | String(100) | Not null |
| description | Text | Optional |
| area | Float | Hectares |
| coordinates | Text | GeoJSON polygon (JSON string) |
| crop_type | String(100) | e.g., "paddy", "wheat" |
| user_id | Integer | FK → User (farmer) |
| created_at | DateTime | Auto-set |
| updated_at | DateTime | Auto-updated |

### ServiceRequest
| Field | Type | Notes |
|-------|------|-------|
| id | Integer | PK |
| field_id | Integer | FK → Field |
| farmer_id | Integer | FK → User (farmer) |
| operator_id | Integer | FK → User (operator), nullable |
| service_type | String(50) | `pesticide` or `fertilizer` |
| status | String(20) | `pending`, `accepted`, `completed`, `cancelled` |
| scheduled_date | DateTime | Requested service date |
| notes | Text | Optional additional info |
| created_at | DateTime | Auto-set |
| updated_at | DateTime | Auto-updated |
| completed_at | DateTime | Set when status → `completed` |

### Relationships
```
User (farmer) 1──* Field
User (farmer) 1──* ServiceRequest (as farmer_id)
User (operator) 1──* ServiceRequest (as operator_id)
Field 1──* ServiceRequest
```

---

## 10. API Contract Summary

### Authentication
| Method | Endpoint | Auth | Request Body | Response |
|--------|----------|------|--------------|----------|
| POST | `/api/auth/register` | — | `email, password, first_name, last_name, phone, role` | `{ user, access_token }` |
| POST | `/api/auth/login` | — | `email, password` | `{ user, access_token }` |
| GET | `/api/auth/profile` | JWT | — | `{ user }` |
| PUT | `/api/auth/profile` | JWT | Any user fields | `{ user }` |

### Farmers
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/farmers/fields` | JWT (farmer) | List own fields |
| POST | `/api/farmers/fields` | JWT (farmer) | Create field |
| GET | `/api/farmers/fields/<id>` | JWT (farmer) | Get field |
| PUT | `/api/farmers/fields/<id>` | JWT (farmer) | Update field |
| DELETE | `/api/farmers/fields/<id>` | JWT (farmer) | Delete field |
| GET | `/api/farmers/service-requests` | JWT (farmer) | List own requests |
| POST | `/api/farmers/service-requests` | JWT (farmer) | Create request |
| GET | `/api/farmers/service-requests/<id>` | JWT (farmer) | Get request |
| PUT | `/api/farmers/service-requests/<id>` | JWT (farmer) | Update request (pending only) |
| DELETE | `/api/farmers/service-requests/<id>` | JWT (farmer) | Cancel request |

### Operators
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/operators/service-requests/available` | JWT (operator) | All pending requests |
| GET | `/api/operators/service-requests` | JWT (operator) | Operator's requests |
| POST | `/api/operators/service-requests/<id>/accept` | JWT (operator) | Accept request |
| POST | `/api/operators/service-requests/<id>/complete` | JWT (operator) | Complete request |
| GET | `/api/operators/service-requests/<id>` | JWT (operator) | Request details |
| POST | `/api/operators/update-location` | JWT (operator) | Update location/radius/availability |
| POST | `/api/operators/availability` | JWT (operator) | Update availability |

### Admin
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/admin/users` | JWT + admin | List users (filter: `?role=`) |
| GET/PUT/DELETE | `/api/admin/users/<id>` | JWT + admin | User CRUD |
| GET | `/api/admin/operators` | JWT + admin | List operators |
| GET | `/api/admin/service-requests` | JWT + admin | List requests (filter: `?status=`) |
| GET/PUT | `/api/admin/service-requests/<id>` | JWT + admin | Request details/update |
| GET | `/api/admin/stats` | JWT + admin | Dashboard statistics |
| POST | `/api/admin/profile-photo` | JWT + admin | Upload profile photo |

### Weather
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/weather/current` | — | Current weather (`?lat=&lon=&units=`) |
| GET | `/api/weather/forecast` | — | 5-day forecast (`?lat=&lon=&units=`) |

---

## 11. Feature Status & Roadmap

### v1.0 — Current State (Completed)

| Feature | Frontend | Backend |
|---------|----------|---------|
| Registration & login (JWT) | ✅ | ✅ |
| Role-based access (farmer/operator/admin) | ✅ | ✅ |
| Farmer field management | ✅ | ✅ |
| Farmer service request lifecycle | ✅ | ✅ |
| Operator available/assigned request views | ✅ | ✅ |
| Operator accept/complete requests | ✅ | ✅ |
| Operator profile (location, radius, rate) | ✅ | ✅ |
| Nearby operators map (Leaflet) | ✅ | ✅ |
| Weather widget (current + forecast) | ✅ | ✅ |
| Admin dashboard with stats | ✅ | ✅ |
| Admin user management (CRUD) | ✅ | ✅ |
| Admin service request management | ✅ | ✅ |
| Admin profile photo upload | ✅ | ✅ |
| Responsive / mobile-friendly UI | ✅ | — |
| PWA manifest + service worker | ✅ | — |

### v1.1 — Near-term (High Priority)

| Feature | Notes |
|---------|-------|
| Admin reports/analytics | Charts for user growth, request volume, completion rates (Chart.js or Recharts) |
| Geospatial operator filtering | Filter available requests and map by within-radius proximity |
| Operator availability calendar | Replace boolean with date-range-based scheduling |
| Input validation improvements | Server-side validation with detailed error messages |
| Production DB migration | Switch from SQLite to PostgreSQL |

### v1.2 — Medium-term

| Feature | Notes |
|---------|-------|
| Email notifications | Notify farmers on accept/complete; notify operators on new nearby requests |
| In-app notifications | Toast/badge alerts using WebSocket or polling |
| Service request history | Archived completed/cancelled requests with search/filter |
| Ratings & reviews | Farmers rate operators post-job; display aggregate score on operator profile |
| Advanced search & filtering | Filter operators by crop type, service type, rating |

### v2.0 — Long-term

| Feature | Notes |
|---------|-------|
| Payment integration | Stripe / Razorpay; per-job invoicing, subscription tiers |
| Premium tier features | Priority listing, advanced analytics, custom subdomain |
| Mobile native app | React Native port using shared API layer |
| Admin CMS | Configurable pricing tiers, service categories, geographic zones |
| Multi-language support | Hindi, Kannada, Marathi for rural user adoption |
| Drone telemetry integration | Job tracking with live GPS from drone controller |

---

## 12. Out of Scope

The following are explicitly out of scope for v1.0 and v1.1:

- Real-time drone telemetry or live tracking
- Drone hardware integration or firmware APIs
- Video/photo evidence upload for completed jobs
- Multi-tenancy (single-tenant platform at this stage)
- Fractional billing / time-and-materials invoicing
- Third-party operator background verification
- Government regulatory compliance modules (DGCA for India, FAA for USA)

---

## 13. Open Questions & Risks

| # | Question / Risk | Impact | Owner |
|---|----------------|--------|-------|
| 1 | How should geospatial filtering be implemented — DB-side Haversine formula or PostGIS extension? | Medium | Backend team |
| 2 | Should the OpenWeatherMap key be moved fully server-side, or is the current frontend fallback acceptable? | High (security) | Backend team |
| 3 | What is the data retention policy for cancelled/completed service requests? | Medium | Product |
| 4 | How are disputes handled if an operator marks a job complete but the farmer disagrees? | High (trust) | Product |
| 5 | Is SQLite acceptable for a limited-scale production launch, or is pg migration a v1.0 blocker? | High (reliability) | Engineering |
| 6 | Should farmer registration require identity verification to prevent abuse? | Medium | Product |
| 7 | What notification channels are preferred for key markets (SMS via Twilio vs email vs WhatsApp)? | High (adoption) | Product |
| 8 | Are there regulatory requirements for drone spraying in target markets that the platform must enforce or display? | High (legal) | Product / Legal |

---

*Document maintained by the Agridrone product team. For questions, open an issue in the project repository.*
