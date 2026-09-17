import { render } from '@solidjs/testing-library';
import { afterEach, describe, expect, it } from 'vitest';
import { BuildLabel } from '../src/components/BuildLabel/BuildLabel';
import {
  BUILD_LABEL_ID,
  mountBuildLabel,
} from '../src/components/BuildLabel/mount-build-label';

afterEach(() => {
  document.getElementById(BUILD_LABEL_ID)?.remove();
  document.getElementById('zylem-build-label-styles')?.remove();
});

describe('BuildLabel', () => {
  it('renders the resolved build number', () => {
    const { container } = render(() => (
      <BuildLabel
        packages={{ '@zylem/game-lib': '0.8.8', '@zylem/ui': '0.8.1' }}
      />
    ));

    const label = container.querySelector(`#${BUILD_LABEL_ID}`);
    expect(label?.textContent).toBe('v0.8.8');
    expect(label?.getAttribute('title')).toContain('@zylem/game-lib 0.8.8');
  });
});

describe('mountBuildLabel', () => {
  it('appends a HUD to the document body', () => {
    const el = mountBuildLabel({ version: '1.2.3' });

    expect(el.id).toBe(BUILD_LABEL_ID);
    expect(el.textContent).toBe('v1.2.3');
    expect(document.body.contains(el)).toBe(true);
  });

  it('replaces a previous mount instead of stacking', () => {
    mountBuildLabel({ version: '1.0.0' });
    mountBuildLabel({ version: '2.0.0' });

    expect(document.querySelectorAll(`#${BUILD_LABEL_ID}`)).toHaveLength(1);
    expect(document.getElementById(BUILD_LABEL_ID)?.textContent).toBe('v2.0.0');
  });
});
