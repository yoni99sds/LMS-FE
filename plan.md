# Implementation Plan - Modern LMS Frontend

Build a comprehensive, modern Learning Management System (LMS) frontend using React, TypeScript, Tailwind CSS, Shadcn UI, and Framer Motion. This is a frontend-only implementation with mock data and client-side state management (Redux/React Query).

## Scope Summary
- **Public Website:** Home, About, Courses, Details, Pricing, Blog, FAQ, Contact, Auth (Login/Register/MFA).
- **Authentication UI:** JWT/OAuth flows (mocked), OTP/MFA screens.
- **Admin Dashboard:** Analytics, User/Instructor management, Categories, Logs, Settings.
- **Instructor Dashboard:** Lesson/Quiz builders, Analytics, Student management.
- **Student Dashboard:** Learning progress, Calendar, Certificates, Profile.
- **Features:** Dark mode, responsive design, animations, charts, and reusable component library.

## Non-Goals
- Real backend integration (Supabase/Postgres is out of scope for this session).
- Real OAuth provider configuration (UI/Mock flows only).
- Live video streaming or file hosting (mocked links/placeholders).

## Assumptions
- Persistence will be handled via `localStorage` for mock auth and settings.
- React Query will use mock fetchers to simulate API latency.
- Redux Toolkit will handle global UI state and simple user data.

## Affected Areas
- **Frontend Framework:** React 18+ with Vite.
- **Styling:** Tailwind CSS + Shadcn UI + Framer Motion.
- **State Management:** Redux Toolkit (auth, UI) + React Query (mock data).
- **Routing:** React Router v6.
- **Components:** Extensive use of `src/components/ui` and new layout components.

## Ordered Phases

### Phase 1: Foundation & Shared Components
- Setup project structure: `src/features`, `src/layouts`, `src/store`.
- Configure Redux Toolkit store and React Query provider.
- Implement shared layouts: `PublicLayout`, `DashboardLayout`, `AuthLayout`.
- Add common components: Navigation, Footer, Sidebar, Theme Toggle.

### Phase 2: Public Website & Auth UI
- Implement Home page with hero sections and course sliders.
- Build Course listing and detail pages with filter/search UI.
- Create Auth flow: Login, Register, OTP Verification, Social Login buttons.
- Static pages: About, Pricing, Blog, FAQ, Contact.

### Phase 3: Student Dashboard
- Dashboard overview with "Continue Learning" and progress charts.
- My Courses, Calendar, and Certificates pages.
- Profile settings and Assignment submission UI.

### Phase 4: Instructor Dashboard
- Course management UI.
- Implement "Lesson Builder" and "Quiz Builder" (interactive forms).
- Student list and basic analytics (Recharts).

### Phase 5: Admin Dashboard
- High-level analytics dashboard.
- User/Instructor management tables with search/pagination.
- System settings and Audit logs UI.

### Phase 6: Polishing & Animations
- Add Framer Motion transitions between pages.
- Implement skeleton loaders for all data-driven components.
- Final dark mode audit and responsive testing.

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. frontend_engineer — Setup foundation, layouts, and public pages.
2. frontend_engineer — Build Student and Instructor dashboards.
3. frontend_engineer — Build Admin dashboard and final polish.

**Per-agent instructions:**

### 1. frontend_engineer
- **Phases:** 1, 2
- **Scope:** 
    - Install dependencies: `bun add @reduxjs/toolkit react-redux @tanstack/react-query framer-motion lucide-react react-router-dom recharts`.
    - Create folder structure: `/src/features`, `/src/layouts`, `/src/store`.
    - Setup `App.tsx` with `React Router`.
    - Build `PublicLayout` and `AuthLayout`.
    - Implement Phase 2 pages: Home, Courses, Auth (Login/OTP).
- **Files:** `src/App.tsx`, `src/store/index.ts`, `src/layouts/`, `src/features/auth/`, `src/pages/`.
- **Depends on:** none
- **Acceptance criteria:** App runs with working navigation between Home, Course List, and Login. Theme toggle works.

### 2. frontend_engineer
- **Phases:** 3, 4
- **Scope:**
    - Build `DashboardLayout` with a collapsible sidebar.
    - Implement Student features: Learning path, Progress tracking.
    - Implement Instructor features: Interactive Course/Quiz builder forms.
    - Use `Recharts` for analytics visualization.
- **Files:** `src/features/dashboard/`, `src/features/instructor/`, `src/components/charts/`.
- **Depends on:** Phase 1 (Layouts)
- **Acceptance criteria:** User can navigate between "Learning" and "Teaching" dashboard views. Builders are functional (state-only).

### 3. frontend_engineer
- **Phases:** 5, 6
- **Scope:**
    - Build Admin Dashboard: User management tables, Audit logs.
    - Add `Framer Motion` page transitions and `Skeleton` loaders to all lists.
    - Ensure 100% responsive coverage and dark mode consistency.
- **Files:** `src/features/admin/`, `src/components/ui/skeleton.tsx`.
- **Depends on:** Phase 4
- **Acceptance criteria:** Admin views are accessible. The app feels "premium" with smooth transitions and loading states.
