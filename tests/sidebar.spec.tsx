import { render } from '@solidjs/testing-library';
import { afterEach, describe, expect, it } from 'vitest';
import { Sidebar, SidebarItem, SidebarSection } from '../src/components/Sidebar/Sidebar';

afterEach(() => {
  document.body.innerHTML = '';
});

describe('Sidebar', () => {
  it('renders sections and marks the active item', () => {
    const { container } = render(() => (
      <Sidebar aria-label="Files">
        <SidebarSection title="Src">
          <SidebarItem active>game.ts</SidebarItem>
          <SidebarItem>README.md</SidebarItem>
        </SidebarSection>
      </Sidebar>
    ));
    const aside = container.querySelector('aside')!;
    expect(aside.className).toBe('sidebar zylem-scroll');
    expect(aside.getAttribute('aria-label')).toBe('Files');
    expect(container.querySelector('.sidebar-section-title')!.textContent).toBe('Src');
    const items = container.querySelectorAll('.sidebar-item');
    expect(items).toHaveLength(2);
    expect(items[0].hasAttribute('data-active')).toBe(true);
    expect(items[1].hasAttribute('data-active')).toBe(false);
  });

  it('adds the borderless variant class', () => {
    const { container } = render(() => (
      <Sidebar borderless class="mine">
        <SidebarItem>Only</SidebarItem>
      </Sidebar>
    ));
    const aside = container.querySelector('aside')!;
    expect(aside.classList.contains('sidebar--borderless')).toBe(true);
    expect(aside.classList.contains('mine')).toBe(true);
    expect(aside.hasAttribute('borderless')).toBe(false);
  });
});
