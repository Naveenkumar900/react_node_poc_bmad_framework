---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments:
  - _bmad-output/planning-artifacts/prds/prd-react_user_dashboard-2026-06-03/prd.md
  - _bmad-output/planning-artifacts/ux-designs/ux-react_user_dashboard-2026-06-03/DESIGN.md
  - _bmad-output/planning-artifacts/ux-designs/ux-react_user_dashboard-2026-06-03/EXPERIENCE.md
  - _bmad-output/planning-artifacts/briefs/brief-react_user_dashboard-2026-06-03/brief.md
workflowType: 'architecture'
project_name: 'react_user_dashboard'
user_name: 'User'
date: '2026-06-03'
lastStep: 8
status: 'complete'
completedAt: '2026-06-03'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements**
- Fetch user data from JSONPlaceholder and display it on load.
- Show loading and error states.
- Provide search by name, username, or email.
- Allow sorting by name or city.
- Support client-side pagination with a default page size of 5.
- Provide a detail view for a selected user.
- Make the detail view keyboard-accessible and closeable with Escape.
- Render correctly on mobile and desktop.

**Non-Functional Requirements**
- Use React, TypeScript, and Vite.
- Keep the UI fast and responsive on modern browsers.
- Use semantic HTML with visible focus styling.
- Trap focus in the modal and restore focus on close.
- Provide clear local setup with `npm install` and `npm run dev`.

### Scale & Complexity

- Primary technical domain: web frontend.
- Complexity level: low-to-medium.
- Expected architectural components:
  - API service for JSONPlaceholder data fetch.
  - Search / sort / pagination state management.
  - Responsive user card grid.
  - Accessible detail modal overlay.
  - Loading, error, and empty state handling.

### Technical Constraints & Dependencies

- The app relies on remote JSONPlaceholder user data.
- Client-side filtering, sorting, and pagination are required.
- No backend or authentication layer is in scope.
- Modal-based detail viewing is the current UX, with a dedicated route remaining an open question.

### Cross-Cutting Concerns Identified

- Accessibility and keyboard focus management.
- Responsive layout for desktop and narrow screens.
- Consistent state handling across search, sort, pagination, and detail selection.
- Clear user feedback for loading and error states.
- Modal scroll lock and dismiss behavior.

### Summary

This project is a front-end-first dashboard with modest technical scale. The architecture should remain lightweight while ensuring accessible state handling, responsive UX, and robust network/error behavior.

---

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
- The chosen stack (Vite + React 19 + TypeScript) and starter (`create-vite react-ts`) are compatible. Styling via CSS Modules, fetch-based API calls, and `useReducer`/Context state are coherent choices for a small-to-medium demo app.

**Pattern Consistency:**
- Naming, structure, and format rules are consistent with the technology choices (TypeScript + React). Tests co-located with components and `Vitest` match the selected dev tooling.

**Structure Alignment:**
- The proposed project tree maps directly to the components and requirements and supports the implementation patterns defined earlier.

### Requirements Coverage Validation ✅

**Functional Requirements Coverage:**
- All FRs from the PRD are covered by concrete components and hooks (fetch in `src/api/users.ts` + `useUsers`, `SearchBar`, `SortControls`, `UserList`, `UserDetailModal`).

**Non-Functional Requirements Coverage:**
- NFRs (React+TS+Vite, responsive UI, accessible modal behavior) are addressed with the selected starter, component patterns, and accessibility rules.

### Implementation Readiness Validation ✅

**Decision Completeness:**
- Critical architectural decisions are documented. Versions for core tools were verified. Implementation patterns and naming conventions are specified.

**Structure Completeness:**
- Project tree and file mappings are explicit for implementation agents to follow.

**Pattern Completeness:**
- Major conflict points are addressed. Naming, state, API, and testing patterns are defined.

### Gap Analysis Results

**Critical Gaps (blockers):**
- No `package.json` or `src/` code exists yet in the repository — this is an implementation gap (project initialization) rather than an architectural inconsistency. Create the project using the recommended `create-vite` command to resolve.

**Important Gaps:**
- CI workflow stub is not present; add a GitHub Actions `ci.yml` to run tests and build.
- Linting and formatting configuration files are not present; add `.eslintrc` and `.prettierrc`.

