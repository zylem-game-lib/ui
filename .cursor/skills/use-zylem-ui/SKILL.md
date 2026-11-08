---
name: use-zylem-ui
description: >-
  Use @zylem/ui Solid components instead of rebuilding HyperGlass chrome from
  .zylem-* class names. Use when building or editing Zylem UI, HyperGlass,
  editor chrome, showcase demos, panels, toolbars, consoles, property lists,
  accordions, or any Solid screen that imports @zylem/ui.
---

# Use @zylem/ui components

Import from `@zylem/ui/components`. Before writing chrome, grep the API report for a component name. Do not load the whole report.

- In this repo: `etc/ui.api.md`
- In an app: `node_modules/@zylem/ui/etc/ui.api.md`

Do not assemble `.zylem-*` markup when a component exists.

- `Button` instead of `<button class="zylem-button">`
- `Console` (`value`, `onInput`, `onClear`) instead of a textarea wrapped in `zylem-console*`
- `PropertyList` and `PropertyRow` instead of `zylem-property-list` and `zylem-property-row`
- `Toolbar` and `ToolbarButton` instead of `zylem-toolbar`
- `Accordion` instead of `@kobalte/core` Accordion plus `zylem-accordion`
- `Panel` instead of `zylem-panel`

These classes are not a component. They stay legal: `zylem-icon` on an icon, `zylem-mono`, `zylem-exo-2`, and `zylem-hyperglass-root` on the app shell.

In this repo, showcase code follows the same rule. A section heading names the component, not the class chain.
