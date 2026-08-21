import { globalStyle } from '@vanilla-extract/css';

/**
 * Structural styles for the layer system. The tier values themselves are design
 * tokens (`vars.layers.*` in theme.css.ts); this file only styles the two DOM
 * roles the system introduces.
 */

/**
 * Container that portaled overlays mount into. Deliberately unpositioned and
 * without a `z-index` of its own: creating a stacking context here would trap
 * its children, and the whole point is for a menu at the `menu` tier to compare
 * directly against a panel at the `panel` tier.
 */
globalStyle('.zylem-layer-portals', {
	// Overlays are interactive, and hosts often set `pointer-events: none` on the
	// element the container is appended under so input reaches what is behind
	// (the editor does this so clicks reach the running game). Opting back in
	// here saves every overlay from remembering to.
	pointerEvents: 'auto',
});

/**
 * A subtree that layers independently of the rest of the page.
 *
 * `isolation: isolate` is the whole mechanism: it gives the subtree a stacking
 * context, so its descendants' `z-index` values are only ever compared with each
 * other. Nothing inside can paint above anything outside, however large its tier,
 * and the scope as a whole sits wherever its own tier puts it.
 *
 * The tier variables are deliberately *not* redefined here. Keeping the same
 * bands inside and outside means a rank offset means the same thing everywhere,
 * which is what lets a panel inside a modal be lifted above that modal's
 * tooltips while still sitting below its menus.
 */
globalStyle('.zylem-layer-scope', {
	isolation: 'isolate',
});
