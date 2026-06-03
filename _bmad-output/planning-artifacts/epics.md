---
stepsCompleted: [1, 2, 3, 4]
inputDocuments:
  - _bmad-output/planning-artifacts/prds/prd-react_user_dashboard-2026-06-03/prd.md
  - _bmad-output/planning-artifacts/architecture.md
  - _bmad-output/planning-artifacts/ux-designs/ux-react_user_dashboard-2026-06-03/DESIGN.md
  - _bmad-output/planning-artifacts/ux-designs/ux-react_user_dashboard-2026-06-03/EXPERIENCE.md
project_name: react_user_dashboard
status: draft
created: 2026-06-03
updated: 2026-06-03
---

# React User Dashboard PRD

## Purpose
Build a clean, responsive React + TypeScript dashboard that makes JSONPlaceholder user data easy to browse, filter, sort, and inspect. This PRD supports a small demo/internal web experience rather than a full production admin system.

## Problem Statement
Current user data is only available as raw JSON or in disconnected examples, making it difficult for reviewers and learners to quickly explore contact, company, and address details.

## Goals
- Deliver a usable web dashboard for browsing user records.
- Make search and filtering intuitive for name, username, and email.
- Provide clear navigation from list view to individual user details.
- Keep the experience responsive and accessible across desktop and mobile.

## Target User
- Front-end developers evaluating a React UI example.
- Stakeholders reviewing a prototype user dashboard.
- Learners or demo users who want a lightweight interface for exploring user records.

## Scope
### In scope
- Fetch users from `https://jsonplaceholder.typicode.com/users`
- Display users as responsive cards in a list/grid
- Search on name, username, email
- Sort by name or city
- Paginate client-side for simple navigation
- Open a detail view for a selected user
- Show loading and error states clearly
- Use TypeScript and Vite for the implementation

### Out of scope
- Authentication, authorization, or user management workflows
- Server-side filtering, sorting, or pagination
- Create/update/delete operations on users
- Production-grade persistence beyond the JSONPlaceholder demo data

## Requirements Inventory

### Functional Requirements
FR1: The app must fetch user data from JSONPlaceholder and display it on load.
FR2: The app must show a visible loading state while fetching users.
FR3: The app must show an error state if the user fetch fails.
FR4: The app must provide a search input that filters users by name, username, or email.
FR5: The app must allow sorting users by name or city.
FR6: The app must support client-side pagination with a default page size of 5.
FR7: The app must provide a detail view for a selected user.
FR8: The detail view must be accessible via keyboard and close on Escape.
FR9: The app must render correctly on mobile and desktop screen sizes.

### NonFunctional Requirements
NFR1: Use React with TypeScript and Vite.
NFR2: The UI should be fast and responsive on modern browsers.
NFR3: The modal must trap focus while open and restore focus when closed.
NFR4: The UI should use semantic HTML and visible focus styling.
NFR5: The project should be easy to run locally with `npm install` and `npm run dev`.

### Additional Requirements
- Use a Vite + React + TypeScript starter template for the project skeleton.
- The app is front-end-first and uses JSONPlaceholder as the data source; no backend or authentication layer is required.
- Modal accessibility and keyboard focus management are required for the detail view.
- Search, sort, pagination, and selected user state must be coordinated consistently.
- The project should include explicit component structure and naming guidance for implementation.
- The architecture identifies `create-vite react-ts` as the recommended starter template.

### UX Design Requirements
UX-DR1: Implement the design token system for colors, typography, spacing, rounded corners, buttons, cards, inputs, and modal surfaces.
UX-DR2: Build `SearchBar` with `aria-label="Search users"`, a visually hidden label, and responsive stacking on narrow screens.
UX-DR3: Build `SortControls` with name/city options and clear active sort direction state.
UX-DR4: Build `UserCard` summary cards showing name, email, phone, website, company, city, and a `View details` action.
UX-DR5: Build pagination controls with prev/next buttons, page numbers, disabled states, and active page styling.
UX-DR6: Build a detail modal overlay with focus trap, Esc close, outside-click close, `role="dialog"`, `aria-modal="true"`, and labelled content.
UX-DR7: Show `Loading users...` with `role="status"` and `aria-live="polite"`.
UX-DR8: Show an error banner with `role="alert"` above the list area.
UX-DR9: Show a clear empty state `No users found.` and hide pagination when there are zero results.
UX-DR10: Ensure narrow-screen responsive behavior: control groups stack vertically and the card grid collapses to a single column.
UX-DR11: Provide visible focus indicators on cards, buttons, and interactive elements.
UX-DR12: Disable background scroll when the modal is open and restore focus to the originating control when closed.
UX-DR13: Use semantic HTML for headings, buttons, form controls, and lists, and ensure all interactive elements are keyboard operable.
UX-DR14: Reset pagination to page 1 when search input changes.

### FR Coverage Map
FR1: Epic 1 — fetch and display users on load
FR2: Epic 1 — show a visible loading state while fetching
FR3: Epic 1 — show an error state if the user fetch fails
FR4: Epic 2 — filter users by name, username, or email
FR5: Epic 2 — sort users by name or city
FR6: Epic 2 — support client-side pagination with a default page size of 5
FR7: Epic 3 — provide a detail view for a selected user
FR8: Epic 3 — make the detail view keyboard-accessible and closeable with Escape
FR9: Epic 1/2/3 — render correctly across mobile and desktop screen sizes

## Epic List

