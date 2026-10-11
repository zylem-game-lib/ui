import { createUniqueId, Show, splitProps } from 'solid-js';
import type { JSX } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { Heading, type HeadingLevel } from '../shared/Heading';

export interface SidebarProps extends JSX.HTMLAttributes<HTMLElement> {
  children?: JSX.Element;
  /**
   * Landmark element: `aside` (the default) for a rail beside the main
   * content, `nav` when the rail is the page's navigation.
   */
  as?: 'aside' | 'nav';
  /**
   * Drop the glass surface and trailing border so the list sits inside a
   * panel that already draws them (an inspector rail, a dialog column).
   * It also stops filling its container, so it stacks with siblings.
   */
  borderless?: boolean;
}

/**
 * HyperGlass sidebar: glass navigation rail. Compose with `SidebarSection`
 * and `SidebarItem`.
 */
export function Sidebar(props: SidebarProps) {
  const [local, rest] = splitProps(props, ['children', 'class', 'borderless', 'as']);
  return (
    <Dynamic
      component={local.as ?? 'aside'}
      class={['sidebar', 'zylem-scroll', local.borderless ? 'sidebar--borderless' : '', local.class ?? '']
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {local.children}
    </Dynamic>
  );
}

export interface SidebarSectionProps {
  title?: JSX.Element;
  /** Heading level of the title (default 2). */
  headingLevel?: HeadingLevel;
  children?: JSX.Element;
  class?: string;
}

/** A titled group of items; the title names the group for assistive tech. */
export function SidebarSection(props: SidebarSectionProps) {
  const titleId = createUniqueId();
  return (
    <div
      class={
        props.class ? `sidebar-section ${props.class}` : 'sidebar-section'
      }
      role={props.title ? 'group' : undefined}
      aria-labelledby={props.title ? titleId : undefined}
    >
      <Show when={props.title}>
        <Heading level={props.headingLevel ?? 2} id={titleId} class="sidebar-section-title">
          {props.title}
        </Heading>
      </Show>
      {props.children}
    </div>
  );
}

export interface SidebarItemProps
  extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The current item; exposed as `aria-current="true"`. */
  active?: boolean;
  children?: JSX.Element;
}

export function SidebarItem(props: SidebarItemProps) {
  const [local, rest] = splitProps(props, ['active', 'children', 'class']);
  return (
    <button
      type="button"
      class={local.class ? `sidebar-item ${local.class}` : 'sidebar-item'}
      data-active={local.active ? '' : undefined}
      aria-current={local.active ? 'true' : undefined}
      {...rest}
    >
      {local.children}
    </button>
  );
}

Sidebar.Section = SidebarSection;
Sidebar.Item = SidebarItem;

/** Class hook for anchor-based sidebar items (router links). */
export const sidebarItemClass = 'sidebar-item';
