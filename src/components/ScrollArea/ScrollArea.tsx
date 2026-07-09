import { splitProps } from 'solid-js';
import type { JSX } from 'solid-js';

export interface ScrollAreaProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /** Scroll direction; defaults to vertical. */
  direction?: 'vertical' | 'horizontal' | 'both';
  children?: JSX.Element;
}

/**
 * HyperGlass scroll area: wrapper that opts into the visible Aqua-glass
 * scrollbar rail (`.zylem-scroll`, defined in hyperglass-base.css.ts).
 */
export function ScrollArea(props: ScrollAreaProps) {
  const [local, rest] = splitProps(props, ['direction', 'children', 'class', 'style']);

  const overflow = () => {
    switch (local.direction) {
      case 'horizontal':
        return { 'overflow-x': 'auto', 'overflow-y': 'hidden' } as const;
      case 'both':
        return { overflow: 'auto' } as const;
      default:
        return { 'overflow-y': 'auto', 'overflow-x': 'hidden' } as const;
    }
  };

  return (
    <div
      class={local.class ? `zylem-scroll ${local.class}` : 'zylem-scroll'}
      style={{
        ...overflow(),
        'min-height': 0,
        ...(typeof local.style === 'object' ? local.style : {}),
      }}
      {...rest}
    >
      {local.children}
    </div>
  );
}
