import { Tabs as KTabs } from '@kobalte/core';
import X from 'lucide-solid/icons/x';
import { Show } from 'solid-js';
import type { JSX } from 'solid-js';

export interface TabsProps {
  value?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  class?: string;
  children: JSX.Element;
  'aria-label'?: string;
}

/**
 * HyperGlass tabs: stack-card style tab strip over a glass content panel.
 * Compose with `Tabs.List`, `Tabs.Trigger`, and `Tabs.Content`.
 */
export function Tabs(props: TabsProps) {
  return (
    <KTabs.Root
      class={props.class ? `zylem-tabs-root ${props.class}` : 'zylem-tabs-root'}
      value={props.value}
      onChange={props.onChange}
      defaultValue={props.defaultValue}
      aria-label={props['aria-label']}
    >
      {props.children}
    </KTabs.Root>
  );
}

export function TabsList(props: { children: JSX.Element; class?: string }) {
  return (
    <KTabs.List
      class={props.class ? `zylem-tabs-list ${props.class}` : 'zylem-tabs-list'}
    >
      {props.children}
    </KTabs.List>
  );
}

export interface TabsTriggerProps {
  value: string;
  children: JSX.Element;
  disabled?: boolean;
  class?: string;
  /**
   * Document-style tabs: Delete (Backspace on a Mac keyboard) closes the
   * focused tab, and a close affordance after the label does the same for the
   * pointer. Closing does not select the tab.
   */
  onClose?: () => void;
  /** Tooltip of the close affordance; defaults to `Close tab`. */
  closeLabel?: string;
  /** Unsaved-changes marker before the close affordance. */
  dirty?: boolean;
}

export function TabsTrigger(props: TabsTriggerProps) {
  const close = (event: Event) => {
    // Stopped so a page-level Delete shortcut does not also act on the key.
    event.stopPropagation();
    event.preventDefault();
    props.onClose?.();
  };
  const closeFromKeyboard = (event: KeyboardEvent & { currentTarget: HTMLButtonElement }) => {
    if (!props.onClose || (event.key !== 'Delete' && event.key !== 'Backspace')) return;
    const trigger = event.currentTarget;
    const list = trigger.closest('[role="tablist"]');
    close(event);
    // A closed tab usually leaves the document, and focus with it.
    queueMicrotask(() => {
      if (trigger.isConnected) return;
      list?.querySelector<HTMLElement>('[role="tab"][aria-selected="true"]')?.focus();
    });
  };
  return (
    <KTabs.Trigger
      class={
        props.class ? `zylem-tabs-trigger ${props.class}` : 'zylem-tabs-trigger'
      }
      value={props.value}
      disabled={props.disabled}
      aria-keyshortcuts={props.onClose ? 'Delete Backspace' : undefined}
      onKeyDown={closeFromKeyboard}
    >
      <span class="zylem-tabs-trigger-label">{props.children}</span>
      <Show when={props.dirty}>
        <span class="zylem-tabs-dirty" aria-hidden="true" title="Unsaved changes" />
        <span class="zylem-visually-hidden">(unsaved changes)</span>
      </Show>
      <Show when={props.onClose}>
        {/* Pointer only: a button may not nest in the trigger button, and the key covers it. */}
        <span
          class="zylem-tabs-close"
          aria-hidden="true"
          title={props.closeLabel ?? 'Close tab'}
          onClick={close}
          onPointerDown={(event) => event.stopPropagation()}
        >
          <X />
        </span>
      </Show>
    </KTabs.Trigger>
  );
}

export function TabsContent(props: {
  value: string;
  children: JSX.Element;
  class?: string;
}) {
  return (
    <KTabs.Content
      class={
        props.class ? `zylem-tabs-content ${props.class}` : 'zylem-tabs-content'
      }
      value={props.value}
    >
      {props.children}
    </KTabs.Content>
  );
}

Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;
