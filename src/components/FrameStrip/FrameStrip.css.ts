import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../../theme.css';
import { FRAME_SIZE } from '../AddTile/AddTile.css';
import { checkerBackground } from '../PixelGrid/PixelGrid.css';
import { artCaption } from '../ToolGroup/ToolGroup.css';

globalStyle('.zylem-frame-strip', {
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.sm,
  minWidth: 0,
  fontFamily: vars.typography.fontFamily,
});

globalStyle('.zylem-frame-strip-header', {
  display: 'flex',
  alignItems: 'baseline',
  gap: vars.spacing.sm,
});

globalStyle('.zylem-frame-strip-label', artCaption);

globalStyle('.zylem-frame-strip-title', {
  fontSize: `calc(${vars.typography.fontSize} - 1px)`,
  fontWeight: 600,
  color: vars.colors.text,
});

globalStyle('.zylem-frame-strip-row', {
  display: 'flex',
  alignItems: 'flex-start',
  gap: vars.spacing.sm,
  padding: `${vars.spacing.xs} ${vars.spacing.xs} ${vars.spacing.sm}`,
  overflowX: 'auto',
  overflowY: 'hidden',
});

// Thumb: checker surface with the frame number in a glass badge beneath.
globalStyle('.zylem-frame-thumb', {
  boxSizing: 'border-box',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  flex: 'none',
  width: FRAME_SIZE,
  height: `calc(${FRAME_SIZE} + 18px)`,
  padding: 0,
  margin: 0,
  cursor: 'pointer',
  overflow: 'hidden',
  borderRadius: vars.radii.control,
  border: '1px solid rgba(150, 210, 255, 0.4)',
  background: vars.material.fieldGlass,
  boxShadow: vars.effects.shadowInset,
  color: '#E8F4FF',
  fontFamily: vars.typography.fontFamily,
  transition: `border-color ${vars.motion.fast} ${vars.motion.easeOut}, box-shadow ${vars.motion.fast} ${vars.motion.easeOut}, transform ${vars.motion.fast} ${vars.motion.easeOut}`,
});

globalStyle('.zylem-frame-thumb:hover', {
  borderColor: 'rgba(178, 219, 255, 0.8)',
  transform: 'translateY(-1px)',
  boxShadow: `${vars.effects.shadowInset}, ${vars.effects.glowPrimary}`,
});

globalStyle('.zylem-frame-thumb:focus-visible', {
  outline: 'none',
  boxShadow: `${vars.effects.shadowInset}, ${vars.effects.focusRing}`,
});

globalStyle('.zylem-frame-thumb[data-selected]', {
  borderColor: 'rgba(178, 219, 255, 0.95)',
  boxShadow: `${vars.effects.shadowInset}, 0 0 0 1px rgba(178, 219, 255, 0.6), ${vars.effects.glowPrimary}`,
});

globalStyle('.zylem-frame-thumb-surface', {
  position: 'relative',
  display: 'block',
  flex: 'none',
  width: '100%',
  aspectRatio: '1 / 1',
  vars: { '--zylem-pixel-grid-cell': '6px' },
  background: checkerBackground,
  imageRendering: 'pixelated',
});

globalStyle(
  '.zylem-frame-thumb-surface > canvas, .zylem-frame-thumb-surface > img, .zylem-frame-thumb-surface > svg',
  {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    display: 'block',
    imageRendering: 'pixelated',
  }
);

globalStyle('.zylem-frame-thumb-index', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: '1 1 auto',
  fontSize: '11px',
  fontWeight: 600,
  fontVariantNumeric: 'tabular-nums',
  lineHeight: 1,
  background: vars.material.panelHeaderGloss,
  borderTop: '1px solid rgba(150, 210, 255, 0.25)',
});

// Actions row: commands left, step arrows right, all vertically centered.
globalStyle('.zylem-frame-actions', {
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.sm,
});

globalStyle('.zylem-frame-actions .zylem-button .zylem-icon', {
  width: '14px',
  height: '14px',
  stroke: 'currentColor',
});

globalStyle('.zylem-frame-actions-spacer', {
  flex: '1 1 auto',
});

globalStyle('.zylem-frame-actions-group', {
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.spacing.xs,
});

globalStyle('.zylem-frame-actions-step', {
  width: '34px',
  padding: 0,
});
