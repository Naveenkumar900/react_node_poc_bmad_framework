# Story 2.2: Sort users by name or city

Status: review

## Story

As a dashboard viewer,
I want to sort users by name or city with a clear sort control,
so that I can order the list in a way that helps me find users faster.

## Acceptance Criteria

1. Given the dashboard is displaying users,
   when I select `name` or `city` in the sort control,
   then the listed users are ordered accordingly.

2. Given the dashboard has an active sort direction,
   when I toggle between ascending and descending,
   then the displayed order updates and the active direction is visually obvious.

3. Given the user changes the filter query,
   when the list is filtered,
   then the active sort order is preserved on the filtered results.

4. Given the dashboard is on a narrow screen,
   when sort controls are visible,
   then they remain usable and stack without breaking layout.

## Tasks / Subtasks

- [ ] Add sort field state with `name` and `city` options.
- [ ] Add sort direction state for ascending and descending order.
- [ ] Render sort controls alongside the existing search bar.
- [ ] Sort filtered users before rendering the card list.
- [ ] Keep the existing loading, error, and empty state behavior intact.
- [ ] Add test coverage for sort ordering.

## Dev Notes

- This story builds on Story 2.1 and should use the existing search/filter state.
- The sort control should be accessible and visually integrated with the dashboard controls.
- Sort order should apply after the list is filtered, not before.
- No backend changes are required; the sorting should happen entirely in the client view layer.

### References

- Source: `_bmad-output/planning-artifacts/epics.md#story-2.2-sort-users-by-name-or-city`
- Source: `_bmad-output/planning-artifacts/ux-designs/ux-react_user_dashboard-2026-06-03/EXPERIENCE.md`
