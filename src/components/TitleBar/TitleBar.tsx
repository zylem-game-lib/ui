import { Show, splitProps } from 'solid-js';
import type { JSX } from 'solid-js';
import { Heading, type HeadingLevel } from '../shared/Heading';
import { WindowControls, type WindowControlsProps } from '../WindowControls/WindowControls';

export interface TitleBarProps
  extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'title' | 'onClose'>,
    WindowControlsProps {
  title?: JSX.Element;
  /** Heading level of the title (default 2). */
  headingLevel?: HeadingLevel;
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
    'headingLevel',
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
        <Heading level={local.headingLevel ?? 2} class="zylem-titlebar-title">
          {local.title}
        </Heading>
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
