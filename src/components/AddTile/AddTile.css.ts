import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

/** Swatch / tile edge length shared by the palette and add tiles. */
export const TILE_SIZE = '26px';
/** Frame thumb edge length shared by the strip and the tall add tile. */
export const FRAME_SIZE = '56px';

globalStyle('.zylem-add-tile', {
  boxSizing: 'border-box',
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.spacing.xs,
  flex: 'none',
  padding: 0,
  margin: 0,
  cursor: 'pointer',
  userSelect: 'none',
  color: vars.colors.textSecondary,
  fontFamily: vars.typography.fontFamily,
  borderRadius: vars.radii.control,
  border: '1px dashed rgba(150, 210, 255, 0.55)',
  background: 'rgba(97, 166, 232, 0.06)',
  transition: `color ${vars.motion.fast} ${vars.motion.easeOut}, border-color ${vars.motion.fast} ${vars.motion.easeOut}, background ${vars.motion.fast} ${vars.motion.easeOut}, box-shadow ${vars.motion.fast} ${vars.motion.easeOut}`,
});

globalStyle('.zylem-add-tile[data-variant="square"]', {
  width: TILE_SIZE,
  height: TILE_SIZE,
});

globalStyle('.zylem-add-tile[data-variant="tall"]', {
  width: FRAME_SIZE,
  height: `calc(${FRAME_SIZE} + 18px)`,
});

// Stands in for a card: fills its grid cell and rounds like one.
globalStyle('.zylem-add-tile[data-variant="fill"]', {
  width: '100%',
  height: '100%',
  minHeight: '110px',
  borderRadius: vars.radii.card,
});

globalStyle('.zylem-add-tile:hover:not([disabled])', {
  color: '#E8F4FF',
  borderColor: 'rgba(178, 219, 255, 0.9)',
  background: 'rgba(97, 166, 232, 0.16)',
  boxShadow: vars.effects.glowPrimary,
});

globalStyle('.zylem-add-tile:active:not([disabled])', {
  background: 'rgba(97, 166, 232, 0.24)',
});

globalStyle('.zylem-add-tile:focus-visible', {
  outline: 'none',
  boxShadow: vars.effects.focusRing,
});

globalStyle('.zylem-add-tile[disabled]', {
  opacity: 0.45,
  cursor: 'not-allowed',
});

globalStyle('.zylem-add-tile-icon', {
  display: 'block',
  width: '16px',
  height: '16px',
  stroke: 'currentColor',
  flex: 'none',
});

globalStyle('.zylem-add-tile[data-variant="tall"] .zylem-add-tile-icon', {
  width: '20px',
  height: '20px',
});

globalStyle('.zylem-add-tile[data-variant="fill"] .zylem-add-tile-icon', {
  width: '24px',
  height: '24px',
});

globalStyle('.zylem-add-tile-label', {
  fontSize: '11px',
  fontWeight: 600,
  lineHeight: 1,
  whiteSpace: 'nowrap',
});

globalStyle('.zylem-add-tile[data-variant="fill"] .zylem-add-tile-label', {
  fontSize: '13px',
});
