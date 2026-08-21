/**
 * Layering and portal system.
 *
 * Overlays read their `z-index` from a named tier instead of picking a number,
 * and portal into a container resolved from the tree they were opened in rather
 * than assuming `document.body`. See {@link LayerScope} for nesting.
 */

export {
	LayerProvider,
	LayerScope,
	useLayer,
	type LayerProviderProps,
	type LayerScopeProps,
	type ResolvedLayer,
} from './LayerContext';
export {
	createDismissGuard,
	type DismissalEvent,
	type DismissGuard,
} from './dismiss-guard';
export {
	ensureLayerContainer,
	resolveLayerRoot,
	LAYER_PORTAL_CLASS,
} from './resolve-mount';
export { layerTierVars, type LayerTier } from './tiers';
