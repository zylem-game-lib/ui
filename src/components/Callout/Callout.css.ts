import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

globalStyle('.zylem-callout', {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.xxs,
  padding: `${vars.spacing.sm} ${vars.spacing.md}`,
  borderLeft: '2px solid rgba(150, 210, 255, 0.7)',
  borderRadius: `0 ${vars.radii.control} ${vars.radii.control} 0`,
  background: 'rgba(97, 166, 232, 0.1)',
  color: vars.colors.text,
  fontFamily: vars.typography.fontFamily,
  fontSize: `calc(${vars.typography.fontSize} - 1px)`,
  lineHeight: 1.45,
});

globalStyle('.zylem-callout-title', {
  fontWeight: 700,
  letterSpacing: '0.02em',
});

globalStyle('.zylem-callout-message code', {
  fontFamily: vars.typography.fontFamilyMono,
  fontSize: '0.95em',
});

globalStyle('.zylem-callout[data-tone="warning"]', {
  borderLeftColor: 'rgba(252, 211, 77, 0.8)',
  background: 'rgba(252, 211, 77, 0.09)',
  color: '#FDE68A',
});

globalStyle('.zylem-callout[data-tone="error"]', {
  borderLeftColor: 'rgba(255, 132, 114, 0.85)',
  background: 'rgba(230, 69, 52, 0.14)',
  color: '#FFD9D3',
});

globalStyle('.zylem-callout[data-tone="success"]', {
  borderLeftColor: 'rgba(120, 255, 150, 0.7)',
  background: 'rgba(60, 200, 100, 0.12)',
  color: '#D9FFE3',
});
