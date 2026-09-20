import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

/**
 * Sprite size picker: preset row, a 1:1 stage showing the real pixel
 * footprint with edge/corner drag handles, and the optional W/H fields.
 */
globalStyle('.zylem-size-picker', {
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.md,
  fontFamily: vars.typography.fontFamily,
});

globalStyle('.zylem-size-picker-presets', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.spacing.sm,
});

globalStyle('.zylem-size-picker-presets .zylem-button', {
  minWidth: '40px',
  fontVariantNumeric: 'tabular-nums',
});

globalStyle('.zylem-size-picker-stage', {
  boxSizing: 'border-box',
  position: 'relative',
  flex: 'none',
  padding: '8px',
  borderRadius: vars.radii.control,
  border: '1px solid rgba(97, 166, 232, 0.28)',
  background: vars.material.fieldGlass,
  boxShadow: vars.effects.shadowInset,
  overflow: 'hidden',
});

// Sized to the sprite at 1:1; the grid's own 1px border sits just outside.
globalStyle('.zylem-size-picker-frame', {
  position: 'relative',
  boxSizing: 'content-box',
});

// Handles: slim glass bars along the right and bottom edges plus a corner
// jewel. Hit areas straddle the edge so small sprites are still grabbable.
globalStyle('.zylem-size-picker-handle', {
  position: 'absolute',
  boxSizing: 'border-box',
  borderRadius: '999px',
  border: '1px solid rgba(178, 219, 255, 0.85)',
  background:
    'linear-gradient(180deg, rgba(240, 250, 255, 0.96), rgba(140, 190, 235, 0.92))',
  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.75), 0 1px 4px rgba(0,0,0,0.5), ${vars.effects.glowPrimary}`,
  touchAction: 'none',
  transition: `box-shadow ${vars.motion.fast} ${vars.motion.easeOut}, transform ${vars.motion.fast} ${vars.motion.easeOut}`,
});

globalStyle('.zylem-size-picker-handle:hover, .zylem-size-picker-handle[data-dragging]', {
  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.75), 0 1px 4px rgba(0,0,0,0.5), ${vars.effects.focusRing}`,
});

globalStyle('.zylem-size-picker-handle[data-edge="right"]', {
  top: '50%',
  right: '-6px',
  width: '8px',
  height: 'min(28px, 60%)',
  transform: 'translateY(-50%)',
  cursor: 'ew-resize',
});

globalStyle('.zylem-size-picker-handle[data-edge="bottom"]', {
  left: '50%',
  bottom: '-6px',
  width: 'min(28px, 60%)',
  height: '8px',
  transform: 'translateX(-50%)',
  cursor: 'ns-resize',
});

globalStyle('.zylem-size-picker-handle[data-edge="corner"]', {
  right: '-7px',
  bottom: '-7px',
  width: '14px',
  height: '14px',
  cursor: 'nwse-resize',
});

globalStyle('.zylem-size-picker-readout', {
  position: 'absolute',
  right: vars.spacing.sm,
  bottom: vars.spacing.xs,
  fontSize: `calc(${vars.typography.fontSize} - 2px)`,
  fontVariantNumeric: 'tabular-nums',
  color: vars.colors.primary,
  textShadow: '0 1px 1px rgba(0,0,0,0.6)',
  pointerEvents: 'none',
});

globalStyle('.zylem-size-picker-fields', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: vars.spacing.md,
});
