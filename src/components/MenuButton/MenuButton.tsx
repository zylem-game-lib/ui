import { Popover as KPopover } from '@kobalte/core';
import { Show, createSignal, type JSX } from 'solid-js';
import { createDismissGuard, useLayer } from '../../layers';
import { Tooltip } from '../Tooltip/Tooltip';

export interface MenuButtonProps {
  /** Accessible name, and the tooltip text unless `tooltip` overrides it. */
  label: string;
  /** Button face content, usually an icon. */
  children: JSX.Element;
  /** Panel content: a menu, a picker, anything. Rendered only while open. */
  menu: (close: () => void) => JSX.Element;
  /**
   * Primary action for the face. Given one, the button splits: the face fires
   * this and the chevron opens the menu. Without one, the whole button opens
   * the menu and the chevron is only there to say so.
   *
   * Optional props here accept an explicit `undefined` so a caller compiled with
   * `exactOptionalPropertyTypes` can decide the split at the call site.
   */
  onAction?: (() => void) | undefined;
  /** Renders the face in its selected state. */
  selected?: boolean | undefined;
  disabled?: boolean | undefined;
  /** Tooltip text; defaults to `label`. Pass `null` for no tooltip. */
  tooltip?: string | null | undefined;
  placement?:
    | 'bottom-start'
    | 'bottom-end'
    | 'bottom'
    | 'top-start'
    | 'top-end'
    | 'top'
    | undefined;
  /** Controlled open state. Omit to let the button own it. */
  open?: boolean | undefined;
  onOpenChange?: ((open: boolean) => void) | undefined;
  class?: string | undefined;
}

/**
 * Shown in both modes, because a chevron means "this has a menu" and that is
 * true whether or not the face carries its own action.
 */
const CHEVRON = '▾';

/**
 * A toolbar button that owns a menu, optionally split.
 *
 * Split mode exists because choosing and doing are separate jobs: the face
 * repeats the last choice and the chevron is there for picking a different one.
 * Placing ten of the same thing is then one trip through the menu and ten
 * clicks, rather than ten trips.
 *
 * The panel is layered at the `menu` tier and portaled out of the button's own
 * subtree, so a toolbar that clips its overflow or sits in a lower stacking
 * context cannot hide it.
 */
export function MenuButton(props: MenuButtonProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = createSignal(false);
  const layer = useLayer('menu');
  const dismiss = createDismissGuard();

  const isOpen = () => props.open ?? uncontrolledOpen();
  const setOpen = (open: boolean) => {
    setUncontrolledOpen(open);
    props.onOpenChange?.(open);
  };

  const isSplit = () => props.onAction !== undefined;
  const tooltipText = () =>
    props.tooltip === null ? null : props.tooltip ?? props.label;

  /** Wrap in a tooltip only when there is text for one. */
  const described = (content: JSX.Element) => (
    <Show when={tooltipText()} fallback={content} keyed>
      {(text) => <Tooltip content={text}>{content}</Tooltip>}
    </Show>
  );

  return (
    <div
      class={props.class ? `zylem-menu-button ${props.class}` : 'zylem-menu-button'}
      data-split={isSplit() ? '' : undefined}
    >
      <KPopover.Root
        open={isOpen()}
        onOpenChange={setOpen}
        placement={props.placement ?? 'bottom-start'}
      >
        <Show
          when={isSplit()}
          fallback={described(
            <KPopover.Trigger
              ref={layer.anchorRef}
              class="zylem-toolbar-btn zylem-menu-button__face"
              aria-label={props.label}
              disabled={props.disabled}
              data-selected={props.selected ? '' : undefined}
            >
              {props.children}
              {/*
               * Signage only: the button around it already opens the menu, so
               * this must not read as a second control.
               */}
              <span
                class="zylem-menu-button__chevron zylem-menu-button__chevron--static"
                aria-hidden="true"
              >
                {CHEVRON}
              </span>
            </KPopover.Trigger>,
          )}
        >
          {described(
            <button
              type="button"
              ref={layer.anchorRef}
              class="zylem-toolbar-btn zylem-menu-button__face"
              aria-label={props.label}
              disabled={props.disabled}
              data-selected={props.selected ? '' : undefined}
              onClick={() => props.onAction?.()}
            >
              {props.children}
            </button>,
          )}
          <KPopover.Trigger
            class="zylem-menu-button__chevron"
            aria-label={`${props.label} options`}
            disabled={props.disabled}
          >
            <span aria-hidden="true">{CHEVRON}</span>
          </KPopover.Trigger>
        </Show>

        <Show when={layer.mount()} keyed>
          {(mount) => (
            <KPopover.Portal mount={mount}>
              <KPopover.Content
                ref={dismiss.ref}
                class="zylem-menu-button__panel"
                aria-label={props.label}
                onInteractOutside={dismiss.onInteractOutside}
              >
                {props.menu(() => setOpen(false))}
              </KPopover.Content>
            </KPopover.Portal>
          )}
        </Show>
      </KPopover.Root>
    </div>
  );
}
