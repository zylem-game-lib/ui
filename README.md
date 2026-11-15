# @zylem/ui

Design tokens, global styles, and Solid components for Zylem, built with
[vanilla-extract](https://vanilla-extract.style/) and [Kobalte](https://kobalte.dev/).

## Usage

```ts
// Typed design tokens and atomic utilities
import { vars, sprinkles } from '@zylem/ui';

// CSS bundle (import once at app entry)
import '@zylem/ui/styles.css';

// Solid components (compiled by the consuming app's bundler)
import { Button } from '@zylem/ui/components';

// Camera icons (Lucide-shaped originals: currentColor stroke, 24×24)
import { Perspective, GameCamera } from '@zylem/ui/icons';

// Custom genre and behavior icons (64×64, currentColor)
import { GenrePlatform, BehaviorWallKick, GENRE_ICONS, BEHAVIOR_ICONS } from '@zylem/ui/icons';
```

## Development

Requires Node `v22.12.0` (see `.nvmrc`) and [pnpm](https://pnpm.io/).

```bash
pnpm install

# Build the library (tsup) into dist/
pnpm build

# Watch mode
pnpm dev

# Run the showcase app at http://localhost:1234
pnpm showcase

# Lint
pnpm lint
```

## Showcase

The `showcase/` directory contains a Vite + Solid app demonstrating every
token group and component (colors, typography, buttons, panels, toolbar,
accordion, and more). It compiles the vanilla-extract sources live, so edits
to any `*.css.ts` file hot-reload without a library build.

The Icons page (`#icons`) has a searchable, paginated table of custom genre and
behavior icons, every camera/view glyph, Dock, and the Lucide icons imported by
the repo. It supports category filters, 24–64 px previews, and selectable import
snippets. Names, catalog IDs, and behavior API aliases are searchable.

## Custom icons

`src/icons/custom/svg/` contains the 108 genre/subgenre and 256 behavior/helper
SVGs. Named Solid components are exported from `@zylem/ui/icons` with `Genre`
and `Behavior` prefixes to avoid collisions. They default to 64 px and a
3-unit stroke, accept the same size/color/accessibility props as the existing
camera icons, and inherit `currentColor`.

```tsx
<GenrePlatform size={64} color="#61a6e8" />
<BehaviorWallKick size={32} aria-hidden="false" aria-label="Wall kick" />
```

Use `GENRE_ICONS` and `BEHAVIOR_ICONS` when building pickers. Entries include
`id`, `key`, `label`, `exportName`, `description`, `aliases`, and `Icon`.
`genreGraphIds`, `repositoryGenreIds`, `behaviorIds`, `apiAliases`, and
`mechanicIds` retain the source ID mappings. Icons are visual assets; having
an icon does not imply an implemented genre behavior pack. See
[`src/icons/custom/README.md`](src/icons/custom/README.md) for provenance and
regeneration details.

```sh
# Regenerate Solid components/catalog and the imported Lucide inventory
pnpm icons:generate

# Verify generated outputs match the SVGs, metadata and source imports
pnpm icons:check
```
