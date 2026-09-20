import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

const TRACK_HEIGHT = '18px';

globalStyle('.zylem-timeline', {
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.md,
  width: '100%',
  minWidth: 0,
  fontFamily: vars.typography.fontFamily,
});

globalStyle('.zylem-timeline-root', {
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.xxs,
  flex: '1 1 auto',
  minWidth: 0,
  userSelect: 'none',
  touchAction: 'none',
});

globalStyle('.zylem-timeline-root[data-disabled]', {
  opacity: 0.5,
});

globalStyle('.zylem-timeline-label', {
  fontSize: '11px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: vars.colors.textSecondary,
});

globalStyle('.zylem-timeline-track', {
  position: 'relative',
  height: TRACK_HEIGHT,
  width: '100%',
  borderRadius: '999px',
  border: '1px solid rgba(97, 166, 232, 0.28)',
  background: vars.material.fieldGlass,
  boxShadow: vars.effects.shadowInset,
  cursor: 'pointer',
});

globalStyle('.zylem-timeline-fill', {
  position: 'absolute',
  top: 0,
  height: '100%',
  borderRadius: '999px',
  background:
    'linear-gradient(180deg, rgba(178, 219, 255, 0.55), rgba(48, 137, 220, 0.8))',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)',
});

globalStyle('.zylem-timeline-markers, .zylem-timeline-keyframes', {
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
});

// Interval dots: small, dim, centered on the rail.
globalStyle('.zylem-timeline-tick', {
  position: 'absolute',
  top: '50%',
  width: '4px',
  height: '4px',
  marginLeft: '-2px',
  borderRadius: '999px',
  background: 'rgba(205, 232, 255, 0.55)',
  boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.35)',
  transform: 'translateY(-50%)',
});

// Keyframes: rotated squares that catch the pointer over the rail.
globalStyle('.zylem-timeline-keyframe', {
  position: 'absolute',
  top: '50%',
  width: '10px',
  height: '10px',
  padding: 0,
  margin: '0 0 0 -5px',
  cursor: 'pointer',
  pointerEvents: 'auto',
  border: '1px solid rgba(255, 255, 255, 0.7)',
  borderRadius: '2px',
  background:
    'linear-gradient(135deg, rgba(255, 244, 200, 0.98), rgba(240, 180, 60, 0.95))',
  boxShadow: '0 1px 3px rgba(0,0,0,0.55)',
  transform: 'translateY(-50%) rotate(45deg)',
  transition: `box-shadow ${vars.motion.fast} ${vars.motion.easeOut}, filter ${vars.motion.fast} ${vars.motion.easeOut}`,
});

globalStyle('.zylem-timeline-keyframe:hover:not([disabled])', {
  filter: 'brightness(1.12)',
  boxShadow: '0 1px 3px rgba(0,0,0,0.55), 0 0 10px rgba(240, 180, 60, 0.6)',
});

globalStyle('.zylem-timeline-keyframe[data-active]', {
  boxShadow: '0 1px 3px rgba(0,0,0,0.55), 0 0 12px rgba(240, 180, 60, 0.8)',
});

globalStyle('.zylem-timeline-keyframe:focus-visible', {
  outline: 'none',
  boxShadow: vars.effects.focusRing,
});

globalStyle('.zylem-timeline-thumb', {
  display: 'block',
  width: '14px',
  height: `calc(${TRACK_HEIGHT} + 6px)`,
  top: '-4px',
  borderRadius: '5px',
  border: '1px solid rgba(255,255,255,0.55)',
  background:
    'linear-gradient(180deg, rgba(240,250,255,0.96), rgba(140,190,235,0.92))',
  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.75), 0 1px 4px rgba(0,0,0,0.5), ${vars.effects.glowPrimary}`,
  cursor: 'grab',
  outline: 'none',
  transition: `box-shadow ${vars.motion.fast} ${vars.motion.easeOut}`,
});

globalStyle('.zylem-timeline-thumb:active', {
  cursor: 'grabbing',
});

globalStyle('.zylem-timeline-thumb:focus-visible', {
  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.75), ${vars.effects.focusRing}`,
});

globalStyle('.zylem-timeline-thumb-input', {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
});

// Fixed box so the readout doesn't reflow the track as digits change:
// wide enough for `59.99s / 120s`, one track-height tall, right-aligned.
globalStyle('.zylem-timeline-time', {
  boxSizing: 'border-box',
  flex: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  width: '12ch',
  height: TRACK_HEIGHT,
  lineHeight: TRACK_HEIGHT,
  fontSize: `calc(${vars.typography.fontSize} - 1px)`,
  fontWeight: 600,
  fontVariantNumeric: 'tabular-nums',
  color: vars.colors.text,
  textShadow: '0 1px 1px rgba(0,0,0,0.6)',
  textAlign: 'right',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
});
