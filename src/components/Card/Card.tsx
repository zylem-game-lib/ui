import { Show, splitProps } from 'solid-js';
import type { JSX } from 'solid-js';

export interface CardProps
  extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: JSX.Element;
  description?: JSX.Element;
  /** Artwork above the title: a thumbnail, preview swatch, or icon well. */
  media?: JSX.Element;
  /** Renders hover glow + pointer cursor and click affordances. */
  interactive?: boolean;
  selected?: boolean;
  /** Rendered after the description: tags, actions, metadata. */
  children?: JSX.Element;
}

/**
 * HyperGlass card: small index-card tile with a blue glow. Use for entity
 * tiles, project tiles, and asset thumbnails. Order is media, title,
 * description, then children.
 */
export function Card(props: CardProps) {
  const [local, rest] = splitProps(props, [
    'title',
    'description',
    'media',
    'interactive',
    'selected',
    'children',
    'class',
    'onKeyDown',
  ]);

  const classes = () =>
    [
      'zylem-card',
      local.interactive ? 'zylem-card--interactive' : '',
      local.selected ? 'zylem-card--selected' : '',
      local.class ?? '',
    ]
      .filter(Boolean)
      .join(' ');

  // An interactive card is a button in all but tag name, so Enter and Space
  // activate it like one.
  const onKeyDown = (event: KeyboardEvent & { currentTarget: HTMLDivElement; target: Element }) => {
    if (typeof local.onKeyDown === 'function') local.onKeyDown(event);
    else if (local.onKeyDown) local.onKeyDown[0](local.onKeyDown[1], event);
    if (!local.interactive || event.defaultPrevented) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.currentTarget.click();
    }
  };

  return (
    <div
      class={classes()}
      role={local.interactive ? 'button' : undefined}
      tabIndex={local.interactive ? 0 : undefined}
      aria-pressed={local.interactive && local.selected !== undefined ? local.selected : undefined}
      onKeyDown={onKeyDown}
      {...rest}
    >
      <Show when={local.media}>
        <div class="zylem-card-media">{local.media}</div>
      </Show>
      <Show when={local.title}>
        <div class="zylem-card-title">{local.title}</div>
      </Show>
      <Show when={local.description}>
        <div class="zylem-card-description">{local.description}</div>
      </Show>
      {local.children}
    </div>
  );
}
