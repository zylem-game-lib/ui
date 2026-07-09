import { Show, splitProps } from 'solid-js';
import type { JSX } from 'solid-js';

export interface PanelProps
  extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Optional glossy header title. */
  title?: JSX.Element;
  /** Extra content rendered on the right side of the header. */
  headerActions?: JSX.Element;
  /** Use the brighter window-glass treatment. */
  window?: boolean;
  /** Remove body padding (for consoles, lists, etc.). */
  flush?: boolean;
  /**
   * Drop the border, outer shadow, and background so the panel sits flush
   * inside an already-outlined region.
   */
  borderless?: boolean;
  children?: JSX.Element;
}

/**
 * HyperGlass panel: glass card with a 1px electric-blue border, inner
 * highlight, subtle blur, and an optional glossy header bar.
 */
export function Panel(props: PanelProps) {
  const [local, rest] = splitProps(props, [
    'title',
    'headerActions',
    'window',
    'flush',
    'borderless',
    'children',
    'class',
  ]);

  const classes = () =>
    [
      'zylem-panel',
      local.window ? 'zylem-panel--window' : '',
      local.borderless ? 'zylem-panel--borderless' : '',
      local.class ?? '',
    ]
      .filter(Boolean)
      .join(' ');

  return (
    <div class={classes()} {...rest}>
      <Show when={local.title || local.headerActions}>
        <div class="zylem-panel-header">
          <span class="zylem-panel-header-title">{local.title}</span>
          {local.headerActions}
        </div>
      </Show>
      <div
        class={
          local.flush
            ? 'zylem-panel-body zylem-panel-body--flush'
            : 'zylem-panel-body'
        }
      >
        {local.children}
      </div>
    </div>
  );
}
