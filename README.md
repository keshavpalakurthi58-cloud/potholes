# 🛣️ RoadGuard AI — Smart City Pothole & Civic Infrastructure Management Platform

**RoadGuard AI** is a state-of-the-art civic infrastructure and road health monitoring web application powered by React 19, Vite, Tailwind CSS, and Google Gemini AI (`@google/genai`).

---

## 🌟 Key Features

1. **🤖 AI-Powered Pothole Analysis (`@google/genai`)**:
   - Analyzes road photos to detect severity (`Critical`, `High`, `Moderate`, `Low`), danger index, and volume of potholes.
   - Calculates estimated repair budget (material cost in INR, labor cost, and required asphalt quantity in kg).

2. **🗺️ Interactive Live Map**:
   - Visualizes live road hazard markers across city zones.
   - Filters by severity (`Critical`, `High`, `Moderate`, `Low`) and repair status (`Reported`, `In Progress`, `Completed`, `AI Verified`).
   - Interactive detail drawer with rapid action controls for city engineers.

3. **📢 Citizen Report Submission**:
   - Geolocation auto-detection or manual map pin placement.
   - Instant image preview and AI diagnostic analysis.
   - Rewards citizens with points & badges for verified community reports.

4. **🏆 Gamified Community Rewards & Leaderboard**:
   - Citizen leveling system with achievement badges (*First Responder*, *Road Warrior*, *Pothole Hunter*, *Community Hero*).
   - Real-time community leaderboard ranking top civic contributors.

5. **📊 Municipal Admin Dashboard**:
   - High-level KPIs: Total Reports, Critical Potholes, Active Repairs, Repair Rate, and Total Budget Allocation.
   - Interactive charts built with Recharts: Severity distribution & monthly repair velocity.
   - Crew assignment, status transition updates, and AI repair verification scoring.

---

## 🛠️ Tech Stack & Architecture

- **Frontend Core**: React 19 (TypeScript), React Router v7
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS v4, Custom Design Tokens (Safety Amber, Asphalt Dark, Concrete Slate)
- **State Management**: React Context API (`ReportContext`)
- **AI Integration**: `@google/genai` (Gemini Flash Vision)
- **Icons & Animations**: `lucide-react`, `motion`, `canvas-confetti`
- **Charts & Data**: `recharts`

---

## 📁 Folder Structure

```
web-page/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── README.md
├── COMPLETE_CODE.md
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── types/
    │   └── index.ts
    ├── data/
    │   └── mockData.ts
    ├── context/
    │   └── ReportContext.tsx
    ├── components/
    │   └── common/
    │       ├── Navbar.tsx
    │       ├── Footer.tsx
    │       ├── StatCard.tsx
    │       ├── BudgetCard.tsx
    │       ├── DangerMeter.tsx
    │       ├── RoadHealthGauge.tsx
    │       ├── ReportTimeline.tsx
    │       ├── TiltCard.tsx
    │       ├── Badges.tsx
    │       └── HeroRoadScene.tsx
    └── pages/
        ├── LandingPage.tsx
        ├── ReportPage.tsx
        ├── MyReportsPage.tsx
        ├── LiveMapPage.tsx
        ├── RewardsPage.tsx
        ├── AdminDashboardPage.tsx
        └── AdminReportDetailPage.tsx
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js `^18.0.0` or higher
- `npm` or `bun`

### Installation & Run

1. Clone or extract the codebase.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 License
Apache 2.0
