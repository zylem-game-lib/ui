import Plus from 'lucide-solid/icons/plus';
import { Show } from 'solid-js';

export interface AddTileProps {
  /** Text under the plus (tall variant) and the accessible name. */
  label?: string;
  /** `square` matches a swatch; `tall` matches a frame thumb with room for text. */
  variant?: 'square' | 'tall';
  onClick?: (event: MouseEvent) => void;
  disabled?: boolean;
  class?: string;
}

/**
 * Dashed "add" tile that sits at the end of a swatch row or frame strip. The
 * plus is centered on its own; the tall variant stacks a label beneath it.
 */
export function AddTile(props: AddTileProps) {
  const variant = () => props.variant ?? 'square';
  const label = () => props.label ?? 'Add';
  return (
    <button
      type="button"
      class={props.class ? `zylem-add-tile ${props.class}` : 'zylem-add-tile'}
      data-variant={variant()}
      aria-label={variant() === 'square' || !props.label ? label() : undefined}
      title={variant() === 'square' ? label() : undefined}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      <Plus class="zylem-icon zylem-add-tile-icon" aria-hidden="true" />
      <Show when={variant() === 'tall' && props.label}>
        <span class="zylem-add-tile-label">{props.label}</span>
      </Show>
    </button>
  );
}
