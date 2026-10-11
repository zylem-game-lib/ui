import { render } from '@solidjs/testing-library';
import { afterEach, describe, expect, it } from 'vitest';
import { Sidebar, SidebarItem, SidebarSection } from '../src/components/Sidebar/Sidebar';

afterEach(() => {
  document.body.innerHTML = '';
});

describe('Sidebar', () => {
  it('renders sections and marks the active item', () => {
    const { container, getByRole } = render(() => (
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
    expect(items[0].getAttribute('aria-current')).toBe('true');
    expect(items[1].hasAttribute('data-active')).toBe(false);
    expect(items[1].hasAttribute('aria-current')).toBe(false);
    // The title is a heading that names the section's group.
    const section = getByRole('group', { name: 'Src' });
    expect(section.querySelector('h2.sidebar-section-title')).not.toBeNull();
  });

  it('takes the heading level and lets a router set its own aria-current', () => {
    const { container } = render(() => (
      <Sidebar>
        <SidebarSection title="Controls" headingLevel={3}>
          <SidebarItem active aria-current="page">
            Buttons
          </SidebarItem>
        </SidebarSection>
      </Sidebar>
    ));
    expect(container.querySelector('h3.sidebar-section-title')!.textContent).toBe('Controls');
    expect(container.querySelector('.sidebar-item')!.getAttribute('aria-current')).toBe('page');
  });

  it('renders as navigation when asked', () => {
    const { container } = render(() => (
      <Sidebar as="nav" aria-label="Sections">
        <SidebarItem>Only</SidebarItem>
      </Sidebar>
    ));
    expect(container.querySelector('aside')).toBeNull();
    expect(container.querySelector('nav.sidebar')!.getAttribute('aria-label')).toBe('Sections');
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
