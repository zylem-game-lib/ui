import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

globalStyle('.zylem-badge', {
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.spacing.xxs,
  padding: `1px ${vars.spacing.sm}`,
  borderRadius: '5px',
  fontFamily: vars.typography.fontFamily,
  fontSize: `calc(${vars.typography.fontSize} - 3px)`,
  fontWeight: 700,
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  textShadow: '0 1px 1px rgba(0,0,0,0.6)',
  color: '#F4FAFF',
  boxShadow:
    'inset 0 1px 0 rgba(255,255,255,0.32), inset 0 -1px 0 rgba(0,0,0,0.4)',
  whiteSpace: 'nowrap',
  userSelect: 'none',
});

globalStyle('.zylem-badge[data-tone="info"], .zylem-badge:not([data-tone])', {
  border: '1px solid rgba(150, 210, 255, 0.55)',
  background:
    'linear-gradient(180deg, rgba(178, 219, 255, 0.4), rgba(30, 94, 148, 0.85))',
});

globalStyle('.zylem-badge[data-tone="warning"]', {
  border: '1px solid rgba(255, 226, 150, 0.6)',
  background:
    'linear-gradient(180deg, rgba(255, 240, 168, 0.45), rgba(180, 128, 20, 0.85))',
});

globalStyle('.zylem-badge[data-tone="error"]', {
  border: '1px solid rgba(255, 132, 114, 0.65)',
  background:
    'linear-gradient(180deg, rgba(255, 179, 168, 0.45), rgba(190, 52, 38, 0.88))',
});

globalStyle('.zylem-badge[data-tone="success"]', {
  border: '1px solid rgba(120, 255, 150, 0.55)',
  background:
    'linear-gradient(180deg, rgba(182, 255, 195, 0.42), rgba(18, 130, 46, 0.86))',
});

globalStyle('.zylem-badge[data-tone="neutral"]', {
  border: '1px solid rgba(97, 166, 232, 0.35)',
  background:
    'linear-gradient(180deg, rgba(60, 80, 105, 0.6), rgba(26, 31, 39, 0.85))',
  color: vars.colors.text,
});
