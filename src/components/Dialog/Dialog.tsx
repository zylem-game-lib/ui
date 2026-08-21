import { Dialog as KDialog } from '@kobalte/core';
import { Show } from 'solid-js';
import type { JSX } from 'solid-js';
import { createDismissGuard, LayerScope, useLayer } from '../../layers';
import { Button } from '../Button/Button';
import { WindowControls } from '../WindowControls/WindowControls';

export interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: JSX.Element;
  children: JSX.Element;
  /** Optional footer content (e.g. action buttons). */
  footer?: JSX.Element;
}

/**
 * HyperGlass dialog: glass window with a glossy title bar and jewel close
 * control, centered over a dimmed backdrop.
 *
 * The body is a {@link LayerScope}, so overlays opened from inside the dialog
 * stack against the dialog's own content rather than against the page. A tooltip
 * on a dialog field floats over the dialog, but a menu belonging to the page
 * behind still wins — which is what keeps a dialog from leaking overlays across
 * the rest of the app.
 */
export function Dialog(props: DialogProps) {
  const layer = useLayer('modal');
  const dismiss = createDismissGuard();

  return (
    <KDialog.Root open={props.open} onOpenChange={props.onOpenChange}>
      {/*
        A dialog is controlled and renders no trigger, so it has nothing in the
        page to resolve its tree from. This marker sits where the dialog was
        declared, which is enough to find an enclosing shadow root.
      */}
      <span ref={layer.anchorRef} style={{ display: 'none' }} aria-hidden="true" />
      <Show when={layer.mount()} keyed>
        {(mount) => (
          <KDialog.Portal mount={mount}>
            <KDialog.Overlay class="zylem-dialog-overlay" />
            <div class="zylem-dialog-positioner">
              <KDialog.Content
                ref={dismiss.ref}
                class="zylem-dialog-content"
                onInteractOutside={dismiss.onInteractOutside}
              >
                <div class="zylem-dialog-header">
                  <Show when={props.title}>
                    <KDialog.Title class="zylem-dialog-title">
                      {props.title}
                    </KDialog.Title>
                  </Show>
                  <WindowControls onClose={() => props.onOpenChange?.(false)} />
                </div>
                <KDialog.Description as="div" class="zylem-dialog-body">
                  <LayerScope>{props.children}</LayerScope>
                </KDialog.Description>
                <Show when={props.footer}>
                  <div class="zylem-dialog-footer">{props.footer}</div>
                </Show>
              </KDialog.Content>
            </div>
          </KDialog.Portal>
        )}
      </Show>
    </KDialog.Root>
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
 * `window.confirm()` flows.
 */
export function ConfirmDialog(props: ConfirmDialogProps) {
  return (
    <Dialog
      open={props.open}
      onOpenChange={props.onOpenChange}
      title={props.title ?? 'Confirm'}
      footer={
        <>
          <Button variant="ghost" onClick={() => props.onOpenChange(false)}>
            {props.cancelLabel ?? 'Cancel'}
          </Button>
          <Button
            variant={props.danger ? 'danger' : 'primary'}
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
      {props.message}
    </Dialog>
  );
}
