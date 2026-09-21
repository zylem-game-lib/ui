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
   * Document-style tabs: shows a close affordance after the label. It is a
   * `role="button"` span (a button may not nest in the trigger button) and
   * closing does not select the tab.
   */
  onClose?: () => void;
  /** Accessible name of the close affordance; defaults to `Close tab`. */
  closeLabel?: string;
  /** Unsaved-changes marker before the close affordance. */
  dirty?: boolean;
}

export function TabsTrigger(props: TabsTriggerProps) {
  const close = (event: Event) => {
    event.stopPropagation();
    event.preventDefault();
    props.onClose?.();
  };
  return (
    <KTabs.Trigger
      class={
        props.class ? `zylem-tabs-trigger ${props.class}` : 'zylem-tabs-trigger'
      }
      value={props.value}
      disabled={props.disabled}
    >
      <span class="zylem-tabs-trigger-label">{props.children}</span>
      <Show when={props.dirty}>
        <span class="zylem-tabs-dirty" aria-label="Unsaved changes" title="Unsaved changes" />
      </Show>
      <Show when={props.onClose}>
        <span
          class="zylem-tabs-close"
          role="button"
          tabIndex={0}
          aria-label={props.closeLabel ?? 'Close tab'}
          title={props.closeLabel ?? 'Close tab'}
          onClick={close}
          onPointerDown={(event) => event.stopPropagation()}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') close(event);
          }}
        >
          <X aria-hidden="true" />
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
