export interface BuildLabelModel {
  /** Host app version, used when `packages` does not resolve a preferred entry. */
  version?: string;
  /** Resolved `@zylem/*` package versions collected at build time. */
  packages?: Record<string, string>;
}

const PREFERRED_PACKAGES = [
  '@zylem/game-lib',
  '@zylem/editor',
  '@zylem/ui',
  '@zylem/behaviors',
  '@zylem/runtime',
] as const;

/**
 * Pick the version to show as the HUD build number.
 *
 * Demo/showcase apps prefer the engine (`@zylem/game-lib`) so the overlay
 * reports the stack being exercised rather than the host app's own version.
 */
export function resolveBuildVersion(model: BuildLabelModel): string {
  const packages = model.packages;
  if (packages) {
    for (const name of PREFERRED_PACKAGES) {
      const version = packages[name];
      if (version) return version;
    }
    const first = Object.values(packages)[0];
    if (first) return first;
  }
  return model.version ?? '';
}

/** Display form used in the HUD: the version prefixed with `v`. */
export function formatBuildLabel(version: string): string {
  if (!version) return '';
  return version.startsWith('v') ? version : `v${version}`;
}

/** Hover text listing every collected package. */
export function packagesTitle(packages: Record<string, string> | undefined): string | undefined {
  if (!packages || Object.keys(packages).length === 0) return undefined;
  return Object.entries(packages)
    .map(([name, version]) => `${name} ${version}`)
    .join('\n');
}
