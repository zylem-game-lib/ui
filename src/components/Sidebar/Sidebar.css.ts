import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

/** Owns the `.sidebar` / `.sidebar-item` classes (previously sidebar.css.ts). */
globalStyle('.sidebar', {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  minHeight: 0,
  height: '100%',
  overflowY: 'auto',
  background: vars.material.glassPanelDark,
  borderRight: '1px solid rgba(97, 166, 232, 0.28)',
  backdropFilter: `blur(${vars.effects.blurSm}) saturate(1.1)`,
  '@supports': {
    'not (backdrop-filter: blur(1px))': {
      background: vars.colors.surface,
    },
  },
});

globalStyle('.sidebar-section', {
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: vars.spacing.sm,
});

globalStyle('.sidebar-section-title', {
  padding: `${vars.spacing.sm} ${vars.spacing.md} ${vars.spacing.xs}`,
  fontSize: '10px',
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: vars.colors.textSecondary,
  fontFamily: vars.typography.fontFamily,
  userSelect: 'none',
});

globalStyle('.sidebar-item', {
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.sm,
  padding: `${vars.spacing.xs} ${vars.spacing.md}`,
  margin: `0 ${vars.spacing.xs}`,
  borderRadius: vars.radii.control,
  border: '1px solid transparent',
  color: vars.colors.text,
  fontFamily: vars.typography.fontFamily,
  fontSize: vars.typography.fontSize,
  cursor: 'pointer',
  userSelect: 'none',
  textDecoration: 'none',
  background: 'none',
  textAlign: 'left',
  transition: `background ${vars.motion.fast} ${vars.motion.easeOut}, border-color ${vars.motion.fast} ${vars.motion.easeOut}`,
});

globalStyle('.sidebar-item:hover', {
  background: 'rgba(97, 166, 232, 0.12)',
});

globalStyle('.sidebar-item[data-active], .sidebar-item.is-active', {
  background: vars.material.buttonGlass,
  border: '1px solid rgba(150, 210, 255, 0.5)',
  boxShadow: vars.effects.shadowButton,
  color: '#F4FAFF',
  fontWeight: 600,
  textShadow: '0 1px 1px rgba(0,0,0,0.6)',
});

globalStyle('.sidebar-item:focus-visible', {
  outline: 'none',
  boxShadow: vars.effects.focusRing,
});

globalStyle('.sidebar-item[disabled], .sidebar-item[data-disabled]', {
  opacity: 0.45,
  cursor: 'not-allowed',
});
