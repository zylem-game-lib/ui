/**
 * Where a portaled overlay should mount.
 *
 * Kobalte's portals default to `document.body`, which breaks inside a shadow
 * root: the styles a web component injects into its own shadow tree do not apply
 * to `document.body`, so the overlay renders unstyled. Resolving from the
 * triggering element instead keeps the overlay in whatever tree its styles live
 * in.
 */

/** Class on the container that layered overlays mount into. */
export const LAYER_PORTAL_CLASS = 'zylem-layer-portals';

/**
 * The shadow root or document body that owns `node`.
 *
 * Must be called after the node is in the document — `getRootNode()` only sees
 * the shadow root once the subtree has been inserted.
 */
export function resolveLayerRoot(
	node: Node | null | undefined,
): ShadowRoot | HTMLElement {
	const root = node?.getRootNode();
	if (root instanceof ShadowRoot) return root;
	if (root instanceof Document) return root.body;
	return document.body;
}

/**
 * The portal container for `node`'s tree, creating it on first use.
 *
 * Appended last so it starts above its siblings in paint order even before
 * z-index is considered, and reused across every overlay in the same tree so a
 * page with many menus does not accumulate containers.
 */
export function ensureLayerContainer(node: Node | null | undefined): HTMLElement {
	const root = resolveLayerRoot(node);
	for (const child of Array.from(root.children)) {
		if (child instanceof HTMLElement && child.classList.contains(LAYER_PORTAL_CLASS)) {
			return child;
		}
	}

	const container = document.createElement('div');
	container.className = LAYER_PORTAL_CLASS;
	root.appendChild(container);
	return container;
}
