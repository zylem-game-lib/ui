/**
 * MenuButton inside a shadow root — the way the editor actually hosts it.
 *
 * Kobalte judges an interaction "outside" a layer by reading `event.target` in a
 * capture-phase listener on `document`, where a real browser has retargeted a
 * composed event from a shadow tree to the host. The panel therefore looked
 * outside itself, so every press dismissed it on pointerdown and the click never
 * reached the item.
 *
 * happy-dom does not retarget, so it cannot stage that failure: the assertions
 * here would hold with or without the fix. What they do cover is the surrounding
 * behavior — portaling into the shadow tree, and inside presses not closing the
 * panel — plus the one platform guarantee the fix rests on, that `composedPath()`
 * still names the element inside the shadow tree. The guard's own decision is
 * tested directly in `dismiss-guard.spec.ts`.
 */

import { afterEach, describe, expect, it, vi } from 'vitest';

import { MenuButton } from '../src/components/MenuButton/MenuButton';
import { afterListenersAttach, renderInShadowRoot } from './helpers/shadow-root';

afterEach(() => {
	document.body.innerHTML = '';
});

const FACE = '.zylem-menu-button__face';
const PANEL = '.zylem-menu-button__panel';
const ITEM = '.test-item';

/**
 * Whether the panel is open.
 *
 * Read from `data-expanded` rather than the node's presence: Kobalte leaves a
 * dismissed panel mounted for its exit animation, so "still in the DOM" would
 * report an open panel long after it closed.
 */
function isOpen(shadow: ShadowRoot): boolean {
	return shadow.querySelector(PANEL)?.hasAttribute('data-expanded') ?? false;
}

function openMenuButton(onSelect: () => void) {
	const rendered = renderInShadowRoot(() => (
		<MenuButton
			label="Add"
			tooltip={null}
			menu={() => (
				<button type="button" class="test-item" onClick={onSelect}>
					Box
				</button>
			)}
		>
			<span>icon</span>
		</MenuButton>
	));

	(rendered.shadow.querySelector(FACE) as HTMLElement).click();
	return rendered;
}

/** A composed pointerdown, as a real press produces. */
function press(target: Element) {
	target.dispatchEvent(
		new MouseEvent('pointerdown', { bubbles: true, composed: true }),
	);
}

describe('shadow boundary', () => {
	it('keeps the inner element on the composed path at document level', () => {
		// The guarantee the guard is built on. Without it there would be no way to
		// tell an inside press from an outside one once the target is retargeted.
		const { host, mount } = renderInShadowRoot(() => <span />);
		const inner = document.createElement('button');
		mount.append(inner);

		let path: EventTarget[] = [];
		const onPointerDown = (event: Event) => {
			path = event.composedPath();
		};
		document.addEventListener('pointerdown', onPointerDown, true);
		press(inner);
		document.removeEventListener('pointerdown', onPointerDown, true);

		expect(path).toContain(inner);
		expect(path).toContain(host);
	});
});

describe('MenuButton inside a shadow root', () => {
	it('opens its panel into the shadow tree', () => {
		const { shadow } = openMenuButton(() => {});

		// Portaling to `document.body` would leave it unstyled, since the host
		// injects its stylesheet into its own shadow tree.
		expect(shadow.querySelector(PANEL)).not.toBeNull();
		expect(isOpen(shadow)).toBe(true);
	});

	it('selects a panel item rather than dismissing first', async () => {
		const onSelect = vi.fn();
		const { shadow } = openMenuButton(onSelect);
		await afterListenersAttach();

		const item = shadow.querySelector(ITEM) as HTMLElement;
		press(item);
		item.click();

		expect(onSelect).toHaveBeenCalledTimes(1);
	});

	it('keeps the panel open while interacting inside it', async () => {
		const { shadow } = openMenuButton(() => {});
		await afterListenersAttach();

		// Repeated presses are the case that matters: a palette gets searched and
		// scrolled before anything is chosen.
		press(shadow.querySelector(ITEM) as HTMLElement);

		expect(isOpen(shadow)).toBe(true);
	});

	it('still dismisses when the press is genuinely outside', async () => {
		const { shadow } = openMenuButton(() => {});
		await afterListenersAttach();

		const outside = document.createElement('button');
		document.body.append(outside);
		press(outside);

		expect(isOpen(shadow)).toBe(false);
	});
});
