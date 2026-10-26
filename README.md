# Al-Solasia Building Engineering Website
# الثلاثية لهندسة البناء — الموقع الرسمي المعتمد

> **Premium Bilingual Website** | Next.js 15 App Router | TypeScript | Tailwind CSS v4 | `next-intl` (Arabic RTL / English LTR) | Zero Recurring External Costs ($0/month) | Offline CRM Ingestion Boundary.

---

## 1. Project Overview

**Al-Solasia Building Engineering (الثلاثية لهندسة البناء)** has over 30 years of engineering and contracting experience in Egypt (est. 1992). 

This website is engineered to establish immediate credibility, showcase verified project milestones, and generate qualified leads from two key audience segments:
1. **Private Clients & Property Owners:** Turnkey villa construction, luxury apartment/villa renovations, finishing, and site supervision.
2. **Corporate & Institutional Organizations:** Telecommunications infrastructure, public-sector facilities, and large-scale structural rehabilitation with 100% operational continuity.

---

## 2. Technical Architecture & Stack

| Layer | Technology | Rationale |
|---|---|---|
| **Framework** | Next.js 15.5.28 (App Router) | High performance, static pre-rendering (SSG), standalone server output |
| **Runtime** | React 19 + TypeScript 5.8 | Type safety, concurrency support, modern component architecture |
| **Styling** | Tailwind CSS v4 | High-performance compiled CSS, fluid typography, dark frosted glass |
| **Localization** | `next-intl` 3.26 | Idiomatic bilingual routing (`/ar` RTL & `/en` LTR) with zero layout shift |
| **Typography** | `IBM Plex Sans` & `IBM Plex Sans Arabic` | Self-hosted via Next.js Google font loader (zero external CDN requests at runtime) |
| **Icons** | Custom Authored SVG Suite (`Icons.tsx`) | Lightweight, resolution-independent SVGs replacing all raw unicode glyphs |
| **Data Ingestion** | Local Atomic JSON API | RFC 4122 UUID v4, ISO 8601 timestamps, boundary ready for future offline CRM |
| **Operating Cost** | **$0.00 / month** | Zero paid third-party dependencies, form backends, or fonts |

---

## 3. Key Features & Creative Direction

### A. Cinematic Full-Bleed Hero
- Monumental engineering typography paired with Al-Solasia's verified Telecom Egypt facility photograph.
- Dynamic directional gradient ensuring 100% text legibility while preserving building visibility.
- Floating header with smart scroll detection: transparent at the top, transitioning into a dark frosted glass backdrop (`#121315/95`).
- White-accent vector logo with subtle drop shadow (no box container).

### B. Dual Client Pathways (`AudiencePathways.tsx`)
- Resolves the core business requirement by providing clear, tailored entry points:
  - **Pathway 01 (Private Clients):** Guides villa owners and landowners directly to `Plan or Build a Project` (`/services#enquiry-form`).
  - **Pathway 02 (Corporate & Institutional):** Routes organizations seeking infrastructure delivery to `Explore Our Capabilities` (`/projects`).

### C. Interactive Before & After Transformation Slider (`BeforeAfterShowcase.tsx`)
- Modeled directly on the high-craft reference at `tria-llc.com`.
- Interactive vertical divider line with circular dark handle and bidirectional horizontal arrows (`⇄`).
- Real-time percentage readout (`Divider position: 50%` / `موضع الفاصل: 50%`).
- Touch, mouse pointer capture, and keyboard arrow accessibility (`ArrowLeft`, `ArrowRight`, `Home`, `End`).
- 3 Project Switcher Tabs:
  1. `01 DOKKI CENTRAL EXCHANGE` (`سنترال الدقي`): Facade rehabilitation & spall concrete repair.
  2. `02 PORT SAID EXCHANGE` (`سنترال بورسعيد`): Coastal cladding and double glazing upgrade.
  3. `03 SHUBRA EL KHEIMA EXCHANGE` (`سنترال شبرا الخيمة`): Fire and structural remediation with site paving.
- 4-column engineering specification cards below the slider dynamically updating per project.
- Also embedded directly inside the full-screen Project Detail Modal in the portfolio.

### D. Verified Projects Portfolio (`ProjectsPortfolio.tsx`)
- Interactive multi-category filter: All, Infrastructure & Telecom, Restoration (Before & After), Civic & Mosques, Commercial & Fit-out.
- 9 verified company projects with detailed metadata, scopes of work, and high-resolution photographs.

### E. Detailed Forms & CRM-Ready API Routes
- **Endpoint 1 (`POST /api/enquiry`):** Detailed project enquiry capturing client name, phone, email, project type, city/plot location, estimated area, drawing readiness, timeline, budget range, and notes.
- **Endpoint 2 (`POST /api/contact`):** General enquiry and collaboration channel.
- Validates data both client-side and server-side, generates UUID v4, and appends atomically to:
  - `data/project-enquiries.json`
  - `data/contact-messages.json`