**Nice-to-Have Gaps:**
- Example code snippets for `useUsers` and `UserDetailModal` would speed initial implementation.
- `project-context.md` is missing and could hold org-level constraints if relevant.

### Validation Issues Addressed

- Addressed compatibility, naming, and structure consistency. Recommended actionable next steps below.

### Architecture Completeness Checklist

**Requirements Analysis**

- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed
- [x] Technical constraints identified
- [x] Cross-cutting concerns mapped

**Architectural Decisions**

- [x] Core technology stack selected
- [x] Data and API patterns defined
- [x] Frontend state and component patterns defined

**Implementation Readiness**

- [ ] `package.json` and project skeleton created (run starter)
- [ ] CI workflow added
- [ ] Linting/formatting configuration added
- [ ] Example implementations added (optional)

---

**Recommended immediate actions:**
1. Initialize the project with `npm create vite@latest user-dashboard -- --template react-ts` (this creates `package.json` and `src/`).
2. Add `Vitest`, `ESLint`, and `Prettier` and commit initial CI workflow that runs lint/test/build.
3. Implement `src/api/users.ts` and a basic `useUsers` hook as the first story.


## Project Structure & Boundaries

### Complete Project Directory Structure

```
user-dashboard/
├── README.md
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .eslintrc.cjs
├── .prettierrc
├── .github/
│   └── workflows/
│       └── ci.yml
├── public/
│   └── favicon.ico
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── api/
│   │   └── users.ts
│   ├── components/
│   │   ├── SearchBar/
│   │   │   ├── SearchBar.tsx
│   │   │   └── SearchBar.test.tsx
│   │   ├── SortControls/
│   │   │   └── SortControls.tsx
│   │   ├── UserCard/
│   │   │   ├── UserCard.tsx
│   │   │   └── UserCard.test.tsx
│   │   ├── UserList/
│   │   │   ├── UserList.tsx
│   │   │   └── UserList.test.tsx
│   │   └── UserDetailModal/
│   │       ├── UserDetailModal.tsx
│   │       └── UserDetailModal.test.tsx
│   ├── hooks/
│   │   └── useUsers.ts
│   ├── types/
│   │   └── user.ts
│   ├── styles/
│   │   └── tokens.css
│   └── utils/
│       └── format.ts
├── tests/
│   └── e2e/ (optional)
└── .env.example
```

### Mapping Requirements to Structure

- FR-1 (fetch users): `src/api/users.ts` + `src/hooks/useUsers.ts`
- FR-4 (search): `src/components/SearchBar/SearchBar.tsx` + `src/hooks/useUsers.ts`
- FR-5 (sort): `src/components/SortControls/SortControls.tsx`
- FR-6 (pagination): `src/components/UserList/UserList.tsx`
- FR-7/8 (detail modal/accessibility): `src/components/UserDetailModal/UserDetailModal.tsx`

### Architectural Boundaries

- API Boundaries: All external calls live in `src/api/`; UI components consume hook-layer abstractions (`useUsers`).
- Component Boundaries: Presentational components live under `src/components/*`; business logic lives in hooks and `src/api`.
- Service Boundaries: No backend services for MVP; if backend added, introduce `src/services/` and map API contracts there.

---


## Implementation Patterns & Consistency Rules

### Critical Conflict Points Identified

- Potential conflicts where different agents could make incompatible choices: naming (files, components, API), state management patterns, test locations, error/loading handling, and JSON field naming.

### Naming Patterns

**Code & File Naming**
- Component names: `PascalCase` and filenames match the exported component (e.g., `UserCard.tsx`).
- Hook names: `useCamelCase` and filenames match (e.g., `useUsers.ts`).
- Types: lower-case file under `src/types/` and `camelCase` or `PascalCase` exports as appropriate (e.g., `src/types/user.ts` exports `User`).
- Utility functions: `camelCase` names and files (e.g., `formatDate.ts`).

**API & JSON**
- REST endpoints use plural nouns: `/users`.
- Query parameter names use `camelCase` (e.g., `page`, `perPage`, `sortBy`, `sortDir`).
- JSON fields use `camelCase` to match JSONPlaceholder; transform incoming fields only if necessary.

