import { Show, splitProps } from 'solid-js';
import type { JSX } from 'solid-js';

export interface SidebarProps extends JSX.HTMLAttributes<HTMLElement> {
  children?: JSX.Element;
}

/**
 * HyperGlass sidebar: glass navigation rail. Compose with `SidebarSection`
 * and `SidebarItem`.
 */
export function Sidebar(props: SidebarProps) {
  const [local, rest] = splitProps(props, ['children', 'class']);
  return (
    <aside
      class={local.class ? `sidebar zylem-scroll ${local.class}` : 'sidebar zylem-scroll'}
      {...rest}
    >
      {local.children}
    </aside>
  );
}

export interface SidebarSectionProps {
  title?: JSX.Element;
  children?: JSX.Element;
  class?: string;
}

export function SidebarSection(props: SidebarSectionProps) {
  return (
    <div
      class={
        props.class ? `sidebar-section ${props.class}` : 'sidebar-section'
      }
    >
      <Show when={props.title}>
        <div class="sidebar-section-title">{props.title}</div>
      </Show>
      {props.children}
    </div>
  );
}

export interface SidebarItemProps
  extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
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
