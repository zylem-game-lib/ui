import { Show, splitProps } from 'solid-js';
import type { JSX } from 'solid-js';

export interface CardProps
  extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: JSX.Element;
  description?: JSX.Element;
  /** Renders hover glow + pointer cursor and click affordances. */
  interactive?: boolean;
  selected?: boolean;
  children?: JSX.Element;
}

/**
 * HyperGlass card: small index-card tile with a blue glow. Use for entity
 * tiles, project tiles, and asset thumbnails.
 */
export function Card(props: CardProps) {
  const [local, rest] = splitProps(props, [
    'title',
    'description',
    'interactive',
    'selected',
    'children',
    'class',
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

  return (
    <div
      class={classes()}
      role={local.interactive ? 'button' : undefined}
      tabIndex={local.interactive ? 0 : undefined}
      {...rest}
    >
      <Show when={local.title}>
        <div class="zylem-card-title">{local.title}</div>
      </Show>
      {local.children}
      <Show when={local.description}>
        <div class="zylem-card-description">{local.description}</div>
      </Show>
    </div>
  );
}
