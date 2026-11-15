# Custom game icons

Original 64×64 SVG artwork for Zylem Creator, imported from the approved
`zylem-icons-64.zip` collection. Transparent, monochrome, rounded outlines with
`currentColor`. The editable source of truth is `svg/` plus `manifest.json`.

- 108 genre and subgenre assets map the 60 original genre-graph IDs and 81
  repository genre paths, plus proposed extensions.
- 256 behavior/helper assets cover all 246 active catalog IDs, five exported
  coordinators, four camera behaviors, and the `runtime-2d` mechanic aggregate.
- Source repositories are pinned in the manifest: simulation at
  `116f45033a4a0dd458b979d266ffb45352ca127e`, zylem at
  `da357e3533f8134d7d4f8e2defd28fdfccace848`. An icon is not a claim that a
  genre pack has been implemented. Unmerged branches, example-only behaviors,
  internal state enums and configuration types are outside this inventory.

Run `pnpm icons:generate` from the repo root after editing SVGs or metadata.
`genres.ts`, `behaviors.ts`, and `catalog.ts` are generated; do not edit them
directly. Generation uses existing development dependencies and preserves all
SVG groups, transforms and paint attributes without runtime XML parsing.
`pnpm icons:check` fails if outputs or the showcase Lucide inventory drift.

Each named component can be imported independently from `@zylem/ui/icons`.
Calls are marked pure so consumers can tree-shake unused icons. Importing a
catalog intentionally retains that catalog's components. Custom icons use
`zylem-custom-icon`, avoiding the legacy toolbar class's fixed 18 px CSS.

Use an adjacent visible label for icon-only meanings. The default
`aria-hidden="true"` matches the existing icons; override it and supply an
accessible name for a standalone semantic icon. SVGs are optimized for 64 px;
the small qualifiers are best accompanied by labels at smaller sizes.
