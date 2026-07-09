import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../theme.css';

globalStyle('.zylem-menu', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  background: 'transparent',
  borderRadius: vars.radii.panel,
  boxSizing: 'border-box',
  overflowY: 'auto',
  overflowX: 'hidden',
  pointerEvents: 'auto',
  fontFamily: vars.typography.fontFamily,
});

globalStyle('.zylem-menu::-webkit-scrollbar', {
  display: 'none',
});

globalStyle('.zylem-menu-header', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.spacing.sm,
  borderBottom: '1px solid rgba(97, 166, 232, 0.28)',
  background:
    'linear-gradient(180deg, rgba(130, 180, 230, 0.14), rgba(30, 60, 95, 0.18) 50%, rgba(8, 22, 38, 0.24))',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15)',
});

globalStyle('.zylem-collapse-button', {
  flexShrink: 0,
  padding: vars.spacing.sm,
  fontSize: '12px',
  lineHeight: 1,
  marginRight: vars.spacing.sm,
  color: vars.colors.primary,
  cursor: 'pointer',
});

globalStyle('.zylem-menu h3, .zylem-menu h4', {
  margin: 0,
});
