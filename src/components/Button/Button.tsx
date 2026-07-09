import type { JSX } from 'solid-js';
import { splitProps } from 'solid-js';

export type ButtonVariant = 'default' | 'primary' | 'active' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface ButtonProps
  extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

/**
 * HyperGlass button: squared Aqua-like bevel with glass depth. Variants map
 * to the Zylem palette — `active` for live/run actions, `danger` for
 * destructive actions, `ghost` for low-emphasis chrome.
 *
 * Styling lives on the global `.zylem-button` class (bundled in
 * `@zylem/ui/styles.css`), selected via `data-variant` / `data-size`.
 */
export function Button(props: ButtonProps) {
  const [local, rest] = splitProps(props, ['variant', 'size', 'class', 'children']);
  return (
    <button
      type="button"
      class={local.class ? `zylem-button ${local.class}` : 'zylem-button'}
      data-variant={local.variant ?? 'default'}
      data-size={local.size ?? 'md'}
      {...rest}
    >
      {local.children}
    </button>
  );
}
