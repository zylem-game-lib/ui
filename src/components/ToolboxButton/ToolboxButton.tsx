import { Button as KButton } from '@kobalte/core';
import { type JSX, Show, splitProps } from 'solid-js';

/**
 * Tile scale. `md` is the compact rail tile; `lg` and `xl` are the extra
 * large tiles sized for three- and two-column toolboxes respectively.
 */
export type ToolboxSize = 'md' | 'lg' | 'xl';

export interface ToolboxButtonProps {
  label: string;
  /** Icon rendered above the label. */
  children: JSX.Element;
  selected?: boolean;
  disabled?: boolean;
  /** Overrides the size inherited from the enclosing `ToolboxGrid`. */
  size?: ToolboxSize;
  onClick?: (event: MouseEvent) => void;
  class?: string;
}

/**
 * Large toolbox tile: the toolbar button's glass jewel scaled up, with the
 * icon stacked over a bold label. Selected renders as the live-green state.
 */
export function ToolboxButton(props: ToolboxButtonProps) {
  return (
    <KButton.Root
      class={props.class ? `zylem-toolbox-btn ${props.class}` : 'zylem-toolbox-btn'}
      data-size={props.size}
      data-selected={props.selected ? '' : undefined}
      aria-pressed={props.selected ? 'true' : undefined}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      <span class="zylem-toolbox-btn-icon" aria-hidden="true">
        {props.children}
      </span>
      <span class="zylem-toolbox-btn-label">{props.label}</span>
    </KButton.Root>
  );
}

export interface ToolboxGridProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /** Optional uppercase caption above the grid, e.g. `Current tools`. */
  label?: string;
  /** Columns in the grid. Defaults to 2. */
  columns?: number;
  /**
   * Tile size for every button in the grid that doesn't set its own. `xl`
   * pairs with two columns, `lg` with three; defaults to `md`.
   */
  size?: ToolboxSize;
  children: JSX.Element;
}

/** Captioned grid of `ToolboxButton`s. */
export function ToolboxGrid(props: ToolboxGridProps) {
  const [local, rest] = splitProps(props, [
    'label',
    'columns',
    'size',
    'children',
    'class',
    'style',
  ]);
  const style = (): JSX.CSSProperties => ({
    '--zylem-toolbox-columns': String(local.columns ?? 2),
    ...(typeof local.style === 'object' ? local.style : {}),
  });
  return (
    <div
      class={local.class ? `zylem-toolbox-grid ${local.class}` : 'zylem-toolbox-grid'}
      role="group"
      aria-label={local.label}
      data-size={local.size}
      style={style()}
      {...rest}
    >
      <Show when={local.label}>
        <span class="zylem-toolbox-grid-label" aria-hidden="true">
          {local.label}
        </span>
      </Show>
      <div class="zylem-toolbox-grid-items">{local.children}</div>
    </div>
  );
}
