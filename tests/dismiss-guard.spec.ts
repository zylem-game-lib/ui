import { afterEach, describe, expect, it, vi } from 'vitest';

import { createDismissGuard } from '../src/layers/dismiss-guard';

afterEach(() => {
	document.body.innerHTML = '';
});

/** An interact-outside event carrying an original event with a known path. */
function dismissal(path: EventTarget[], point?: { x: number; y: number }) {
	const originalEvent = {
		composedPath: () => path,
		...(point ? { clientX: point.x, clientY: point.y } : {}),
	} as unknown as Event;

	return { detail: { originalEvent }, preventDefault: vi.fn() };
}

function contentElement(): HTMLElement {
	const content = document.createElement('div');
	document.body.append(content);
	return content;
}

describe('createDismissGuard', () => {
	it('cancels the dismissal when the real target is inside the content', () => {
		const guard = createDismissGuard();
		const content = contentElement();
		const item = document.createElement('button');
		content.append(item);
		guard.ref(content);

		// What the shadow root breaks: the retargeted `target` says the host, but
		// the composed path still names the button that was pressed.
		const event = dismissal([item, content, document.body]);
		guard.onInteractOutside(event);

		expect(event.preventDefault).toHaveBeenCalledTimes(1);
	});

	it('lets a genuine outside interaction dismiss', () => {
		const guard = createDismissGuard();
		guard.ref(contentElement());

		const event = dismissal([document.createElement('button'), document.body]);
		guard.onInteractOutside(event);

		expect(event.preventDefault).not.toHaveBeenCalled();
	});

	it('treats the content itself as inside', () => {
		const guard = createDismissGuard();
		const content = contentElement();
		guard.ref(content);

		const event = dismissal([content, document.body]);
		guard.onInteractOutside(event);

		expect(event.preventDefault).toHaveBeenCalledTimes(1);
	});

	it('does nothing before the content is attached', () => {
		const guard = createDismissGuard();

		const event = dismissal([document.body]);
		guard.onInteractOutside(event);

		expect(event.preventDefault).not.toHaveBeenCalled();
	});

	describe('touch, where the composed path has already been emptied', () => {
		/** Content occupying a known rectangle. */
		function positionedContent(): HTMLElement {
			const content = contentElement();
			content.getBoundingClientRect = () =>
				({ left: 100, right: 200, top: 50, bottom: 80 }) as DOMRect;
			return content;
		}

		it('falls back to geometry for a point within the content', () => {
			const guard = createDismissGuard();
			guard.ref(positionedContent());

			// Kobalte defers the touch check to the following `click`, by which
			// point the pointerdown has finished dispatching and its path is gone.
			const event = dismissal([], { x: 150, y: 60 });
			guard.onInteractOutside(event);

			expect(event.preventDefault).toHaveBeenCalledTimes(1);
		});

		it('still dismisses for a point outside the content', () => {
			const guard = createDismissGuard();
			guard.ref(positionedContent());

			const event = dismissal([], { x: 400, y: 60 });
			guard.onInteractOutside(event);

			expect(event.preventDefault).not.toHaveBeenCalled();
		});

		it('dismisses when an emptied path comes with no coordinates', () => {
			const guard = createDismissGuard();
			guard.ref(positionedContent());

			// Nothing to go on, so the layer keeps its normal behavior rather than
			// becoming impossible to close.
			const event = dismissal([]);
			guard.onInteractOutside(event);

			expect(event.preventDefault).not.toHaveBeenCalled();
		});
	});
});
