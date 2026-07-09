import { Show, splitProps } from 'solid-js';
import type { JSX } from 'solid-js';
import { WindowControls, type WindowControlsProps } from '../WindowControls/WindowControls';

export interface TitleBarProps
  extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'title' | 'onClose'>,
    WindowControlsProps {
  title?: JSX.Element;
  /** Smaller 32px bar for panel headers. */
  compact?: boolean;
  /** Show grab cursor for draggable bars. */
  draggable?: boolean;
  /** Extra content placed between the title and window controls. */
  children?: JSX.Element;
}

/**
 * HyperGlass title bar: glossy molded glass strip with a title, optional
 * extra chrome, and shared glass window controls.
 */
export function TitleBar(props: TitleBarProps) {
  const [local, rest] = splitProps(props, [
    'title',
    'compact',
    'draggable',
    'children',
    'onClose',
    'onCollapse',
    'collapsed',
    'closeLabel',
    'closeTestId',
    'class',
  ]);

  const classes = () =>
    [
      'zylem-titlebar',
      local.compact ? 'zylem-titlebar--compact' : '',
      local.draggable ? 'zylem-titlebar--draggable' : '',
      local.class ?? '',
    ]
      .filter(Boolean)
      .join(' ');

  return (
    <div class={classes()} {...rest}>
      <Show when={local.title}>
        <span class="zylem-titlebar-title">{local.title}</span>
      </Show>
      {local.children}
      <WindowControls
        onClose={local.onClose}
        onCollapse={local.onCollapse}
        collapsed={local.collapsed}
        closeLabel={local.closeLabel}
        closeTestId={local.closeTestId}
      />
    </div>
  );
}
