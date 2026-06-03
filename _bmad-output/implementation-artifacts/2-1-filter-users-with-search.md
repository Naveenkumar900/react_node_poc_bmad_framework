# Story 2.1: Filter users with search

Status: review

## Story

As a dashboard viewer,
I want to filter users by name, username, or email using a search input,
so that I can quickly find the user I am looking for.

## Acceptance Criteria

1. Given the dashboard is displaying users,
   when I type into the search field,
   then the user list updates immediately to include only users whose name, username, or email matches the query.

2. Given the search field is empty,
   when the dashboard is displayed,
   then all users are shown.

3. Given the filter query changes,
   when a new search term is entered,
   then the displayed results update live.

4. Given the filtered set is empty,
   when no users match the query,
   then the dashboard shows `No users found.` and hides pagination controls.

## Tasks / Subtasks

- [ ] Add live filtering logic for the search input in the dashboard.
- [ ] Match queries against user `name`, `username`, and `email`.
- [ ] Normalize query text so search is case-insensitive.
- [ ] Keep the existing loading/error state behavior intact.
- [ ] Preserve responsive layout and accessible input labeling.
- [ ] Validate that the filter state updates immediately as the user types.

## Dev Notes

- This story builds on the existing app loading flow and the search input already present in `src/components/SearchBar.tsx`.
- Search logic should be placed where the list is rendered so the UI can respond immediately to query changes.
- Avoid changing the API layer; keep `fetchUsers()` as a simple remote fetch wrapper.
- Use the existing empty-state messaging when zero results remain after filtering.
- This story does not require sorting or pagination yet, but it should not prevent those features from being added later.

### References

- Source: `_bmad-output/planning-artifacts/epics.md#story-2.1-filter-users-with-search`
- Source: `_bmad-output/planning-artifacts/architecture.md#loading--error-handling`
- Source: `_bmad-output/planning-artifacts/ux-designs/ux-react_user_dashboard-2026-06-03/EXPERIENCE.md#empty-results`
