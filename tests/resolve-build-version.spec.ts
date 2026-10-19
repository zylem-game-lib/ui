import { describe, expect, it } from 'vitest';
import {
  formatBuildLabel,
  packagesTitle,
  resolveBuildVersion,
} from '../src/components/BuildLabel/resolve-build-version';

describe('resolveBuildVersion', () => {
  it('prefers @zylem/game-lib when packages are provided', () => {
    expect(
      resolveBuildVersion({
        version: '0.1.0',
        packages: {
          '@zylem/ui': '0.8.1',
          '@zylem/game-lib': '0.8.8',
          '@zylem/editor': '0.8.7',
        },
      })
    ).toBe('0.8.8');
  });

  it('shows the named package when prefer is set', () => {
    expect(
      resolveBuildVersion({
        prefer: '@zylem/editor',
        packages: {
          '@zylem/ui': '0.8.1',
          '@zylem/game-lib': '0.8.8',
          '@zylem/editor': '0.9.9',
        },
      })
    ).toBe('0.9.9');
  });

  it('falls through the preferred list when game-lib is absent', () => {
    expect(
      resolveBuildVersion({
        packages: {
          '@zylem/ui': '0.8.1',
          '@zylem/editor': '0.8.7',
        },
      })
    ).toBe('0.8.7');
  });

  it('uses the host version when no packages resolve', () => {
    expect(resolveBuildVersion({ version: '0.3.0' })).toBe('0.3.0');
  });
});

describe('formatBuildLabel', () => {
  it('prefixes a bare version with v', () => {
    expect(formatBuildLabel('0.8.8')).toBe('v0.8.8');
  });

  it('leaves an already-prefixed version alone', () => {
    expect(formatBuildLabel('v0.8.8')).toBe('v0.8.8');
  });
});

describe('packagesTitle', () => {
  it('joins name/version pairs for the hover tooltip', () => {
    expect(
      packagesTitle({
        '@zylem/game-lib': '0.8.8',
        '@zylem/ui': '0.8.8',
      })
    ).toBe('@zylem/game-lib 0.8.8\n@zylem/ui 0.8.8');
  });
});
