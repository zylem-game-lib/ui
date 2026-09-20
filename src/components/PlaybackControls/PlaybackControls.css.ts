import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

globalStyle('.zylem-playback', {
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.md,
  minWidth: 0,
  fontFamily: vars.typography.fontFamily,
});

globalStyle('.zylem-playback-transport', {
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.xs,
});

globalStyle('.zylem-playback-btn', {
  width: '34px',
  padding: 0,
});

// Play is the primary control: a touch wider so the strip reads as a
// transport rather than three identical tool buttons.
globalStyle('.zylem-playback-btn--play', {
  width: '44px',
});

globalStyle('.zylem-playback-btn .zylem-icon', {
  fill: 'currentColor',
  fillOpacity: 0.85,
});

globalStyle('.zylem-playback-loop .zylem-icon', {
  width: '14px',
  height: '14px',
  stroke: 'currentColor',
});

globalStyle('.zylem-playback-extra', {
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.sm,
  minWidth: 0,
  flex: '1 1 auto',
  color: vars.colors.textSecondary,
  fontSize: `calc(${vars.typography.fontSize} - 1px)`,
});

// Compact fields inside the transport (FPS, duration).
globalStyle('.zylem-playback-extra .zylem-field-root', {
  width: '72px',
});
