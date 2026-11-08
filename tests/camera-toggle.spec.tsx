import { render } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { CAMERA_TOGGLE_IDS, CameraToggle, type CameraToggleId } from '../src/components/CameraToggle/CameraToggle';
import { LayerProvider } from '../src/layers';

afterEach(() => {
  document.body.innerHTML = '';
});

const LABELS: Record<CameraToggleId, string> = {
  game: 'Game camera',
  perspective: 'Perspective',
  'iso-left-top': 'Iso left/top',
  top: 'Top',
  'iso-right-top': 'Iso right/top',
  left: 'Left',
  free: 'Free camera',
  right: 'Right',
  'iso-left-bottom': 'Iso left/bottom',
  bottom: 'Bottom',
  'iso-right-bottom': 'Iso right/bottom',
};

function openCube(): void {
  (document.querySelector('.zylem-menu-button__chevron') as HTMLElement).click();
}

describe('CameraToggle', () => {
  it('opens a cube with every camera view', () => {
    render(() => (
      <LayerProvider>
        <CameraToggle value="game" onChange={() => {}} />
      </LayerProvider>
    ));

    openCube();
    const panel = document.querySelector('.zylem-menu-button__compass');
    expect(panel).not.toBeNull();
    for (const id of CAMERA_TOGGLE_IDS) {
      expect(panel?.querySelector(`[aria-label="${LABELS[id]}"]`)).not.toBeNull();
    }
    expect(CAMERA_TOGGLE_IDS).toHaveLength(11);
  });

  it('selects a view and closes the cube', () => {
    const onChange = vi.fn();
    const [value, setValue] = createSignal<CameraToggleId>('game');

    render(() => (
      <LayerProvider>
        <CameraToggle
          value={value()}
          onChange={(id) => {
            onChange(id);
            setValue(id);
          }}
        />
      </LayerProvider>
    ));

    openCube();
    const right = document.querySelector(
      '.zylem-menu-button__panel button[aria-label="Right"]',
    ) as HTMLElement;
    expect(right.hasAttribute('data-selected')).toBe(false);

    right.click();

    expect(onChange).toHaveBeenCalledWith('right');
    expect(document.querySelector('.zylem-menu-button__panel')).toBeNull();
    expect(document.querySelector('.zylem-menu-button__face')?.getAttribute('aria-label')).toBe(
      'Right',
    );
  });

  it('gives the face its own action and leaves the cube to the chevron', () => {
    const onAction = vi.fn();
    render(() => (
      <LayerProvider>
        <CameraToggle value="free" on onAction={onAction} onChange={() => {}} />
      </LayerProvider>
    ));

    const face = document.querySelector('.zylem-menu-button__face') as HTMLElement;
    expect(face.hasAttribute('data-on')).toBe(true);
    face.click();
    expect(onAction).toHaveBeenCalledTimes(1);
    expect(document.querySelector('.zylem-menu-button__panel')).toBeNull();
  });
});
