# HRFlow — HR Employee Dashboard

A React-based HR Employee Management Dashboard built as a Capstone Project.

## Domain: Human Resources | API: randomuser.me (Free, No Key Required)

---

## Features

- **Real-time Data Refresh** — Auto-refreshes every 30 seconds with live countdown. Manual refresh button included.
- **Search + Filter + Sort** — Debounced search by name/email/department. Filter by department & status. Sort by name, department, or age.
- **Error Boundary** — Class-based `ErrorBoundary` component wraps all pages. Catches runtime errors gracefully with "Try Again" recovery.
- **Lazy Loading** — All pages are lazily loaded using `React.lazy` + `Suspense` for performance.
- **Context API** — Global state managed via `useReducer` + `Context API` (no Redux needed).
- **React Router v6** — Multi-page routing with `/`, `/employees`, `/employees/:id`, and 404.
- **Custom Hooks** — `useDebounce`, `useAutoRefresh`.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Language | JavaScript ES6+ |
| State | Context API + useReducer |
| Routing | React Router v6 |
| API | Fetch API (randomuser.me) |
| Styling | CSS-in-JS (inline styles) |
| Deployment | Vercel / Netlify |

---

## Project Structure

```
hr-dashboard/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx              ← Entry point
    ├── App.jsx               ← Router + Lazy loading
    ├── index.css             ← Global styles
    ├── context/
    │   └── EmployeeContext.jsx  ← Context API + useReducer (state management)
    ├── hooks/
    │   ├── useDebounce.js    ← Debounced input hook
    │   └── useAutoRefresh.js ← Auto-refresh with countdown
    ├── components/
    │   ├── ErrorBoundary.jsx ← Class-based error boundary
    │   ├── Navbar.jsx        ← Navigation bar
    │   ├── SearchFilterBar.jsx ← Search + Filter + Sort UI
    │   ├── EmployeeCard.jsx  ← Employee card component
    │   ├── StatsCard.jsx     ← Stats/metric card
    │   └── LoadingSpinner.jsx ← Loading state
    └── pages/
        ├── Dashboard.jsx     ← Dashboard with stats + dept chart
        ├── Employees.jsx     ← Employee grid with search/filter
        ├── EmployeeDetail.jsx ← Individual employee profile
        └── NotFound.jsx      ← 404 page
```

---

## Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/hr-dashboard.git
cd hr-dashboard

# 2. Install dependencies
npm install

# 3. Run locally
npm run dev

# 4. Build for production
npm run build
```

Open http://localhost:5173 in your browser.

---

## API Used

**randomuser.me** — Free, open, no API key required.

```
GET https://randomuser.me/api/?results=30&seed=hrapp
```

Returns 30 random users enriched with HR fields: department, status, salary, join date.

---

## Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload the dist/ folder to Netlify
```

---

## Advanced Features Implemented

- [x] Error Boundary (class component)
- [x] Real-time data refresh (30s auto + manual)
- [x] Search + Filter + Sort (with debounce)
- [x] Lazy loading with Suspense
- [x] Custom hooks (useDebounce, useAutoRefresh)
- [x] Context API state management
- [x] React Router v6 with dynamic routes
