import type { Plugin } from 'vite';
import { collectZylemPackageVersions } from './collect-zylem-versions.ts';

export { collectZylemPackageVersions } from './collect-zylem-versions.ts';

export const VIRTUAL_ZYLEM_VERSIONS_ID = 'virtual:zylem-versions';
const RESOLVED_VIRTUAL_ZYLEM_VERSIONS_ID = `\0${VIRTUAL_ZYLEM_VERSIONS_ID}`;

/**
 * Vite plugin that injects a `virtual:zylem-versions` module containing
 * every resolved `@zylem/*` package version in `rootPkgDir`'s dependency
 * graph. Demo/showcase apps mount that map as the top-right build HUD.
 */
export function zylemVersionsPlugin(rootPkgDir: string): Plugin {
  const versions = collectZylemPackageVersions(rootPkgDir);

  return {
    name: 'zylem-versions',
    resolveId(id) {
      if (id === VIRTUAL_ZYLEM_VERSIONS_ID) {
        return RESOLVED_VIRTUAL_ZYLEM_VERSIONS_ID;
      }
    },
    load(id) {
      if (id === RESOLVED_VIRTUAL_ZYLEM_VERSIONS_ID) {
        return `export const ZYLEM_PACKAGE_VERSIONS = ${JSON.stringify(versions)};`;
      }
    },
  };
}
