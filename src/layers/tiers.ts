/**
 * The layer tier ladder, as plain TypeScript.
 *
 * These live outside `theme.css.ts` because the runtime half of the layer
 * system (`useLayer`) needs them, and `@zylem/ui/components` ships as source to
 * consumers that do not compile vanilla-extract. A `.tsx` importing a `.css.ts`
 * would drag `createGlobalTheme` into those apps, where it throws for want of a
 * file scope. The theme imports these instead, so the ladder is still declared
 * once.
 */

/**
 * Stacking tiers, lowest first. Every overlay reads its `z-index` from one of
 * these rather than picking a number, so the order is decided in one place.
 */
export type LayerTier = 'base' | 'panel' | 'modal' | 'popover' | 'tooltip' | 'menu';

/**
 * The `z-index` each tier resolves to. Fed to the theme as `tokens.layers`.
 *
 * Bands are 1000 apart to leave room for a per-instance rank offset, which is
 * what dynamic ordering within a tier needs (raising the clicked window to the
 * front of the other windows, say).
 */
export const layerTierValues = {
	base: '0',
	panel: '1000',
	modal: '2000',
	popover: '3000',
	tooltip: '4000',
	menu: '5000',
} as const;

/**
 * Custom-property name per tier, sans the leading `--`. Fed to the theme as
 * `varNames.layers`, and must stay in lock-step with {@link layerTierValues}.
 */
export const layerTierVarNames = {
	base: 'zylem-layer-base',
	panel: 'zylem-layer-panel',
	modal: 'zylem-layer-modal',
	popover: 'zylem-layer-popover',
	tooltip: 'zylem-layer-tooltip',
	menu: 'zylem-layer-menu',
} as const;

/**
 * `var(--zylem-layer-*)` reference per tier — the same strings `vars.layers`
 * carries, reachable without loading the theme's `.css.ts`.
 */
export const layerTierVars = Object.fromEntries(
	Object.entries(layerTierVarNames).map(([tier, name]) => [tier, `var(--${name})`])
) as Record<LayerTier, string>;
