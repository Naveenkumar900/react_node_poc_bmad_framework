---
title: React User Dashboard EXPERIENCE
status: finalized
created: 2026-06-03
updated: 2026-06-03
user-dashboardform_factor: web
ui_system: none
---

# Foundation

This is a web-first dashboard experience built for desktop and narrow browser widths. DESIGN.md defines the visual identity, while EXPERIENCE.md defines behavior, states, and interaction patterns.

## Sources
- `_bmad-output/planning-artifacts/prds/prd-react_user_dashboard-2026-06-03/prd.md`
- `user-dashboard/src/App.tsx`
- `user-dashboard/src/components/UserCard.tsx`
- `user-dashboard/src/components/SearchBar.tsx`
- `user-dashboard/src/components/UserDetailModal.tsx`

# Information Architecture

- **Dashboard page**
  - Header / title
  - Search + sort controls
  - User cards list/grid
  - Pagination controls
  - Detail modal overlay

The page is a single primary surface with an overlay-based detail view. The dashboard content is self-contained and does not navigate away.

# Voice and Tone

- Clear and helpful.
- Direct labels and actions.
- Minimal instructional text; focus on data presentation.
- Use simple conversational microcopy for states: `Loading users...`, `View details`, `Error: ...`.

# Component Patterns

## SearchBar

- Behavior: filters users by name, username, or email as the user types.
- Accessibility: input has `aria-label="Search users"` and a visually hidden `<label>`.
- Layout: pairs with sort controls in a horizontal control bar that stacks vertically on narrow screens.

## SortControls

- Behavior: select field and toggle direction.
- Options: `name` and `city`.
- Feedback: active sort direction should be visually obvious and announced by text or icon state.

## UserCard

- Behavior: presents summary details and exposes a single primary action, `View details`.
- Interaction: card is a focused container; the action opens detail overlay.
- Content: name, email, phone, website, company, city.
- Visual: uses `{path.to.tokens.components.card}` styling and calls to action styled as a `{path.to.tokens.components.button.primary}`.

## Pagination

- Behavior: prev/next controls plus page number buttons.
- Disabled state when at first or last page.
- Current page button uses a distinct active style.

## Detail Modal

- Behavior: overlays the page, traps focus, closes on Esc, and closes when clicking outside the panel.
- Content: full user contact/corporate details plus raw JSON preview.
- Accessibility: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, and `aria-describedby`.

# State Patterns

## Loading

- Show a single inline status message: `Loading users...`.
- The message should use `role="status"` and `aria-live="polite"`.

## Error

- Show a visible error banner with `role="alert"`.
- Should appear in the page flow above the list area.

## Empty results

- If search returns no users, display a clear empty state message: `No users found.`
- Avoid showing pagination controls when there are zero results.

## Modal open / close

- When open, background scroll is disabled.
- Focus moves to the close button, and returns to the originating control when closed.

# Interaction Primitives

- Keyboard navigation should support Tab through inputs, buttons, and action controls.
- Focus styles must be visible on cards, buttons, and interactive elements.
- Click / tap on `View details` opens the modal; close uses the close button, Esc, or overlay click.
- Input operations filter results live and reset pagination to page 1.

# Accessibility Floor

- Use semantic HTML elements for headings, buttons, form controls, and lists.
- Ensure color contrast meets minimum standards for text and controls against their backgrounds.
- Provide visible focus indicators on keyboard targets.
- The modal must trap focus and restore focus on close.
- Use `aria-live` for transient loading state and `role="alert"` for error states.

# Key Flows

## Flow 1: Discover users

1. **Amit**, a front-end developer, opens the dashboard on desktop.
2. He reads the page title and search prompt.
3. He scans the initial cards for a familiar user.
4. He uses the search input to narrow results by name.
5. The grid updates immediately and pagination resets to page 1.

## Flow 2: Inspect a user

1. **Amit** identifies a promising user card.
2. He clicks `View details`.
3. The detail modal opens, focus lands on the close button, and page scroll is locked.
4. He reads contact and company details, then closes the modal with Esc or the close control.

## Flow 3: Sort and navigate pages

1. **Amit** chooses `City` from the sort control.
2. The card order updates.
3. He uses page controls to move to the next page.
4. The current page button is highlighted and the list reflects the new page.

# Responsive & Platform

- On narrow screens, control groups stack vertically.
- Card grid collapses gracefully to a single column when available width is limited.
- Modal content remains centered and scrollable within the viewport.

# Open Questions

- Confirm whether the detail view should remain modal-based or become a dedicated route/page.
- Confirm if the dashboard should support a denser row/list alternative for higher data density.
