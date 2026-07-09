import { Dialog as KDialog } from '@kobalte/core';
import { Show } from 'solid-js';
import type { JSX } from 'solid-js';
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
 */
export function Dialog(props: DialogProps) {
  return (
    <KDialog.Root open={props.open} onOpenChange={props.onOpenChange}>
      <KDialog.Portal>
        <KDialog.Overlay class="zylem-dialog-overlay" />
        <div class="zylem-dialog-positioner">
          <KDialog.Content class="zylem-dialog-content">
            <div class="zylem-dialog-header">
              <Show when={props.title}>
                <KDialog.Title class="zylem-dialog-title">
                  {props.title}
                </KDialog.Title>
              </Show>
              <WindowControls onClose={() => props.onOpenChange?.(false)} />
            </div>
            <KDialog.Description as="div" class="zylem-dialog-body">
              {props.children}
            </KDialog.Description>
            <Show when={props.footer}>
              <div class="zylem-dialog-footer">{props.footer}</div>
            </Show>
          </KDialog.Content>
        </div>
      </KDialog.Portal>
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
