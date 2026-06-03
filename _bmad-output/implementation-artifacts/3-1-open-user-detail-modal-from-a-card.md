# Story 3.1: Open user detail modal from a card

Status: done

## Story

As a dashboard viewer,
I want to open a detail view for a selected user from their card,
so that I can inspect the user’s full contact and company details.

## Acceptance Criteria

1. Given the dashboard displays user cards,
   when I click `View details` on a user card,
   then a detail modal opens with that user’s full contact and company information.

2. Given the detail modal is open,
   when I click outside the modal or use the close button,
   then the modal closes.

3. Given the detail modal is open,
   when I press Escape,
   then the modal closes.

4. Given the detail modal is open,
   when the modal opens,
   then focus moves to the close button and background scrolling is disabled.

## Tasks / Subtasks

- [ ] Add user selection state to the dashboard.
- [ ] Render `UserDetailModal` when a user is selected.
- [ ] Add an accessible close button and overlay click dismissal.
- [ ] Disable page scrolling while the modal is open.
- [ ] Restore focus to the originating control when the modal closes.
- [ ] Keep the existing search, sort, pagination, loading, and error states intact.

## Dev Notes

- This story builds on the list view and pagination flow already implemented in Epic 2.
- The modal should be rendered on top of the dashboard and use `aria-modal="true"`.
- Use the existing `UserCard` action button to open the modal.
- Use semantic headings and maintain focus management for keyboard users.
- No route navigation is required; the modal should be client-side only.

### References

- Source: `_bmad-output/planning-artifacts/ux-designs/ux-react_user_dashboard-2026-06-03/EXPERIENCE.md#modal-open--close`
- Source: `_bmad-output/planning-artifacts/architecture.md#loading--error-handling`
