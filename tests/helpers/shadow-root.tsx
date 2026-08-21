/**
 * Render a component inside a shadow root.
 *
 * Overlays behave differently in one: events crossing the boundary are
 * retargeted to the host, and portals resolve to the shadow tree rather than to
 * the body. The editor hosts this library inside a web component, so a component
 * only ever tested in the plain document is only half tested — which is how a
 * popover that dismissed itself on every click got shipped.
 */

import type { JSX } from 'solid-js';
import { render } from 'solid-js/web';

export interface ShadowRender {
	host: HTMLElement;
	shadow: ShadowRoot;
	/** Element the component was rendered into. */
	mount: HTMLElement;
	dispose: () => void;
}

export function renderInShadowRoot(code: () => JSX.Element): ShadowRender {
	const host = document.createElement('div');
	document.body.append(host);

	const shadow = host.attachShadow({ mode: 'open' });
	const mount = document.createElement('div');
	shadow.append(mount);

	return { host, shadow, mount, dispose: render(code, mount) };
}

/**
 * Let Kobalte's deferred listener registration run.
 *
 * `createInteractOutside` attaches its document listener inside a `setTimeout(0)`,
 * so a test that interacts immediately would exercise a layer with no dismissal
 * behavior attached at all and pass whether or not the guard works.
 */
export function afterListenersAttach(): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, 0));
}
