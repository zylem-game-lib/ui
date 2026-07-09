import { Tabs as KTabs } from '@kobalte/core';
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

export function TabsTrigger(props: {
  value: string;
  children: JSX.Element;
  disabled?: boolean;
  class?: string;
}) {
  return (
    <KTabs.Trigger
      class={
        props.class ? `zylem-tabs-trigger ${props.class}` : 'zylem-tabs-trigger'
      }
      value={props.value}
      disabled={props.disabled}
    >
      {props.children}
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
