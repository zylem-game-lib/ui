import { cleanup, fireEvent, render, within } from '@solidjs/testing-library';
import { afterEach, describe, expect, it } from 'vitest';
import * as customExports from '../src/icons';
import { filterIcons, ICON_CATALOG } from '../showcase/src/icon-catalog';
import { Icons } from '../showcase/src/sections/Icons';
import { USED_LUCIDE_ICONS } from '../showcase/src/used-icons';

afterEach(cleanup);

describe('showcase icon catalog', () => {
  it('covers custom icons, all camera views, Dock and the used Lucide import set without duplicate IDs', () => {
    expect(new Set(ICON_CATALOG.map((item) => item.id)).size).toBe(ICON_CATALOG.length);
    expect(filterIcons('', 'Genres')).toHaveLength(108);
    expect(filterIcons('', 'Behaviors')).toHaveLength(256);
    expect(filterIcons('', 'Camera')).toHaveLength(14);
    expect(filterIcons('', 'Interface').map((item) => item.id)).toEqual(['dock']);
    expect(filterIcons('', 'Lucide')).toHaveLength(USED_LUCIDE_ICONS.length);
    for (const item of ICON_CATALOG.filter((entry) => entry.source === '@zylem/ui/icons')) {
      const exportName = /\{ (\w+) \}/.exec(item.importCode)![1];
      expect(customExports[exportName as keyof typeof customExports], item.id).toBe(item.Icon);
    }
  });

  it('searches source IDs, aliases and multi-word names across the entire collection', () => {
    expect(filterIcons('  CREATEFOLLOWTARGET  ', 'All').map((item) => item.id)).toEqual(['behaviors/camera-follow-target']);
    expect(filterIcons('action/platform', 'Genres').map((item) => item.id)).toContain('genres/platform');
    expect(filterIcons('guard timed', 'Behaviors').map((item) => item.id)).toEqual(['behaviors/timed-perfect-guard']);
    expect(filterIcons('wall-kick', 'Lucide')).toEqual([]);
  });

  it('paginates, resets the page on filters, resizes previews and handles empty results', async () => {
    const screen = render(() => <Icons />);
    const table = screen.getByRole('table');
    expect(within(table).getAllByRole('row')).toHaveLength(51);
    expect(screen.getByRole('button', { name: 'Previous' }).hasAttribute('disabled')).toBe(true);
    await fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText(/Page 2 of/)).toBeTruthy();
    await fireEvent.input(screen.getByRole('searchbox', { name: 'Search icons' }), { target: { value: 'createFollowTarget' } });
    expect(screen.getByText('Page 1 of 1')).toBeTruthy();
    expect(within(table).getAllByRole('row')).toHaveLength(2);
    expect(within(table).getByText('behaviors/camera-follow-target')).toBeTruthy();
    await fireEvent.change(screen.getByRole('combobox', { name: 'Preview size' }), { target: { value: '32' } });
    expect(table.querySelector('svg')?.getAttribute('width')).toBe('32');
    expect((table as HTMLElement).style.getPropertyValue('--icon-preview-size')).toBe('32px');
    await fireEvent.change(screen.getByRole('combobox', { name: 'Category' }), { target: { value: 'Lucide' } });
    expect(within(table).getByText('No icons match these filters.')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Next' }).hasAttribute('disabled')).toBe(true);
    await fireEvent.click(screen.getByRole('button', { name: 'Reset filters' }));
    expect(within(table).getAllByRole('row')).toHaveLength(51);
    // Last page is reachable and does not leave an enabled Next control.
    for (let page = 1; page < Math.ceil(ICON_CATALOG.length / 50); page++) {
      await fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    }
    expect(screen.getByRole('button', { name: 'Next' }).hasAttribute('disabled')).toBe(true);
    expect(within(table).getAllByRole('row')).toHaveLength((ICON_CATALOG.length % 50 || 50) + 1);
  });
});
