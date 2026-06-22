---
title: 'Violet Buttons and View Mode Toggle'
type: 'feature'
created: '2026-06-22'
status: 'done'
baseline_commit: '33cc4b3070c1c2cd464cc381bbf3fcf29503c959'
context:
  - '{project-root}/_bmad-output/planning-artifacts/prds/prd-react_user_dashboard-2026-06-03/prd.md'
  - '{project-root}/_bmad-output/planning-artifacts/ux-designs/ux-react_user_dashboard-2026-06-03/DESIGN.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The dashboard still uses a blue primary action style and only supports a single card-grid presentation. This limits visual alignment with the requested direction and does not let users choose a denser list-like browsing mode.

**Approach:** Update primary UI accents to a violet palette and add a user-controlled view-mode switch with two options, List and Thumbnail. Keep existing search, sort, pagination, loading/error, and modal behavior intact while changing only presentation and view-selection behavior.

## Boundaries & Constraints

**Always:**
- Preserve existing user data flow and all current feature behavior: fetch, search, sort, pagination, empty state, error state, and detail modal interactions.
- Keep both view modes client-side only; no routing changes.
- Keep accessibility semantics for controls and content (button roles, labels, keyboard operation, visible focus treatment).
- Keep pagination logic unchanged; the same page-size and page reset behavior must apply in both view modes.
- Use shared styles so violet primary treatment is consistent across existing primary action buttons.

**Ask First:**
- If implementing a true tab pattern is needed (instead of a simple toggle button group) and would require broader semantics or component extraction beyond this scoped change.
- If list mode should include materially different content density (for example, adding/removing fields from cards) beyond layout change.
- If we discover that existing uncommitted changes in src/App.tsx require a conflicting redesign of state shape.

**Never:**
- Do not remove or regress existing modal accessibility behavior.
- Do not introduce backend, API, or data-model changes.
- Do not refactor unrelated UI architecture or rename unrelated components.
- Do not change pagination rules, search matching rules, or sort algorithm semantics.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| DEFAULT_VIEW | App loads with users available | Default mode is Thumbnail and cards render in responsive grid layout | N/A |
| SWITCH_TO_LIST | User activates List control while data is visible | Same current page users render in list-style layout without data loss or reset of selected sort/query | N/A |
| SWITCH_BACK_TO_THUMBNAIL | User activates Thumbnail control after using List | Grid layout returns and same filtered/sorted/page subset remains visible | N/A |
| EMPTY_RESULTS | Search yields zero users in either mode | `No users found.` remains visible and pagination remains hidden | N/A |
| VIOLET_PRIMARY_STYLE | Any primary action control rendered (view details, sort direction, active view) | Control uses violet background and readable foreground with visible focus styling | If contrast/focus ring appears insufficient in test/dev checks, adjust token shades without changing behavior |

</frozen-after-approval>

## Code Map

- `src/App.tsx` -- owns dashboard-level UI state and user list rendering branch; add and apply view mode state.
- `src/styles.css` -- contains primary color styles and list/grid layout classes; update violet palette and add view-mode layout/toggle classes.
- `src/components/UserCard.tsx` -- consumes primary button style (`View details`), should inherit violet primary visuals.
- `src/components/SortControls.tsx` -- consumes primary style for direction toggle; should inherit violet primary visuals.
- `tests/e2e/app.spec.tsx` -- end-to-end behavior test for load/search/sort/pagination/modal; extend to validate view-mode switching and no-regression behavior.

## Tasks & Acceptance

**Execution:**
- [x] `src/App.tsx` -- add `viewMode` state (`thumbnail | list`), render a view-switch control in the existing controls area, and apply a conditional class to the user list container -- required to enable user-driven presentation mode without changing data flow.
- [x] `src/styles.css` -- replace hardcoded blue primary accents with violet equivalents for `.primary`, `.primary:focus-visible`, and active page state where primary accent is expected; add `.user-list` (list-mode layout) plus toggle control styles with active/inactive states -- required for consistent visual update and distinct layout modes.
- [x] `src/App.tsx` + `src/styles.css` -- ensure pagination and empty/error/loading rendering branches remain unchanged while supporting mode class switching -- prevents behavioral regressions in existing UX.
- [x] `tests/e2e/app.spec.tsx` -- extend integration test to assert default Thumbnail mode, switch to List mode, switch back, and verify search/sort/pagination/modal interactions still pass in the modified UI -- required to cover the new control and core regression surface.

**Acceptance Criteria:**
- Given the dashboard has loaded users, when no view mode interaction has occurred, then the Thumbnail mode is active by default and users render in grid form.
- Given users are displayed, when the user selects List mode, then the same visible users render in list layout and existing query/sort/page state values remain unchanged.
- Given List mode is active, when the user selects Thumbnail mode, then the grid layout returns and existing query/sort/page state values remain unchanged.
- Given the UI displays primary action controls, when controls are rendered and focused, then primary buttons use a violet palette and retain visible focus indication.
- Given search results are empty in either mode, when filtering leaves zero users, then `No users found.` is shown and pagination is not shown.
- Given a user opens and closes the detail modal after switching modes, when modal interactions occur, then dialog open/close and Escape close behavior remain functional.

## Spec Change Log

## Design Notes

- Keep mode switching presentation-only: avoid branching the data pipeline; only branch CSS class assignment and optional structural wrappers.
- Treat List and Thumbnail as mutually exclusive controls in one compact group near existing search/sort controls, using clear active state.
- Reuse the existing card component for both modes to minimize risk; style differences should come from container/layout classes first.

Minimal example for class switching approach:

```tsx
const [viewMode, setViewMode] = useState<'thumbnail' | 'list'>('thumbnail')

<section className={viewMode === 'list' ? 'user-list' : 'user-grid'}>
  {pageUsers.map((u) => (
    <UserCard key={u.id} user={u} onViewDetails={() => openUserDetail(u)} />
  ))}
</section>
```

## Verification

**Commands:**
- `npm run test -- tests/e2e/app.spec.tsx --run` -- expected: updated E2E flow passes with view-mode assertions.
- `npm run test -- --run` -- expected: full test suite passes without regressions.

**Manual checks (if needed):**
- Load app and verify primary buttons visually use violet and focus rings are visible.
- Toggle List and Thumbnail while changing search and sort; verify current page subset updates correctly without resets beyond existing reset rules.
- Open modal from both modes and confirm close behaviors still work.

## Suggested Review Order

**View-mode integration**

- Introduces single-source UI mode state and new toggle controls.
  [`App.tsx:15`](../../../src/App.tsx#L15)

- Applies mode switch at render boundary without touching data derivation pipeline.
  [`App.tsx:111`](../../../src/App.tsx#L111)

**Visual system updates**

- Centralizes violet primary accent for all existing primary actions.
  [`styles.css:25`](../../../src/styles.css#L25)

- Defines active/inactive view toggle styles with explicit accessible contrast.
  [`styles.css:27`](../../../src/styles.css#L27)

- Adds list layout mode and responsive toggle behavior for narrow screens.
  [`styles.css:40`](../../../src/styles.css#L40)

**Behavioral verification**

- Verifies default thumbnail mode and exclusive class switching both directions.
  [`app.spec.tsx:98`](../../../tests/e2e/app.spec.tsx#L98)

- Confirms legacy sort/search/pagination/modal flow still passes after mode changes.
  [`app.spec.tsx:119`](../../../tests/e2e/app.spec.tsx#L119)
