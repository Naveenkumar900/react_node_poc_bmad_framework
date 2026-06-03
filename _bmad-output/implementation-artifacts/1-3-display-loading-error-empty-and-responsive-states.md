# Story 1.3: Display loading, error, empty, and responsive states

Status: review

## Story

As a dashboard viewer,
I want the app to show loading, error, empty, and responsive states clearly,
so that I always understand what is happening on desktop and mobile.

## Acceptance Criteria

1. Given the user list is loading,
   when the fetch is pending,
   then the page shows `Loading users...` with `role="status"` and `aria-live="polite"`.

2. Given the fetch fails,
   when the API returns an error,
   then the page displays an error banner with `role="alert"` above the list area.

3. Given there are zero users to display after filtering,
   when the result set is empty,
   then the page displays `No users found.`
   and pagination controls are hidden.

4. Given the dashboard is viewed on a narrow screen,
   when the viewport is small,
   then control groups stack vertically and user cards collapse to a single column.

## Tasks / Subtasks

- [ ] Refine the page state UI for the dashboard list.
  - [ ] Confirm the loading state message `Loading users...` is visible and uses `role="status"` and `aria-live="polite"`.
  - [ ] Confirm the error banner is visible above the list and uses `role="alert"`.
  - [ ] Ensure the loading and error states remain page-level and do not expose raw JSON or technical details.
- [ ] Add a clear empty state for zero-result list views.
  - [ ] Show `No users found.` when the computed user list is empty.
  - [ ] Hide pagination controls when there are no results to display.
  - [ ] Keep the empty state visually consistent with the dashboard tone and spacing.
- [ ] Make the dashboard responsive on narrow screens.
  - [ ] Stack top control groups vertically on mobile widths.
  - [ ] Collapse the user card grid to a single column when available width is limited.
  - [ ] Preserve whitespace, card padding, and readable typography on narrow screens.
- [ ] Preserve the existing data loading structure and component boundaries.
  - [ ] Do not rewire the `fetchUsers()` API helper or data fetch flow established in Story 1.2.
  - [ ] Keep `SearchBar`, `UserCard`, and the responsive card grid as the primary UI structure.
- [ ] Validate local startup and build validation after implementing the updated state and responsive behavior.

## Dev Notes

- This story builds directly on Story 1.2. The app already loads users and supports page-level loading and error states.
- The current `src/App.tsx` uses the `SearchBar` and `UserCard` components. This story should refine their layout and the empty-state presentation.
- Search and pagination logic are not required to be implemented in full here; the empty state should still be present when the active user set is empty.
- Use existing CSS tokens and layout patterns in `src/styles.css` and the starter component styles.
- The responsive behavior should be implemented with CSS rules that do not break the current desktop grid.
- Preserve semantic HTML, visible focus styling, and accessible state messaging.

### Project Structure Notes

- Keep raw API fetch behavior in `src/api/users.ts` and do not duplicate API URL or error handling logic.
- Keep presentation logic in `src/App.tsx` or component-level UI fragments; avoid adding new global state patterns for this story.
- Use `src/components/SearchBar.tsx` for control layout and `src/components/UserCard.tsx` for the card rendering.
- This story should not introduce new pages, routes, or modal behavior.

### References

- Source: `_bmad-output/planning-artifacts/epics.md#story-1.3-display-loading-error-empty-and-responsive-states`
- Source: `_bmad-output/planning-artifacts/architecture.md#loading--error-handling`
- Source: `_bmad-output/planning-artifacts/ux-designs/ux-react_user_dashboard-2026-06-03/EXPERIENCE.md#loading`
- Source: `_bmad-output/planning-artifacts/ux-designs/ux-react_user_dashboard-2026-06-03/EXPERIENCE.md#empty-results`
- Source: `_bmad-output/planning-artifacts/ux-designs/ux-react_user_dashboard-2026-06-03/EXPERIENCE.md#responsive--platform`

## Dev Agent Record

### Agent Model Used
Raptor mini (Preview)

### Debug Log References

### Completion Notes List

### File List

## Change Log

- Created story file for 1-3 with detailed state and responsive UI requirements.
