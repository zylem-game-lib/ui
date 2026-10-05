import { For, splitProps, type Component, type JSX } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import type { IconNode } from './icon-nodes';

export interface ZylemIconProps extends JSX.SvgSVGAttributes<SVGSVGElement> {
  color?: string;
  size?: string | number;
  strokeWidth?: string | number;
  absoluteStrokeWidth?: boolean;
}

const DEFAULTS = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
} as const;

function kebab(name: string): string {
  return name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Solid icon factory matching lucide-solid's size / color / strokeWidth
 * props so these glyphs drop into the same toolbar buttons and CSS.
 */
export function createZylemIcon(
  name: string,
  iconNode: IconNode,
): Component<ZylemIconProps> {
  const Icon: Component<ZylemIconProps> = (props) => {
    const [local, rest] = splitProps(props, [
      'color',
      'size',
      'strokeWidth',
      'class',
      'absoluteStrokeWidth',
    ]);
    const size = () => local.size ?? 24;
    const strokeWidth = () => {
      const width = Number(local.strokeWidth ?? 2);
      if (local.absoluteStrokeWidth) {
        return (width * 24) / Number(size());
      }
      return width;
    };
    const classes = () =>
      ['zylem-icon', `zylem-icon-${kebab(name)}`, local.class]
        .filter((value) => Boolean(value))
        .join(' ');

    return (
      <svg
        {...DEFAULTS}
        width={size()}
        height={size()}
        stroke={local.color ?? 'currentColor'}
        stroke-width={strokeWidth()}
        class={classes()}
        aria-hidden="true"
        {...rest}
      >
        <For each={iconNode}>
          {([element, attrs]) => <Dynamic component={element} {...attrs} />}
        </For>
      </svg>
    );
  };
  return Icon;
}
