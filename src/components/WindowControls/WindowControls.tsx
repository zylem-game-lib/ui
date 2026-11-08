import { Show } from 'solid-js';
import ChevronDown from 'lucide-solid/icons/chevron-down';
import ChevronUp from 'lucide-solid/icons/chevron-up';
import X from 'lucide-solid/icons/x';
import { Dock } from '../../icons';
import { DropdownMenu } from '../DropdownMenu/DropdownMenu';

/** Where a panel sits. `float` leaves it free of a dock edge. */
export type DockPosition = 'left' | 'right' | 'top' | 'float' | 'bottom';

/** One row in the dock menu. */
export interface DockOption {
  id: DockPosition;
  label: string;
}

/** Top, Float, and Bottom: the menu a strip uses when it docks to those edges. */
const DEFAULT_DOCK_OPTIONS: readonly DockOption[] = [
  { id: 'top', label: 'Top' },
  { id: 'float', label: 'Float' },
  { id: 'bottom', label: 'Bottom' },
];

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
  /** Current dock, checked in the menu. Omit for none checked. */
  dock?: DockPosition | undefined;
  /**
   * Rows in the dock menu. Defaults to Top, Float, and Bottom. Pass this when
   * the window docks to other edges, such as Left and Right.
   */
  dockOptions?: readonly DockOption[] | undefined;
  /** Renders the dock control. Called with the position chosen from the menu. */
  onDock?: ((position: DockPosition) => void) | undefined;
}

/**
 * Shared ghost window controls, used by floating and detached panels. Close
 * takes the danger color only while hovered or focused. Dock opens a menu of
 * where the panel sits: Top, Float, and Bottom, or `dockOptions` when the
 * window uses other edges. Only controls with a handler are rendered.
 */
export function WindowControls(props: WindowControlsProps) {
  return (
    <Show when={props.onClose || props.onCollapse || props.onDock}>
      <div class="zylem-window-controls" role="group" aria-label="Window controls">
        <Show when={props.onDock}>
          <DropdownMenu
            triggerLabel="Dock panel"
            triggerClass="zylem-window-control zylem-window-control--dock"
            placement="bottom-end"
            trigger={<Dock size={11} aria-hidden="true" />}
            items={(props.dockOptions ?? DEFAULT_DOCK_OPTIONS).map((option) => ({
              id: option.id,
              label: option.label,
              checked: props.dock === option.id,
              closeOnSelect: true,
              onSelect: () => props.onDock?.(option.id),
            }))}
          />
        </Show>
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
