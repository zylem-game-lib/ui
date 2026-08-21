import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

/**
 * Tests for the parts of the package that carry logic rather than looks: the
 * picker's matching rules and the layer system's portal resolution. Component
 * appearance is checked in the showcase app, not here.
 *
 * There is deliberately no vanilla-extract plugin here. `@zylem/ui/components`
 * ships as source to apps that only consume the prebuilt `styles.css`, so a
 * component pulling in a `.css.ts` breaks them at runtime. Compiling these
 * tests the same way those apps do makes that failure show up here first.
 */
export default defineConfig({
  plugins: [solid()],
  resolve: {
    // Solid ships browser and server builds; tests exercise the browser one.
    conditions: ['development', 'browser'],
  },
  test: {
    environment: 'happy-dom',
    include: ['tests/**/*.spec.{ts,tsx}'],
  },
});
