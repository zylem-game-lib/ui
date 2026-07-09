import { Show } from 'solid-js';
import PanelBottomClose from 'lucide-solid/icons/panel-bottom-close';
import PanelBottomOpen from 'lucide-solid/icons/panel-bottom-open';
import X from 'lucide-solid/icons/x';

export interface WindowControlsProps {
  onClose?: () => void;
  onCollapse?: () => void;
  /** Show the "expand" collapse icon when the panel is collapsed. */
  collapsed?: boolean;
  /** Accessible label/title for the close button (default "Close panel"). */
  closeLabel?: string;
  /** Forwarded as data-testid on the close button. */
  closeTestId?: string;
}

/**
 * Shared glass window controls: the same icon buttons used by floating and
 * detached panels. Only controls with a handler are rendered.
 */
export function WindowControls(props: WindowControlsProps) {
  return (
    <Show when={props.onClose || props.onCollapse}>
      <div class="zylem-window-controls" aria-label="Window controls">
        <Show when={props.onCollapse}>
          <button
            type="button"
            class="zylem-window-control zylem-window-control--collapse"
            aria-label={props.collapsed ? 'Expand panel' : 'Collapse panel'}
            title={props.collapsed ? 'Expand panel' : 'Collapse panel'}
            onClick={() => props.onCollapse?.()}
          >
            {props.collapsed ? <PanelBottomOpen size={12} /> : <PanelBottomClose size={12} />}
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
            <X size={12} />
          </button>
        </Show>
      </div>
    </Show>
  );
}
