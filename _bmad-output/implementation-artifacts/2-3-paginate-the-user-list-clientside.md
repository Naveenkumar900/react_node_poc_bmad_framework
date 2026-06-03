# Story 2.3: Paginate the user list client-side

Status: review

## Story

As a dashboard viewer,
I want the user list to be paginated with a default page size of 5,
so that I can navigate through users without overwhelming the page.

## Acceptance Criteria

1. Given there are more than 5 users,
   when the dashboard displays results,
   then pagination controls appear below the list.

2. Given the user clicks the next page button,
   when the current page changes,
   then the next set of up to 5 users is shown.

3. Given the current page is the first page,
   when pagination is visible,
   then the previous button is disabled.

4. Given the current page is the last page,
   when pagination is visible,
   then the next button is disabled.

5. Given there are zero users after filtering,
   when the empty state is shown,
   then pagination controls are hidden.

## Tasks / Subtasks

- [ ] Add client-side pagination state with a default page size of 5.
- [ ] Add pagination controls with previous/next buttons and page number buttons.
- [ ] Hide pagination controls when there are no results.
- [ ] Preserve search and sort behavior while paginating the current result set.
- [ ] Add test coverage for pagination arithmetic and button enabling/disabling.

## Dev Notes

- Pagination should run on the already-filtered and sorted result set.
- The page state should be reset to the first page when the search query or sort order changes.
- The pagination UI should remain responsive and accessible.
- No backend changes are required for this story.

### References

- Source: `_bmad-output/planning-artifacts/epics.md#story-2.3-paginate-the-user-list-clientside`
