import { Show, splitProps, type JSX } from 'solid-js';

export type ButtonVariant = 'default' | 'primary' | 'active' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface ButtonProps
  extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Icon drawn before the label. Omitted, the button is label only. */
  icon?: JSX.Element | undefined;
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
  const [local, rest] = splitProps(props, ['variant', 'size', 'class', 'children', 'icon']);
  return (
    <button
      type="button"
      class={local.class ? `zylem-button ${local.class}` : 'zylem-button'}
      data-variant={local.variant ?? 'default'}
      data-size={local.size ?? 'md'}
      {...rest}
    >
      <Show when={local.icon}>
        <span class="zylem-button-icon" aria-hidden="true">
          {local.icon}
        </span>
      </Show>
      {local.children}
    </button>
  );
}
