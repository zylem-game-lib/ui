import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

/**
 * Checker pattern shared by every "transparent" surface in the art tools:
 * the pixel grid, the transparent palette swatch, and empty frame thumbs.
 * Cell size comes from `--zylem-pixel-grid-cell` so hosts can scale it.
 */
export const checkerBackground = `repeating-conic-gradient(${vars.art.checkerLight} 0 25%, ${vars.art.checkerDark} 0 50%) 0 0 / calc(var(--zylem-pixel-grid-cell, 8px) * 2) calc(var(--zylem-pixel-grid-cell, 8px) * 2)`;

globalStyle('.zylem-pixel-grid', {
  boxSizing: 'content-box',
  position: 'relative',
  flex: 'none',
  background: checkerBackground,
  border: `1px solid ${vars.art.canvasBorder}`,
  imageRendering: 'pixelated',
  overflow: 'hidden',
});

// Overlays fill the surface; a consumer canvas keeps its own pixel size and
// stretches to the zoomed box without smoothing.
globalStyle('.zylem-pixel-grid > canvas, .zylem-pixel-grid > img, .zylem-pixel-grid > svg', {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  display: 'block',
  imageRendering: 'pixelated',
});
