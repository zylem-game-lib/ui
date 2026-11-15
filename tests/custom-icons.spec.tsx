import { cleanup, render } from '@solidjs/testing-library';
import { afterEach, describe, expect, it } from 'vitest';
import {
  BEHAVIOR_ICONS,
  GENRE_ICONS,
  GenreRacing,
} from '../src/icons';

afterEach(cleanup);

const sources = import.meta.glob<string>('../src/icons/custom/svg/**/*.svg', {
  eager: true,
  query: '?raw',
  import: 'default',
});

function geometry(element: Element): unknown {
  return {
    tag: element.localName,
    attributes: Object.fromEntries([...element.attributes].map((attr) => [attr.name, attr.value])),
    children: [...element.children].map(geometry),
  };
}

describe('custom icon assets', () => {
  it('preserves the geometry of every original SVG, including nested groups and badges', () => {
    expect(GENRE_ICONS).toHaveLength(108);
    expect(BEHAVIOR_ICONS).toHaveLength(256);
    for (const entry of [...GENRE_ICONS, ...BEHAVIOR_ICONS]) {
      const source = sources[`../src/icons/custom/svg/${entry.key}.svg`];
      const original = new DOMParser().parseFromString(source, 'image/svg+xml').documentElement;
      const expected = [...original.children].filter((node) => node.localName !== 'title').map(geometry);
      const { container, unmount } = render(() => <entry.Icon />);
      const svg = container.querySelector('svg')!;
      expect(svg.getAttribute('viewBox'), entry.key).toBe('0 0 64 64');
      expect(svg.getAttribute('width'), entry.key).toBe('64');
      expect(svg.getAttribute('stroke'), entry.key).toBe('currentColor');
      expect([...svg.children].map(geometry), entry.key).toEqual(expected);
      expect(svg.querySelector('g')?.namespaceURI ?? svg.namespaceURI).toBe('http://www.w3.org/2000/svg');
      unmount();
    }
  });

  it('honors size, paint, accessibility and absolute stroke width on the 64-unit grid', () => {
    const { container } = render(() => (
      <GenreRacing size={32} color="#61a6e8" strokeWidth={2} absoluteStrokeWidth aria-hidden="false" aria-label="Racing" />
    ));
    const svg = container.querySelector('svg')!;
    expect(svg.getAttribute('width')).toBe('32');
    expect(svg.getAttribute('stroke')).toBe('#61a6e8');
    expect(svg.getAttribute('color')).toBe('#61a6e8');
    expect(svg.getAttribute('stroke-width')).toBe('4');
    expect(svg.getAttribute('aria-hidden')).toBe('false');
    expect(svg.getAttribute('aria-label')).toBe('Racing');
    expect(svg.classList.contains('zylem-icon')).toBe(false);
  });
});