### Structure Patterns

**Project Organization**
- Co-locate component tests: `src/components/Feature/Feature.test.tsx` next to implementation.
- Organize by feature: `src/components/<Feature>/`, `src/hooks/`, `src/api/`, `src/types/`, `src/styles/`.

**File Structure**
- One default export per component file. Named exports for helpers when needed.
- Config files at project root (`tsconfig.json`, `vite.config.ts`, `.eslintrc.cjs`).

### Format Patterns

**API Responses & Errors**
- Treat successful API responses as raw payloads for this demo (no additional `data` wrapper).
- Errors surfaced to UI as `{ message: string }` with `role="alert"`.

**Date & Data Formats**
- Use ISO 8601 strings for date/time when needed; otherwise preserve API-provided formats.

### Communication Patterns

**State & Actions**
- Use immutable state updates (`...` spread) in reducers; avoid direct mutation.
- Action naming: `verb_noun` or `verbNoun` (e.g., `setSearchQuery`, `resetPagination`).

### Process Patterns

**Loading & Error Handling**
- Loading flags: `isLoading` / `isFetching` booleans.
- Error state: `error` object with `message` and optional `code`.
- Show a single page-level error banner for API failures; local component errors may show inline messages.

**Testing & Linting**
- Use `Vitest` for unit/component tests and co-locate `.test.tsx` files.
- Enforce style with `ESLint` + `Prettier`; include `npm run lint` and `npm run format` scripts.

---

 
## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation)**
- Use `create-vite` `react-ts` starter (React + TypeScript + Vite).
- No backend persistence or authentication required for MVP — client-side fetch from JSONPlaceholder.
- Client-side state management for search/sort/pagination/selection using React (`useReducer` + Context) to ensure predictable updates.

**Important Decisions (Shape Architecture)**
- Styling: `CSS Modules` (simple, scoped, low overhead). Tailwind optional if you prefer utility-first styling.
- Modal detail view remains overlay-based (accessibility focus trapping required). Route-based detail view deferred.
- Testing: use `Vitest` for unit/component tests and `playwright` or `cypress` for optional E2E later.

**Deferred Decisions (Post-MVP)**
- SSR or Next.js migration.
- Analytics, Sentry, or production-grade monitoring.
- PWA / offline-first enhancements.

### Data Architecture

- No database required for this demo project.
- Implement a small API service module `src/api/users.ts` that exports `fetchUsers()` and `fetchUser(id)` wrappers around `fetch()` with consistent error handling.
- Caching: simple in-memory caching inside a custom hook (`useUsers`) or adopt `swr`/`react-query` later if caching/refresh needs grow.

### Authentication & Security

- No authentication or authorization for MVP.
- Network: always fetch over HTTPS; handle network errors gracefully and surface `role="alert"` messages for failures.
- Sanitize and defensively handle remote JSON fields before rendering.

### API & Communication

- Communication pattern: REST via `fetch` to `https://jsonplaceholder.typicode.com/users`.
- Error handling: centralized error types and user-facing banners; retry logic optional but keep simple for MVP.

### Frontend Architecture

- State management: use `useReducer` for list state (search, sort, pagination) combined with a small Context provider to avoid prop-drilling.
- Component structure:
  - `src/components/UserList/` (list and pagination)
  - `src/components/UserCard/`
  - `src/components/UserDetailModal/`
  - `src/components/SearchBar/` and `src/components/SortControls/`
- Types: `src/types/user.ts` typed to the JSONPlaceholder shape.
- Accessibility: modal must trap focus (`aria-modal`, `role="dialog"`), loading uses `aria-live`, errors use `role="alert"`.

### Infrastructure & Deployment

- Hosting: Static site hosting (Vercel, Netlify, or GitHub Pages). Recommend Vercel for simplest workflow.
- CI: GitHub Actions workflow to run `npm ci`, `npm test`, and `npm run build` on pushes to `main`.
- Environment: No secrets required for MVP.

### Decision Impact Analysis

**Implementation Sequence:**
1. Initialize project with `create-vite react-ts`.
2. Implement `src/api/users.ts` and a `useUsers` hook with basic caching and error handling.
3. Implement `UserList`, `UserCard`, `SearchBar`, `SortControls`, and `Pagination` components.
4. Implement `UserDetailModal` with accessibility features and focus management.
5. Add unit tests (Vitest) for `useUsers` and a key component; add a basic GitHub Actions workflow.

