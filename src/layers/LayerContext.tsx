import {
	createContext,
	createMemo,
	createSignal,
	onMount,
	useContext,
	type Accessor,
	type JSX,
} from 'solid-js';
import { ensureLayerContainer, LAYER_PORTAL_CLASS } from './resolve-mount';
import { layerTierVars, type LayerTier } from './tiers';

export type { LayerTier };

interface LayerContextValue {
	container: Accessor<HTMLElement | undefined>;
}

const LayerCtx = createContext<LayerContextValue>();

export interface LayerProviderProps {
	children: JSX.Element;
}

/**
 * Root of the layer system: resolves the tree the app lives in — shadow root or
 * document — and owns the container overlays portal into.
 *
 * Optional. `useLayer` resolves a container by itself when no provider is
 * mounted, so a page with one `Tooltip` needs no setup. It earns its keep when an
 * app spans several trees, such as two web components on one page, by pinning
 * each subtree to the container in its own tree.
 */
export function LayerProvider(props: LayerProviderProps) {
	const [container, setContainer] = createSignal<HTMLElement>();
	let markerRef: HTMLSpanElement | undefined;

	// Deferred to mount so `getRootNode()` can see an enclosing shadow root.
	onMount(() => setContainer(ensureLayerContainer(markerRef)));

	return (
		<LayerCtx.Provider value={{ container }}>
			<span ref={markerRef} style={{ display: 'none' }} aria-hidden="true" />
			{props.children}
		</LayerCtx.Provider>
	);
}

export interface LayerScopeProps {
  children: JSX.Element;
  class?: string | undefined;
  style?: JSX.CSSProperties | undefined;
}

/**
 * A subtree that layers independently of the rest of the page.
 *
 * Two things make that work: the scope is a stacking context, so its
 * descendants' `z-index` values are only compared with each other and none of
 * them can paint above anything outside; and the scope owns the portal container
 * its descendants mount into, so overlays opened inside it stay inside it.
 *
 * A dialog puts its card in one, so a menu opened within the dialog mounts
 * inside the `<dialog>`, floats over the card, and is not clipped by it.
 */
export function LayerScope(props: LayerScopeProps) {
	const [container, setContainer] = createSignal<HTMLElement>();

	return (
		<div
			class={props.class ? `zylem-layer-scope ${props.class}` : 'zylem-layer-scope'}
			style={props.style}
		>
			<LayerCtx.Provider value={{ container }}>{props.children}</LayerCtx.Provider>
			<div class={LAYER_PORTAL_CLASS} ref={setContainer} />
		</div>
	);
}

export interface ResolvedLayer {
	/** Where to portal. `undefined` until mounted, so callers gate on it. */
	mount: Accessor<HTMLElement | undefined>;
	/** Value for the overlay's `z-index`. */
	zIndex: Accessor<string>;
	/**
	 * Attach to any element inside the component. Lets the tree be resolved
	 * without a `LayerProvider`, which is what keeps overlays styled inside a
	 * shadow root. Ignored when a provider is present.
	 */
	anchorRef: (element: Element) => void;
}

/**
 * Resolve a tier to a portal target and a `z-index`.
 *
 * @param rank Offset within the tier, for ordering peers — raising a clicked
 * window above its siblings, say. Bands are 1000 apart, so ranks below that stay
 * inside their tier. The offset means the same thing inside a `LayerScope` as
 * out, so a panel can be lifted above a scope's tooltips while staying under its
 * menus.
 */
export function useLayer(
	tier: LayerTier,
	rank: Accessor<number> | number = 0,
): ResolvedLayer {
	const context = useContext(LayerCtx);
	const [fallback, setFallback] = createSignal<HTMLElement>();
	let anchor: Element | undefined;

	if (!context) {
		// Runs after the ref below has been assigned and the element is in the
		// document, which `getRootNode()` needs. With no anchor attached this
		// still resolves, just to the document body.
		onMount(() => setFallback(ensureLayerContainer(anchor)));
	}

	const zIndex = createMemo(() => {
		const offset = typeof rank === 'function' ? rank() : rank;
		const token = layerTierVars[tier];
		// Left as a `calc` over the custom property rather than resolved here, so
		// the cascade stays in charge of the tier's actual value.
		return offset ? `calc(${token} + ${offset})` : token;
	});

	return {
		mount: context ? context.container : fallback,
		zIndex,
		anchorRef: (element: Element) => {
			anchor = element;
		},
	};
}
