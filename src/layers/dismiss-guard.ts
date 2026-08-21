/**
 * Keeps a dismissable overlay open when the interaction that "left" it never did.
 *
 * Kobalte decides an interaction is outside a layer by reading `event.target` in a
 * capture-phase listener on `document`. Inside a shadow root that target has been
 * retargeted to the host element, so the check asks whether the panel contains the
 * whole web component — which it never does. Every pointerdown in the tree then
 * reads as an outside click and the overlay closes on pointerdown, before the
 * click can reach whatever was pressed. The same listener serves `focusin`, so
 * focusing a field inside the panel closes it too.
 *
 * The original event survives on the dismissal event's `detail`, and its
 * `composedPath()` still crosses the shadow boundary, so it can name the element
 * actually pressed. Preventing the event cancels only the dismissal — a genuine
 * outside interaction is left alone and still closes the overlay.
 */

/**
 * The shape of Kobalte's interact-outside events.
 *
 * Declared structurally rather than imported: the type is not re-exported from
 * `@kobalte/core`'s entry point, and reaching into the package's internals to
 * borrow it would tie this to their file layout.
 */
export interface DismissalEvent {
	detail: { originalEvent: Event };
	preventDefault: () => void;
}

export interface DismissGuard {
	/** Attach to the overlay's content element. */
	ref: (element: HTMLElement) => void;
	/** Pass to the content's `onInteractOutside`. */
	onInteractOutside: (event: DismissalEvent) => void;
}

/** Whether a finished event's coordinates fall within `content`. */
function hitByPoint(event: Event, content: HTMLElement): boolean {
	if (!('clientX' in event) || !('clientY' in event)) return false;
	const { clientX, clientY } = event as MouseEvent;

	const rect = content.getBoundingClientRect();
	return (
		clientX >= rect.left
		&& clientX <= rect.right
		&& clientY >= rect.top
		&& clientY <= rect.bottom
	);
}

function isInside(original: Event, content: HTMLElement): boolean {
	const path = original.composedPath();
	if (path.length > 0) return path.includes(content);

	// Touch takes a slower road: Kobalte defers the check to the following
	// `click`, by which point the pointerdown has finished dispatching and its
	// composed path has been emptied. Geometry is what is left to go on.
	return hitByPoint(original, content);
}

/**
 * Guard one overlay.
 *
 * Per-overlay rather than global because the answer depends on which content
 * element is asking: a menu nested inside a dialog has to be able to dismiss
 * without also dismissing the dialog around it.
 */
export function createDismissGuard(): DismissGuard {
	let content: HTMLElement | undefined;

	return {
		ref: (element: HTMLElement) => {
			content = element;
		},
		onInteractOutside: (event: DismissalEvent) => {
			if (!content) return;
			if (!isInside(event.detail.originalEvent, content)) return;
			event.preventDefault();
		},
	};
}
