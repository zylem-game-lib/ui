import { createUniqueId, onCleanup, onMount, Show } from 'solid-js';
import type { JSX } from 'solid-js';
import { Portal } from 'solid-js/web';
import { LAYER_PORTAL_CLASS, LayerScope, useLayer } from '../../layers';
import { Button } from '../Button/Button';
import { WindowControls } from '../WindowControls/WindowControls';

/**
 * Card width. `md` is the default 440px card, `lg` a 760px card for forms
 * with two columns, and `fullscreen` fills the viewport (minus a margin) with
 * the body taking the remaining height — the shell for browser-style pickers.
 */
export type DialogSize = 'md' | 'lg' | 'fullscreen';

export interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: JSX.Element;
  /** Secondary line under the title. Describes the dialog unless `aria-describedby` says otherwise. */
  subtitle?: JSX.Element;
  /** Content between the titles and the close control, e.g. a search field. */
  headerExtra?: JSX.Element;
  size?: DialogSize;
  children: JSX.Element;
  /** Optional footer content (e.g. action buttons). */
  footer?: JSX.Element;
  /** Extra class on the card. */
  class?: string;
  /** Extra class on the body, e.g. to hand scrolling to the content's columns. */
  bodyClass?: string;
  /** `alertdialog` for an urgent question the user has to answer, such as a confirmation. */
  role?: 'dialog' | 'alertdialog';
  /** Names the dialog when it has no `title`. */
  'aria-label'?: string;
  /** Id of the element that describes the dialog. */
  'aria-describedby'?: string;
}

/**
 * HyperGlass dialog: glass window with a glossy title bar and jewel close
 * control, centered over a dimmed backdrop.
 *
 * A native `<dialog>` opened with `showModal()`: it renders in the top layer,
 * above everything else on the page, which is inert while it is open. Escape
 * and a click outside the card ask to close it, and closing hands focus back
 * to whatever had it before.
 *
 * The card shares a {@link LayerScope} with the scope's portal container, so
 * overlays opened from the dialog render inside the `<dialog>` (outside it they
 * would be inert) but beside the card rather than in it, where the card's
 * clipping would cut them off.
 */
export function Dialog(props: DialogProps) {
  const layer = useLayer('modal');

  return (
    <>
      {/*
        A dialog is controlled and renders no trigger, so it has nothing in the
        page to resolve its tree from. This marker sits where the dialog was
        declared, which is enough to find an enclosing shadow root.
      */}
      <span ref={layer.anchorRef} style={{ display: 'none' }} aria-hidden="true" />
      <Show when={props.open && layer.mount()} keyed>
        {(mount) => (
          <Portal mount={mount}>
            <DialogWindow {...props} />
          </Portal>
        )}
      </Show>
    </>
  );
}

/** Overlays a click outside the card dismisses on its own, without closing the dialog too. */
const DISMISSABLE_OVERLAY = '[role="menu"], [role="listbox"], [role="dialog"]';

/** The `<dialog>` itself, mounted for as long as the dialog is open. */
function DialogWindow(props: DialogProps) {
  const titleId = createUniqueId();
  const subtitleId = createUniqueId();
  let dialog!: HTMLDialogElement;
  let disposed = false;
  let pressedBackdrop = false;

  const close = () => props.onOpenChange?.(false);
  // Outside the card means on the dialog itself or on the positioner filling it.
  const isBackdrop = (target: EventTarget | null | undefined) =>
    target === dialog || target === dialog.firstElementChild;
  const hasOpenOverlay = () =>
    dialog
      .querySelector(`.zylem-dialog-positioner > .${LAYER_PORTAL_CLASS}`)
      ?.querySelector(DISMISSABLE_OVERLAY) != null;

  onMount(() => {
    // jsdom has no `showModal()`.
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');

    // Kobalte dismisses an open overlay from a capture listener on `document`,
    // so this has to run first, on `window`, to still see it open.
    const onPointerDown = (event: PointerEvent) => {
      pressedBackdrop = isBackdrop(event.composedPath()[0]) && !hasOpenOverlay();
    };
    window.addEventListener('pointerdown', onPointerDown, true);
    onCleanup(() => window.removeEventListener('pointerdown', onPointerDown, true));
  });

  onCleanup(() => {
    disposed = true;
    // Runs before the portal detaches the element: only a dialog closed while
    // still in the document returns focus to whatever opened it.
    if (dialog.open) dialog.close();
  });

  return (
    <dialog
      ref={dialog}
      class="zylem-dialog"
      role={props.role}
      aria-labelledby={props.title ? titleId : undefined}
      aria-label={props['aria-label']}
      aria-describedby={props['aria-describedby'] ?? (props.subtitle ? subtitleId : undefined)}
      onCancel={(event) => {
        // `open` stays the source of truth: the host closes the dialog.
        event.preventDefault();
        close();
      }}
      onClose={() => {
        // The browser closed it anyway, e.g. a second Escape it would not let be prevented.
        if (!disposed) close();
      }}
      onClick={(event) => {
        if (pressedBackdrop && isBackdrop(event.target)) close();
        pressedBackdrop = false;
      }}
    >
      <LayerScope class="zylem-dialog-positioner">
        <div
          class={props.class ? `zylem-dialog-content ${props.class}` : 'zylem-dialog-content'}
          data-size={props.size}
        >
          <div class="zylem-dialog-header">
            <Show when={props.title || props.subtitle}>
              <div class="zylem-dialog-titles">
                <Show when={props.title}>
                  <h2 id={titleId} class="zylem-dialog-title">
                    {props.title}
                  </h2>
                </Show>
                <Show when={props.subtitle}>
                  <p id={subtitleId} class="zylem-dialog-subtitle">
                    {props.subtitle}
                  </p>
                </Show>
              </div>
            </Show>
            <Show when={props.headerExtra}>
              <div class="zylem-dialog-header-extra">{props.headerExtra}</div>
            </Show>
            <WindowControls onClose={close} closeLabel="Close dialog" />
          </div>
          <div class={props.bodyClass ? `zylem-dialog-body ${props.bodyClass}` : 'zylem-dialog-body'}>
            {props.children}
          </div>
          <Show when={props.footer}>
            <div class="zylem-dialog-footer">{props.footer}</div>
          </Show>
        </div>
      </LayerScope>
    </dialog>
  );
}

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: JSX.Element;
  message: JSX.Element;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
}

/**
 * Confirmation dialog built on Dialog — a drop-in replacement for
 * `window.confirm()` flows. An `alertdialog` described by its message; it
 * opens with focus on Confirm, or on Cancel when the action is destructive.
 */
export function ConfirmDialog(props: ConfirmDialogProps) {
  const messageId = createUniqueId();

  return (
    <Dialog
      open={props.open}
      onOpenChange={props.onOpenChange}
      role="alertdialog"
      aria-describedby={messageId}
      title={props.title ?? 'Confirm'}
      footer={
        <>
          <Button variant="ghost" autofocus={props.danger} onClick={() => props.onOpenChange(false)}>
            {props.cancelLabel ?? 'Cancel'}
          </Button>
          <Button
            variant={props.danger ? 'danger' : 'primary'}
            autofocus={!props.danger}
            onClick={() => {
              props.onConfirm();
              props.onOpenChange(false);
            }}
          >
            {props.confirmLabel ?? 'Confirm'}
          </Button>
        </>
      }
    >
      <div id={messageId}>{props.message}</div>
    </Dialog>
  );
}
