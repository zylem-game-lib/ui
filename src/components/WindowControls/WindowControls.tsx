import { Show } from 'solid-js';
import ChevronDown from 'lucide-solid/icons/chevron-down';
import ChevronUp from 'lucide-solid/icons/chevron-up';
import X from 'lucide-solid/icons/x';

export interface WindowControlsProps {
  // Optional props accept an explicit `undefined` so callers compiled with
  // `exactOptionalPropertyTypes` can forward their own optional props directly.
  onClose?: (() => void) | undefined;
  onCollapse?: (() => void) | undefined;
  /** Show the "expand" collapse icon when the panel is collapsed. */
  collapsed?: boolean | undefined;
  /** Accessible label/title for the close button (default "Close panel"). */
  closeLabel?: string | undefined;
  /** Forwarded as data-testid on the close button. */
  closeTestId?: string | undefined;
}

/**
 * Shared glass window controls: blue collapse jewel and red close jewel, used
 * by floating and detached panels. Only controls with a handler are rendered.
 */
export function WindowControls(props: WindowControlsProps) {
  return (
    <Show when={props.onClose || props.onCollapse}>
      <div class="zylem-window-controls" role="group" aria-label="Window controls">
        <Show when={props.onCollapse}>
          <button
            type="button"
            class="zylem-window-control zylem-window-control--collapse"
            aria-label={props.collapsed ? 'Expand panel' : 'Collapse panel'}
            title={props.collapsed ? 'Expand panel' : 'Collapse panel'}
            onClick={() => props.onCollapse?.()}
          >
            {props.collapsed ? (
              <ChevronUp size={11} strokeWidth={2.5} aria-hidden="true" />
            ) : (
              <ChevronDown size={11} strokeWidth={2.5} aria-hidden="true" />
            )}
          </button>
        </Show>
        <Show when={props.onClose}>
          <button
            type="button"
            class="zylem-window-control zylem-window-control--close"
            aria-label={props.closeLabel ?? 'Close panel'}
            title={props.closeLabel ?? 'Close panel'}
            data-testid={props.closeTestId}
            onClick={() => props.onClose?.()}
          >
            <X size={11} strokeWidth={2.5} aria-hidden="true" />
          </button>
        </Show>
      </div>
    </Show>
  );
}
