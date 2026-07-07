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
```

## Development

Requires Node `v22.12.0` (see `.nvmrc`) and [pnpm](https://pnpm.io/).

```bash
pnpm install

# Build the library (tsup) into dist/
pnpm build

# Watch mode
pnpm dev

# Run the showcase app at http://localhost:3030
pnpm showcase

# Lint
pnpm lint
```

## Showcase

The `showcase/` directory contains a Vite + Solid app demonstrating every
token group and component (colors, typography, buttons, panels, toolbar,
accordion, and more). It compiles the vanilla-extract sources live, so edits
to any `*.css.ts` file hot-reload without a library build.
