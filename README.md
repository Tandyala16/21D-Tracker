<div align="center">
  <img src="https://img.shields.io/badge/REACT-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/TAILWIND_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/SUPABASE-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" />
  <img src="https://img.shields.io/badge/VITE-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" />
</div>

<br />

<div align="center">
  <h1 align="center">🚀 21D-Tracker</h1>
  <p align="center">
    <strong>A high-intensity, 21-Day Mission Control dashboard built for cracking Software Engineering placements.</strong>
  </p>
  <p align="center">
    <a href="https://vvasantha.github.io/21D-Tracker/">View Live Demo</a>
    ·
    <a href="https://github.com/vvasantha/21D-Tracker/issues">Report Bug</a>
  </p>
</div>

<hr />

## 🎯 The Mission
The **21D-Tracker** is not just a to-do list; it is a rigid, specialized engine designed to force discipline and track intensity through a 3-week sprint. It provides a structured daily timeline combining LeetCode problem solving, Aptitude Training, Core CS revision, and aggressive Job Applications into a single visual "Mission Control" center.

## ✨ Core Features
*   **Github-Style Contribution Heatmap**: Stop breaking the chain. The Dashboard renders a 21-day timeline grid that lights up emerald green when you hit your minimum daily thresholds, providing a striking visual history of your discipline.
*   **Dual-Layer Data Persistence**: Enjoy the instant, zero-latency speed of local React state combined with **Supabase Cloud Syncing**. The tracker utilizes aggressive background debouncing to synchronize `localStorage` state into a secure PostgreSQL backend (`auth.users` with RLS Policies).
*   **Bidirectional Sync Engine**: Modifying "Total" metrics dynamically adjusts "Today's Goal" progression, and vice versa. 
*   **Intelligent Automation**: The tracker inherently knows when a calendar day rolls over, automatically wiping daily schedules and goals back to `0` while maintaining your total lifetime tallies and calculating your maximum 🔥 Streak.
*   **Zero-Loss Backups**: Instantly dump your entire application state into an encrypted JSON file, or upload a JSON backup directly into the React context without reloading the browser.

## 🛠️ Tech Stack
*   **Frontend**: React 18 (Hooks, functional components)
*   **Routing**: React Router DOM (v6) for seamless single-page-application transitions.
*   **Styling**: Tailwind CSS v4 atomic engine.
*   **Backend & Auth**: Supabase SDK (PostgreSQL, Row Level Security, Email/password Auth).
*   **Build Tool**: Vite for lightning-fast HMR and minified production bundles.
*   **Deployment**: GitHub Pages (`gh-pages`).

## 📥 Installation & Setup
To run this project locally, clone the repository and install the dependencies:

```bash
# Clone the repository
git clone https://github.com/vvasantha/21D-Tracker.git

# Navigate into the project directory
cd 21D-Tracker

# Install Javascript dependencies
npm install

# Start the Vite Development Server
npm run dev
```

### 🔒 Environment Configuration
This application requires a Supabase Backend. Create a `.env.local` file in the root directory and populate it with your Supabase keys:
```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### Supabase Schema Setup
Ensure your Supabase project contains a `user_data` table structured with:
- `id` (uuid, primary key)
- `user_id` (uuid, foreign key linked to auth.users)
- `state_json` (jsonb data column)

## 🎨 Views

### Dashboard Overview
The command center. Displays overall mission readiness by aggregating Core CS mastery, Aptitude progression, total Jobs Applied, and the visually striking **21-Day Contribution Timeline**. 

### Hourly Scheduler
Breaks your day down into 5 hours and 30 minutes of rigid execution. Missing blocks deducts from your `Daily %`. 

### DSA & Aptitude Progress
Granular checklist to track mastery over LeetCode arrays, Two Pointers, Dynamic Programming, as well as Quantitative Aptitude formulas. Fully animated Ring and Bar charts natively calculate progress percentages.

## ⚖️ License
Distributed under the MIT License. See `LICENSE` for more information.

<br />
<div align="center">
  <i>"Don't practice until you get it right. Practice until you can't get it wrong."</i>
</div>
