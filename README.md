# 🎬 Movie Finder - Movie Database Explorer

A modern, high-performance React application for exploring movies, featuring **GraphQL** integration and **Wikipedia** insights.

---

## 🛠 Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **UI Library:** Material UI (MUI)
- **Data Fetching:** Apollo Client (GraphQL) & Axios (REST)
- **Testing:** Vitest, React Testing Library, MSW, Playwright

---

## 🚀 Commands & Scripts

| Action    | Command            | Description                           |
|:----------|:-------------------|:--------------------------------------|
| **Setup** | `pnpm install`     | Install project dependencies          |
| **Dev**   | `pnpm dev`         | Start development server              |
| **Test**  | `pnpm test`        | Run Unit & Integration tests (Vitest) |
| **E2E**   | `pnpm test:e2e:ui` | Run Playwright tests with UI mode     |

---

## 🧠 Design Decisions

### 1. Architectural Choice: React (Vite) vs. Next.js
I deliberately chose **React with Vite** instead of Next.js. As the task was a pure frontend-focused assignment without the need for SEO or Server-Side Rendering, Vite provided a faster development cycle and a more lightweight bundle for this specific use case.

### 2. Performance Optimization (Memoization)
To prevent unnecessary re-renders in the movie list and search results, I heavily utilized **`useMemo`** and **`useCallback`**. This ensures that complex filtering and data mapping only re-run when the underlying data actually changes, maintaining 60 FPS even with larger datasets.

### 3. Simplified Navigation
I decided **not to implement routing** (e.g., React Router) as the core functionality—searching and viewing movie details via modals—is efficiently handled within a single-page state. This avoids architectural overhead while keeping the user flow intuitive and fast.

### 4. Testing & Reliability
- **Integration Tests:** Used **MSW (Mock Service Worker)** to mock the Wikipedia REST API, ensuring tests are independent of external service availability.
- **E2E Smoke Tests:** A dedicated **Playwright** suite verifies the critical "Happy Path": searching for a movie, opening the modal, and ensuring the UI remains stable during asynchronous updates.
- **UX Buffering:** Implemented a `displayMovie` state in the details modal to ensure smooth exit animations, preventing content from disappearing before the modal fully closes.

---