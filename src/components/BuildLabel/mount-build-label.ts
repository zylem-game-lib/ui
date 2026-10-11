import {
  formatBuildLabel,
  packagesTitle,
  resolveBuildVersion,
  type BuildLabelModel,
} from './resolve-build-version';

export type { BuildLabelModel };

export const BUILD_LABEL_ID = 'zylem-build-label';
export const BUILD_LABEL_STYLE_ID = 'zylem-build-label-styles';

/**
 * Fallback rules so the HUD still paints in apps that do not import
 * `@zylem/ui/styles.css` (arena). Themed apps get the vanilla-extract class
 * as well; both targets use the same selectors so they do not fight.
 */
const FALLBACK_CSS = `
#${BUILD_LABEL_ID} {
  position: fixed;
  top: 10px;
  right: 12px;
  z-index: var(--zylem-layer-tooltip, 4000);
  pointer-events: auto;
  padding: 2px 8px;
  border-radius: 5px;
  border: 1px solid rgba(97, 166, 232, 0.35);
  background: linear-gradient(180deg, rgba(60, 80, 105, 0.55), rgba(26, 31, 39, 0.78));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.22), 0 2px 8px rgba(0, 0, 0, 0.35);
  color: #c5d0da;
  font-family: var(--zylem-font-family, 'Exo 2', sans-serif);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  line-height: 1.4;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.55);
  user-select: none;
  white-space: nowrap;
}
`;

export function ensureFallbackStyles(): void {
  if (typeof document === 'undefined') return;
  if (document.getElementById(BUILD_LABEL_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = BUILD_LABEL_STYLE_ID;
  style.textContent = FALLBACK_CSS;
  document.head.append(style);
}

/**
 * Mount the build-number HUD on `parent` (defaults to `document.body`).
 * Replaces a previous mount with the same id.
 */
export function mountBuildLabel(
  model: BuildLabelModel,
  parent: ParentNode = document.body
): HTMLElement {
  ensureFallbackStyles();
  parent.querySelector(`#${BUILD_LABEL_ID}`)?.remove();

  const el = document.createElement('div');
  el.id = BUILD_LABEL_ID;
  el.className = 'zylem-build-label';
  el.textContent = formatBuildLabel(resolveBuildVersion(model));
  const title = packagesTitle(model.packages);
  if (title) el.title = title;

  if (model.packages) {
    (globalThis as { __ZYLEM_PACKAGE_VERSIONS__?: Record<string, string> }).__ZYLEM_PACKAGE_VERSIONS__ =
      model.packages;
  }

  parent.append(el);
  return el;
}
