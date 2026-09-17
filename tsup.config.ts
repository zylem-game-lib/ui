import { defineConfig } from 'tsup';
import { vanillaExtractPlugin } from '@vanilla-extract/esbuild-plugin';

const isProd = process.env.NODE_ENV === 'production';
const sourcemap = process.env.SOURCEMAP === '1' || !isProd;

export default defineConfig((options) => ({
  // `index` exposes the typed `vars`/`sprinkles` API; `styles` is the
  // side-effect barrel whose CSS chunks (from every `*.css.ts` it pulls
  // in) get concatenated by esbuild into `dist/styles.css`.
  entry: { index: 'src/index.ts', styles: 'src/styles.ts' },
  format: ['esm'],
  // `ignoreDeprecations` works around tsup injecting `baseUrl: '.'` into the
  // dts compiler options, which classic TypeScript 6 rejects (TS5101).
  dts: { compilerOptions: { ignoreDeprecations: '6.0' } },
  // In watch mode tsup would empty `dist` on every rebuild, and a consumer's
  // Vite sees a delete-then-add instead of a change (`zw dev` watch loop).
  clean: !options.watch,
  sourcemap,
  minify: isProd,
  esbuildPlugins: [vanillaExtractPlugin()],
  loader: { '.css': 'css' },
}));
