import { Accordion as KAccordion } from '@kobalte/core';
import { For } from 'solid-js';
import type { JSX } from 'solid-js';
import { headingTag, type HeadingLevel } from '../shared/Heading';

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
  /** Heading level of each section header (default 3). */
  headingLevel?: HeadingLevel;
  /** Extra class applied to each content region (e.g. scroll helpers). */
  contentClass?: string;
  /**
   * Inspector layout: sections take their natural height and the accordion
   * grows with them, so the surrounding panel scrolls as a whole. Without it
   * the accordion fills its container and expanded sections share the space
   * and scroll individually (the editor sidebar behaviour).
   */
  stack?: boolean;
}

/**
 * HyperGlass accordion: stack of glossy card headers over glass content
 * regions. Uses the same `.zylem-accordion` / `.accordion-*` classes as the
 * editor markup, so both stay visually in sync.
 */
export function Accordion(props: AccordionProps) {
  return (
    <KAccordion.Root
      class={['zylem-accordion', props.stack ? 'zylem-accordion--stack' : '', props.class ?? '']
        .filter(Boolean)
        .join(' ')}
      multiple={props.multiple}
      collapsible={props.collapsible ?? true}
      value={props.value}
      onChange={props.onChange}
      defaultValue={props.defaultValue}
    >
      <For each={props.items}>
        {(item) => (
          <KAccordion.Item value={item.id} class="accordion-item">
            <KAccordion.Header as={headingTag(props.headingLevel ?? 3)} class="accordion-header">
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
