import { type JSX, splitProps } from 'solid-js';

export interface PixelGridProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /** Sprite width in source pixels. */
  width: number;
  /** Sprite height in source pixels. */
  height: number;
  /** Screen pixels per source pixel. */
  zoom?: number;
  /** Checker cell size in screen pixels. */
  checkerCell?: number;
  /** Overlay content (a canvas, selection chrome); fills the surface. */
  children?: JSX.Element;
}

/**
 * Transparent-pixel checkerboard for the sprite editor. Sized to the sprite
 * at the given zoom with a thin blue edge, so a consumer's canvas can sit on
 * top with a transparent background and read against the checker.
 */
export function PixelGrid(props: PixelGridProps) {
  const [local, rest] = splitProps(props, [
    'width',
    'height',
    'zoom',
    'checkerCell',
    'children',
    'class',
    'style',
  ]);
  const zoom = () => local.zoom ?? 1;
  const inlineStyle = (): JSX.CSSProperties => ({
    width: `${local.width * zoom()}px`,
    height: `${local.height * zoom()}px`,
    '--zylem-pixel-grid-cell': `${local.checkerCell ?? 8}px`,
    ...(typeof local.style === 'object' ? local.style : {}),
  });

  return (
    <div
      class={local.class ? `zylem-pixel-grid ${local.class}` : 'zylem-pixel-grid'}
      style={inlineStyle()}
      {...rest}
    >
      {local.children}
    </div>
  );
}
