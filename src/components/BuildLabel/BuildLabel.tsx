import { createMemo, onMount } from 'solid-js';
import {
  formatBuildLabel,
  packagesTitle,
  resolveBuildVersion,
  type BuildLabelModel,
} from './resolve-build-version';
import { BUILD_LABEL_ID, ensureFallbackStyles } from './mount-build-label';

export type BuildLabelProps = BuildLabelModel;

/**
 * Fixed top-right HUD showing the resolved Zylem build number.
 *
 * Demo and showcase apps mount this (or `mountBuildLabel`) so the engine
 * version is visible without opening DevTools. Creator is the exception:
 * it shows only its own version in the menu bar.
 */
export function BuildLabel(props: BuildLabelProps) {
  const label = createMemo(() => formatBuildLabel(resolveBuildVersion(props)));
  const title = createMemo(() => packagesTitle(props.packages));

  onMount(() => {
    ensureFallbackStyles();
  });

  return (
    <div
      id={BUILD_LABEL_ID}
      class="zylem-build-label"
      title={title()}
    >
      {label()}
    </div>
  );
}