### Epic 1: Load and Explore Users
Deliver the initial dashboard experience by fetching JSONPlaceholder user data, presenting it in a responsive list, and showing clear loading, error, and empty-state feedback.
**FRs covered:** FR1, FR2, FR3, FR9

### Epic 2: Discover and Navigate Users
Enable users to search, sort, and paginate the user list so they can find and navigate records efficiently.
**FRs covered:** FR4, FR5, FR6, FR9

### Epic 3: Inspect User Details Accessibly
Allow users to open and interact with a user detail overlay that is keyboard-friendly, accessible, and dismissible.
**FRs covered:** FR7, FR8, FR9

## Epic 1: Load and Explore Users
Deliver the initial dashboard experience by fetching JSONPlaceholder user data, presenting it in a responsive list, and showing clear loading, error, and empty-state feedback.

### Story 1.1: Initialize project from Vite React + TypeScript starter
As a developer,
I want the project to be initialized from a Vite React + TypeScript starter template,
So that the dashboard has the correct project skeleton, dependencies, and local dev workflow in place.

**Acceptance Criteria:**

**Given** the implementation begins,
**When** the project is initialized,
**Then** the repository contains a Vite React + TypeScript starter scaffold with `package.json`, `tsconfig.json`, `vite.config.ts`, and `src/`.
**And** the project can be started locally with `npm install` and `npm run dev`.
**And** the initial setup is aligned with the architecture recommendation to use `create-vite react-ts`.

### Story 1.2: Load and render user data
As a dashboard viewer,
I want the app to fetch user data from JSONPlaceholder and display it in a responsive list,
So that I can see the available user records immediately when the app loads.

**Acceptance Criteria:**

**Given** the app has just started,
**When** the dashboard loads,
**Then** it fetches user data from `https://jsonplaceholder.typicode.com/users`.
**And** it displays the returned users in a responsive card list grid.
**And** it shows `Loading users...` while the request is pending.
**And** it displays an error banner if the request fails.

### Story 1.3: Display loading, error, empty, and responsive states
As a dashboard viewer,
I want the app to show loading, error, empty, and responsive states clearly,
So that I always understand what is happening on desktop and mobile.

**Acceptance Criteria:**

**Given** the user list is loading,
**When** the fetch is pending,
**Then** the page shows `Loading users...` with `role="status"` and `aria-live="polite"`.

**Given** the fetch fails,
**When** the API returns an error,
**Then** the page displays an error banner with `role="alert"` above the list area.

**Given** there are zero users to display after filtering,
**When** the result set is empty,
**Then** the page displays `No users found.`.
**And** pagination controls are hidden.

**Given** the dashboard is viewed on a narrow screen,
**When** the viewport is small,
**Then** control groups stack vertically and user cards collapse to a single column.

## Epic 2: Discover and Navigate Users
Enable users to search, sort, and paginate the user list so they can find and navigate records efficiently.

### Story 2.1: Filter users with search
As a dashboard viewer,
I want to filter users by name, username, or email using a search input,
So that I can quickly find the user I am looking for.

**Acceptance Criteria:**

**Given** the dashboard is displaying users,
**When** I type into the search field,
**Then** the user list updates immediately to include only users whose name, username, or email matches the query.

**Given** the search field is empty,
**When** the dashboard is displayed,
**Then** all users are shown.

**Given** the search field changes,
**When** a new query is entered,
**Then** pagination resets to the first page.

### Story 2.2: Sort users by name or city
As a dashboard viewer,
I want to sort users by name or city with a clear sort control,
So that I can order the list in a way that helps me find users faster.

**Acceptance Criteria:**

**Given** the dashboard is displaying users,
**When** I select `name` or `city` in the sort control,
**Then** the listed users are ordered accordingly.

**Given** I change the sort direction,
**When** I toggle ascending or descending,
**Then** the displayed order updates and the active direction is visually obvious.

### Story 2.3: Paginate the user list client-side
As a dashboard viewer,
I want the user list to be paginated with a default page size of 5,
So that I can navigate through users without overwhelming the page.

**Acceptance Criteria:**

**Given** there are more than 5 users,
**When** the dashboard displays results,
**Then** pagination controls appear below the list.

**Given** the user clicks the next page button,
**When** the current page changes,
**Then** the next set of up to 5 users is shown.

**Given** the current page is the first page,
**When** pagination is visible,
**Then** the previous button is disabled.

**Given** the current page is the last page,
**When** pagination is visible,
**Then** the next button is disabled.

## Epic 3: Inspect User Details Accessibly
Allow users to open and interact with a user detail overlay that is keyboard-friendly, accessible, and dismissible.

### Story 3.1: Open user detail modal from a card
As a dashboard viewer,
I want to open a detail view for a selected user from their card,
So that I can inspect the user’s full contact and company details.

**Acceptance Criteria:**

**Given** the dashboard displays user cards,
**When** I click `View details` on a user card,
**Then** a detail modal opens with that user’s full contact and company information.

**Given** the detail modal is open,
**When** I click outside the modal or use the close button,
**Then** the modal closes.

### Story 3.2: Make the detail modal accessible and keyboard-friendly
As a dashboard viewer,
I want the user detail modal to trap focus, close on Escape, and restore focus when closed,
So that I can navigate the modal reliably using the keyboard.

**Acceptance Criteria:**

**Given** the detail modal is open,
**When** focus moves within the modal,
**Then** focus is trapped inside the modal.

**Given** the detail modal is open,
**When** I press the Escape key,
**Then** the modal closes.

**Given** the modal is closed,
**When** it closes,
**Then** focus returns to the originating control that opened the modal.

