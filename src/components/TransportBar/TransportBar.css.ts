import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

globalStyle('.zylem-transport', {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  minWidth: 0,
  boxSizing: 'border-box',
  fontFamily: vars.typography.fontFamily,
  color: vars.colors.text,
});

globalStyle('.zylem-transport > .zylem-playback', {
  width: '100%',
});

globalStyle('.zylem-transport .zylem-playback-extra', {
  flex: '1 1 auto',
  minWidth: 0,
  gap: vars.spacing.sm,
});

globalStyle('.zylem-transport-track', {
  flex: '1 1 auto',
  minWidth: '120px',
});

globalStyle('.zylem-transport-time', {
  flex: 'none',
  minWidth: '9ch',
  fontSize: `calc(${vars.typography.fontSize} - 1px)`,
  fontWeight: 600,
  fontVariantNumeric: 'tabular-nums',
  whiteSpace: 'nowrap',
  textShadow: '0 1px 1px rgba(0,0,0,0.6)',
});

globalStyle('.zylem-transport-time-total', {
  fontWeight: 400,
  color: vars.colors.textSecondary,
});

globalStyle('.zylem-transport-field', {
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.spacing.xs,
  flex: 'none',
});

globalStyle('.zylem-transport-field-label', {
  fontSize: '10px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: vars.colors.textSecondary,
});

globalStyle('.zylem-transport-bpm', {
  width: '84px',
});

globalStyle('.zylem-transport-signature', {
  width: '84px',
  flex: 'none',
});