**Cross-Component Dependencies:**
- The list state logic (search/sort/pagination) must be centralized to avoid inconsistency when opening detail view or changing pages.
- Accessibility decisions affect modal and focus management across components.

---

## Completion & Handoff

**What we completed together**
- Full architecture decision document covering project context, starter selection, core decisions, implementation patterns, project structure, and validation.
- Verified tool versions and provided a clear implementation sequence and immediate next actions.

**Next steps for implementation**
1. Run: `npm create vite@latest user-dashboard -- --template react-ts` and follow the initialization commands.
2. Add `Vitest`, `ESLint`, `Prettier`, and a GitHub Actions `ci.yml` that runs lint/test/build on pushes.
3. Implement the first story: `src/api/users.ts` + `src/hooks/useUsers.ts` + `src/components/UserList`.

**Handoff notes for implementers**
- Follow naming and structure patterns in this document exactly to avoid cross-agent conflicts.
- Keep the modal overlay accessible: trap focus, restore on close, `aria-modal` + `role="dialog"`.
- Co-locate tests and use the recommended file organization to make reviews straightforward.

If you'd like, I can: initialize the repo with the starter, add CI and lint configs, or scaffold the first story — which would you prefer next?


## Starter Template Evaluation

### Technical preferences discovered
- Project requires: **React + TypeScript + Vite**
- Scope: **single-page web dashboard**
- UX: responsive cards, search/sort controls, modal detail view
- No backend, auth, or production-grade persistence required
- No existing source tree or package metadata was found in the repo root

### Primary technology domain
- **Web application** — best fit is a Vite-powered React + TS starter
- This aligns exactly with the PRD’s explicit requirement and keeps the architecture lightweight

### Starter options considered

1. **`create-vite` with `react-ts`**
   - Best match for the current scope
   - Minimal overhead, fast development experience
   - Uses Vite 8.0.16 with React 19 and TypeScript 6.0.3
   - Good for a demo/internal dashboard and avoids unnecessary complexity

2. **Next.js + TypeScript**
   - Useful if the detail view later becomes a dedicated route/page
   - Overkill for this current single-page dashboard scope
   - Not necessary unless the project moves toward SSR, static export, or route-driven UX

3. **Vite + React TS + optional styling system**
   - Plain CSS / CSS modules is the simplest fit
   - Tailwind is also viable, but only if you want utility-first styling and faster UI scaffolding
   - The UX design is modest enough that standard CSS or CSS modules is a safe default

### Recommended starter
- **Selected starter:** `create-vite react-ts`
- **Rationale:** It matches the requirement exactly, is current, and creates the smallest clean foundation for the dashboard.
- **Initialization command:**
  ```bash
  npm create vite@latest user-dashboard -- --template react-ts
  cd user-dashboard
  npm install
  ```
- **Versions verified from npm:**
  - `create-vite`: 9.0.7
  - `vite`: 8.0.16
  - `react`: 19.2.7
  - `typescript`: 6.0.3

### Architectural decisions provided by this starter
- **Language & runtime**
  - React + TypeScript on Vite
  - Fast refresh and optimized production build
- **Styling**
  - Starter supports CSS, Sass, CSS modules, and postcss immediately
  - Recommend plain CSS / CSS modules for this project, with design tokens encoded directly in styles
- **Build tooling**
  - Vite dev server
  - production build via `npm run build`
- **Testing**
  - `create-vite` base template includes a Vitest setup stub
  - Good future fit for component tests and API service tests
- **Project structure**
  - `src/App.tsx`
  - `src/main.tsx`
  - `src/assets/`
  - `src/style.css`
  - Recommended architecture for this project:
    - `src/api/users.ts`
    - `src/components/`
    - `src/hooks/`
    - `src/types/`
    - `src/styles/`
- **Developer experience**
  - simple local startup
  - strong TypeScript feedback
  - small, maintainable codebase for demo users

### Note
I did not find an existing `package.json` or `src/` implementation in the repo root, so this recommendation is based on the PRD and UX/Experience artifacts.

---

