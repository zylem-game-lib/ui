import Plus from 'lucide-solid/icons/plus';
import { Show } from 'solid-js';

export type AddTileVariant = 'square' | 'tall' | 'fill';

export interface AddTileProps {
  /** Text under the plus (tall and fill variants) and the accessible name. */
  label?: string;
  /**
   * `square` matches a swatch; `tall` matches a frame thumb with room for
   * text; `fill` takes the whole grid cell it is placed in, so it can stand
   * in for a card ("New project") in a card grid.
   */
  variant?: AddTileVariant;
  onClick?: (event: MouseEvent) => void;
  disabled?: boolean;
  class?: string;
}

/**
 * Dashed "add" tile that sits at the end of a swatch row, frame strip, or
 * card grid. The plus is centered on its own; the tall and fill variants
 * stack a label beneath it.
 */
export function AddTile(props: AddTileProps) {
  const variant = () => props.variant ?? 'square';
  const label = () => props.label ?? 'Add';
  const showsLabel = () => variant() !== 'square' && Boolean(props.label);
  return (
    <button
      type="button"
      class={props.class ? `zylem-add-tile ${props.class}` : 'zylem-add-tile'}
      data-variant={variant()}
      aria-label={showsLabel() ? undefined : label()}
      title={variant() === 'square' ? label() : undefined}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      <Plus class="zylem-icon zylem-add-tile-icon" aria-hidden="true" />
      <Show when={showsLabel()}>
        <span class="zylem-add-tile-label">{props.label}</span>
      </Show>
    </button>
  );
}
