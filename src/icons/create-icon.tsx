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

export interface ZylemIconOptions {
  /**
   * Replaces the `zylem-icon` class. Toolbar icons keep that class, which
   * sizes them to 18px; chrome glyphs omit it so `size` wins, the way a
   * Lucide chevron does.
   */
  className?: string;
  /** Draw with `currentColor` fill instead of a stroke. */
  filled?: boolean;
  /** Defaults to the 24×24 Lucide grid. */
  viewBox?: string;
}

/**
 * Solid icon factory matching lucide-solid's size / color / strokeWidth
 * props so these glyphs drop into the same toolbar buttons and CSS.
 */
export function createZylemIcon(
  name: string,
  iconNode: IconNode,
  options?: ZylemIconOptions,
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
      [options?.className ?? 'zylem-icon', `zylem-icon-${kebab(name)}`, local.class]
        .filter((value) => Boolean(value))
        .join(' ');

    const filled = options?.filled === true;
    const paint = () => local.color ?? 'currentColor';

    return (
      <svg
        {...DEFAULTS}
        viewBox={options?.viewBox ?? DEFAULTS.viewBox}
        width={size()}
        height={size()}
        fill={filled ? paint() : 'none'}
        stroke={filled ? 'none' : paint()}
        stroke-width={filled ? 0 : strokeWidth()}
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