- Full ingestion schema documented in [`crm-integration-boundary.md`](./crm-integration-boundary.md).

### F. SEO & Search Engine Infrastructure
- Automatically generated [`sitemap.xml`](http://localhost:3000/sitemap.xml) with bilingual `hreflang` alternates.
- Automatically generated [`robots.txt`](http://localhost:3000/robots.txt).
- Comprehensive OpenGraph metadata, Twitter cards, and `metadataBase` configured in `layout.tsx`.

---

## 4. Getting Started Locally

### Prerequisites
- Node.js `18.18.0` or higher (Node.js 20 LTS recommended).
- npm `9.x` or higher.

### 1. Installation
Clone or navigate to the repository directory and install dependencies:
```bash
cd "Al-Solasia Website"
npm install
```

### 2. Running in Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. The app defaults to Arabic (`/ar`) or English (`/en`).

### 3. Creating a Production Build
```bash
npm run build
```
This compiles all 21 static/dynamic pages and optimizes standalone deployment traces.

### 4. Running the Production Server
```bash
npm start
```
The server will listen at [http://localhost:3000](http://localhost:3000).

---

## 5. Deployment Options

### Option A: Vercel (Recommended for Cloud Hosting)
1. Push the project repository to GitHub / GitLab.
2. Import the project in Vercel.
3. Framework preset: **Next.js**.
4. Root directory: `./`
5. Click **Deploy**. Vercel will build all static routes and host API serverless functions automatically at zero cost on the Hobby tier.

### Option B: Docker Container (Any VPS / Cloud Provider)
The project includes a multi-stage, production-optimized [`Dockerfile`](./Dockerfile) using Node 20 Alpine and Next.js standalone output.

1. Build the Docker container:
```bash
docker build -t al-solasia-website:latest .
```

2. Run the container:
```bash
docker run -d -p 3000:3000 \
  -v $(pwd)/data:/app/data \
  --name al-solasia \
  al-solasia-website:latest
```
*(Mounting `-v $(pwd)/data:/app/data` ensures enquiries written to JSON persist across container restarts).*

### Option C: Linux / Windows VPS with PM2 (Self-Hosted Node Server)
1. On your VPS, run `npm install` and `npm run build`.
2. Start the process with PM2:
```bash
pm2 start npm --name "al-solasia" -- start
pm2 save
pm2 startup
```
3. Configure NGINX or Caddy as a reverse proxy forwarding port `80`/`443` with SSL to `http://localhost:3000`.

---

## 6. Directory Structure

```
├── data/                         # Local JSON storage for enquiries & contacts (git-ignored)
├── messages/                     # Translation dictionaries
│   ├── ar.json                   # Arabic strings (RTL)
│   └── en.json                   # English strings (LTR)
├── public/                       # Static public assets
│   ├── images/                   # Approved hero and branding images
│   ├── logo/                     # Vector SVGs and PNG logo files
│   └── projects/                 # Approved project photography (Before & After)
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── [locale]/             # Bilingual route group
│   │   │   ├── about/            # /about page
│   │   │   ├── careers/          # /careers page
│   │   │   ├── contact/          # /contact page
│   │   │   ├── privacy/          # /privacy page
│   │   │   ├── projects/         # /projects portfolio page
│   │   │   ├── services/         # /services page with enquiry form
│   │   │   ├── layout.tsx        # Root locale layout with fonts & SEO
│   │   │   └── page.tsx          # Homepage with all key narrative sections
│   │   ├── api/
│   │   │   ├── contact/          # POST /api/contact handler
│   │   │   └── enquiry/          # POST /api/enquiry handler
│   │   ├── robots.ts             # robots.txt generator
│   │   └── sitemap.ts            # sitemap.xml generator with hreflang
│   ├── components/
│   │   ├── forms/                # ProjectEnquiryForm & GeneralContactForm
│   │   ├── layout/               # Header, TopBar, Footer, PageHero, LanguageSwitch
│   │   ├── portfolio/            # ProjectsPortfolio & BeforeAfterShowcase
│   │   ├── sections/             # Hero, Stats, AboutTeaser, AudiencePathways, etc.
│   │   └── ui/                   # BeforeAfterSlider, Icons suite
│   ├── i18n/                     # next-intl configuration & routing definition
│   └── lib/                      # projects-data.ts verified dataset
├── crm-integration-boundary.md   # Specification for future offline CRM integration
├── Dockerfile                    # Production multi-stage Alpine container
├── next.config.mjs               # Next.js configuration with standalone output
├── package.json
└── PROJECT-PROGRESS.md           # Complete audit trail across all 15 stages
```

---

## 7. Contact & Project Credits

- **Client:** Al-Solasia Building Engineering — الثلاثية لهندسة البناء
- **Established:** 1992 (30+ Years of Engineering Experience in Egypt)
- **Official Domain:** `https://al-solasia.com`
