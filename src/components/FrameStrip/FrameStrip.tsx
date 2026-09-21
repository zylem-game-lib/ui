import ArrowLeftToLine from 'lucide-solid/icons/arrow-left-to-line';
import ArrowRightToLine from 'lucide-solid/icons/arrow-right-to-line';
import ChevronLeft from 'lucide-solid/icons/chevron-left';
import ChevronRight from 'lucide-solid/icons/chevron-right';
import Copy from 'lucide-solid/icons/copy';
import Trash2 from 'lucide-solid/icons/trash-2';
import { type JSX, Show, splitProps } from 'solid-js';
import { Button } from '../Button/Button';
import { ToolbarButton } from '../ToolbarButton/ToolbarButton';

export interface FrameStripProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /** Caption, e.g. `Timeline`. */
  label?: string;
  /** Name of the animation the frames belong to, shown after the caption. */
  title?: string;
  /** `FrameThumb`s followed by an `AddTile variant="tall"`. */
  children: JSX.Element;
}

/** Captioned, horizontally scrolling row of animation frames. */
export function FrameStrip(props: FrameStripProps) {
  const [local, rest] = splitProps(props, ['label', 'title', 'children', 'class']);
  return (
    <div class={local.class ? `zylem-frame-strip ${local.class}` : 'zylem-frame-strip'} {...rest}>
      <div class="zylem-frame-strip-header">
        <span class="zylem-frame-strip-label">{local.label ?? 'Timeline'}</span>
        <Show when={local.title}>
          <span class="zylem-frame-strip-title">{local.title}</span>
        </Show>
      </div>
      <div class="zylem-frame-strip-row zylem-scroll" role="listbox" aria-label={local.label ?? 'Frames'}>
        {local.children}
      </div>
    </div>
  );
}

export interface FrameThumbProps {
  /** One-based frame number shown in the corner badge. */
  index: number;
  selected?: boolean;
  onClick?: (event: MouseEvent) => void;
  /** Thumbnail content (a canvas or img); empty frames show the checker. */
  children?: JSX.Element;
  label?: string;
  class?: string;
}

/** Square frame thumbnail on the checker with a frame-number badge. */
export function FrameThumb(props: FrameThumbProps) {
  return (
    <button
      type="button"
      role="option"
      class={props.class ? `zylem-frame-thumb ${props.class}` : 'zylem-frame-thumb'}
      data-selected={props.selected ? '' : undefined}
      aria-selected={props.selected ? 'true' : 'false'}
      aria-label={props.label ?? `Frame ${props.index}`}
      onClick={props.onClick}
    >
      <span class="zylem-frame-thumb-surface">{props.children}</span>
      <span class="zylem-frame-thumb-index" aria-hidden="true">
        {props.index}
      </span>
    </button>
  );
}

export interface FrameActionsProps {
  onDuplicate?: () => void;
  onDelete?: () => void;
  /** Reorder: swap the selected frame with its left neighbour. Shown when set. */
  onMoveLeft?: () => void;
  /** Reorder: swap the selected frame with its right neighbour. Shown when set. */
  onMoveRight?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  canDuplicate?: boolean;
  canDelete?: boolean;
  canMoveLeft?: boolean;
  canMoveRight?: boolean;
  canPrev?: boolean;
  canNext?: boolean;
  class?: string;
}

/**
 * Frame commands under the strip: Duplicate and Delete, the optional reorder
 * pair, then step arrows whose chevrons are centered in square toolbar buttons.
 */
export function FrameActions(props: FrameActionsProps) {
  return (
    <div class={props.class ? `zylem-frame-actions ${props.class}` : 'zylem-frame-actions'}>
      <Button
        variant="primary"
        size="sm"
        disabled={props.canDuplicate === false}
        onClick={() => props.onDuplicate?.()}
      >
        <Copy class="zylem-icon" aria-hidden="true" />
        Duplicate
      </Button>
      <Button size="sm" disabled={props.canDelete === false} onClick={() => props.onDelete?.()}>
        <Trash2 class="zylem-icon" aria-hidden="true" />
        Delete
      </Button>
      <Show when={props.onMoveLeft || props.onMoveRight}>
        <span class="zylem-frame-actions-group" role="group" aria-label="Reorder frame">
          <ToolbarButton
            label="Move frame left"
            disabled={props.canMoveLeft === false}
            onClick={() => props.onMoveLeft?.()}
            class="zylem-frame-actions-step"
          >
            <ArrowLeftToLine class="zylem-icon" />
          </ToolbarButton>
          <ToolbarButton
            label="Move frame right"
            disabled={props.canMoveRight === false}
            onClick={() => props.onMoveRight?.()}
            class="zylem-frame-actions-step"
          >
            <ArrowRightToLine class="zylem-icon" />
          </ToolbarButton>
        </span>
      </Show>
      <span class="zylem-frame-actions-spacer" />
      <ToolbarButton
        label="Previous frame"
        disabled={props.canPrev === false}
        onClick={() => props.onPrev?.()}
        class="zylem-frame-actions-step"
      >
        <ChevronLeft class="zylem-icon" />
      </ToolbarButton>
      <ToolbarButton
        label="Next frame"
        disabled={props.canNext === false}
        onClick={() => props.onNext?.()}
        class="zylem-frame-actions-step"
      >
        <ChevronRight class="zylem-icon" />
      </ToolbarButton>
    </div>
  );
}
