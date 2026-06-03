# Story 3.2: Make the detail modal accessible and keyboard-friendly

Status: done

## Story

As a dashboard viewer,
I want the user detail modal to trap focus, close on Escape, and restore focus when closed,
so that I can navigate the modal reliably using the keyboard.

## Acceptance Criteria

1. Given the detail modal is open,
   when focus moves within the modal,
   then focus is trapped inside the overlay and does not move to the background content.

2. Given the detail modal is open,
   when I press Escape,
   then the modal closes.

3. Given the detail modal closes,
   when the modal is dismissed,
   then focus returns to the originating `View details` button.

4. Given the detail modal is open,
   when the overlay is visible,
   then background scrolling is disabled.

## Tasks / Subtasks

- [ ] Ensure the modal uses `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, and `aria-describedby`.
- [ ] Trap focus inside the modal while it is open.
- [ ] Close the modal on Escape and overlay click.
- [ ] Restore keyboard focus to the control that opened the modal.
- [ ] Keep existing loading, error, search, sort, and pagination states working while the modal is open.
- [ ] Validate focus styling on the modal close button and interactive elements.

## Dev Notes

- The modal is rendered client-side over the dashboard and should not use route navigation.
- Use semantic HTML for all modal content and ensure the close button is the first focus target.
- The background page should not scroll when the modal is open.
- This story builds on Story 3.1 by making the modal keyboard-friendly and accessible.

### References

- Source: `_bmad-output/planning-artifacts/ux-designs/ux-react_user_dashboard-2026-06-03/EXPERIENCE.md#modal-open--close`
- Source: `_bmad-output/planning-artifacts/architecture.md#loading--error-handling`
