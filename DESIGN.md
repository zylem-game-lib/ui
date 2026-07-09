# Zylem HyperGlass Design Notes

The living design document for the `@zylem/ui` HyperGlass theme. Seeded from
the original concept pack notes and updated as the system evolves.

## Design intent

Zylem HyperGlass should feel like a game editor from an alternate-history
macOS: familiar, dimensional, glassy, and approachable, but still clearly part
of the Zylem game framework.

The interface should not feel like Windows, and it should not be a direct
clone of macOS Aqua. The best version is a custom Zylem visual language that
uses Aqua's principles:

- glossy title bars
- visible scrollbars
- soft highlights
- tactile buttons
- playful but professional depth — reserved for a few key surfaces

Then it combines those with HyperCard's layout ideas:

- cards
- stacks
- fields
- simple buttons
- direct editing
- minimal hierarchy

Chrome that isn't a primary action or a title surface stays **flat and
minimal** — window controls, accordion headers, list rows, and inner content
areas should recede so the glossy elements read as focal points.

## Palette

Keep the existing Zylem palette:

| Role | Color |
|---|---|
| Primary blue | `#61A6E8` |
| Danger/accent red | `#E64534` |
| Active/live green | `#14FF3C` |
| Dark background | `#11151C` |
| Panel surface | `#1A1F27` |

## Visual balance

Aqua-inspired UI becomes too heavy if every component is glossy. The balance:

- **High gloss:** title bars, primary buttons, toolbar buttons, window
  controls, scrollbars
- **Medium gloss:** cards, panels, tabs, selected list rows
- **Low gloss:** text fields, property rows, console, data tables
- **Flat (no gloss):** accordion/section headers, sidebar items at rest,
  inner content areas

## Reduce outlines

One outlined container per screen region. Borders define the major layout
areas (window, rail, workspace); everything nested inside them should be
borderless and flush so the UI doesn't read as boxes-within-boxes.

- Inner areas — editor viewports, tree/list bodies, panel interiors, code
  editors — get no border, no outer shadow, and a transparent background.
- Use hairline separators (`rgba(97, 166, 232, 0.22)`) instead of full
  borders to divide sections within a region.
- The `Panel` component supports this via the `borderless` prop
  (`.zylem-panel--borderless`).
- Scrollable inner areas must not produce horizontal scrollbars: clip with
  `overflow-x: hidden` and let labels truncate with ellipsis (`min-width: 0`
  on flex children).

## Shape language

Use a squarer shape than Aqua.

Recommended radii:

- Window/panel: `12px`
- Titlebar top corners: `12px`
- Buttons: `7px`
- Small icon buttons: `6px`
- Window controls: `6px`
- Input fields: `6px`
- Entity cards: `10px`

This avoids copying Aqua's pill-shaped controls too closely.

## Window controls

Window controls are **shared glass icon buttons** — the same button is used
by title bars, floating panels, and detached panels (one definition:
`.zylem-window-control`, aliased as `.floating-panel-button`).

- Small squared glass buttons (~18px, `6px` radius): `buttonGlass` fill, 1px
  light border, inset bevel highlight, `brightness()` + 1px translate on
  hover/active.
- Only two controls exist: **collapse** (panel-bottom chevron icon, swapping
  to an expand icon when collapsed) and **close** (X icon). No traffic-light
  colors and no expand/zoom control.
- The close button is neutral glass at rest and only shows the accent red
  (`#E64534` fill with a danger glow) on hover, so destructive intent is
  revealed on approach rather than shouting at rest.

## Accordions and section headers

Section headers are flat:

- Transparent at rest; a flat `rgba(97, 166, 232, 0.08)` tint on hover and a
  slightly stronger `rgba(97, 166, 232, 0.12)` tint when expanded.
- No gradients, inset highlights, or text shadows.
- Items separate with a hairline bottom border, not boxed outlines.
- The disclosure chevron is muted (`textSecondary`) at rest and brightens
  when expanded.

## Scrollbar treatment

Scrollbars should be more visible and tactile than modern hidden scrollbars.

Suggested CSS approach:

- style `::-webkit-scrollbar`
- use a dark glass track
- use a rounded blue-gray thumb
- add top/left inset highlight
- add electric-blue hover state
- set width around `13px`

For Firefox, use:

```css
scrollbar-color: rgba(97,166,232,0.55) rgba(10,20,30,0.5);
scrollbar-width: thin;
```

Vertical scroll containers should suppress horizontal scrollbars entirely
(`overflow-x: hidden`).

## Component mapping

| Component | HyperGlass treatment |
|---|---|
| Panel | Glass card with glossy header; `borderless` variant for nested regions |
| Button | Squared Aqua-like bevel |
| Toolbar | Molded command strip |
| Tabs | Stack card tabs |
| Inspector | HyperCard-style field list |
| Entity card | Small index card with blue glow |
| Checkbox | Square glass toggle |
| Slider | Blue track with glowing thumb |
| Menu | Floating glass sheet |
| Console | Dark low-gloss terminal field |
| Scrollbar | Visible Aqua-inspired glass rail |
| Window controls | Shared glass icon buttons (collapse + close; close is accent on hover) |
| Accordion | Flat headers with hairline separators |

## Motion

Keep motion subtle.

Recommended motion:

- hover translate: `-1px` (glossy/tactile controls only; flat chrome uses a
  tint or brightness change instead)
- active translate: `1px`
- duration: `120ms`
- easing: `cubic-bezier(.2,.8,.2,1)`

Avoid bouncy animations. The interface should feel precise and editor-like.

## Accessibility notes

Because glass UI often reduces contrast, define opaque fallback states:

- Use stronger backgrounds behind text-heavy panels.
- Use `@supports not (backdrop-filter: blur(1px))` fallbacks.
- Provide visible focus rings.
- Do not rely only on glow to show selected state.
- Keep active/danger states distinguishable by icon or label, not just color.

## Theme name

**Zylem HyperGlass Aqua**
