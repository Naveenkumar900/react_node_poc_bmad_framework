---
title: React User Dashboard DESIGN
status: finalized
created: 2026-06-03
updated: 2026-06-03
colors:
  background: "#f7f8fb"
  surface: "#ffffff"
  primary: "#3b82f6"
  text: "#111827"
  muted: "#6b7280"
  border: "#e5e7eb"
  overlay: "rgba(0, 0, 0, 0.4)"
typography:
  body: "Inter, system-ui, sans-serif"
  heading: "Inter, system-ui, sans-serif"
  sizes:
    - name: body
      size: 16px
      lineHeight: 1.5
    - name: heading
      size: 28px
      lineHeight: 1.2
rounded:
  small: 6px
  medium: 8px
  large: 12px
spacing:
  xsmall: 8px
  small: 12px
  medium: 16px
  large: 24px
  xlarge: 32px
components:
  card:
    background: "{colors.surface}"
    borderRadius: "{rounded.medium}"
    padding: "{spacing.medium}"
    elevation: "soft"
  button:
    primary:
      background: "{colors.primary}"
      color: "#ffffff"
      borderRadius: "{rounded.small}"
      padding: "{spacing.small} {spacing.medium}"
    neutral:
      background: "transparent"
      color: "{colors.text}"
      border: "1px solid {colors.border}"
  input:
    background: "#ffffff"
    border: "1px solid {colors.border}"
    borderRadius: "{rounded.small}"
    padding: "{spacing.small} {spacing.medium}"
  modal:
    background: "{colors.surface}"
    borderRadius: "{rounded.large}"
    padding: "{spacing.large}"
    maxWidth: "720px"
    overlay: "{colors.overlay}"
---

# Brand & Style

A calm, modern dashboard for browsing user data. The interface should feel lightweight, approachable, and readable, with soft elevation and a restrained color palette that supports focused data inspection.

## Colors

- `background`: page surface and overall canvas.
- `surface`: cards, modals, and panels.
- `primary`: action emphasis and interactive highlights.
- `text`: primary text color.
- `muted`: secondary text and supportive labels.
- `border`: boundaries for inputs and controls.
- `overlay`: modal backdrop.

## Typography

Use a modern sans serif system stack with clear hierarchy:
- Body text: 16px, 1.5 line height.
- Headings: 28px, 1.2 line height.
- Buttons and labels: 14px to 16px with strong legibility.

## Layout & Spacing

- Page content is centered at a comfortable max width.
- Spacing is generous around cards and controls to support scanning.
- Control groups use consistent gaps and stacking behavior on narrow viewports.

## Elevation & Depth

- Use subtle shadows and background contrast to separate cards, modals, and page surface.
- Keep depth minimal: the UI should feel flat with gentle layering.

## Shapes

- Rounded corners are soft, with cards at `{rounded.medium}` and modal surfaces at `{rounded.large}`.
- Buttons and inputs use small rounded edges for a friendly tone.

## Components

### Card
- Background: `{components.card.background}`
- Border radius: `{components.card.borderRadius}`
- Padding: `{components.card.padding}`
- Elevation: soft shadow
- Purpose: present key user summary information and action affordance.

### Button
- Primary button style for actions like `View details`.
- Neutral button style for secondary controls and pagination.

### Input
- Visible border, clear placeholder text, and accessible label support.
- Should feel low-friction and consistent with card styling.

### Modal
- Use the `modal` token for detail overlay.
- Provide a clear close affordance and a softly elevated panel.

## Do's and Don'ts

### Do
- Keep the dashboard uncluttered and data-focused.
- Use whitespace to separate cards and controls.
- Support keyboard navigation and visible focus states.

### Don't
- Overload cards with too many fields.
- Use heavy visual decoration or competing colors.
- Hide important state feedback like loading or error messages.
