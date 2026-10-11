import { For, Show } from 'solid-js';
import { AddTile } from '../AddTile/AddTile';

/** Sentinel colour for the eraser / transparent swatch. */
export const TRANSPARENT = 'transparent';

export interface SwatchProps {
  /** Any CSS colour, or `'transparent'` for the checkered swatch. */
  color: string;
  selected?: boolean;
  onClick?: (event: MouseEvent) => void;
  /** Accessible name; defaults to the colour string. */
  label?: string;
  disabled?: boolean;
  class?: string;
}

/** One palette colour: a small glass-edged square, ringed when selected. */
export function Swatch(props: SwatchProps) {
  const transparent = () => props.color === TRANSPARENT;
  return (
    <button
      type="button"
      class={props.class ? `zylem-swatch ${props.class}` : 'zylem-swatch'}
      style={transparent() ? undefined : { '--zylem-swatch-color': props.color }}
      data-transparent={transparent() ? '' : undefined}
      data-selected={props.selected ? '' : undefined}
      aria-pressed={props.selected ? 'true' : 'false'}
      aria-label={props.label ?? (transparent() ? 'Transparent' : props.color)}
      title={props.label ?? (transparent() ? 'Transparent' : props.color)}
      disabled={props.disabled}
      onClick={props.onClick}
    />
  );
}

export interface ColorPaletteProps {
  colors: readonly string[];
  /** Currently selected colour (compare with `colors` entries or `'transparent'`). */
  value?: string;
  onSelect?: (color: string) => void;
  /** When provided, an add tile follows the swatches. */
  onAdd?: () => void;
  /** Lead with the transparent swatch. Defaults to true. */
  includeTransparent?: boolean;
  class?: string;
}

/** Row of swatches with an optional transparent lead and add tile. */
export function ColorPalette(props: ColorPaletteProps) {
  return (
    <div
      role="group"
      aria-label="Palette"
      class={props.class ? `zylem-palette ${props.class}` : 'zylem-palette'}
    >
      <Show when={props.includeTransparent ?? true}>
        <Swatch
          color={TRANSPARENT}
          selected={props.value === TRANSPARENT}
          onClick={() => props.onSelect?.(TRANSPARENT)}
        />
      </Show>
      <For each={props.colors}>
        {(color) => (
          <Swatch
            color={color}
            selected={props.value === color}
            onClick={() => props.onSelect?.(color)}
          />
        )}
      </For>
      <Show when={props.onAdd}>
        <AddTile label="Add color" onClick={() => props.onAdd?.()} />
      </Show>
    </div>
  );
}
