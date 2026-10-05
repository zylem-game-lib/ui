import { render } from '@solidjs/testing-library';
import { afterEach, describe, expect, it } from 'vitest';
import {
  CAMERA_ICONS,
  cameraIconNodes,
  Perspective,
} from '../src/icons';

afterEach(() => {
  document.body.innerHTML = '';
});

describe('camera icons', () => {
  it('renders an svg for every named camera icon', () => {
    expect(CAMERA_ICONS).toHaveLength(6);
    for (const item of CAMERA_ICONS) {
      const { container, unmount } = render(() => <item.Icon />);
      const svg = container.querySelector(`svg.zylem-icon.zylem-icon-${item.name}`);
      expect(svg, item.name).not.toBeNull();
      expect(svg?.getAttribute('viewBox')).toBe('0 0 24 24');
      expect(svg?.getAttribute('stroke')).toBe('currentColor');
      expect(svg?.children.length, item.name).toBe(cameraIconNodes[item.name].length);
      unmount();
    }
  });

  it('honors size and color props', () => {
    const { container } = render(() => <Perspective size={32} color="#61A6E8" />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('32');
    expect(svg?.getAttribute('height')).toBe('32');
    expect(svg?.getAttribute('stroke')).toBe('#61A6E8');
  });
});
