import { splitProps } from 'solid-js';
import type { JSX } from 'solid-js';

export interface ToolbarProps extends JSX.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  children?: JSX.Element;
}

/**
 * HyperGlass toolbar: molded glass command strip. Compose with
 * `ToolbarButton` (and `Separator orientation="vertical"` between groups).
 */
export function Toolbar(props: ToolbarProps) {
  const [local, rest] = splitProps(props, ['orientation', 'children', 'class']);

  const classes = () =>
    [
      'zylem-toolbar',
      local.orientation === 'vertical' ? 'zylem-toolbar--vertical' : '',
      local.class ?? '',
    ]
      .filter(Boolean)
      .join(' ');

  return (
    <div role="toolbar" class={classes()} {...rest}>
      {local.children}
    </div>
  );
}
