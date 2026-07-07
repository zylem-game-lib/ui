/**
 * Solid component library surface for `@zylem/ui`.
 *
 * Exposed as source via the `./components` subpath export so consumers
 * (editor, showcase, zylem-creator) compile the Solid JSX with their own
 * bundler (vite-plugin-solid). Requires the `@zylem/ui/styles.css`
 * bundle (or the `src/styles` barrel in dev) to be loaded for styling.
 */
export { Button, type ButtonProps } from './Button';
