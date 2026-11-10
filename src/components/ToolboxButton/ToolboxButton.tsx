import { Button as KButton } from '@kobalte/core';
import ChevronDown from 'lucide-solid/icons/chevron-down';
import ChevronRight from 'lucide-solid/icons/chevron-right';
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
  /** Live-green jewel. Given at all, the tile exposes this as `aria-pressed`. */
  selected?: boolean;
  /**
   * Checkbox-like toggle. Electric blue while on. Given at all, the tile
   * exposes this as `aria-pressed` instead of `selected`.
   */
  on?: boolean;
  disabled?: boolean;
  /** Overrides the size inherited from the enclosing `ToolboxGrid`. */
  size?: ToolboxSize;
  /** Do not render the label. It stays the accessible name, and a tooltip can show it. */
  iconOnly?: boolean;
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
      data-on={props.on ? '' : undefined}
      data-icon-only={props.iconOnly ? '' : undefined}
      aria-label={props.iconOnly ? props.label : undefined}
      aria-pressed={props.on !== undefined ? props.on : props.selected}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      <span class="zylem-toolbox-btn-icon" aria-hidden="true">
        {props.children}
      </span>
      <Show when={!props.iconOnly}>
        <span class="zylem-toolbox-btn-label">{props.label}</span>
      </Show>
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
  /** The caption toggles the tiles. */
  collapsible?: boolean;
  /** Tiles are hidden. Applies when `collapsible` is set. */
  collapsed?: boolean;
  /** Called with the next collapsed value. */
  onCollapsedChange?: (collapsed: boolean) => void;
  children: JSX.Element;
}

/** Captioned grid of `ToolboxButton`s. */
export function ToolboxGrid(props: ToolboxGridProps) {
  const [local, rest] = splitProps(props, [
    'label',
    'columns',
    'size',
    'collapsible',
    'collapsed',
    'onCollapsedChange',
    'children',
    'class',
    'style',
  ]);
  const style = (): JSX.CSSProperties => ({
    '--zylem-toolbox-columns': String(local.columns ?? 2),
    ...(typeof local.style === 'object' ? local.style : {}),
  });
  const collapsed = () => local.collapsible === true && local.collapsed === true;
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
        <Show
          when={local.collapsible}
          fallback={
            <span class="zylem-toolbox-grid-label" aria-hidden="true">
              {local.label}
            </span>
          }
        >
          <button
            type="button"
            class="zylem-toolbox-grid-label zylem-toolbox-grid-disclosure"
            aria-expanded={!collapsed()}
            onClick={() => local.onCollapsedChange?.(!collapsed())}
          >
            <Show
              when={collapsed()}
              fallback={<ChevronDown size={12} strokeWidth={2.5} aria-hidden="true" />}
            >
              <ChevronRight size={12} strokeWidth={2.5} aria-hidden="true" />
            </Show>
            {local.label}
          </button>
        </Show>
      </Show>
      <Show when={!collapsed()}>
        <div class="zylem-toolbox-grid-items">{local.children}</div>
      </Show>
    </div>
  );
}
