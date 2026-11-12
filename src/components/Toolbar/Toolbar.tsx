import { splitProps } from 'solid-js';
import type { JSX } from 'solid-js';
import type { ToolbarMode } from '../../theme/toolbar';

export type { ToolbarMode };

export interface ToolbarProps extends JSX.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  /**
   * Retints the rail and resting buttons. Selected, on, and danger jewels
   * keep their own colors. Omit it for the primary glass.
   */
  mode?: ToolbarMode;
  children?: JSX.Element;
}

/**
 * HyperGlass toolbar: molded glass command strip. Compose with
 * `ToolbarButton` (and `Separator orientation="vertical"` between groups).
 *
 * `mode` retints the rail and resting buttons. Selected stays live green,
 * a toggle that is on stays electric blue, and danger stays red.
 */
export function Toolbar(props: ToolbarProps) {
  const [local, rest] = splitProps(props, ['orientation', 'mode', 'children', 'class']);

  const classes = () =>
    [
      'zylem-toolbar',
      local.orientation === 'vertical' ? 'zylem-toolbar--vertical' : '',
      local.class ?? '',
    ]
      .filter(Boolean)
      .join(' ');

  return (
    <div
      {...rest}
      role="toolbar"
      aria-orientation={local.orientation === 'vertical' ? 'vertical' : undefined}
      class={classes()}
      data-mode={local.mode}
    >
      {local.children}
    </div>
  );
}
