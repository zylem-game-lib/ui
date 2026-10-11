import type { JSX } from 'solid-js';
import { Dynamic } from 'solid-js/web';

/** Outline level of a component's title: `2` renders an `<h2>`. */
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

/** The element name for a level, for primitives that take an `as` tag. */
export function headingTag(level: HeadingLevel) {
  return `h${level}` as const;
}

export interface HeadingProps {
  level: HeadingLevel;
  id?: string | undefined;
  class?: string | undefined;
  title?: string | undefined;
  children: JSX.Element;
}

/**
 * An `<h1>`…`<h6>` chosen at runtime, for titles whose place in the page
 * outline is the host's call.
 */
export function Heading(props: HeadingProps) {
  return (
    <Dynamic component={headingTag(props.level)} id={props.id} class={props.class} title={props.title}>
      {props.children}
    </Dynamic>
  );
}
