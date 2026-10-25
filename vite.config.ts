import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import { zylemVersionsPlugin } from './vite/index.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Dev server for the showcase app. The library build stays on tsup
// (see tsup.config.ts); this config only serves `showcase/`, compiling the
// vanilla-extract sources live so token/style edits hot-reload.
export default defineConfig({
  root: 'showcase',
  plugins: [zylemVersionsPlugin(__dirname), solid(), vanillaExtractPlugin()],
  server: {
    port: 1234,
  },
});
