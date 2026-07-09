import { Accordion as KAccordion } from '@kobalte/core';
import { For } from 'solid-js';
import type { JSX } from 'solid-js';

export interface AccordionItemConfig {
  id: string;
  title: JSX.Element;
  content: () => JSX.Element;
}

export interface AccordionProps {
  items: AccordionItemConfig[];
  multiple?: boolean;
  collapsible?: boolean;
  value?: string[];
  onChange?: (value: string[]) => void;
  defaultValue?: string[];
  class?: string;
  /** Extra class applied to each content region (e.g. scroll helpers). */
  contentClass?: string;
}

/**
 * HyperGlass accordion: stack of glossy card headers over glass content
 * regions. Uses the same `.zylem-accordion` / `.accordion-*` classes as the
 * editor markup, so both stay visually in sync.
 */
export function Accordion(props: AccordionProps) {
  return (
    <KAccordion.Root
      class={props.class ? `zylem-accordion ${props.class}` : 'zylem-accordion'}
      multiple={props.multiple}
      collapsible={props.collapsible ?? true}
      value={props.value}
      onChange={props.onChange}
      defaultValue={props.defaultValue}
    >
      <For each={props.items}>
        {(item) => (
          <KAccordion.Item value={item.id} class="accordion-item">
            <KAccordion.Header class="accordion-header">
              <KAccordion.Trigger class="accordion-trigger">
                {item.title}
              </KAccordion.Trigger>
            </KAccordion.Header>
            <KAccordion.Content
              class={
                props.contentClass
                  ? `accordion-content ${props.contentClass}`
                  : 'accordion-content'
              }
            >
              {item.content()}
            </KAccordion.Content>
          </KAccordion.Item>
        )}
      </For>
    </KAccordion.Root>
  );
}
